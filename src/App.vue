<template>
  <div id="app">
    <!-- nav -->
    <b-nav align="center" id="nav">
      <b-nav-text>なにかのURLリスト</b-nav-text>
    </b-nav>
    <div class="container">
      <!-- tag table -->
      <div class="mb-5" v-if="tagTable.list.length !== 0">
        <div class="d-flex justify-content-center">
          <h5>Tag検索: "{{ tagTable.searchTag }}"</h5>
        </div>
        <table-view
          :table-data="tagTable"
          @clickTag="OnClickTag"
          @clickNext="OnClickTagTabelNext"
        ></table-view>
      </div>
      <div class="mb-5">
        <!-- 新着 table -->
        <div class="d-flex justify-content-center">
          <h5>新着</h5>
        </div>
        <table-view
          :table-data="tagTable"
          @clickTag="OnClickTag"
          @clickNext="OnClickNext"
        ></table-view>
      </div>
      <amplify-connect
        :mutation="createLinkDataMutation"
        @done="onCreateFinished"
      >
        <template slot-scope="{ loading, mutate, errors }">
          <div class="">
            <b-form class="col">
              <div class="d-flex flex-column align-items-center">
                <h4>URLを登録</h4>
              </div>

              <b-form-group label="タイトル" label-for="example-datepicker">
                <b-form-input
                  type="text"
                  id="example-datepicker"
                  v-model="createForm.title"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="タグ" label-for="tag-input">
                <b-form-tags
                  input-id="tag-input"
                  separator=" ,;"
                  placeholder="入力してスペースキーか、エンターキーを押す"
                  v-model="createForm.tag"
                ></b-form-tags>
              </b-form-group>

              <b-form-group label="URL" label-for="sb-inline">
                <b-form-input
                  type="url"
                  id="sb-inline"
                  v-model="createForm.url"
                ></b-form-input>
              </b-form-group>

              <div v-for="(error, index) in errors" v-bind:key="index">
                {{ error.message }}
              </div>

              <b-button
                variant="outline-primary"
                :disabled="loading"
                @click="mutate"
                >登録</b-button
              >
            </b-form>
          </div>
        </template>
      </amplify-connect>
    </div>
  </div>
</template>

<script>
import { listLinkDatas, searchLinkDatas } from "./graphql/queries";
import { createLinkData } from "./graphql/mutations";
import TableView from "./components/TableView";

export default {
  name: "App",
  components: { TableView },
  data() {
    return {
      latestTable: {
        nextButton: "新着続き",
        isBusy: true,
        list: [],
        nextToken: ""
      },
      tagTable: {
        nextButton: "Tag検索続き",
        searchTag: "",
        isBusy: true,
        list: [],
        nextToken: ""
      },

      createForm: { title: "", url: "", tag: [] }
    };
  },
  methods: {
    onCreateFinished() {
      this.latestTable.isBusy = true;
      this.latestTable.list = [];
      // 反映を待って 2秒後検索
      setTimeout(() => {
        this.searchLatestList();
      }, 2000);
    },

    // api 叩いたあとの処理
    latestTableProcess(isInit, table) {
      return result => {
        if (isInit) {
          table.list = result.data.searchLinkDatas.items;
        } else {
          table.list = table.list.concat(result.data.searchLinkDatas.items);
        }
        table.isBusy = false;
        table.nextToken = result.data.searchLinkDatas.nextToken;
      };
    },

    searchLinkDatas(value, f) {
      this.$Amplify.API.graphql({
        query: searchLinkDatas,
        variables: value
      })
        .then(a => {
          f(a);
        })
        .catch(e => console.log(e));
    },

    // @serachableでsortしながら全クエリ
    searchLatestList() {
      var val = {
        sort: {
          field: "createdAt",
          direction: "desc"
        },
        limit: 5
      };
      this.searchLinkDatas(
        val,
        this.latestTableProcess(false, this.latestTable)
      );
    },
    // tagをクリック時 tag検索
    OnClickTag(str) {
      this.tagTable.searchTag = str;

      var value = {
        filter: { tag: { match: str } },
        sort: {
          field: "createdAt",
          direction: "desc"
        }
      };
      this.searchLinkDatas(value, this.latestTableProcess(true, this.tagTable));
    },
    // 新着続きをクリック
    OnClickNext() {
      var val = {
        sort: {
          field: "createdAt",
          direction: "desc"
        },
        limit: 5,
        nextToken: this.latestTable.nextToken
      };
      this.searchLinkDatas(
        val,
        this.latestTableProcess(false, this.latestTable)
      );
    },
    // tagテーブルのnextクリック時
    OnClickTagTabelNext() {
      var value = {
        filter: { tag: { match: this.tagTable.searchTag } },
        sort: {
          field: "createdAt",
          direction: "desc"
        },
        nextToken: this.tagTable.nextToken
      };
      this.searchLinkDatas(
        value,
        this.latestTableProcess(false, this.tagTable)
      );
    }
  },
  computed: {
    listLinkDatasQuery() {
      return this.$Amplify.graphqlOperation(listLinkDatas);
    },
    createLinkDataMutation() {
      const value = { input: Object.assign(this.createForm, {}) };
      // console.log(value);
      return this.$Amplify.graphqlOperation(createLinkData, value);
    }
  },
  mounted() {
    this.searchLatestList();
  }
};
</script>

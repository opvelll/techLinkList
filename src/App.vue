<template>
  <div id="app">
    <!-- nav -->
    <b-nav align="center" id="nav">
      <!-- <b-nav-text>なにかのURLリスト</b-nav-text> -->
    </b-nav>
    <div class="container">
      <!-- tag table -->
      <div class="mb-5 mt-2" v-if="tagTable.list.length !== 0">
        <div>
          <label for="tags-search">
            <h5 class="mb-1">タグ検索</h5>
          </label>
          <b-form-tags
            class="mb-2"
            input-id="tags-search"
            separator=" ,;"
            placeholder="入力してスペースキーか、エンターキーを押す"
            v-model="tagTable.searchTag"
            @input="OnInputTag"
          ></b-form-tags>
        </div>
        <table-view :table-data="tagTable" @clickTag="OnClickTag" @clickNext="OnClickTagTabelNext"></table-view>
      </div>
      <div class="mb-5">
        <!-- 新着 table -->
        <div class="d-flex justify-content-center mt-1">
          <h5>新着</h5>
        </div>
        <table-view :table-data="latestTable" @clickTag="OnClickTag" @clickNext="OnClickNext"></table-view>
      </div>
      <amplify-connect :mutation="createLinkDataMutation" @done="onCreateFinished">
        <template slot-scope="{ loading, mutate, errors }">
          <div class>
            <b-card class="mb-2">
              <b-form class="col">
                <div class="d-flex flex-column align-items-center">
                  <h4>新しくURLを登録する</h4>
                </div>

                <b-form-group
                  label-cols-sm="2"
                  label="タイトル"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="example-datepicker"
                >
                  <b-form-input
                    type="text"
                    id="example-datepicker"
                    v-model="createForm.title"
                    placeholder="..."
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label-cols-sm="2"
                  label-align-sm="right"
                  label-size="sm"
                  label="タグ"
                  label-for="tag-input"
                >
                  <b-form-tags
                    input-id="tag-input"
                    separator=" ,;"
                    placeholder="入力してスペースキーか、エンターキーを押す"
                    v-model="createForm.tag"
                  ></b-form-tags>
                </b-form-group>

                <b-form-group
                  label-cols-sm="2"
                  label-align-sm="right"
                  label-size="sm"
                  label="URL"
                  label-for="sb-inline"
                >
                  <b-form-input
                    type="url"
                    id="sb-inline"
                    v-model="createForm.url"
                    placeholder="http://aaaaaa/"
                  ></b-form-input>
                </b-form-group>

                <div v-for="(error, index) in errors" v-bind:key="index">{{ error.message }}</div>

                <div class="d-flex flex-row-reverse">
                  <b-button variant="primary" class="mr-1" :disabled="loading" @click="mutate">登録</b-button>
                </div>
              </b-form>
            </b-card>
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
        nextButton: "続きを読み込む",
        isBusy: true,
        list: [],
        nextToken: ""
      },
      tagTable: {
        nextButton: "続きを読み込む",
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
    tableListUpdateProcess(isInit, table) {
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
        limit: 10
      };
      this.searchLinkDatas(
        val,
        this.tableListUpdateProcess(false, this.latestTable)
      );
    },
    searchTag(strList) {
      console.log(strList);
      this.tagTable.searchTag = strList;
      localStorage.tag = JSON.stringify(strList);

      var value = {
        filter: { tag: { match: strList.join(" ") } },
        sort: {
          field: "createdAt",
          direction: "desc"
        }
      };
      this.searchLinkDatas(
        value,
        this.tableListUpdateProcess(true, this.tagTable)
      );
    },
    // tag 検索
    OnInputTag() {
      this.searchTag(this.tagTable.searchTag);
    },
    // tagをクリック時 tag検索
    OnClickTag(str) {
      this.searchTag([str]);
    },
    // 新着続きをクリック
    OnClickNext() {
      var val = {
        sort: {
          field: "createdAt",
          direction: "desc"
        },
        limit: 10,
        nextToken: this.latestTable.nextToken
      };
      this.searchLinkDatas(
        val,
        this.tableListUpdateProcess(false, this.latestTable)
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
        this.tableListUpdateProcess(false, this.tagTable)
      );
    }
  },
  computed: {
    listLinkDatasQuery() {
      return this.$Amplify.graphqlOperation(listLinkDatas);
    },
    createLinkDataMutation() {
      const value = { input: Object.assign({}, this.createForm) };
      // console.log(value);
      return this.$Amplify.graphqlOperation(createLinkData, value);
    }
  },
  mounted() {
    this.searchLatestList();

    if (localStorage.tag) {
      console.log(JSON.parse(localStorage.tag));
      this.searchTag(JSON.parse(localStorage.tag));
    }
  }
};
</script>

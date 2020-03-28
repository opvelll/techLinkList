<template>
  <div id="app">
    <b-nav align="center" id="nav">
      <b-nav-text>なにかのURLリスト</b-nav-text>
    </b-nav>
    <div class="container">
      <div class="mb-5">
        <!-- テーブル -->
        <div class="d-flex justify-content-center">
          <h5>新着</h5>
        </div>

        <b-table
          borderless
          small
          fixed
          stacked="md"
          :fields="fields"
          :items="latestTable.list"
          :busy="latestTable.isBusy"
        >
          <!-- tag 部分 -->
          <template v-slot:cell(tag)="data">
            <h5>
              <b-badge
                class="mr-1"
                variant="info"
                style="cursor: pointer"
                v-for="(tagStr, idx) in data.item.tag"
                v-bind:key="idx"
                @click="OnClickTag(tagStr)"
                >{{ tagStr }}</b-badge
              >
            </h5>
          </template>
          <!-- url部分 -->
          <template v-slot:cell(url)="data">
            <a :href="data.item.url">{{ data.item.url }}</a>
          </template>
          <!-- ロード画面 -->
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template></b-table
        >
        <div class="d-flex justify-content-center" v-if="latestTable.nextToken">
          <b-button variant="outline-primary" @click="OnClickNext"
            >新着続き</b-button
          >
        </div>
      </div>
      <!-- <amplify-connect :query="listLinkDatasQuery">
        <template slot-scope="{ loading, data, errors }">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0"></div>

          <div v-else-if="data" class="d-flex flex-column align-items-center">
            <div
              class="d-flex"
              v-for="item in data.listLinkDatas.items"
              v-bind:key="item.id"
            >
              {{ item.title }}
            </div>
          </div>
        </template>
      </amplify-connect> -->
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
                  placeholder="tagを入力してスペースキーか、エンターキーを押す"
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

export default {
  name: "App",
  data() {
    return {
      fields: ["createdAt", "title", "tag", "url"],
      latestTable: { isBusy: true, list: [], nextToken: "" },

      tagSearchList: [],
      tagSearchNextToken: "",
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
    // queryList() {
    //   this.$Amplify.API.graphql({
    //     query: listLinkDatas
    //   })
    //     .then(a => (this.latestList = a.data.listLinkDatas.items))
    //     .catch(e => console.log(e));
    // },

    // api 叩いたあとの処理
    latestTableProcess(graphqlReturn) {
      this.latestTable.list = this.latestTable.list.concat(
        graphqlReturn.data.searchLinkDatas.items
      );
      this.latestTable.isBusy = false;
      this.latestTable.nextToken = graphqlReturn.data.searchLinkDatas.nextToken;
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
      this.searchLinkDatas(val, this.latestTableProcess);
    },
    // tagをクリック時 tag検索
    OnClickTag(str) {
      var value = {
        filter: { tag: { match: str } },
        sort: {
          field: "createdAt",
          direction: "desc"
        }
      };
      this.searchLinkDatas(value, this.latestTableProcess);
    },
    // next tokenで続き
    OnClickNext() {
      var val = {
        sort: {
          field: "createdAt",
          direction: "desc"
        },
        limit: 5,
        nextToken: this.latestTable.nextToken
      };
      this.searchLinkDatas(val, this.latestTableProcess);
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

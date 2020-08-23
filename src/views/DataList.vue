<template>
  <div id="app">
    <div class="container">
      <h3>アドレスのリスト</h3>
      <!-- エラーメッセージを表示するモーダル -->
      <b-modal id="error_modal">{{ errorMessage }}</b-modal>

      <!-- 新着 table -->
      <div class="mb-5">
        <!-- <div class="d-flex justify-content-center mt-1">
          <h5>新着</h5>
        </div>-->
        <table-view :table-data="latestTable" @clickTag="OnClickTag" @clickNext="OnClickNext"></table-view>
      </div>

      <!-- 追加フォーム -->
      <amplify-connect :mutation="createLinkDataMutation" @done="onCreateFinished">
        <template slot-scope="{ loading, mutate, errors }">
          <div class>
            <b-card class="mb-2" title="新しくURLを登録する">
              <b-form class="col">
                <b-form-group label="タイトル" label-for="title-input">
                  <b-form-input
                    type="text"
                    id="title-input"
                    v-model="createForm.title"
                    placeholder="..."
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
import { listLinkDatas } from "../graphql/queries";
import { createLinkData } from "../graphql/mutations";
import TableView from "../components/TableView";

export default {
  name: "App",
  components: { TableView },
  data() {
    return {
      errorMessage: "",
      latestTable: {
        nextButton: "続きを読み込む",
        isBusy: true,
        list: [],
        nextToken: "",
      },

      createForm: { title: "", url: "", tag: [] },
    };
  },
  methods: {
    onCreateFinished() {
      this.latestTable.isBusy = true;
      this.latestTable.list = [];
      // 反映を待って検索
      setTimeout(() => {
        this.searchLatestList();
      }, 1000);
    },

    // api 叩いたあとの処理
    tableListUpdateProcess(isInit, table) {
      return (result) => {
        console.log(result);
        if (isInit) {
          table.list = result.data.listLinkDatas.items;
        } else {
          table.list = table.list.concat(result.data.listLinkDatas.items);
        }
        table.isBusy = false;
      };
    },

    // 検索処理
    // value クエリの変数
    // f クエリのあとの処理
    searchLinkDatas(value, f) {
      // console.log(value, f);
      this.$Amplify.API.graphql({
        query: listLinkDatas,
        variables: value,
      })
        .then((a) => {
          f(a);
        })
        .catch((e) => {
          console.log(e);
          this.errorMessage = e.errors[0].message;
          // エラーはモーダルで出す。
          this.$bvModal.show("error_modal");
        });
    },

    // 全検索
    searchLatestList() {
      var value2 = {
        limit: 10,
      };
      this.searchLinkDatas(
        value2,
        this.tableListUpdateProcess(false, this.latestTable)
      );
    },
    // tagを検索
    // strList : [String] tagのリスト
    searchTag(strList) {
      // console.log(strList);
      //
      this.tagTable.searchTag = strList;
      localStorage.tag = JSON.stringify(strList);

      var value2 = {
        filter: { tag: { contains: strList.join(" ") } },
        limit: 10,
      };

      this.searchLinkDatas(
        value2,
        this.tableListUpdateProcess(true, this.tagTable)
      );
    },

    // tagをクリック時 tag検索
    OnClickTag(str) {
      this.searchTag([str]);
    },
    // 新着続きをクリック
    OnClickNext() {
      var val = {
        address: this.address,
        limit: 10,
        nextToken: this.latestTable.nextToken,
      };
      this.searchLinkDatas(
        val,
        this.tableListUpdateProcess(false, this.latestTable)
      );
    },
    // tagテーブルのnextクリック時
    OnClickTagTabelNext() {
      var value2 = {
        filter: { tag: { contains: this.tagTable.searchTag } },
        nextToken: this.tagTable.nextToken,
      };
      this.searchLinkDatas(
        value2,
        this.tableListUpdateProcess(false, this.tagTable)
      );
    },
  },
  computed: {
    // 作成フォームをクリック時のクエリ
    createLinkDataMutation() {
      const value = {
        input: Object.assign({}, this.createForm),
      };
      // console.log(value);
      return this.$Amplify.graphqlOperation(createLinkData, value);
    },
  },
  mounted() {
    // 全検索
    this.searchLatestList();

    // ローカルストレージに前のタグ検索履歴があったら、タグを検索
    if (localStorage.tag) {
      var tags = JSON.parse(localStorage.tag);
      // console.log(tags);
      if (tags.length > 0) {
        this.searchTag(tags);
        // console.log(tags);
      }
    }
  },
};
</script>

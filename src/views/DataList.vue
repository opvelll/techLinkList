<template>
  <div id="app">
    <!-- nav -->
    <b-nav id="nav">
      <!-- ページ名 -->
      <b-nav-item active
        ><router-link to="/">&lt; 戻る</router-link></b-nav-item
      >

      <b-nav-text>{{ $route.params.pageName }}</b-nav-text>
    </b-nav>
    <div class="container">
      <!-- エラーメッセージを表示するモーダル -->
      <b-modal id="error_modal">{{ errorMessage }}</b-modal>

      <!-- 検索 タグテーブル -->
      <div class="mb-5 mt-2" v-if="tagTable.searchTag.length > 0">
        <div>
          <!-- タグ検索フォーム -->
          <label for="tags-search" class="d-flex justify-content-center">
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
        <table-view
          :table-data="tagTable"
          @clickTag="OnClickTag"
          @clickNext="OnClickTagTabelNext"
          v-if="tagTable.list.length !== 0"
        ></table-view>
      </div>

      <!-- 新着 table -->
      <div class="mb-5">
        <!-- <div class="d-flex justify-content-center mt-1">
          <h5>新着</h5>
        </div> -->
        <table-view
          :table-data="latestTable"
          @clickTag="OnClickTag"
          @clickNext="OnClickNext"
        ></table-view>
      </div>

      <!-- 追加フォーム -->
      <amplify-connect
        :mutation="createLinkDataMutation"
        @done="onCreateFinished"
      >
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

                <div v-for="(error, index) in errors" v-bind:key="index">
                  {{ error.message }}
                </div>

                <div class="d-flex flex-row-reverse">
                  <b-button
                    variant="primary"
                    class="mr-1"
                    :disabled="loading"
                    @click="mutate"
                    >登録</b-button
                  >
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
import { getPageByAddress } from "../graphql/queries";
import { createLinkData } from "../graphql/mutations";
import TableView from "../components/TableView";

export default {
  name: "App",
  components: { TableView },
  data() {
    return {
      pageId: "",
      name: "",
      address: "",
      errorMessage: "",
      latestTable: {
        nextButton: "続きを読み込む",
        isBusy: true,
        list: [],
        nextToken: "",
      },
      tagTable: {
        nextButton: "続きを読み込む",
        searchTag: "",
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
          table.list = result.data.getPageByAddress.items[0].linkDatas.items;
        } else {
          table.list = table.list.concat(
            result.data.getPageByAddress.items[0].linkDatas.items
          );
        }
        this.pageId = result.data.getPageByAddress.items[0].id;
        this.name = result.data.getPageByAddress.items[0].name;
        this.address = result.data.getPageByAddress.items[0].address;
        table.isBusy = false;
        table.nextToken =
          result.data.getPageByAddress.items[0].linkDatas.nextToken;
      };
    },

    // 検索処理
    // value クエリの変数
    // f クエリのあとの処理
    searchLinkDatas(value, f) {
      // console.log(value, f);
      this.$Amplify.API.graphql({
        query: getPageByAddress,
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
        address: this.address,
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
    // tag テーブルに付いている検索
    OnInputTag() {
      if (this.tagTable.searchTag.length > 0) {
        this.searchTag(this.tagTable.searchTag);
      } else {
        localStorage.tag = "";
      }
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
        input: Object.assign({ pageId: this.pageId }, this.createForm),
      };
      // console.log(value);
      return this.$Amplify.graphqlOperation(createLinkData, value);
    },
  },
  mounted() {
    this.address = this.$route.params.pageName;
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

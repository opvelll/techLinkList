<template>
  <div id="app">
    <div class="container">
      <div class="d-flex flex-column align-items-center">
        <div class="d-flex" v-for="item in linkList" v-bind:key="item.id">
          {{ item.title }}
        </div>
      </div>
      <amplify-connect
        :mutation="createLinkDataMutation"
        @done="onCreateFinished"
      >
        <template slot-scope="{ loading, mutate }">
          <div class="row flex-column align-items-center">
            <b-form class="col">
              <b-form-group label="タイトル" label-for="example-datepicker">
                <b-form-input
                  type="text"
                  id="example-datepicker"
                  v-model="createForm.title"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="説明" label-for="example-datepicker">
                <b-form-input
                  type="text"
                  id="example-datepicker"
                  v-model="createForm.discription"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="タグ" label-for="tag-input">
                <input-tag
                  id="tag-input"
                  placeholder="tagを入力してエンターキーを押す"
                  v-model="createForm.tag"
                ></input-tag>
              </b-form-group>

              <b-form-group label="URL" label-for="sb-inline">
                <b-form-input
                  type="url"
                  id="sb-inline"
                  v-model="createForm.url"
                ></b-form-input>
              </b-form-group>

              <b-button :disabled="loading" @click="mutate">登録</b-button>
            </b-form>
          </div>
        </template>
      </amplify-connect>
    </div>
  </div>
</template>

<script>
import InputTag from "vue-input-tag";

import { listLinkDatas } from "./graphql/queries";
import { createLinkData } from "./graphql/mutations";

export default {
  name: "App",
  components: { InputTag },
  data() {
    return {
      linkList: [],
      createForm: { title: "", discription: "", url: "", tag: [] }
    };
  },
  methods: {
    onCreateFinished() {
      console.log("Todo created!");
      //this.$router.go({ path: this.$router.currentRoute.path, force: true });
    }
  },
  computed: {
    listLinkDatasQuery() {
      return this.$Amplify.graphqlOperation(listLinkDatas);
    },
    createLinkDataMutation() {
      const value = { input: Object.assign(this.createForm, {}) };
      console.log(value);
      return this.$Amplify.graphqlOperation(createLinkData, value);
    }
  },
  mounted() {
    this.$Amplify.API.graphql({
      query: listLinkDatas,
      authMode: "AWS_IAM"
    })
      .then(a => console.log("test : ", a.data))
      .catch(e => console.log(e));
  }
};
</script>

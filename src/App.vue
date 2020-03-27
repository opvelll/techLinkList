<template>
  <div id="app">
    <div class="container">
      <amplify-connect :query="listTodosQuery">
        <template slot-scope="{ loading, data, errors }">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0"></div>

          <div v-else-if="data" class="d-flex flex-column align-items-center">
            <div
              class="d-flex flex-column align-items-center"
              v-for="item in data.listLinkDatas.items"
              v-bind:key="item.id"
            >{{item.title}}</div>
          </div>
        </template>
      </amplify-connect>
      <amplify-connect :mutation="createLinkDataMutation" @done="onCreateFinished">
        <template slot-scope="{ loading, mutate }">
          <div class="row flex-column align-items-center">
            <b-form class="col">
              <b-form-group label="タイトル" label-for="example-datepicker">
                <b-form-input type="text" id="example-datepicker" v-model="createForm.title"></b-form-input>
              </b-form-group>

              <b-form-group label="URL" label-for="sb-inline">
                <b-form-input type="url" id="sb-inline" v-model="createForm.url"></b-form-input>
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
import { listLinkDatas } from "./graphql/queries";
import { createLinkData } from "./graphql/mutations";

export default {
  name: "App",
  data() {
    return {
      createForm: { title: "", discription: "", url: "", tag: "" }
    };
  },
  computed: {
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(listLinkDatas);
    },
    createLinkDataMutation() {
      const value = { input: Object.assign(this.createForm, {}) };
      console.log(value);
      return this.$Amplify.graphqlOperation(createLinkData, value);
    }
  }
};
</script>

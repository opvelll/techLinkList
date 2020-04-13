<template>
  <div id="page" class="container">
    <amplify-connect :query="listPagesQuery">
      <template slot-scope="{ loading, data, errors }">
        <div v-if="loading">Loading...</div>

        <div v-else-if="errors.length > 0">{{ errors }}</div>

        <div v-else-if="data">
          <b-table
            borderless
            small
            :items="data.listPages.items"
            :fields="fields"
          >
            <template v-slot:cell(name)="data">
              <router-link :to="data.item.address">{{
                data.item.name
              }}</router-link>
            </template>
          </b-table>
        </div>
      </template>
    </amplify-connect>

    <amplify-connect :mutation="createPageMutation" @done="onCreateFinished">
      <template slot-scope="{ loading, mutate, errors }">
        <b-card title="新しいページを作成する">
          <b-form class="col">
            <b-form-group label="ページ名" label-for="pageInput">
              <b-form-input
                type="text"
                id="pageInput"
                v-model="createPageForm.name"
                placeholder="太郎"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="アドレス名(半角小文字のみ)"
              label-for="addressInput"
            >
              <b-form-input
                type="text"
                id="addressInput"
                v-model="createPageForm.name"
                placeholder="taro"
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
                >作成</b-button
              >
            </div>
          </b-form>
        </b-card>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
import { listPages } from "../graphql/queries.js";
import { createPage } from "../graphql/mutations.js";

export default {
  data() {
    return {
      fields: [{ key: "name", label: "ページ" }],
      createPageForm: {
        name: "",
      },
    };
  },
  methods: {
    onCreateFinished() {
      console.log("Todo created!");
    },
  },
  computed: {
    listPagesQuery() {
      return this.$Amplify.graphqlOperation(listPages);
    },
    createPageMutation() {
      return this.$Amplify.graphqlOperation(createPage, {
        input: this.createPageForm,
      });
    },
  },
};
</script>

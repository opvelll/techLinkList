<template>
  <!-- テーブル -->
  <div>
    <b-table
      borderless
      small
      hover
      stacked="md"
      :fields="fields"
      :items="tableData.list"
      :busy="tableData.isBusy"
    >
      <!-- タイトル部分 -->
      <template v-slot:cell(title)="data">
        <a :href="data.item.title">{{ data.item.title }}</a>
      </template>
      <!-- 日付部分 -->
      <template v-slot:cell(createdAt)="data">{{ data.item.createdAt | moment("llll") }}</template>
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
          >{{ tagStr }}</b-badge>
        </h5>
      </template>
      <!-- url部分 -->
      <template v-slot:cell(url)="data">
        <a :href="data.item.url">{{ data.item.url }}</a>
      </template>
      <!-- action -->
      <template v-slot:cell(action)="row">
        <b-button size="sm" @click="OnClickUpdateRow(row)">変更</b-button>
      </template>
      <!-- ロード画面 -->
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <div class="d-flex justify-content-center" v-if="tableData.nextToken">
      <b-button block variant="outline-primary" @click="OnNext">
        {{
        tableData.nextButton
        }}
      </b-button>
    </div>
    <!-- update Form -->
    <div v-if="isViewUpdateForm">
      <b-form class="col">
        <div class="d-flex flex-column align-items-center">
          <h4>変更</h4>
        </div>

        <b-form-group
          label-cols-sm="2"
          label="タイトル"
          label-align-sm="right"
          label-size="sm"
          label-for="example-datepicker"
        >
          <b-form-input type="text" id="example-datepicker" v-model="updateForm.title"></b-form-input>
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
            v-model="updateForm.tag"
          ></b-form-tags>
        </b-form-group>

        <b-form-group
          label-cols-sm="2"
          label-align-sm="right"
          label-size="sm"
          label="URL"
          label-for="sb-inline"
        >
          <b-form-input type="url" id="sb-inline" v-model="updateForm.url"></b-form-input>
        </b-form-group>

        <div v-for="(error, index) in errors" v-bind:key="index">{{ error.message }}</div>

        <div class="d-flex flex-row-reverse">
          <b-button class="mr-2" @click="OnClickCancel">キャンセル</b-button>
          <b-button class="mr-2" variant="outline-primary" @click="OnClickUpdate">更新</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { updateLinkData } from "../graphql/mutations";
export default {
  name: "table-view",
  props: ["tableData"],
  data() {
    return {
      fields: [
        { key: "createdAt", label: "登録日" },
        { key: "title", label: "タイトル" },
        "tag",
        "url",
        "action"
      ],
      isViewUpdateForm: false,
      updateForm: { id: "", title: "", tag: [], url: "" },
      errors: []
    };
  },
  methods: {
    OnNext() {
      this.$emit("clickNext");
    },
    OnClickTag(tagStr) {
      this.$emit("clickTag", tagStr);
    },
    OnClickRow(item) {
      console.log(item);
    },
    OnClickUpdateRow(row) {
      this.isViewUpdateForm = !this.isViewUpdateForm;
      let obj = {
        id: row.item.id,
        title: row.item.title,
        tag: row.item.tag,
        url: row.item.url
      };
      this.updateForm = obj;
    },
    OnClickCancel() {
      this.isViewUpdateForm = false;
    },
    OnUpdateFinished(result) {
      let idx = -1;

      this.tableData.list.forEach((item, index) => {
        if (item.id === result.data.updateLinkData.id) {
          idx = index;
        }
      });

      if (idx >= 0) {
        this.tableData.list.splice(idx, 1, result.data.updateLinkData);
      }
    },
    OnClickUpdate() {
      let value = { input: Object.assign({}, this.updateForm) };
      // console.log(value);
      this.$Amplify.API.graphql({
        query: updateLinkData,
        variables: value
      })
        .then(this.OnUpdateFinished)
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {}
};
</script>

<template>
  <!-- テーブル -->
  <div>
    <b-table
      borderless
      small
      fixed
      stacked="md"
      :fields="fields"
      :items="tableData.list"
      :busy="tableData.isBusy"
    >
      <!-- 日付部分 -->
      <template v-slot:cell(createdAt)="data">
        {{ data.item.createdAt | moment("llll") }}
      </template>
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
    <div class="d-flex justify-content-center" v-if="tableData.nextToken">
      <b-button variant="outline-primary" @click="OnNext">{{
        tableData.nextButton
      }}</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "table-view",
  props: ["tableData"],
  data() {
    return {
      fields: [
        { key: "createdAt", label: "登録日" },
        { key: "title", label: "タイトル" },
        "tag",
        "url"
      ]
    };
  },
  methods: {
    OnNext() {
      this.$emit("clickNext");
    },
    OnClickTag(tagStr) {
      this.$emit("clickTag", tagStr);
    }
  }
};
</script>

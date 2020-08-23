<template>
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
</template>

<script>
export default {
  data() {
    return {
      tagTable: {
        nextButton: "続きを読み込む",
        searchTag: "",
        isBusy: true,
        list: [],
        nextToken: "",
      },
    };
  },
  methods: {
    // tag テーブルに付いている検索
    OnInputTag() {
      if (this.tagTable.searchTag.length > 0) {
        this.searchTag(this.tagTable.searchTag);
      } else {
        localStorage.tag = "";
      }
    },
  },

  mounted() {},
};
</script>
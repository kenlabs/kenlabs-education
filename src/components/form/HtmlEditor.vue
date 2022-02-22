<template>
  <editor
    v-on="eventHandles"
    v-model="content"
    :api-key="apiKey"
    :disabled="disabled"
    :init="init"
    :inline="inline"
    :model-events="modelEvents"
    :output-format="outputFormat"
    :plugins="plugins"
    :tag-name="tagName"
    :toolbar="toolbar"
    @onChange="onChange"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "HtmlEditor",
  components: { Editor },
  props: {
    value: {
      type: String,
      default: "",
    },
    apiKey: {
      type: String,
      default: "j9j69marhv8ctuj6bu7q6rxsr29nuju10ab5bh19myxp2f9j",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    init: {
      type: Object,
      default() {
        return {
          language: "zh_CN",
          images_upload_url: `${process.env.BASE_URL}/common/files/image`,
          automatic_uploads: true,
          content_style: "img {max-width: 100%; height: auto}",
        };
      },
    },
    inline: {
      type: Boolean,
      default: false,
    },
    modelEvents: {
      type: String,
      default: "change keyup undo redo",
    },
    outputFormat: {
      type: String,
      default: "html",
    },
    plugins: {
      type: Array,
      default() {
        return [];
      },
    },
    tagName: {
      type: String,
      default: "div",
    },
    toolbar: {
      type: String,
    },
    eventHandles: {},
  },
  data() {
    return {
      content: this.value,
    };
  },
  computed: {
    id() {
      return `html-editor-${this._uid}`;
    },
  },
  methods: {
    onChange() {
      this.$emit("input", this.content);
    },
  },
};
</script>

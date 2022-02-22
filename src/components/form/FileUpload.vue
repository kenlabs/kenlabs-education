<!-- 文件上传组件 -->
<template>
  <v-file-input
    dense
    outlined
    show-size
    :append-icon="appendIcon"
    :append-outer-icon="appendOuterIcon"
    :accept="accept"
    :counter="multiple"
    :disabled="loading"
    :error="error"
    :error-count="errorCount"
    :error-messages="errorMessage"
    :hide-details="hideDetails"
    :label="label"
    :loading="loading"
    :multiple="multiple"
    :prefix="prefix"
    :prepend-icon="prependIcon"
    :prepend-inner-icon="prependInnerIcon"
    :success="finished"
    :suffix="suffix"
    @change="handleFileChange"
    @click:clear="reset"
  >
    <template #selection="{ index, text }">
      <v-chip v-if="finished && index === 0" dark label small color="success">
        {{ files.length === 1 ? "文件上传完成" : `${files.length} 个文件上传完成` }}
      </v-chip>
      <v-chip v-if="index === finishCount" dark label small color="info">
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
</template>
<script>
export default {
  props: {
    appendIcon: {
      type: String,
    },
    appendOuterIcon: {
      type: String,
    },
    accept: {
      type: String,
    },
    label: {
      type: String,
      default: "选择文件",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
    },
    prependIcon: {
      type: String,
    },
    prependInnerIcon: {
      type: String,
    },
    suffix: {
      type: String,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      error: false,
      errorCount: 1,
      errorMessage: "",
      totalCount: 0,
      finishCount: 0,
      successMessage: "",
      files: [],
      fileKeys: [],
    };
  },
  computed: {
    finished() {
      return this.totalCount > 0 && this.totalCount === this.finishCount;
    },
  },
  methods: {
    handleFileChange(event) {
      this.fileKeys = [];
      if (event) {
        if (event instanceof File) {
          this.files = [event];
          this.totalCount = 1;
        }
        if (event instanceof Array) {
          this.files = event;
          this.totalCount = event.length;
        }
        this.loading = true;
        this.uploadFile();
      }
    },
    uploadFile() {
      if (!this.finished) {
        const file = this.files[this.finishCount];
        const formData = new FormData();
        formData.append("file", file);
        this.$axios
          .post("/common/files/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.fileKeys.push(res.data.key);
            this.finishCount++;
            this.uploadFile();
          })
          .catch((err) => {
            this.error = true;
            this.errorMessage = err.message;
          });
      } else {
        this.loading = false;
        this.$emit("input", this.multiple ? this.fileKeys : this.fileKeys[0]);
      }
    },
    reset() {
      this.loading = false;
      this.error = false;
      this.totalCount = 0;
      this.finishCount = 0;
      this.files = [];
      this.fileKeys = [];
    },
  },
};
</script>

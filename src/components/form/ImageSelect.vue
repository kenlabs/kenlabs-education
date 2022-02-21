<!-- 图片上传组件 -->
<template>
  <div class="d-flex">
    <input ref="file" accept="image/*" class="d-none" type="file" :multiple="multiple" @change="handleImageFileChange" />
    <span class="flex-shrink-0 align-self-center mr-2">{{ label }}</span>
    <div class="d-flex flex-wrap">
      <v-hover>
        <template #default="{ hover }">
          <v-img
            v-show="canUpload"
            class="flex-grow-0 rounded-lg ma-1"
            :class="loading ? '' : 'uploader'"
            :max-height="height"
            :height="height"
            src="/images/illustrations/image-placeholder.png"
            :width="height"
            @click="handleImageButtonSelect"
          >
            <v-fade-transition>
              <v-overlay v-if="hover || loading" absolute>
                <v-progress-circular v-if="loading" indeterminate size="24" color="grey lighten-5"></v-progress-circular>
                <v-icon v-else>mdi-plus</v-icon>
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </template>
      </v-hover>
      <v-hover v-for="image in images" :key="image">
        <template #default="{ hover }">
          <v-img class="flex-grow-0 rounded-lg ma-1" :max-height="height" :height="height" :src="getImageSrc(image)" :width="height">
            <v-fade-transition>
              <v-overlay v-if="hover" absolute>
                <v-btn icon small color="red" @click="deleteImage(image)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </template>
      </v-hover>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    aspectRatio: {
      type: String,
      default: "1/1",
    },
    height: {
      type: Number,
      default: 96,
    },
    label: {
      type: String,
      default: "图片选择",
    },
    maxCount: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Array],
    },
  },
  data() {
    return {
      loading: false,
      images: [],
      imageCache: {},
      files: [],
      totalCount: 0,
      finishCount: 0,
    };
  },
  computed: {
    canUpload() {
      return this.images.length < this.maxFileCount;
    },
    finished() {
      return this.totalCount > 0 && this.totalCount === this.finishCount;
    },
    initialImages() {
      let initialImages = [];
      if (this.value) {
        initialImages = this.multiple ? this.value : [this.value];
      }
      return initialImages;
    },
    maxFileCount() {
      return this.multiple ? this.maxCount : 1;
    },
  },
  watch: {
    value(newValue) {
      if (newValue) {
        if (this.multiple) {
          this.images = newValue;
        } else {
          this.images = [newValue];
        }
      }
    },
  },
  mounted() {
    let initialImages = [];
    if (this.value) {
      initialImages = this.multiple ? this.value : [this.value];
    }
    this.images = initialImages;
  },
  methods: {
    deleteImage(image) {
      this.images = this.images.filter((item) => item !== image);
      this.$emit("input", this.multiple ? this.images : this.images[0]);
    },
    getImageSrc(image) {
      if (image.startsWith("https://") || image.startsWith("http://") || image.startsWith("/")) {
        return image;
      } else {
        return this.imageCache[image];
      }
    },
    handleImageButtonSelect() {
      if (!this.loading) {
        this.$refs.file.click();
      }
    },
    handleImageFileChange(event) {
      if (this.images.length + event.target.files.length > this.maxFileCount) {
        this.$toast.global.error(`最多上传 ${this.maxFileCount} 个文件`);
      } else {
        if (event.target.files.length) {
          this.files = event.target.files;
          this.totalCount = event.target.files.length;
          this.loading = true;
          this.uploadImage();
        }
      }
    },
    uploadImage() {
      if (!this.finished) {
        const file = this.files[this.finishCount];
        const reader = new FileReader();
        let fileData = null;
        reader.onload = (e) => {
          fileData = e.target.result;
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append("file", file);
        this.$axios
          .post("/common/files/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.images.push(res.data.key);
            this.imageCache[res.data.key] = fileData;
            this.finishCount++;
            this.uploadImage();
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        this.totalCount = 0;
        this.finishCount = 0;
        this.$emit("input", this.multiple ? this.images : this.images[0]);
      }
    },
    reset() {
      this.images = [];
      this.imageCache = {};
    },
  },
};
</script>
<style scoped>
.uploader {
  cursor: pointer;
}
</style>

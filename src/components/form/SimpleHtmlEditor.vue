<template>
  <html-editor :value="value" :disabled="disabled" :plugins="plugins" :toolbar="toolbar" @input="$emit('input', $event)" />
</template>

<script>
import HtmlEditor from "@/components/form/HtmlEditor";

export default {
  name: "SimpleHtmlEditor",
  components: { HtmlEditor },
  props: {
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: Array,
      default() {
        return [
          "advlist autolink save lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount imagetools emoticons",
        ];
      },
    },
    toolbar: {
      type: String,
      default:
        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
    },
  },
};
</script>

<style scoped></style>

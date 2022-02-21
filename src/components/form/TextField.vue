<!-- 单行文本框组件 -->
<template>
  <v-text-field
    :autofocus="autofocus"
    :clearable="clearable"
    :counter="counter"
    :dense="dense"
    :disabled="disabled"
    :error="error"
    :error-messages="errorMessages"
    :full-width="fullWidth"
    :hide-details="hideDetails"
    :hint="hint"
    :label="label"
    :loading="loading"
    :messages="message"
    :outlined="outlined"
    :persistent-hint="persistentHint"
    :prefix="prefix"
    :placeholder="placeholder"
    :readonly="readonly"
    :rules="rules"
    :success="success"
    :success-messages="successMessages"
    :suffix="suffix"
    :type="type"
    :validate-on-blur="validateOnBlur"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: "TextField",
  props: {
    value: {
      required: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    counter: {
      type: Boolean | Number | String,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: String | Array,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: true,
    },
    hint: {
      type: String,
    },
    label: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String | Array,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    persistentHint: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
    },
    success: {
      type: Boolean,
      default: false,
    },
    successMessages: {
      type: String | Array,
    },
    suffix: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    validateOnBlur: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <v-card class="text-center w-full pa-3" max-width="500px">
    <v-img :src="getErrorImage()" max-height="400" contain />
    <div class="display-2 mt-10">
      {{ is404 ? $t("error.notFound.title") : $t("error.other.title") }}
    </div>
    <div class="my-3">
      {{ is404 ? $t("error.notFound.desc") : $t("error.other.desc") }}
    </div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon small class="my-1" color="secondary">
          <v-icon small color="secondary">fa fa-info-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>{{ $t("error.notFound.title") }}</v-card-title>
        <v-card-text v-text="error.message" />
      </v-card>
    </v-dialog>
    <v-text-field solo large :placeholder="$t('error.search')"></v-text-field>
    <v-btn :to="localePath('/')" block large color="primary">
      {{ $t("error.back") }}
    </v-btn>
  </v-card>
</template>

<script>
export default {
  layout: "simple",
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: false,
      is404: this.error.statusCode === 404,
    };
  },
  methods: {
    getErrorImage() {
      return this.is404 ? "/images/illustrations/404-illustration.svg" : "/images/illustrations/500-illustration.svg";
    },
  },
};
</script>

<template>
  <v-flex grow>
    <v-card>
      <card-info icon="code" title="代码生成" subtitle="搜索实体类一键生成相关实体接口代码">
        <template #actions>
          <div class="d-flex">
            <v-autocomplete
              v-model="entity"
              dense
              outlined
              hide-details
              return-object
              item-text="name"
              :disabled="status.loading"
              :loading="status.loading"
              :items="entities"
              label="目标实体"
              placeholder="搜索目标实体类"
              @change="onEntitySelect"
            />
            <v-btn text color="primary" class="ml-1" :disabled="status.loading || !form.name" :loading="status.loading" @click="download">生成代码 </v-btn>
          </div>
        </template>
      </card-info>
      <v-divider />
      <v-data-table :headers="headers" :items="entity.fields">
        <template #item.query="{ item }">
          <v-checkbox :value="hasField('query', item.field)" dense hide-details @change="toggleField('query', item.field)" />
        </template>
        <template #item.request="{ item }">
          <v-checkbox :value="hasField('request', item.field)" dense hide-details @change="toggleField('request', item.field)" />
        </template>
        <template #item.response="{ item }">
          <v-checkbox :value="hasField('response', item.field)" dense hide-details @change="toggleField('response', item.field)" />
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
import CardInfo from "@/components/common/CardInfo";

export default {
  components: { CardInfo },
  layout: "admin",
  head() {
    return { title: "代码生成" };
  },
  data() {
    return {
      entities: [],
      entity: {
        fields: [],
      },
      status: {
        loading: false,
      },
      defaultForm: {
        name: null,
        classname: null,
        queryFields: [],
        requestFields: [],
        responseFields: [],
      },
      form: {},
      headers: [
        {
          text: "字段名称",
          value: "field",
          align: "center",
          divider: true,
        },
        {
          text: "字段描述",
          value: "name",
          align: "center",
          divider: true,
        },
        {
          text: "查询对象",
          value: "query",
          align: "center",
          divider: true,
          sortable: false,
          slot: true,
          width: 1,
        },
        {
          text: "请求对象",
          value: "request",
          align: "center",
          divider: true,
          sortable: false,
          slot: true,
          width: 1,
        },
        {
          text: "响应对象",
          value: "response",
          align: "center",
          divider: true,
          sortable: false,
          slot: true,
          width: 1,
        },
      ],
    };
  },
  mounted() {
    this.loadEntities();
  },
  methods: {
    loadEntities() {
      this.status.loading = true;
      this.$axios.get("/generator").then((res) => {
        this.entities = res.data;
        this.status.loading = false;
      });
    },
    onEntitySelect(item) {
      this.form = { ...this.defaultForm };
      this.form.name = item.name;
      this.form.classname = item.classname;
    },
    hasField(type, field) {
      let fields = this.form[type + "Fields"];
      if (fields) {
        return fields.includes(field);
      } else {
        return false;
      }
    },
    toggleField(type, field) {
      let fields = this.form[type + "Fields"];
      if (fields.includes(field)) {
        this.form[type + "Fields"] = fields.filter((it) => it !== field);
      } else {
        this.form[type + "Fields"].push(field);
      }
    },
    download() {
      this.status.loading = true;
      this.$download("/generator", this.form).then(() => {
        this.status.loading = false;
      });
    },
  },
};
</script>

<template>
  <v-flex grow>
    <entity-table show-select ref="table" api="/template" icon="paste" title="模板管理" entity-name="模板" :headers="headers">
      <template #subtitle>
        <div>管理系统中的 <b>占卜模板</b> 数据</div>
      </template>
      <template #tableActions>
        <v-btn v-permission:template:create color="primary" text @click="$refs.table.openCreateForm()">新增模板</v-btn>
      </template>
      <template #rowActions="{ item }">
        <v-btn v-permission:template:update color="primary" small text @click="$refs.table.openUpdateForm(item)">修改 </v-btn>
      </template>
      <template #batchActions="{ selected }">
        <v-btn v-permission:template:delete :disabled="!selected.length" color="red" text @click="$refs.table.openDeleteDialog(selected)"> 删除 </v-btn>
      </template>
      <template #form="{ item }">
        <v-row dense>
          <v-col cols="12">
            <text-field v-model.trim="item.name" label="模板名称" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="item.labels"
              label="模板标签"
              small-chips
              :items="options.labels"
              dense
              multiple
              outlined
              hide-details
              deletable-chips
              item-text="name"
              item-value="code"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model.trim="item.content" dense outlined hide-details label="模板内容" />
          </v-col>
        </v-row>
      </template>
    </entity-table>
  </v-flex>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import DepartmentSelect from "@/components/form/DepartmentSelect";
import FormDialog from "@/components/form/FormDialog";
import TextField from "~/components/form/TextField";

export default {
  layout: "admin",
  components: { TextField, FormDialog, EntityTable, DepartmentSelect },
  head() {
    return {
      title: "模板管理",
    };
  },
  data() {
    return {
      headers: [
        {
          text: "ID",
          value: "id",
          align: "center",
        },
        {
          text: "模板名称",
          value: "name",
          align: "center",
        },
        {
          text: "模板标签",
          value: "labels",
          align: "center",
          sortable: false,
        },
      ],
      options: {
        labels: [],
      },
    };
  },
  mounted() {
    this.$axios.get("/property/dict/label").then((res) => {
      this.options.labels = res.data.items;
    });
  },
};
</script>

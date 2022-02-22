<template>
  <div class="flex-grow-1">
    <entity-table
      ref="table"
      :api="api"
      :fetch-api="fetchApi"
      :headers="headers"
      disable-filter
      entity-name="字典项"
      icon="fa fa-cube"
      show-select
      subtitle="管理字典中的字典项信息"
      title="字典项管理"
    >
      <template #tableActions>
        <v-btn v-permission:system.dict:update color="primary" text @click="$refs.table.openCreateForm()">新增字典项</v-btn>
      </template>
      <template #rowActions="{ item }">
        <v-btn v-permission:system.dict:update color="primary" small text @click="$refs.table.openUpdateForm(item)"> 修改 </v-btn>
      </template>
      <template #batchActions="{ selected }">
        <v-btn v-permission:system.dict:update :disabled="!selected.length" color="red" text @click="$refs.table.openDeleteDialog(selected)"> 删除 </v-btn>
      </template>
      <template #form="{ item }">
        <v-row dense>
          <v-col cols="4">
            <v-text-field v-model="item.name" dense hide-details label="名称" outlined />
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="item.code" dense hide-details label="代码" outlined />
          </v-col>
          <v-col cols="4">
            <v-text-field v-model.number="item.sort" dense hide-details label="排序" outlined type="number" />
          </v-col>
        </v-row>
      </template>
    </entity-table>
  </div>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";

export default {
  layout: "admin",
  components: { EntityTable },
  asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  head() {
    return {
      title: "字典项管理",
    };
  },
  data() {
    return {
      headers: [
        {
          text: "名称",
          value: "name",
          align: "center",
        },
        {
          text: "代码",
          value: "code",
          align: "center",
        },
        {
          text: "排序",
          value: "sort",
          align: "center",
        },
      ],
    };
  },
  computed: {
    api() {
      return `/property/dict/${this.id}`;
    },
    fetchApi() {
      return `/property/dict/${this.id}/items`;
    },
  },
};
</script>

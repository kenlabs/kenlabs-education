<template>
  <div class="flex-grow-1">
    <entity-table
      ref="table"
      :filter-fields="filterFields"
      :headers="headers"
      api="/property/system"
      entity-name="系统属性"
      icon="cogs"
      multi-sort
      subtitle="管理系统全局的参数设置"
      title="系统属性"
    >
      <template v-slot:rowActions="{ item }">
        <v-btn v-if="item.editable" v-permission:system.property:update color="primary" text @click="$refs.table.openUpdateForm(item)"> 修改 </v-btn>
        <v-btn v-if="item.editable" v-permission:system.property:reset color="orange" text @click="openResetDialog(item)"> 重置 </v-btn>
        <div v-if="!item.editable" class="text-caption grey--text">只读属性无法修改</div>
      </template>
      <template #formSubtitle="{ item }">
        <div v-text="item.name" />
      </template>
      <template #form="{ item }">
        <v-row dense>
          <v-col cols="12">
            <v-text-field v-model="item.value" dense hide-details label="属性值" outlined />
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
  head() {
    return {
      title: "系统属性",
    };
  },
  data() {
    return {
      filterFields: [
        {
          name: "系统属性分类",
          desc: "系统属性分类全称",
          value: "catalog",
        },
        {
          name: "系统属性内容",
          desc: "名称或者描述的模糊查询",
          value: "content",
        },
      ],
      headers: [
        {
          text: "分类",
          value: "catalog",
          align: "center",
          sortable: false,
        },
        {
          text: "属性名称",
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: "属性描述",
          value: "description",
          align: "center",
          sortable: false,
        },
        {
          text: "属性值",
          value: "value",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    openResetDialog(property) {
      this.$refs.table.openConfirmDialog("重置属性", `确定要将属性 ${property.name} 恢复到默认值吗？`).then(() => {
        this.$axios.post(`/property/system/${property.id}/reset`).then(() => {
          this.$toast.global.success("系统属性重置成功");
          this.$refs.table.fetchItems();
        });
      });
    },
  },
};
</script>

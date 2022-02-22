<template>
  <div class="flex-grow-1">
    <entity-table
      ref="table"
      :headers="headers"
      api="/property/dict"
      disable-table-action-bar
      entity-name="系统字典"
      icon="cube"
      multi-sort
      subtitle="管理系统中的字典信息"
      title="系统字典"
    >
      <template v-slot:rowActions="{ item }">
        <v-btn v-permission:system.dict:update :to="`/property/dict/${item.id}`" color="primary" text> 字典项管理</v-btn>
        <v-btn v-permission:system.dict:reset color="orange" text @click="openResetDialog(item)"> 重置</v-btn>
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
      title: "系统字典",
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
          text: "字典项",
          value: "items.length",
          align: "center",
          sortable: false,
          divider: true,
        },
      ],
    };
  },
  methods: {
    openResetDialog(item) {
      this.$refs.table.openConfirmDialog("重置字典", `确定要将字典 ${item.name} 恢复到默认值吗？`).then(() => {
        this.$axios.post(`/property/dict/${item.id}/reset`).then(() => {
          this.$toast.global.success("系统字典重置成功");
          this.$refs.table.fetchItems();
        });
      });
    },
  },
};
</script>

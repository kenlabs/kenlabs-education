<template>
  <v-card>
    <card-info title="基本资料" subtitle="该客户的基本资料信息" />
    <v-divider />
    <list-info>
      <list-info-item v-if="client.owner" title="分配员工" :subtitle="client.owner.displayName" />
      <list-info-item title="客户昵称" :subtitle="client.nickname" />
      <list-info-item title="客户姓名" :subtitle="client.name" />
      <list-info-item title="性别" :subtitle="client.sex" />
      <list-info-item title="婚姻" :subtitle="client.marriage" />
      <list-info-item title="来源" :subtitle="client.source" />
      <list-info-item title="生日" :subtitle="client.birthday" />
      <list-info-item title="备注" :subtitle="client.remark" />
      <list-info-item title="生日详情" :subtitle="client.birthdayDetails" />
    </list-info>
  </v-card>
</template>

<script>
import CardInfo from "~/components/common/CardInfo";
import ListInfo from "~/components/common/ListInfo";
import ListInfoItem from "~/components/common/ListInfoItem";

export default {
  name: "ClientInfoCard",
  components: { ListInfoItem, ListInfo, CardInfo },
  props: {
    client: Object,
  },
};
</script>

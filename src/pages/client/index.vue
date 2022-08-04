<template>
  <v-flex grow>
    <entity-table show-select ref="table" api="/client" icon="folder-user" title="客户管理" entity-name="客户" :headers="headers">
      <template #subtitle>
        <div>管理 <b>客户</b> 数据</div>
      </template>
      <template #tableActions>
        <v-btn v-permission:client:create color="primary" text @click="$refs.table.openCreateForm()">新增客户</v-btn>
      </template>
      <template #rowActions="{ item }">
        <v-btn v-permission:client:query color="primary" small text :to="`/client/${item.id}`">详情</v-btn>
        <v-btn v-permission:client:update color="primary" small text @click="$refs.table.openUpdateForm(item)">修改 </v-btn>
        <v-btn v-permission:client:assign color="primary" small text @click="openAssignDialog(item)"> 分配员工</v-btn>
      </template>
      <template #batchActions="{ selected }">
        <v-btn v-permission:client:delete :disabled="!selected.length" color="red" text @click="$refs.table.openDeleteDialog(selected)"> 删除 </v-btn>
      </template>
      <template #form="{ item }">
        <v-row dense>
          <v-col cols="6">
            <text-field v-model.trim="item.weixinId" label="* 微信号" />
          </v-col>
          <v-col cols="6">
            <text-field v-model.trim="item.nickname" label="微信昵称" />
          </v-col>
          <v-col cols="4">
            <text-field v-model.trim="item.name" label="姓名" />
          </v-col>
          <v-col cols="4">
            <text-field v-model.trim="item.mobile" label="手机号" />
          </v-col>
          <v-col cols="4">
            <text-field v-model.trim="item.email" label="邮箱" />
          </v-col>
          <v-col cols="4">
            <v-autocomplete v-model="item.sex" label="性别" :items="options.sexes" dense outlined hide-details item-text="name" item-value="code" />
          </v-col>
          <v-col cols="4">
            <v-autocomplete v-model="item.marriage" label="婚姻" :items="options.marriages" dense outlined hide-details item-text="name" item-value="code" />
          </v-col>
          <v-col cols="4">
            <v-autocomplete v-model="item.source" label="来源" :items="options.sources" dense outlined hide-details item-text="name" item-value="code" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="item.labels"
              label="标签"
              :items="options.labels"
              multiple
              small-chips
              deletable-chips
              dense
              outlined
              hide-details
              item-text="name"
              item-value="code"
            />
          </v-col>
          <v-col cols="8">
            <text-field v-model.trim="item.remark" label="备注" />
          </v-col>
          <v-col cols="4">
            <date-picker v-model="item.birthday" label="生日" />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model.trim="item.birthdayDetails" dense outlined hide-details label="生日详情" />
          </v-col>
        </v-row>
      </template>
      <template #item.owner="{ item }">
        <div v-if="item.owner" v-text="item.owner.displayName"></div>
      </template>
    </entity-table>
    <form-dialog v-model="dialog.show" title="分配员工" subtitle="为客户分配负责的员工" @submit="assignOwner">
      <v-row>
        <v-col cols="12">
          <account-select v-model="dialog.form.account" label="选择员工" />
        </v-col>
      </v-row>
    </form-dialog>
  </v-flex>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";
import DepartmentSelect from "@/components/form/DepartmentSelect";
import FormDialog from "@/components/form/FormDialog";
import TextField from "~/components/form/TextField";
import DatePicker from "~/components/form/DatePicker";
import AccountSelect from "~/components/form/AccountSelect";

export default {
  layout: "admin",
  components: { AccountSelect, DatePicker, TextField, FormDialog, EntityTable, DepartmentSelect },
  head() {
    return {
      title: "客户管理",
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
          text: "分配员工",
          value: "owner",
          align: "center",
          sortable: false,
          slot: true,
        },
        {
          text: "客户昵称",
          value: "nickname",
          align: "center",
        },
        {
          text: "客户姓名",
          value: "name",
          align: "center",
        },
        {
          text: "性别",
          value: "sex",
          align: "center",
        },
        {
          text: "婚姻",
          value: "marriage",
          align: "center",
        },
        {
          text: "来源",
          value: "source",
          align: "center",
        },
        {
          text: "生日",
          value: "birthday",
          align: "center",
        },
        {
          text: "备注",
          value: "remark",
          align: "center",
        },
      ],
      options: {
        labels: [],
        sexes: [],
        marriages: [],
        sources: [],
        statuses: [],
      },
      dialog: {
        show: false,
        item: {},
        form: {
          account: {},
        },
      },
    };
  },
  mounted() {
    this.$axios.get("/property/dict/label").then((res) => {
      this.options.labels = res.data.items;
    });
    this.$axios.get("/property/dict/sex").then((res) => {
      this.options.sexes = res.data.items;
    });
    this.$axios.get("/property/dict/marriage").then((res) => {
      this.options.marriages = res.data.items;
    });
    this.$axios.get("/property/dict/source").then((res) => {
      this.options.sources = res.data.items;
    });
    this.$axios.get("/property/dict/status").then((res) => {
      this.options.statuses = res.data.items;
    });
  },
  methods: {
    openAssignDialog(item) {
      this.dialog.item = item;
      this.dialog.form.account = {};
      this.dialog.show = true;
    },
    assignOwner(status, form) {
      this.$axios.put(`/client/${this.dialog.item.id}/assign`, this.dialog.form).then(() => {
        status.submitting = false;
        form.reset();
        this.dialog.show = false;
        this.$toast.global.success("员工已分配");
      });
    },
  },
};
</script>

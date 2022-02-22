<!-- 系统账户管理页面 -->
<template>
  <div class="flex-grow-1 d-flex">
    <department-tree class="mr-4" @change="onDepartmentChange" />
    <div class="flex-grow-1">
      <account-table ref="accountTable" @statistic="openStatisticDialog" />
    </div>
    <v-dialog v-model="statistic.dialog" max-width="640">
      <v-card>
        <v-list-item>
          <v-list-item-icon>
            <icon color="green">chart-bar</icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>账户统计信息</v-list-item-title>
            <v-list-item-subtitle>查询系统账户相关数据统计信息</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-card-text>
          <v-row dense>
            <v-col cols="4">
              <statistic label="今日登录" :value="statistic.result.todayLoginCount" color="primary" />
            </v-col>
            <v-col cols="4">
              <statistic label="最近7天" :value="statistic.result.weekLoginCount" color="primary" />
            </v-col>
            <v-col cols="4">
              <statistic label="最近30天" :value="statistic.result.monthLoginCount" color="primary" />
            </v-col>
            <v-col cols="4">
              <statistic label="最近90天" :value="statistic.result.seasonLoginCount" color="primary" />
            </v-col>
            <v-col cols="4">
              <statistic label="最近一年" :value="statistic.result.yearLoginCount" color="primary" />
            </v-col>
            <v-col cols="4">
              <statistic label="总账户数" :value="statistic.result.totalLoginCount" color="primary" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import countTo from "vue-count-to";
import DepartmentTree from "@/components/form/DepartmentTree";
import AccountTable from "@/components/table/AccountTable";
import Icon from "@/components/common/Icon";
import Statistic from "@/components/common/Statistic";

export default {
  components: { Statistic, Icon, AccountTable, DepartmentTree, countTo },
  layout: "admin",
  head() {
    return {
      title: "账户管理",
    };
  },
  data() {
    return {
      statistic: {
        dialog: false,
        loading: false,
        result: {},
      },
    };
  },
  methods: {
    onDepartmentChange(value) {
      if (value) {
        this.$refs.accountTable.$refs.table.fetchItems({
          department: value.id,
        });
      } else {
        this.$refs.accountTable.$refs.table.fetchItems();
      }
    },
    openStatisticDialog() {
      this.statistic.loading = true;
      this.$axios.get("/accounts/statistic").then((res) => {
        this.statistic.result = res.data;
        this.statistic.loading = false;
        this.statistic.dialog = true;
      });
    },
  },
};
</script>

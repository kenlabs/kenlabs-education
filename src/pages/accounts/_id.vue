<!-- 账户详情页面 -->
<template>
  <div class="flex-grow-1">
    <v-row dense>
      <v-col cols="12" md="8">
        <v-skeleton-loader :loading="status.loading" type="card">
          <v-card>
            <card-info icon="user" title="账户详情" subtitle="查看或修改账户的基本资料">
              <template #actions>
                <div class="d-flex">
                  <v-btn v-permission:account.info:update v-if="!status.editing" text color="primary" @click="status.editing = true">
                    <icon left small>edit</icon>
                    编辑
                  </v-btn>
                  <v-btn v-permission:account.info:update v-if="status.editing" text color="grey" @click="status.editing = false">取消 </v-btn>
                  <v-btn
                    v-permission:account.info:update
                    v-if="status.editing"
                    text
                    color="primary"
                    :disabled="status.submittingAccountInfo"
                    :loading="status.submittingAccountInfo"
                    @click="submitAccountInfo"
                  >
                    保存
                  </v-btn>
                </div>
              </template>
            </card-info>
            <v-divider />
            <v-card-text>
              <v-form ref="infoForm" :disabled="!status.editing">
                <v-row dense>
                  <v-col cols="12">
                    <image-select v-model="account.avatar" label="账户头像" />
                  </v-col>
                  <v-col cols="3">
                    <text-field v-model="account.username" label="用户名" />
                  </v-col>
                  <v-col cols="3">
                    <text-field v-model="account.email" label="邮箱" />
                  </v-col>
                  <v-col cols="3">
                    <text-field v-model="account.mobile" label="手机号" />
                  </v-col>
                  <v-col cols="3">
                    <department-select v-model="account.department" label="所在部门" />
                  </v-col>
                  <v-col cols="3">
                    <text-field v-model="account.nickname" label="昵称" />
                  </v-col>
                  <v-col cols="2">
                    <text-field v-model="account.name" label="姓名" />
                  </v-col>
                  <v-col cols="2">
                    <dict-select v-model="account.sex" dict="sex" label="性别" />
                  </v-col>
                  <v-col cols="2">
                    <dict-select v-model="account.nation" dict="nation" label="民族" />
                  </v-col>
                  <v-col cols="3">
                    <date-picker v-model="account.birthday" label="生日" />
                  </v-col>
                  <v-col cols="3">
                    <text-field v-model="account.identity" label="身份证号" />
                  </v-col>
                  <v-col cols="2">
                    <dict-select v-model="account.language" dict="language" label="语言" />
                  </v-col>
                  <v-col cols="1">
                    <text-field v-model="account.country" label="国家" />
                  </v-col>
                  <v-col cols="1">
                    <text-field v-model="account.province" label="省份" />
                  </v-col>
                  <v-col cols="1">
                    <text-field v-model="account.city" label="城市" />
                  </v-col>
                  <v-col cols="4">
                    <text-field v-model="account.remark" label="备注" />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="4">
        <v-skeleton-loader :loading="status.loading" type="list-item@4">
          <v-card>
            <card-info icon="file-invoice" title="元数据" subtitle="账户相关的元数据信息" />
            <v-divider />
            <list-info>
              <list-info-item icon="memo-circle-info" title="账户ID" :subtitle="account.id" />
              <list-info-item icon="clock" title="创建时间" :subtitle="account.createAt" />
              <list-info-item icon="right-to-bracket" title="上次登录" :subtitle="account.loginAt" />
            </list-info>
          </v-card>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="status.loading" type="list-item@6" class="mt-2">
          <v-card>
            <card-info icon="lock-keyhole" title="管理员操作" subtitle="设置账户权限相关信息" />
            <v-divider />
            <list-info>
              <list-info-item v-permission:account.password:update advance-icon title="重设密码" subtitle="修改该账户的登录密码">
                <template #icon>
                  <icon color="primary">key</icon>
                </template>
                <template #actions>
                  <v-btn
                    text
                    color="orange"
                    :disabled="status.resettingAccountPassword"
                    :loading="status.resettingAccountPassword"
                    @click="openResetAccountPasswordDialog"
                    >重设密码
                  </v-btn>
                </template>
              </list-info-item>
              <list-info-item v-permission:account.role:update advance-icon title="分配角色" subtitle="账户拥有所分配角色的权限">
                <template #icon>
                  <icon :color="account.roles && account.roles.length > 0 ? 'green' : 'grey'">address-book</icon>
                </template>
                <template #actions>
                  <v-btn text color="orange" :disabled="role.loading" :loading="role.loading" @click="openAccountRoleDialog">分配角色 </v-btn>
                </template>
              </list-info-item>
              <list-info-item v-permission:account.status:update advance-icon title="禁用账户" subtitle="禁用后账户将不能登录系统">
                <template #icon>
                  <icon :color="account.enabled ? 'green' : 'grey'" :icon="account.enabled ? 'check' : 'circle-exclamation'" />
                </template>
                <template #actions>
                  <v-btn
                    v-if="account.enabled"
                    text
                    color="orange"
                    :disabled="status.submittingAccountStatus"
                    :loading="status.submittingAccountStatus"
                    @click="changeAccountStatus"
                  >
                    禁用账户
                  </v-btn>
                  <v-btn
                    v-else
                    text
                    color="green"
                    :disabled="status.submittingAccountStatus"
                    :loading="status.submittingAccountStatus"
                    @click="changeAccountStatus"
                  >
                    启用账户
                  </v-btn>
                </template>
              </list-info-item>
              <list-info-item v-permission:account.admin:update advance-icon title="设为系统管理员" subtitle="系统管理员拥有系统的所有访问权限">
                <template #icon>
                  <icon color="red">user-cog</icon>
                </template>
                <template #actions>
                  <v-btn
                    v-if="account.admin"
                    text
                    color="orange"
                    :disabled="status.submittingAccountAdmin"
                    :loading="status.submittingAccountAdmin"
                    @click="changeAccountAdmin"
                  >
                    取消管理员
                  </v-btn>
                  <v-btn v-else text color="red" :disabled="status.submittingAccountAdmin" :loading="status.submittingAccountAdmin" @click="changeAccountAdmin">
                    设为管理员
                  </v-btn>
                </template>
              </list-info-item>
              <list-info-item v-permission:account.delete:update advance-icon title="删除账户" subtitle="删除该账户和其所有相关数据">
                <template #icon>
                  <icon color="red">trash-alt</icon>
                </template>
                <template #actions>
                  <v-btn text color="red" :disabled="status.deletingAccount" :loading="status.deletingAccount" @click="openDeleteAccountDialog"
                    >删除账户
                  </v-btn>
                </template>
              </list-info-item>
            </list-info>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <form-dialog
      v-model="role.dialog"
      icon="address-book"
      title="分配角色"
      subtitle="账户会拥有所分配角色的所有权限，以及角色中最高级别的数据访问范围"
      @submit="submitAccountRoles"
    >
      <v-row dense>
        <v-col cols="4">
          <v-treeview v-model="account.roles" dense selectable hoverable item-text="name" item-key="id" :items="role.items" />
        </v-col>
        <v-divider vertical />
        <v-col cols="8">
          <v-list-item v-if="accountPermissions.length" dense>
            <v-list-item-icon>
              <icon small left color="green">circle-check</icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>共分配了 <b class="green--text" v-text="accountPermissions.length" /> 个权限 </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else dense>
            <v-list-item-icon>
              <icon small left color="grey">circle-info</icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>尚未分配任何权限</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text v-if="accountPermissions.length">
            <v-chip v-for="p in accountPermissions" small label dark color="black" :key="p" v-text="getPermissionName(p)" class="ma-1" />
          </v-card-text>
        </v-col>
      </v-row>
    </form-dialog>
    <confirm-dialog ref="confirm" />
  </div>
</template>

<script>
import DepartmentSelect from "@/components/form/DepartmentSelect";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import CardInfo from "@/components/common/CardInfo";
import Icon from "@/components/common/Icon";
import ImageSelect from "@/components/form/ImageSelect";
import TextField from "@/components/form/TextField";
import DictSelect from "@/components/form/DictSelect";
import DatePicker from "@/components/form/DatePicker";
import ListInfo from "@/components/common/ListInfo";
import ListInfoItem from "@/components/common/ListInfoItem";
import FormDialog from "@/components/form/FormDialog";

export default {
  layout: "admin",
  components: {
    FormDialog,
    ListInfoItem,
    ListInfo,
    DatePicker,
    DictSelect,
    TextField,
    ImageSelect,
    Icon,
    CardInfo,
    ConfirmDialog,
    DepartmentSelect,
  },
  asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  head() {
    return {
      title: `账户详情 - ${this.account.nickname}`,
    };
  },
  data: () => ({
    tab: 0,
    account: {},
    status: {
      loading: false,
      editing: false,
      submittingAccountInfo: false,
      submittingAccountStatus: false,
      submittingAccountAdmin: false,
      deletingAccount: false,
      resettingAccountPassword: false,
    },
    role: {
      dialog: false,
      loading: false,
      submitting: false,
      permissions: [],
      items: [],
    },
  }),
  computed: {
    accountPermissions() {
      // 根据账户角色返回账户拥有的权限
      const permissions = new Set();
      if (this.account.roles) {
        this.role.items
          .filter((role) => this.account.roles.includes(role.id))
          .map((role) => role.permissions)
          .forEach((ps) => ps.forEach((s) => permissions.add(s)));
      }
      return Array.from(permissions);
    },
    permissionList() {
      // 所有权限列表
      const permissionList = [];
      if (this.role.permissions) {
        this.parsePermissions(permissionList, this.role.permissions);
      }
      return permissionList;
    },
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    fetchAccount() {
      this.status.loading = true;
      this.$axios.get(`/accounts/${this.id}`).then((res) => {
        this.account = res.data;
        this.status.loading = false;
      });
    },
    getPermissionName(id) {
      const permission = this.permissionList.find((p) => p.id === id);
      if (permission) {
        return permission.name;
      } else {
        return "";
      }
    },
    parsePermissions(permissionList, permissions) {
      permissions.forEach((permission) => {
        permissionList.push(permission);
        this.parsePermissions(permissionList, permission.children);
      });
    },
    submitAccountInfo() {
      if (this.$refs.infoForm.validate()) {
        this.status.submittingAccountInfo = true;
        this.$axios
          .put(`/accounts/${this.id}/info`, this.account)
          .then((res) => {
            this.account = res.data;
            this.$toast.global.success("账户信息更新成功");
          })
          .finally(() => {
            this.status.submittingAccountInfo = false;
          });
      }
    },
    submitAccountRoles(status, form) {
      this.role.submitting = true;
      this.$axios
        .put(`/accounts/${this.id}/roles`, this.account.roles)
        .then((res) => {
          this.account = res.data;
          this.role.dialog = false;
          status.submitting = false;
          form.reset();
          this.$toast.global.success("账户角色分配成功");
        })
        .finally(() => {
          this.role.submitting = false;
        });
    },
    openAccountRoleDialog() {
      this.role.loading = true;
      this.$axios.get("/permissions").then((res) => {
        this.role.permissions = res.data;
        this.$axios.get("/roles").then((res) => {
          this.role.items = res.data.content;
          this.role.loading = false;
          this.role.dialog = true;
        });
      });
    },
    openResetAccountPasswordDialog() {
      this.$refs.confirm.open("重设密码", `确定要重设此账户的密码为 "123456" 吗？`).then(() => {
        this.status.resettingAccountPassword = true;
        this.$axios.put(`/accounts/${this.id}/password`, "123456", { headers: { "Content-Type": "application/json" } }).then(() => {
          this.status.resettingAccountPassword = false;
          this.$toast.global.success("账户登录密码已重设");
        });
      });
    },
    changeAccountAdmin() {
      this.status.submittingAccountAdmin = true;
      this.$axios
        .put(`/accounts/${this.id}/admin`, "" + !this.account.admin, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          this.account = res.data;
          if (this.account.admin) {
            this.$toast.global.success("账户已设为管理员身份");
          } else {
            this.$toast.global.success("账户已取消管理员身份");
          }
        })
        .finally(() => {
          this.status.submittingAccountAdmin = false;
        });
    },
    changeAccountStatus() {
      this.status.submittingAccountStatus = true;
      this.$axios
        .put(`/accounts/${this.id}/status`, "" + !this.account.enabled, { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          this.account = res.data;
          if (this.account.enabled) {
            this.$toast.global.success("账户已启用");
          } else {
            this.$toast.global.success("账户已禁用");
          }
        })
        .finally(() => {
          this.status.submittingAccountStatus = false;
        });
    },
    openDeleteAccountDialog() {
      this.$refs.confirm.open("删除账户", "删除后该账户数据将不能恢复，是否确认？").then(() => {
        this.status.deletingAccount = true;
        this.$axios
          .delete("/accounts", {
            data: [this.id],
          })
          .then(() => {
            this.$router.replace("/accounts");
          })
          .finally(() => {
            this.status.deletingAccount = false;
          });
      });
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="flex-grow-1">
    <entity-table
      ref="table"
      api="/task"
      icon="clock"
      title="计划任务管理"
      subtitle="管理和设置系统中的计划任务信息"
      :headers="headers"
      :filter-fields="filterFields"
    >
      <template #rowActions="{ item }">
        <v-btn v-permission:task:start color="primary" small text @click="startTask(item)">启动任务</v-btn>
        <v-btn v-permission:task:schedule color="primary" small text @click="openDialog(item)">设置任务</v-btn>
      </template>
      <template #item.trigger="{ item }">
        <div v-if="item.type === 'CRON'" v-text="item.cron" />
        <div v-else>{{ item.period }} {{ options.timeUnits.find((unit) => unit.value === item.timeUnit).text }} 执行一次</div>
      </template>
      <template #item.readonly="{ item }">
        <v-icon v-if="item.readonly" small color="green">fa-check</v-icon>
        <v-icon v-else small color="grey">fa-minus-circle</v-icon>
      </template>
      <template #item.triggerOnStart="{ item }">
        <v-icon v-if="item.triggerOnStart" small color="green">fa-check</v-icon>
        <v-icon v-else small color="grey">fa-minus-circle</v-icon>
      </template>
    </entity-table>
    <v-dialog v-model="dialog.show" width="640">
      <v-card>
        <v-card-title>修改计划任务执行参数</v-card-title>
        <v-card-subtitle>设置该计划任务执行的时间相关信息</v-card-subtitle>
        <v-divider />
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-radio-group v-model="dialog.item.type" row dense hide-details label="执行时间类型" class="mt-0">
                <v-radio v-for="type in options.types" :key="type.value" :label="type.text" :value="type.value" />
              </v-radio-group>
            </v-col>
            <v-col v-if="dialog.item.type === 'CRON'" cols="12">
              <v-text-field v-model="dialog.item.cron" dense outlined hide-details label="Cron 表达式" />
            </v-col>
            <v-col v-if="dialog.item.type === 'PERIODICAL'" cols="6">
              <v-text-field v-model.number="dialog.item.period" dense outlined hide-details label="间隔时间" type="number" />
            </v-col>
            <v-col v-if="dialog.item.type === 'PERIODICAL'" cols="6">
              <v-text-field v-model.number="dialog.item.initialDelay" dense outlined hide-details label="初始延迟" type="number" />
            </v-col>
            <v-col v-if="dialog.item.type === 'PERIODICAL'" cols="12">
              <v-radio-group v-model="dialog.item.timeUnit" row dense hide-details label="时间单位" class="mt-0">
                <v-radio v-for="unit in options.timeUnits" :key="unit.value" :label="unit.text" :value="unit.value" />
              </v-radio-group>
            </v-col>
            <v-col v-if="dialog.item.type === 'PERIODICAL'" cols="12">
              <v-switch
                v-model.number="dialog.item.fixedRate"
                dense
                outlined
                persistent-hint
                class="mt-0"
                label="固定比率"
                hint="执行间隔默认从上一次任务执行结束的时候开始计算，开启固定比率以后，任务会从任务开始执行的时间计算间隔"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" :disabled="dialog.saving" :loading="dialog.saving" @click="scheduleTask">提交 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EntityTable from "@/components/table/EntityTable";

export default {
  layout: "admin",
  components: { EntityTable },
  head() {
    return {
      title: "计划任务管理",
    };
  },
  data() {
    return {
      filterFields: [
        {
          name: "任务名称",
          desc: "输入任务名称模糊搜索",
          value: "name",
        },
        {
          name: "任务分类",
          desc: "输入任务分类模糊搜索",
          value: "catalog",
        },
      ],
      headers: [
        {
          text: "任务名称",
          value: "name",
          align: "center",
        },
        {
          text: "任务分类",
          value: "catalog",
          align: "center",
        },
        {
          text: "执行时间",
          value: "trigger",
          align: "center",
          sortable: false,
          slot: true,
        },
        {
          text: "只读",
          value: "readonly",
          align: "center",
          slot: true,
        },
        {
          text: "启动时加载",
          value: "triggerOnStart",
          align: "center",
          slot: true,
        },
      ],
      dialog: {
        show: false,
        saving: false,
        item: {},
      },
      options: {
        types: [
          {
            text: "定时执行",
            value: "CRON",
          },
          {
            text: "周期执行",
            value: "PERIODICAL",
          },
        ],
        timeUnits: [
          {
            text: "毫秒",
            value: "MILLISECONDS",
          },
          {
            text: "秒",
            value: "SECONDS",
          },
          {
            text: "分",
            value: "MINUTES",
          },
          {
            text: "小时",
            value: "HOURS",
          },
          {
            text: "天",
            value: "DAYS",
          },
        ],
      },
    };
  },
  methods: {
    startTask(item) {
      this.$refs.table.openConfirmDialog("启动任务", `确认要立即执行任务 ${item.name} 吗？`).then(() => {
        this.$axios.post("/task/start", { id: item.id }).then(() => {
          this.$toast.global.success(`任务 ${item.name} 成功启动`);
        });
      });
    },
    openDialog(item) {
      this.dialog.item = { ...item };
      this.dialog.show = true;
    },
    scheduleTask() {
      this.dialog.saving = true;
      this.$axios
        .post("/task/schedule", {
          ...this.dialog.item,
        })
        .then(() => {
          this.$toast.global.success("任务执行时间设置成功");
          this.$refs.table.fetchItems();
          this.dialog.saving = false;
          this.dialog.show = false;
        });
    },
  },
};
</script>

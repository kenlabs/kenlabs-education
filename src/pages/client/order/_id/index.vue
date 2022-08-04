<template>
  <v-flex grow>
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <card-info icon="briefcase" title="客户订单报告" subtitle="查看客户订单信息，根据信息匹配模板生成报告"></card-info>
        </v-card>
      </v-col>
      <v-col cols="4">
        <client-info-card :client="order.client" />
      </v-col>
      <v-col cols="8">
        <v-card>
          <card-info title="订单报告" subtitle="选择该订单匹配的模板，生成报告">
            <template #actions>
              <div class="d-flex">
                <v-autocomplete
                  v-model="report.template"
                  return-object
                  dense
                  outlined
                  hide-details
                  :items="templates.items"
                  label="订单使用模板"
                  item-text="name"
                  placeholder="请选择匹配的报告"
                />
                <v-btn text color="primary" class="ml-1" :disabled="!report.template" @click="updateOrderTemplate"> 使用该模板 </v-btn>
              </div>
            </template>
          </card-info>
          <v-divider />
          <list-info>
            <list-info-item title="使用模板" :subtitle="order.template ? order.template.name : '尚未使用任何模板'" />
            <list-info-item title="问题描述" :subtitle="order.subject" />
            <list-info-item title="问题详情" :subtitle="order.description" />
          </list-info>
          <v-divider />
          <v-card-text>
            <v-textarea
              v-model="order.report"
              label="报告内容"
              placeholder="选择模板后会自动加载模板内容，根据自己的需求修改报告复制内容即可"
              dense
              outlined
              hide-details
              :rows="15"
            />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" :disabled="!order.report || report.copying" @click="copyReport">复制报告</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-flex>
</template>

<script>
import qs from "qs";
import CardInfo from "~/components/common/CardInfo";
import ClientInfoCard from "~/components/app/ClientInfoCard";
import ListInfo from "~/components/common/ListInfo";
import ListInfoItem from "~/components/common/ListInfoItem";

export default {
  components: { ListInfoItem, ListInfo, ClientInfoCard, CardInfo },
  layout: "admin",
  asyncData(ctx) {
    const id = ctx.params.id;
    return { id };
  },
  head() {
    return {
      title: "客户订单报告",
    };
  },
  data() {
    return {
      order: { client: {} },
      templates: {
        loading: false,
        items: [],
      },
      report: {
        copying: false,
        template: null,
      },
    };
  },
  mounted() {
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      this.$axios.get(`/client/order/${this.id}`).then((res) => {
        this.order = res.data;
        this.fetchTemplates();
      });
    },
    fetchTemplates() {
      this.templates.loading = true;
      this.$axios
        .get("/template/labels", {
          params: { labels: this.order.labels },
          paramsSerializer: (params) => qs.stringify(params),
        })
        .then((res) => {
          this.templates.items = res.data;
          this.templates.loading = false;
        });
    },
    updateOrderTemplate() {
      this.order.template = this.report.template;
      this.order.report = this.report.template.content;
      this.$axios.put(`/client/order/${this.order.id}`, this.order).then((res) => {
        this.$toast.global.success("订单模板已更新");
        this.fetchOrder();
      });
    },
    copyReport() {
      const vm = this;
      vm.report.copying = true;
      this.$axios.put(`/client/order/${this.order.id}`, this.order).then(() => {
        vm.$clipboard(this.order.report).then(() => {
          vm.$toast.global.success("报告已复制到剪贴板");
          vm.report.copying = false;
        });
      });
    },
  },
};
</script>

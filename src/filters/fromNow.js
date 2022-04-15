import Vue from "vue";
import moment from "moment";

export default ({store}) => {
  Vue.filter("fromNow", (value) => {
    if (value) {
      const time = moment(value);
      let duration = moment().diff(time, "seconds");
      if (duration < 60) {
        return "刚刚";
      }
      duration = parseInt(duration / 60);
      if (duration < 60) {
        return `${duration}分钟前`;
      }
      duration = parseInt(duration / 60);
      if (duration < 24) {
        return `${duration}小时前`;
      }
      duration = parseInt(duration / 24);
      if (duration < 7) {
        if (duration === 1) {
          return "昨天";
        } else {
          return `${duration}天前`;
        }
      }
      return value;
    } else {
      return "";
    }
  });
};

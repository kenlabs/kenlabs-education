<!-- 阿里云播放器组件 -->
<template>
  <div :id="playerId" />
</template>

<script>
export default {
  name: "AliPlayer",
  props: {
    // 播放器配置
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    // 播放源
    source: String,
    // 是否为直播
    live: Boolean,
    css: {
      type: String,
      default: "https://g.alicdn.com/de/prismplayer/2.9.18/skins/default/aliplayer-min.css",
    },
    script: {
      type: String,
      default: "https://g.alicdn.com/de/prismplayer/2.9.18/aliplayer-h5-min.js",
    },
  },
  data() {
    return {
      player: null, // 播放器实例
      playerId: `player-${this._uid}`,
      config: {
        id: null,
        width: "100%",
        autoplay: true,
      },
      events: [
        /**
         * 播放器视频初始化按钮渲染完毕。
         * 播放器UI初始设置需要此事件后触发，避免UI被初始化所覆盖。
         * 播放器提供的方法需要在此事件发生后才可以调用。
         */
        "ready",
        /**
         * 视频由暂停恢复为播放时触发。
         */
        "play",
        /**
         * 视频暂停时触发。
         */
        "pause",
        /**
         * 能够开始播放音频/视频时发生，会多次触发，仅H5播放器。
         */
        "canplay",
        /**
         * 播放中，会触发多次。
         */
        "playing",
        /**
         * 当前视频播放完毕时触发。
         */
        "ended",
        /**
         * 直播流中断时触发。
         * m3u8/flv/rtmp在重试5次未成功后触发。
         * 提示上层流中断或需要重新加载视频。
         * PS：m3u8一直自动重试，不需要上层添加重试。
         */
        "liveStreamStop",
        /**
         * m3u8直播流中断后重试事件，每次断流只触发一次。
         */
        "onM3u8Retry",
        /**
         * 控制栏自动隐藏事件。
         */
        "hideBar",
        /**
         * 控制栏自动显示事件。
         */
        "showBar",
        /**
         * 数据缓冲事件。
         */
        "waiting",
        /**
         * 播放位置发生改变时触发，仅H5播放器。
         * 可通过getCurrentTime方法，得到当前播放时间。
         */
        "timeupdate",
        /**
         * 截图完成。
         */
        "snapshoted",
        /**
         * 全屏事件，仅H5支持。
         */
        "requestFullScreen",
        /**
         * 取消全屏事件，iOS下不会触发，仅H5支持。
         */
        "cancelFullScreen",
        /**
         * 错误事件。
         */
        "error",
        /**
         * 开始拖拽，参数返回拖拽点的时间。
         */
        "startSeek",
        /**
         * 完成拖拽，参数返回拖拽点的时间。
         */
        "completeSeek",
      ],
    };
  },
  watch: {
    source() {
      this.init();
    },
    options: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.init();
    });
  },
  updated() {
    this.$nextTick(function () {
      this.init();
    });
  },
  methods: {
    /**
     * 初始化脚本
     * 加载阿里云播放器SDK
     */
    init() {
      const vm = this;
      const linkId = "app_aliplayer-css";
      const scriptId = "app_aliplayer-js";
      const head = document.getElementsByTagName("head");
      let linkElement = document.getElementById(linkId);
      let scriptElement = document.getElementById(scriptId);
      if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.type = "text/css";
        linkElement.rel = "stylesheet";
        linkElement.href = this.css;
        linkElement.id = linkId;
        head[0].appendChild(linkElement);
      }
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.id = scriptId;
        scriptElement.src = this.script;
        head[0].appendChild(scriptElement);
      } else {
        vm.initPlayer();
      }

      scriptElement.addEventListener("load", function () {
        vm.initPlayer();
      });
    },
    /**
     * 初始化播放器
     * https://help.aliyun.com/document_detail/125572.html
     */
    initPlayer() {
      if (window.Aliplayer !== undefined) {
        const options = { ...this.options };

        if (options) {
          for (const key in options) {
            this.config[key] = options[key];
          }
        }

        if (this.source) {
          this.config.source = this.source;
        }
        this.config.id = this.playerId;
        this.player && this.player.dispose();
        try {
          this.player = Aliplayer(this.config);
          if (this.player) {
            for (const k in this.events) {
              const event = this.events[k];
              this.player.on(event, (e) => {
                this.$emit(event, e);
              });
            }
          }
        } catch (ignored) {}
      }
    },
  },
};
</script>

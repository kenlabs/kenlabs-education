<!-- 图标 -->
<template>
  <v-icon
    v-text="iconClass"
    :color="color"
    :dense="dense"
    :disabled="disabled"
    :large="large"
    :left="left"
    :right="right"
    :size="size"
    :small="small"
    :x-large="xLarge"
    :x-small="xSmall"
  >
    <slot />
  </v-icon>
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number | String,
    },
    small: {
      type: Boolean,
      default: false,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    xSmall: {
      type: Boolean,
      default: false,
    },

    /*
     * Font Awesome 样式参数
     * */
    solid: {
      type: Boolean,
      default: false,
    },
    regular: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    thin: {
      type: Boolean,
      default: false,
    },
    duotone: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    rotate90: {
      type: Boolean,
      default: false,
    },
    rotate180: {
      type: Boolean,
      default: false,
    },
    rotate270: {
      type: Boolean,
      default: false,
    },
    flipHorizontal: {
      type: Boolean,
      default: false,
    },
    flipVertical: {
      type: Boolean,
      default: false,
    },
    flipBoth: {
      type: Boolean,
      default: false,
    },
    beat: {
      type: Boolean,
      default: false,
    },
    fade: {
      type: Boolean,
      default: false,
    },
    beatFade: {
      type: Boolean,
      default: false,
    },
    bounce: {
      type: Boolean,
      default: false,
    },
    flip: {
      type: Boolean,
      default: false,
    },
    shake: {
      type: Boolean,
      default: false,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    pullRight: {
      type: Boolean,
      default: false,
    },
    pullLeft: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      if (this.icon) {
        return this.icon;
      } else if (this.$slots.default && this.$slots.default[0].text) {
        return this.$slots.default[0].text.trim();
      } else {
        return "icons";
      }
    },
    iconClass() {
      const segments = [];

      /*
       * 解析图标样式
       * */
      if (this.solid) {
        segments.push("fa-solid");
      } else if (this.regular) {
        segments.push("fa-regular");
      } else if (this.light) {
        segments.push("fa-light");
      } else if (this.thin) {
        segments.push("fa-thin");
      } else if (this.duotone) {
        segments.push("fa-duotone");
      }

      if (this.fullWidth) {
        segments.push("fa-fw");
      }

      /*
       * 解析旋转参数
       * */
      if (this.rotate90) {
        segments.push("fa-rotate-90");
      } else if (this.rotate180) {
        segments.push("fa-rotate-180");
      } else if (this.rotate270) {
        segments.push("fa-rotate-270");
      } else if (this.flipHorizontal) {
        segments.push("fa-flip-horizontal");
      } else if (this.flipVertical) {
        segments.push("fa-flip-vertical");
      } else if (this.flipBoth) {
        segments.push("fa-flip-both");
      }

      /*
       * 解析动画参数
       * */
      if (this.beat) {
        segments.push("fa-beat");
      } else if (this.fade) {
        segments.push("fa-fade");
      } else if (this.beatFade) {
        segments.push("fa-beat-fade");
      } else if (this.bounce) {
        segments.push("fa-bounce");
      } else if (this.flip) {
        segments.push("fa-flip");
      } else if (this.shake) {
        segments.push("fa-shake");
      } else if (this.spin) {
        segments.push("fa-spin");
      }

      if (this.border) {
        segments.push("fa-border");
      }

      if (this.pullLeft) {
        segments.push("fa-pull-left");
      } else if (this.pullRight) {
        segments.push("fa-pull-right");
      }

      /*
       * 解析图标
       * */
      if (this.iconName.startsWith("fa")) {
        segments.push(this.iconName);
      } else {
        segments.push(`fa-${this.iconName}`);
      }

      return segments.join(" ");
    },
  },
};
</script>

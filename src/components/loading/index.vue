<template>
  <transition :name="transition">
    <div class="weui-loading_toast vux-loading" v-show="show">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast" :style="{ position: position }">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">{{ text }}<slot></slot></p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'loading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: String,
    position: String,
    transition: {
      type: String,
      default: 'vux-mask'
    }
  },
  created () {
    this.show = this.value
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_toast';
@import '../../styles/weui/widget/weui-loading/weui-loading.less';

.vux-loading .weui-toast {
  z-index: 5001;
  margin-left: 0!important;
  width: 70px;
  min-height: 70px;
  height: 70px;
  background: rgba(0,0,0,.7);
}
.weui-icon_toast.weui-loading {
  margin: 16px 0 0;
  width: 40px;
  height: 40px;
  /*vertical-align: baseline;*/
  display: inline-block;
}
.vux-mask-enter, .vux-mask-leave-active {
  opacity: 0;
}
.vux-mask-leave-active, .vux-mask-enter-active {
  transition: opacity 300ms;
}
</style>

<template>
  <div>
    <x-dialog
    v-model="showValue"
    :class="showInput ? 'weui-dialog-confirm' : ''"
    :dialogClass="theme === 'android' ? 'weui-dialog weui-skin_android' : 'weui-dialog'"
    :mask-transition="maskTransition"
    :dialog-transition="theme === 'android' ? 'vux-fade' : dialogTransition"
    :hide-on-blur="hideOnBlur"
    :mask-z-index="maskZIndex"
    @on-hide="$emit('on-hide')">
      <div :for="showInput ? 'vux-prompt-msgbox': ''" class="weui-dialog__hd" v-if="!!title">
        <strong class="weui-dialog__title">{{ title }}</strong>
      </div>
      <div class="weui-dialog__bd" v-if="!showInput">
        <slot><div v-html="content"></div></slot>
      </div>
      <div v-else class="vux-prompt" @touchstart.stop.prevent="setInputFocus">
        <input class="vux-prompt-msgbox" v-bind="inputAttrs" v-model="msg" :placeholder="placeholder" ref="input" autofocus/>
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="_onCancel">{{cancelText}}</a>
        <a href="javascript:;" class="weui-dialog__btn" :class="`weui-dialog__btn_${confirmType}`" @click="_onConfirm">{{confirmText}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<i18n>
confirm_text:
  en: confirm
  zh-CN: 确定
cancel_text:
  en: cancel
  zh-CN: 取消
</i18n>

<script>
import XDialog from '../x-dialog'
export default {
  name: 'confirm',
  components: {
    XDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: false
    },
    showContent: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'ios'
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    title: String,
    confirmText: String,
    cancelText: String,
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    maskZIndex: [Number, String],
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    content: String,
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    inputAttrs: Object,
    confirmType: {
      type: String,
      default: 'primary'
    }
  },
  created () {
    this.showValue = this.show
    if (this.value) {
      this.showValue = this.value
    }
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
      if (val) {
        if (this.showInput) {
          this.msg = ''
          this.setInputFocus()
        }
        this.$emit('on-show') // emit just after msg is cleared
      }
    }
  },
  data () {
    return {
      msg: '',
      showValue: false
    }
  },
  methods: {
    setInputValue (val) {
      this.msg = val
    },
    setInputFocus () {
      this.$refs.input.focus()
    },
    _onConfirm () {
      if (!this.showValue) {
        return
      }
      if (this.closeOnConfirm) {
        this.showValue = false
      }
      this.$emit('on-confirm', this.msg)
    },
    _onCancel () {
      if (!this.showValue) {
        return
      }
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';
.weui-dialog-confirm .weui-dialog {
  position: absolute;
}
label.weui-dialog__hd {
  display: block;
}
.vux-prompt {
  padding-bottom: 1.3em;
}
.vux-prompt-msgbox::-webkit-input-placeholder {
  color: #ccc;
}
.vux-prompt-msgbox {
  width: 80%;
  border: 1px solid #dedede; /*no*/
  border-radius: 2px;
  color: #333;
  padding: 5px 5px;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  font-size: 16px;/*px*/
}
</style>

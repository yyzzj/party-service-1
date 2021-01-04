/*
 * @Author: 庞泽邦
 * @Date: 2020-10-10 13:25:41
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-21 18:46:24
 */

// 筛选弹窗
<template>
  <div>
    <van-popup
      v-model="showPopup"
      position="right"
      :style="{ height: '100%' }"
      get-container="#app"
    >
      <div class="popup_warap--container">
        <div class="popup_price--container">
          <div style="font-size:16px;font-weight:600">价格区间</div>
          <div style="margin-top:15px">
            <van-row type="flex" justify="space-between" align="center">
              <van-col span="8">
                <van-field v-model="priceLowCom" placeholder="最低价" type="digit" />
              </van-col>
              <van-col span="4">
                <div style="border:1px solid #313131;background:#313131" />
              </van-col>
              <van-col span="8">
                <van-field v-model="priceHighCom" placeholder="最高价" type="digit" />
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="popup_time--container">
          <div style="font-size:16px;font-weight:600">课时数量</div>
          <div style="margin-top:15px">
            <van-row type="flex" justify="space-between" align="center">
              <van-col span="12">
                <van-button :class="[radio==1?'btn_active':'btn_notActive']" @click="radio = radio===1?0:1 "><span :class="[radio==1?'font_active':'font_notActive']">0-4小时</span></van-button>
              </van-col>
              <van-col span="12">
                <van-button :class="[radio==2?'btn_active':'btn_notActive']" @click="radio = radio===2?0:2"><span :class="[radio==2?'font_active':'font_notActive']">4-8小时</span></van-button>
              </van-col>
            </van-row>
            <van-row type="flex" justify="space-between" align="center" style="margin-top:10px">
              <van-col span="12">
                <van-button :class="[radio==3?'btn_active':'btn_notActive']" @click="radio = radio===3?0:3"><span :class="[radio==3?'font_active':'font_notActive']">8-16小时</span></van-button>
              </van-col>
              <van-col span="12">
                <van-button :class="[radio==4?'btn_active':'btn_notActive']" @click="radio = radio===4?0:4"><span :class="[radio==4?'font_active':'font_notActive']">16小时以上</span></van-button>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="popup_button--container">
          <button class="popup_button--reset" @click="del">取消</button>
          <button class="popup_button--confirm" @click="comfirm">确定</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { Popup, Col, Row, Button, Field } from 'vant'
Vue.use(Popup)
  .use(Col)
  .use(Row)
  .use(Button)
  .use(Field)
export default {
  name: 'SelectPopup',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    priceLow: {
      type: String,
      default: ''
    },
    priceHigh: {
      type: String,
      default: ''
    },
    courseTimeType: {
      type: Number,
      default: 5
    },
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      radio: 0
    }
  },
  computed: {
    showPopup: {
      get() {
        if (this.show === true) this.$emit('update:isConfirm', false)
        return this.show
      },
      set(val) {
        this.$emit('change', val)
      }
    },
    priceLowCom: {
      get() {
        return this.priceLow
      },
      set(val) {
        this.$emit('update:priceLow', val)
      }
    },
    priceHighCom: {
      get() {
        return this.priceHigh
      },
      set(val) {
        this.$emit('update:priceHigh', val)
      }
    }
  },
  watch: {
    radio() {
      this.$emit('update:courseTimeType', this.radio)
    }
  },
  methods: {
    del() {
      // 还原数据初始化
      this.$emit('update:priceHigh', '')
      this.$emit('update:priceLow', '')
      this.radio = 0
      this.showPopup = false
    },
    comfirm() {
      this.showPopup = false
      this.$emit('update:isConfirm', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.select_warp {
  &--container {
    min-height: 100vh;
    background: rgb(244, 246, 245);
  }
}
.popup_warap--container{
  max-width: 70vw;
}
.popup_price {
  &--container {
    padding-left: 6%;
    padding-right: 6%;
    margin-top: 3%;
  }
}
.popup_button {
  &--container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 265px;
  }
  &--reset {
    width: 128px;
    height: 48px;
    background: #f6f6f6;
    border-radius: 24px 0 0 24px;
    border: none;
    color: black;
  }
  &--confirm {
    width: 128px;
    height: 48px;
    background: #a12831;
    border-radius: 0 24px 24px 0;
    border: none;
    color: white;
  }
}
.popup_price {
  &--container {
    padding-left: 6%;
    padding-right: 6%;
    margin-top: 3%;
  }
}
.popup_time {
  &--container {
    padding-left: 6%;
    padding-right: 6%;
    margin-top: 52px;
  }
}
.van-cell {
  background: #efefef;
}
.btn_active{
  width:100px;
  background:#FFEDBC;
  color:#FF7113
}
.btn_notActive{
  width:100px;
  background:#EFEFEF
}
.font_active{
color: #FF7113 ;
font-size: 12px;
}
.font_notActive{
color: #989898;
font-size: 12px;
}
</style>

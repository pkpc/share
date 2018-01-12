<template>
  <div class="container">
    <!--分享页的显示部分-->
    <div v-if="true" class="cell-share-box">
      <!--主体部分-->
      <scroller>
        <div class="cell-share-main flex-col-between">
          <!--主体的头部-->
          <div class="share-header flex-col-start">
            <img v-if="workLevel === 0" class="img-background-rank" src="../../assets/images/attendanch-0.png">
            <img v-if="workLevel === 1" class="img-background-rank" src="../../assets/images/attendanch-1.png">
            <img v-if="workLevel === 2" class="img-background-rank" src="../../assets/images/attendanch-2.png">
            <img v-if="workLevel === 3" class="img-background-rank" src="../../assets/images/attendanch-3.png">

            <div v-if="selectedValue===0" class="cell-share-tip">
              <p class="cell-small-sp">您当前的考勤时长已打败了</p>
              <div class="cell-z-index flex-row-center">
                <p class="cell-max-per" :style="{color:themeColor}">{{beatPercent}}%</p><p class="cell-small-sp">的同事</p>
              </div>
            </div>
            <div v-if="selectedValue===1" class="cell-share-tip">
              <p class="cell-small-sp">您当前的考勤时长位于</p>
              <div class="cell-z-index flex-row-center">
                <div class="cell-max-title">全公司第<span :style="{color:themeColor}">{{rank}}</span>名</div>
              </div>
            </div>
          </div>
          <!--主体的用户信息部分-->
          <div class="share-body flex-col-center">
            <div class="cell-body-header-image" :class="[workLevel===0?'king-header':'']" :style="{borderColor:themeColor,borderWidth:1+'px',borderStyle:'solid'}">
              <img v-show="dataLoading" class="img-photo" :src="imgUrl">
            </div>
            <p class="cell-body-name">{{name}}</p>
            <ul class="cell-body-info flex-col-left">
              <li class="flex-row-start">
                <div class="cell-info-item">工作时长</div>
                <div><span class="li-item" :style="{color:themeColor}">{{workTime}}</span> 小时</div>
              </li>
              <li class="flex-row-start">
                <div class="cell-info-item">加班次数</div>
                <div><span class="li-item"  :style="{color:themeColor}">{{overCount}}</span> 次</div>
              </li>
              <li class="flex-row-start">
                <div class="cell-info-item">加班时长</div>
                <div><span class="li-item"  :style="{color:themeColor}">{{overTime}}</span> 小时</div>
              </li>
            </ul>
          </div>
          <!--主体的最下部分-->
          <div class="share-footer">
            <div class="flex-row-between">
              <div class="flex-col-left">
                <img class="img-min-logo" src="../../assets/images/icon-share-min-logo.png">
              </div>
              <img class="img-code" src="../../assets/images/icon-code.png">
            </div>
          </div>
          <!--光环的遮罩层-->
          <img v-if="true" src="../../assets/images/icon-mask-min.png" class="img-share-mask"/>
        </div>
      </scroller>
      <!--底部的选择器-->
      <p-share :shareType="shareType"
               :selectedValue="selectedValue"
               :workLevel="workLevel"
               @share-type="shareGrade"
               @switch-selected="switchSelected"></p-share>
    </div>
    <!--打印照片的模板-->
    <div id="content" class="cell-max-main flex-col-between">
      <div class="cell-box-header flex-col-start">
        <!--主体的头部-->
        <div class="share-header flex-col-start">
          <img v-if="workLevel === 0" class="img-background-rank" src="../../assets/images/bk-max-0.png">
          <img v-if="workLevel === 1" class="img-background-rank" src="../../assets/images/bk-max-1.png">
          <img v-if="workLevel === 2" class="img-background-rank" src="../../assets/images/bk-max-2.png">
          <img v-if="workLevel === 3" class="img-background-rank" src="../../assets/images/bk-max-3.png">
          <div v-if="selectedValue===0" class="cell-share-tip">
            <p class="cell-small-sp">您当前的考勤时长已打败了</p>
            <div class="cell-z-index flex-row-center">
              <p class="cell-max-per" :style="{color:themeColor}">{{beatPercent}}%</p><p class="cell-small-sp">的同事</p>
            </div>
          </div>
          <div v-if="selectedValue===1" class="cell-share-tip">
            <p class="cell-small-sp">您当前的考勤时长位于</p>
            <div class="cell-z-index flex-row-center">
              <div class="cell-max-title">全公司第<span :style="{color:themeColor}">{{rank}}</span>名</div>
            </div>
          </div>
        </div>
        <!--主体的用户信息部分-->
        <div class="share-body flex-col-center">
          <div class="cell-body-header-image" :class="[workLevel===0?'king-header':'']" :style="{borderColor:themeColor,borderWidth:2+'px',borderStyle:'solid'}">
          <!--<div class="cell-body-header-image flex-row-center" :class="[workLevel===0?'king-header':'','img-circle-'+workLevel]">-->
            <img class="img-photo" :src="imgUrl">
          </div>
          <p class="cell-body-name">{{name}}</p>
          <ul class="cell-body-info flex-col-left">
            <li class="flex-row-start">
              <div class="cell-info-item">工作时长</div>
              <div class="item-width"><span class="li-item" :style="{color:themeColor}">{{workTime}}</span> 小时</div>
            </li>
            <li class="flex-row-start">
              <div class="cell-info-item">加班次数</div>
              <div class="item-width"><span class="li-item"  :style="{color:themeColor}">{{overCount}}</span> 次</div>
            </li>
            <li class="flex-row-start">
              <div class="cell-info-item">加班时长</div>
              <div class="item-width"><span class="li-item"  :style="{color:themeColor}">{{overTime}}</span> 小时</div>
            </li>
          </ul>
        </div>
      </div>

      <!--主体的最下部分-->
      <div class="share-footer">
        <div class="flex-row-between">
          <div class="flex-col-left">
            <img class="img-max-logo" src="../../assets/images/icon-share-max-logo.png">
          </div>
          <img class="img-code" src="../../assets/images/icon-max-code.png">
        </div>
      </div>
      <!--光环的遮罩层-->
      <img v-if="true" src="../../assets/images/icon-mask-big.png" class="img-share-mask"/>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import PShare from '../../components/p-share/index.vue'
  import TransferDom from '../../directives/transfer-dom/index'
  import VueScroller from '../../components/vue-scroller/index'
  import api from '../../vuex/api'
  Vue.use(VueScroller)
  export default {
    components:{
      PShare
    },
    directives: {
      TransferDom
    },
    data(){
      return{
        dataLoading:false,
        imgUrl:'',
        name:'',
        beatPercent: 9,    // 打败人数百分比
        overCount: 0,        // 加班次数
        overTime: 0,        // 加班时长
        rank: 103,        // 工作时长排名
        workTime: 0,        // 工作时长
        shareDirection:0,           //分享方向，0:微信，1：朋友圈，2：QQ :3：微博
        selectedValue:0,            //0为选择百分比，1为排名
        workLevel:4,                //目前分为4个等级，0为最高等级
        themeColor:'',              //主体颜色，
        shareType:0,                //0为选择百分比和排名，1为分享到微信页
      }
    },
    created(){
      let self = this;
      axios.all([api.getShareData(), api.fetchProfile()])
        .then(axios.spread((shareRes, profileRes) =>{
            if(shareRes.data.respCode === '000'){
              console.log(shareRes.data.item)
              self.beatPercent = shareRes.data.item.beatPercent;
              self.overCount = shareRes.data.item.overCount;
              self.overTime = shareRes.data.item.overTime;
              self.rank = shareRes.data.item.rank;
              self.workTime = shareRes.data.item.workTime;
            }
            console.log(profileRes)
            self.name = profileRes.data.name;
            self.imgUrl = 'https://www.erplus.co/uploads/avatars'+profileRes.data.imageName;
            self.dataLoading = true;

            //根据百分比排名判断工作等级
            if(self.beatPercent >=96 && self.beatPercent <=100){
              self.workLevel = 0;
            }else if(self.beatPercent >=86 && self.beatPercent <=95){
              self.workLevel = 1;
            }else if(self.beatPercent >=70 && self.beatPercent <=85){
              self.workLevel = 2;
            }else {
              self.workLevel = 3;
            }
            //设置主题颜色
            self.setTheme();
          }));
    },
    methods:{
      setTheme(){
        if(this.workLevel === 0){
          this.themeColor = '#E8C57B';
        }else if(this.workLevel === 1){
          this.themeColor = '#549CEB';
        }else if(this.workLevel === 2){
          this.themeColor = '#30E6BD';
        }else if(this.workLevel === 3){
          this.themeColor = '#DDFFF7';
        }
      },
      shareGrade(value){
        this.shareType = value;
      },
      switchSelected(value){
        this.selectedValue = value
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../styles/publish";
  .container{
    position: relative;
  }
  .cell-scroll{
    height:489px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .container {
    height: 100%;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    /*-webkit-transform: translateZ(0px);*/
    -webkit-backface-visibility: hidden; /*元素旋转时隐藏背面*/
    -webkit-transform-style: preserve-3d; /*保留3D空间*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  }
  .img-share{
    width:100%;
    height:100%;
  }
  .cell-share-box{
    width:100%;
    height:100%;
    background-color: #EAEFF5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 99;
    .cell-share-main{
      position: relative;
      min-width: 275px;
      height:480px;
      background-color: #172635;
      margin:11px 50px 11px 50px;
      font-family: PingFangSC-Regular;
      .img-share-mask{
        position: absolute;
        /*top:;*/
        width:100%;
        height:115px;
        top:190px;
      }
      .share-header{
        width:100%;
        height:250px;
        position: relative;
        background: url("../../assets/images/icon-background.png");
        background-size: contain;
        .cell-share-tip{
          position: absolute;
          bottom:5px;
          z-index: 999;
          .cell-max-title{
            font-size: 26px;
            color: #FFFFFF;
            span{
              color: #E8C57B;
            }
          }
        }
        .img-background-rank{
          width: 213px;
          height:213px;
          /*margin-bottom:14px;*/
        }
        .cell-z-index{
          width:200px;
          min-height:30px;
          z-index: 99;
        }
        .cell-max-per{
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #E8C57B;
          margin-right: 7px;
        }
        .cell-small-sp{
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #FFFFFF;
        }
      }
      .share-body{
        width:100%;
        /*height:150px;*/
        .king-header{
          position: relative;
        }
        .king-header:before{
          content: '';
          position: absolute;
          top:-14px;
          left:27px;
          width:35px;
          height:31px;
          background: url("../../assets/images/icon-king.png") no-repeat;
          background-size: contain;
          z-index: 999;
        }

        .cell-body-header-image{
          width:52px;
          height: 52px;
          padding:5px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          z-index: 999;
          /*border: 1px solid #E8C57B;!*no*!*/
          /*background: url("../../assets/images/glod-circle.png") no-repeat;*/
          /*background-size: contain;*/
          /*background-repeat: ;*/
          .img-photo{
            display: block;
            width:100%;
            height:100%;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
          }
        }
        .cell-body-name{
          min-width: 50px;
          margin-top: 3px;
          font-size: 10px;
          color: #FFFFFF;
        }
        .cell-body-info{
          margin-top: 14px;
          color: #FFFFFF;
          li{
            font-size: 10px;
            .li-item{
              font-size: 13px;
            }
          }
          .cell-info-item{
            margin-right: 12px;
            font-size: 10px;
            display: flex;
            justify-content: flex-end;
          }
          .li:first-child{
            margin-right: 12px;
          }
        }
      }
      .share-footer{
        width:100%;
        height: 46px;
        padding:8px 21px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .img-min-logo{
          width:104px;
          height:26px;
        }
        .img-logo{

          width:79.7px;
          height:12.3px;
        }
        .cell-footer-di{
          position: relative;
          width:200px;
          height:13px;
          .cell-footer-sp{
            font-family: PingFangSC-Regular;
            font-size: 10px;
            color: #FFFFFF;
            /*-webkit-text-size-adjust:none;*/
            -webkit-transform:scale(0.8);
            position: absolute;
            top: 0;
            left: -17px;
          }
        }

        .img-code{
          width:26px;
          height:26px;
        }
      }
    }
    .cell-share-footer{
      width:100%;
      height:154px;
      position: fixed;
      bottom:0;
      left:0;
      background-color: #FFFFFF;
      .share-selected-item{
        width:100%;
        height:109px;
        .mask-selected{
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width:96px;
          height:67px;
          background-color: rgba(74, 144, 226, 0.5);
          img{
            width:28px;
            height:28px;

          }
        }
        .per-sp{
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin:auto;
          display: flex;
          justify-content:center;
          align-items: center;
          font-size: 25px;
          color: #FFFFFF;
        }

        .ml-100{
          margin-left: 100px;
        }
        .share-sp{
          margin-top:8px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #172734;
        }
        .img-share-icon{
          width:31px;
          height:31px;
        }
        .ml-33{
          margin-left: 33px;
        }
        .per-item-0{
          position: relative;
          width:96px;
          height:67px;
          background: url("../../assets/images/rank-0.png") no-repeat;
          background-size: contain;
        }
        .per-item-1{
          position: relative;
          width:96px;
          height:67px;
          background: url("../../assets/images/rank-1.png") no-repeat;
          background-size: contain;
        }
        .per-item-2{
          position: relative;
          width:96px;
          height:67px;
          background: url("../../assets/images/rank-2.png") no-repeat;
          background-size: contain;
        }
        .per-item-3{
          position: relative;
          width:96px;
          height:67px;
          background: url("../../assets/images/rank-3.png") no-repeat;
          background-size: contain;
        }
        /*.rank-item{*/
          /*position: relative;*/
          /*width:96px;*/
          /*height:67px;*/
          /*margin-left: 33px;*/
        /*}*/
      }
      .share-option-item{
        display: flex;
        flex-flow: row;
        width:100%;
        height:44px;
        border-top:1px solid #efefef;/*no*/
        font-size: 17px;
        .all-item{
          width:100%;
          display: flex;
          align-items: center;
          justify-content:center;
          font-size: 17px;
          color: #162734;
          letter-spacing: -0.41px;
        }
        .left-item{
          width:50%;
        }
        .right-item{
          border-left:1px solid #efefef;/*no*/
          width:50%;
          .img-share-item{
            width:15px;
            height:15px;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .cell-max-main{
    position: absolute;
    width: 100%;
    height:100%;
    background-color: #172635;
    z-index: 1;
    font-family: PingFangSC-Regular;
    .img-share-mask{
      position: absolute;
      /*top:;*/
      width:100%;
      height:233px;
      top:213px;
    }
    .cell-box-header{
      width:100%;
      height:auto;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    .share-header{
      width:100%;
      height:340px;
      position: relative;
      background: url("../../assets/images/icon-background.png") no-repeat;
      background-size: cover;
      .cell-share-tip{
        position: absolute;
        bottom:15px;
        z-index: 999;
        .cell-max-title{
          width:400px;
          font-size: 26px;
          color: #FFFFFF;
          span{
            color: #E8C57B;
          }
        }
      }
      .img-background-rank{
        width: 295px;
        height:279px;
        /*margin-bottom:14px;*/
      }
      .cell-z-index{
        width:200px;
        min-height:30px;
        z-index: 99;
      }
      .cell-max-per{
        font-family: PingFangSC-Regular;
        font-size: 34px;
        color: #E8C57B;
        margin-right: 7px;
      }
      .cell-small-sp{
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #FFFFFF;
      }
    }
    .share-body{
      width:100%;
      margin-top: 10px;
      /*height:150px;*/
      .king-header{
        position: relative;
      }
      .king-header:before{
        content: '';
        position: absolute;
        top:-20px;
        left:34px;
        width:48px;
        height:43px;
        background: url("../../assets/images/max-king.png") no-repeat;
        background-size: contain;
        z-index: 999;
      }
      .img-circle-0{
        width: 72px;
        height:72px;
        background: url("../../assets/images/glod-circle.png") no-repeat;
        background-size: contain;
      }
      .img-circle-1{
        width:72px;
        height:72px;
        background: url("../../assets/images/blue-circle.png") no-repeat;
        background-size: cover;
      }
      .img-circle-2{
        width:72px;
        height:72px;
        background: url("../../assets/images/green-circle.png") no-repeat;
        background-size: cover;
      }
      .img-circle-3{
        width:72px;
        height:72px;
        background: url("../../assets/images/grey-circle.png") no-repeat;
        background-size: cover;
      }
      .cell-body-header-image{
        /*position: relative;*/
        width:72px;
        height: 72px;
        padding:5px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 999;
        /*border: 1px solid #E8C57B;!*no*!*/
        /*background: url("../../assets/images/glod-circle.png") no-repeat;*/
        /*background-size: contain;*/
        /*background-repeat: ;*/
        .img-photo{
          /*position: absolute;*/
          /*margin:5px;*/
          display: block;
          /*top:0;*/
          /*right: 0;*/
          /*left:0;*/
          /*bottom: 0;*/
          /*margin: auto;*/
          width:100%;
          height:100%;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          border-radius: 50px;
        }
      }
      .cell-body-name{
        min-width: 70px;
        font-size: 14px;
        color: #FFFFFF;
        margin-top: 3px;
      }
      .cell-body-info{
        margin-top: 14px;
        color: #FFFFFF;
        li{
          white-space: nowrap;
          font-size: 14px;
          .li-item{
            font-size: 18px;
          }
        }
        .item-width{
          width:80px;
          display: flex;
          align-items: center;
        }
        .cell-info-item{
          width:65px;
          margin-right: 17px;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .share-footer{
      width:100%;
      height: 56px;
      padding:10px 26px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .img-max-logo{
        width:144px;
        height:34px;
      }
      .img-logo{
        width:111px;
        height:16px;
      }
      .cell-footer-di{
        position: relative;
        width:200px;
        height:15px;
        .cell-footer-sp{
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #FFFFFF;
          /*-webkit-text-size-adjust:none;*/
          -webkit-transform:scale(0.8);
          position: absolute;
          top: 5px;
          left: -17px;
        }
      }
      /*.cell-footer-sp{*/
        /*font-family: PingFangSC-Regular;*/
        /*font-size: 12px;*/
        /*color: #FFFFFF;*/
        /*!*-webkit-text-size-adjust:none;*!*/
        /*-webkit-transform:scale(0.8)*/
      /*}*/
      .img-code{
        width:36px;
        height:36px;
      }
    }
  }
</style>

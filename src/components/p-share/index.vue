<template>
  <!--底部的选择器-->
  <div class="cell-share-footer">

    <div v-if="shareTypeChild === 0" class="flex-col-between">
      <!--百分比和排名的选项-->
      <div class="share-selected-item flex-row-center">
        <div class="flex-row-center">
          <div @click="switchSelected(0)" :class="'per-item-'+workLevel">
            <div v-show="selectedValueChild === 0" class="mask-selected">
              <img src="../../assets/images/icon-selected.png">
            </div>
            <!--<img class="img-share" src="../../assets/images/rank-0.png"/>-->
            <div class="per-sp">百分比</div>
          </div>
          <div @click="switchSelected(1)" :class="'per-item-'+workLevel" class="ml-33">
            <div v-show="selectedValueChild === 1" class="mask-selected">
              <img src="../../assets/images/icon-selected.png">
            </div>
            <!--<img class="img-share" src="../../assets/images/rank-0.png"/>-->
            <p class="per-sp">排名</p>
          </div>
        </div>
      </div>
      <!--分享栏开关-->
      <div class="share-option-item">
        <div @click="goToApp('GO_BACK_TO_APP','','')" class="left-item flex-row-center">取消</div>
        <div @click="shareGrade" class="right-item flex-row-center">
          <img class="img-share-item" src="../../assets/images/icon-share.png"/>
          分享
        </div>
      </div>
    </div>
    <div v-if="shareTypeChild === 1" class="flex-col-between">
      <!--预分享项目-->
      <div class="share-selected-item flex-row-center">
        <div @click="switchImage(0)" class="flex-col-between ">
          <img class="img-share-icon" src="../../assets/images/wechat.png">
          <p class="share-sp">微信</p>
        </div>
        <div @click="switchImage(1)" class="flex-col-between ml-100">
          <img class="img-share-icon" src="../../assets/images/wechat-cricle.png">
          <p class="share-sp">朋友圈</p>
        </div>
        <!--<div @click="switchImage(2)" class="flex-col-between">-->
        <!--<img class="img-share-icon" src="../../assets/images/QQ.png">-->
        <!--<p class="share-sp">QQ</p>-->
        <!--</div>-->
        <!--<div @click="switchImage(3)" class="flex-col-between">-->
        <!--<img class="img-share-icon" src="../../assets/images/sina.png">-->
        <!--<p class="share-sp">微博</p>-->
        <!--</div>-->
      </div>
      <!--分享栏开关-->
      <div class="share-option-item">
        <div @click="onCancel" class="all-item">返回</div>
      </div>
    </div>


  </div>
</template>
<script>
  import domtoimage from 'dom-to-image';
  export default {
    props:{
      shareType:{
        type:Number,
        default:0
      },
      selectedValue:{
        type:Number,
        default:0
      },
      workLevel:{
        type:Number,
        default:0
      },
    },
    created(){
      this.shareTypeChild = this.shareType;
      this.selectedValueChild = this.selectedValue;
    },
    data(){
      return {
        selectedValueChild:0,           //0为选择百分比，1为排名
        shareTypeChild:0                //0为选择百分比和排名，1为分享到微信页
//        selectedValue:0,
      }
    },
    methods:{
      shareGrade(){
        this.shareTypeChild = 1;
        this.$emit('share-type', 1)
      },
      onCancel(){
        this.shareTypeChild = 0;
        this.$emit('share-type', 0)
      },
      switchImage(index){
        let self = this;
        // 获取dom结构
        this.shareDirection = index;
        // 显示
        this.$vux.loading.show({
          text: ''
        })
        let card_target = document.getElementById("content");
        domtoimage.toPng(card_target).then(function(dataUrl) {
          //dataUrl 为base64格式
          //上传图片
          self.fileUploadChange(dataUrl)
        })
      },
      fileUploadChange (files) {
        const self = this
        let formdata = new FormData();
        let type;
        try {
          type= files.match(/:(.*?);/)[1].split('/')[1];
        }catch (e) {
          // 隐藏
          self.$vux.loading.hide();
          self.showToast('分享失败','auto');
        }

        formdata.append('file[]', self.dataURLtoBlob(files), Math.random()+'.'+type);
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'https://www.erplus.co/upload/uploadAttachment');

        xhr.onload = function () {
          if (xhr.status === 200) {
            // 上传成功
            console.log('上传成功');
            var res = JSON.parse(xhr.response);
            if (res.respCode === '000') {
              res.item.forEach(function (obj,index) {
                var uploadImgSrc = ''
                if(res.item[0].indexOf('/') === -1){
                  var uploadImgArr = res.item[index].split('.')
                  var uploadImgFrontArr = uploadImgArr[0].split('-')
                  uploadImgFrontArr.forEach(function (src) {
                    uploadImgSrc += '/' + self.hexToDecimal(src)
                  })
                  uploadImgSrc += '.' + uploadImgArr[1];
                }else{
                  uploadImgSrc = obj
                }
                let imageUrl = 'https://www.erplus.co/image' + uploadImgSrc;
                self.goToApp('SHARE_ATTENDANCE_INFO',self.shareDirection, imageUrl);
                // 隐藏
                self.$vux.loading.hide()
              })
            }
          } else {
            // 处理其他情况
          }
        }

        xhr.onerror = function () {
          // 处理错误
        };

        xhr.upload.onprogress = function (e) {
          // 上传进度
//            var percentComplete = ((e.loaded / e.total) || 0) * 100;
//          self.uploadCount = parseInt(((e.loaded / e.total) || 0) * 100) + '%'
        }
        // 触发上传
        xhr.send(formdata);
        /* ==================================================== */

//        event.target.value = '' /*清空文件值*/
      },
      //**dataURL to blob**
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      switchSelected(value){
        this.selectedValueChild = value;
        this.$emit('switch-selected', value);
      },
      goToApp(target, direction, imageUrl){
        console.log({
          "target":target,
          "share":direction,//0:微信，1：朋友圈，2：QQ :3：微博
          "imageUrl":imageUrl
        })
        this.postMsgToApp({
          "target":target,
          "share":direction,//0:微信，1：朋友圈，2：QQ :3：微博
          "imageUrl":imageUrl
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../../styles/publish";
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
</style>

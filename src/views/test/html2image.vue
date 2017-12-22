<!--<template>-->
  <!--<div>-->
    <!--<div id="content" ref="copyCardArea" style="width:188px;height:300px;border:1px solid #22b4f6;float:left;text-align:center;">-->
      <!--<p><img width="50" height="50" src="../../assets/images/bk-0.png" alt="头像"></p>-->
      <!--<p>昵称：richer</p>-->
      <!--<p>专业：前端 + 后端</p>-->
      <!--<p>语言：html、php、mysql</p>-->
      <!--<p>脚本：javascript</p>-->
      <!--<p><input type="text" class="tx" placeholder="微信公众号开发"></p>-->
      <!--<p><input type="button" class="bt" value="网站微站开发"></p>-->
    <!--</div>-->
    <!--<div style="width:60px;height:302px;float:left;text-align:center;line-height:302px;font-size:30px;color:#22b4f6;">==></div>-->
    <!--<div id="images" style="width:190px;height:302px;float:left;text-align:center;line-height:302px">图片预览区</div>-->
    <!--<button @click="switchImage" id="btnSave">转成图片</button><button id="Download">下载图片</button>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import canvas2image from './canvas2image'-->
  <!--import html2canvas from './html2canvas.min'-->
  <!--import domtoimage from 'dom-to-image';-->
  <!--export default {-->
    <!--methods:{-->
      <!--switchImage(){-->
        <!--let self = this;-->
        <!--// 获取dom结构-->
        <!--let card_target = document.getElementById("content");-->
        <!--domtoimage.toPng(card_target).then(function(dataUrl) {-->
          <!--console.log(dataUrl)-->
          <!--var img = new Image();-->
          <!--img.src = dataUrl;-->
          <!--document.body.appendChild(img);-->
        <!--})-->
      <!--},-->
      <!--toImage(){-->
        <!--let content = document.getElementById("content");-->
        <!--console.log(content)-->
        <!--html2canvas(content,{-->
          <!--onrendered: function(canvas) {-->
            <!--document.body.appendChild(canvas);-->
            <!--convertCanvasToImage(canvas);-->
          <!--}-->
        <!--})-->
<!--//        html2canvas(content, {-->
<!--//          onrendered: function(canvas) {-->
<!--//            //添加属性-->
<!--//            canvas.setAttribute('id','thecanvas');-->
<!--//            //读取属性值-->
<!--//            // var value= canvas.getAttribute('id');-->
<!--//            document.getElementById('images').innerHTML = '';-->
<!--//            document.getElementById('images').appendChild(canvas);-->
<!--//          }-->
<!--//        });-->
        <!--function convertCanvasToImage(canvas) {-->
          <!--var image = new Image();-->
          <!--image.src = canvas.toDataURL("image/png");-->
          <!--document.body.appendChild(image);-->
          <!--return image;-->
        <!--}-->

      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style>-->
  <!--p{-->
    <!--font-size: 15px;-->
    <!--font-family: 'Microsoft YaHei', 'Lantinghei SC', 'Open Sans', Arial, 'Hiragino Sans GB', 'STHeiti', 'WenQuanYi Micro Hei', 'SimSun', sans-serif;-->
  <!--}-->
  <!--#content{-->
    <!--border-radius: 3px;-->
  <!--}-->
  <!--#btnSave,#Download{-->
    <!--position: absolute;-->
    <!--left: 65px;-->
    <!--top: 320px;-->
    <!--width: 78px;-->
    <!--height: 30px;-->
    <!--background-color: #22b4f6;-->
    <!--color: #fff;-->
    <!--text-align: center;-->
    <!--border-radius: 3px;-->
    <!--border: none;-->
  <!--}-->
  <!--#Download{-->
    <!--margin-left: 250px;-->
  <!--}-->
  <!--.tx,.bt{-->
    <!--border: 1px solid #999;-->
    <!--width: 100px;-->
    <!--height: 20px;-->
    <!--border-radius: 3px;-->
  <!--}-->
  <!--.bt{-->
    <!--background-color: #22b4f6;-->
    <!--color: #fff;-->
    <!--text-align: center;-->
    <!--border: none;-->
  <!--}-->
<!--</style>-->

<template>
  <div id="max">
    <div class="prism-player" id="player-con"></div>
    <div  id="transcribe">
      <span>&#160; &#160;&#160;录制监控</span>
      <div id="el-button">
      <el-row>
      <el-button type="primary" @click="open">立即录制</el-button>
      </el-row>
      </div>
      <!--<form action="" method="POST">
        <input type="button" value="立即录制" id="button">
      </form>-->
    </div>
    <div  id="preserve">
      <span>查看监控录像</span>
      <div id="el-button">
      <el-row>
        <a href="#/example/video">

      <el-button type="primary">立即查看</el-button>
        </a>
      </el-row>
      </div>
      <!--<form action="" method="POST">
        <input type="button" value="立即查看" id="button">
        </form>-->
    </div>
  </div>
  </template>
<script>
  export default {
    data() {
      return {
      }
    },
     methods: {
      open() {
        this.$prompt('记录信息', '记录监控', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]/,
          inputErrorMessage: '内容不能为空'
          }).then(({value})=>{
            this.$message({
              type: 'success',
              message: '已开始录制，录制结束后前往视频监控录像页面查看'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    },
    mounted:function(){
      let player = new Aliplayer({
        "id": "player-con",
      //"source": "rtmp://www.briup.cn/hls/shiyanshi",
      "source": "rtmp://localhost:1935/live/room",
      //"source": "rtmp://10.0.0.18:1935/live/room",

      "width": "630px",
      "height": "455px",
      "autoplay": true,
      "isLive": true,
      "rePlay": false,
      "playsinline": true,
      "preload": true,
      "controlBarVisibility": "hover",
      "useH5Prism": true
      }, function (player) {
        console.log("The player is created");
      });}}
  </script>
  <style scoped>
  #max{
    margin-top: 30px;
    margin-left: 40px;
    width: 1027px;
    height: 558px  
    }
  #player-con{
    margin-top: 65px;
    margin-left: 70px;
    position: absolute;
  }
  #transcribe{
    margin-top:80px;
    margin-left: 750px;
    width: 260px;
    height:180px;
    background-color: rgb(245, 230, 230); 
    position: absolute;
    font-family: "微软雅黑";
    font-weight:bold;
    font-size:16px;
  }
  #preserve{
    margin-top:305px;
    margin-left: 750px;
    width: 260px;
    height:180px;
    background-color:rgb(238, 221, 221);
    position: absolute;
    font-family: "微软雅黑";
    font-weight:bold;
    font-size:16px;
  }
  span{position:absolute;
      left: 82px;
      bottom: 120px}
  #el-button{position:absolute;
      left: 85px;
      bottom: 60px;
      width:90px;
      height:32px;
      }
  </style>
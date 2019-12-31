<template>
  <div class="my">
    <div class="personMesg" style="height:300px;margin-left:5%">
      <h2>基本资料</h2>
      <div class="personMesgLeft" style="height:250px;width:210px;float:left">
        <img src="../../assets/images/005.png" alt="" id="img"><br>
        <section>
         <div v-show="progressFlag" class="head-img">
             <el-progress type="circle" :percentage="progressPercent"></el-progress>
         </div>
         <el-upload class="img-btn" action="#"
         :show-file-list="false"  :before-upload="beforeAvatarUpload"
         :http-request="uploadImg">
         <el-button type="success" class="sub2">更改头像</el-button>
         </el-upload>
        </section>

        <br>
        <button id="mymesgsubmit" @click='testAll'>提交修改</button>
      </div>
      <div class="personMesgRight" style="height:250px;width:300px;float:left">
        <p>账号：</p>
        <el-input
        placeholder="g16158"
        v-model="userid"
        :disabled="true">
        </el-input>
        <p>昵称：</p>
        <el-input v-model="uname" placeholder="轮回宇光"></el-input>
        <p>手机号：</p>
        <el-input v-model="userphone" placeholder="18434763287"></el-input>
      </div>
    </div>
    <div class="personSec" style="height:150px;margin-left:5%">
      <h2>安全设置</h2>
      账号密码
      <br><br>
      当前密码强度：强 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text" @click="open">修改</el-button>
    </div>
    <div class="personScene" style="height:250px;margin-left:5%">
      <h2>情景设置</h2>
      <!-- <div style="height:150px;width:150px;background-color:blue;float:left">归家</div>
      <div style="height:150px;width:150px;background-color:blue;float:left">离家</div>
      <div style="height:150px;width:150px;background-color:blue;float:left">睡眠</div> -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        userid:'sss',
        uname:'',
        userphone:'',
        input: '',
        test:[],
        fileList: []
      }
    },

    methods: {
      open() {
        this.$prompt('请输入新密码', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          //inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          });



          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      uploadImg (f) {
            console.log(f)
            this.progressFlag = true
            let formdata = new FormData()
            formdata.append('image', f.file)
            axios({
            url: baseURL + '/image',
            method: 'post',
            data: formdata,
            headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: progressEvent => {
                // progressEvent.loaded:已上传文件大小
                // progressEvent.total:被上传文件的总大小
                this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
            }
        }).then(res => {
            this.imageUrl = res.data.data
            if (this.progressPercent === 100) {
                this.progressFlag = false
                this.progressPercent = 0
            }
        }).then(error => {
            console.log(error)
        })
        },
        // 上传图片前的过滤
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = (file.size / 1024 / 1024) < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },

      
    }
  }
</script>
<style scoped>
    .sub2{
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #FFF;
      width: 150px;
      height: 35px;
    }
    #mymesgsubmit{
    width: 150px;
    height: 35px;
    color: #FFF;
    background-color:#3a8ee6;
    border: 0px;
    border-radius: 5px;
    }
    #img{
     width: 150px;
     height: 150px;
     border-radius: 90px;

    }
</style>
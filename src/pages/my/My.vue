<template>
  <div class="my">
    <div class="personMesg" style="height:400px;margin-left:5%">
      <h2>基本资料</h2>
      <div class="personMesgLeft" style="height:350px;width:250px;float:left">
        <el-input v-model="uploadPhotoMesg.photo" v-if="false"></el-input>
        <el-upload
             class="avatar-uploader"
             ref="upload"
             :show-file-list="false"
             action="http://localhost:8888/updateUserPhoto"
             :before-upload="beforeUpload"
             :on-change="handleChange"
             :auto-upload="false"
             :on-success="uploadSuccess" 
             :data="uploadPhotoMesg"
             style=" border: 1px dashed #d9d9d9;border-radius: 50%;width: 200px;height: 200px;">
         <img v-if="uploadPhotoMesg.photo" :src="uploadPhotoMesg.photo" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" icon="el-icon-upload2" @click="photoSubmit" size="medium">更换头像</el-button>
          <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" v-if="userMesgChangeFlag==false" icon="el-icon-edit" @click="userMesgChangeFlag=true" size="medium">修改信息</el-button>
          <el-button type="primary" v-else icon="el-icon-edit" @click="submitUserMesg" size="medium">保存信息</el-button>
      </div>
      <div class="personMesgRight" style="height:350px;width:300px;float:left">
        账号：<br><br>
        <el-input
        v-model="userMesg.id"
        :disabled="true">
        </el-input>
        <br><br>昵称：<br><br>
        <el-input v-if="userMesgChangeFlag==false" v-model="userMesg.name" :disabled="true"></el-input>
        <el-input v-else v-model="userMesg.name"></el-input>
        <p>手机号：</p>
        <el-input v-if="userMesgChangeFlag==false" :disabled="true" v-model="userMesg.userphone"></el-input>
        <el-input v-else v-model="userMesg.userphone"></el-input>
        <p>权限：</p>
        <el-input :disabled="true" v-if="userMesg.roles[0] == 'admin'" v-model="roleName1"></el-input>
        <el-input :disabled="true" v-else v-model="roleName2"></el-input>
      </div>
    </div>
    <div class="personSec" style="height:150px;margin-left:5%">
      <h2>安全设置</h2>
      当前密码强度：&nbsp;&nbsp;&nbsp; {{qiangruo}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="text" @click="dialogPwsd=true" >修改</el-button>
    </div>
    <el-dialog
        title="修改密码"
        :visible.sync="dialogPwsd"
        width="30%"
        :before-close="handleClose"
        >
          <el-form :model="pwsdCheck" :rules="pwsdCheckRules" ref="pwsdCheck" label-width="100px">
            <el-form-item label="新密码" prop="fistPwsd">
              <el-col :span="20">
              <el-input v-model="pwsdCheck.fistPwsd" type="password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="确认新密码" prop="secPwsd">
              <el-col :span="20">
                <el-input v-model="pwsdCheck.secPwsd" type="password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitPwsdForm('pwsdCheck')">立即修改</el-button>
              <el-button @click="resetPwsdForm('pwsdCheck')">清空信息</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import { isNull } from 'util'
import { getToken } from '@/utils/auth';
  export default {
    data() {
       var validatePass = (rule, value, callback) => {            
         if (value === '') {
             callback(new Error('请再次输入密码'));
           } else if (value !== this.pwsdCheck.fistPwsd) {
             callback(new Error('两次输入密码不一致!'));
           } else {
             callback();
           }
        };
      return {
        // 修改密码检验
        pwsdCheck: {
          fistPwsd: '',
          secPwsd: '',
        },
        pwsdCheckRules: {
          fistPwsd: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          secPwsd: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: validatePass, message: '俩次输入密码不一致' ,trigger: 'blur' }
          ],
        },
        // 头像上传信息
        uploadPhotoMesg: {
          userID: '',
          photo: '',
        },
        // 密码强弱
        qiangruo: '',
        // 权限显示
        roleName1: '管理员',
        roleName2: '普通用户',
        // 修改密码框弹出标识
        dialogPwsd: false,
        // 用户信息得令牌 
        token: '',
        // 用户相关信息
        userMesg: {
        },
        // 用户信息修改得标识
        userMesgChangeFlag:false,
      }
    },
    created(){
      // 页面加载时拉取数据
      this.gUserMesg(getToken()).then(result => {
        this.userMesg=result;
        this.uploadPhotoMesg.userID=result.id;
        this.uploadPhotoMesg.photo=result.avatar;
        this.pwsdJudge(result.introduction.length)
      })
    },
    methods: {
      ...mapActions('my',['gUserMesg','pUserMesg','pUserPwsd']),
      // 修改密码框关闭前置空
      handleClose() {
        this.$refs['pwsdCheck'].resetFields();
        this.dialogPwsd=false;
      },
      // 重置密码修改框内容
      resetPwsdForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitPwsdForm(formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let up = {upwsd:this.pwsdCheck.fistPwsd,uid:this.userMesg.id};
            vm.pUserPwsd(up).then(res => {
              if(res=="用户密码修改成功"){
                this.$message({
                  message: '用户密码修改成功',
                  type: 'success',
                  center: true
                });
              } else {
                this.$message({
                  message: '用户密码修改失败',
                  type: 'warning',
                  center: true
                });
              }
            });
            vm.$refs[formName].resetFields();
            vm.dialogPwsd =false;
          } else {
              return false;
          }
        });
      },
      // 用户信息修改
      submitUserMesg() {
        this.pUserMesg(this.userMesg).then(res => {
          if(res=="用户信息修改成功"){
            this.$message({
              message: '用户信息已修改',
              type: 'success',
              center: true
            });
          } else {
            this.$message({
              message: '用户信息修改失败',
              type: 'warning',
              center: true
            });
          }
        });
        this.userMesgChangeFlag=false;
      },
      // 头像上传
      photoSubmit() {
        this.$refs.upload.submit();
      },
      // 密码强弱判定
      pwsdJudge(pwsdLength) {
        if(pwsdLength<9) {
          //弱
          this.qiangruo='弱';
        } else if (pwsdLength >=9 && pwsdLength <13){
          //中
          this.qiangruo='中';
        } else {
          //强
          this.qiangruo='强';
        }
      },
      // 头像修改的反馈
      uploadSuccess(res) {
        if(res.status==3000){
          this.$message({
            message: '头像修改失败',
            type: 'warning',
            center: true
          });
        } else {
          this.$message({
            message: '头像已修改',
            type: 'success',
            center: true
          });
        }
      },
      // 获取头像信息
      handleChange (file, fileList) {
        this.uploadPhotoMesg.photo = URL.createObjectURL(file.raw);
      },
      // 验证头像格式和大小
      beforeUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt1M = file.size < 1024*1024;
          if (!(isJPG || isPNG)) {
            this.$message.error('头像格式只能是 JPG或PNG 格式!');
            this.uploadPhotoMesg.photo=this.userMesg.avatar;
          }
          if (!isLt1M) {
           this.$message.error('头像大小不能超过 1M!');
           this.uploadPhotoMesg.photo=this.userMesg.avatar;
          }
          return ( isJPG && isLt1M ) || ( isPNG && isLt1M );
      },
    }
  }
</script>
<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
    }
    .avatar {
        width: 200px;
        height: 200px;
        display: block;
        border-radius: 50%;
    }
</style>
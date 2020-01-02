<template>
<div class="mesg">
  <div class="mesg-header" style="margin-top:10px">
    <div style="float: left;padding-left:10px">
      <el-button  @click="dialogVisible = true" icon="el-icon-circle-plus" type="primary">添加</el-button>
      <el-button icon="el-icon-delete" type="danger" @click="deleteSelection()">批量删除</el-button>
    </div>
  </div>
  <br>
  <div>
  <el-table
    ref="multipleTable"
    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
    style="width: 1305px"
    @selection-change="handleSelectionChange" 
    @row-click="getDetails">
    <el-table-column type="selection" align="center" width="55">
    </el-table-column>
    <el-table-column type="index" label="编号" align="center" width="60">
    </el-table-column>
    <el-table-column prop="user_photo" label="头像" width="130"  align="center">
      <template slot-scope="scope">           
        <img :src="scope.row.user_photo" style="width:80px;height:80px;border-radius:50%; "/>
      </template> 
    </el-table-column>
    <el-table-column prop="userName" label="名称" width="150" align="center">
      <template slot-scope="scope">
      <el-input v-if="showInput==scope.row.userId" v-model="scope.row.userName"></el-input>
      <span v-else>{{ scope.row.userName }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="userId" label="账号" width="180" align="center">
    </el-table-column>
    <el-table-column prop="userPwsd" label="密码" width="180"  align="center">
      <template slot-scope="scope">
      <el-input v-if="showInput==scope.row.userId" v-model="scope.row.userPwsd"></el-input>
      <span v-else>{{ scope.row.userPwsd }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="user_phone" label="手机号" width="150"  align="center">
      <template slot-scope="scope">
      <el-input v-if="showInput==scope.row.userId" v-model="scope.row.user_phone"></el-input>
      <span v-else>{{ scope.row.user_phone }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="userRole" label="角色" width="120"  align="center" :formatter="roleFormat">
    </el-table-column>
    <el-table-column align="center"  label="操作" width="280">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" v-if="showInput==scope.row.userId" @click="uploadMesg(scope.row)" size="small">保存</el-button>
        <el-button type="primary" icon="el-icon-edit" v-else @click="ChangeMesg(scope.row.userId)" size="small">修改</el-button>
        <el-button icon="el-icon-delete" type="danger" :disabled="scope.row.userRole == 'admin'" size="small" @click="flagChange1">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
  <div>
    <el-dialog
        title="添加新用户"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose">
          <el-form :model="ruleFormAdd" :rules="rules" ref="ruleFormAdd" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户账号" prop="zhanghao">
              <el-col :span="20">
              <el-input v-model="ruleFormAdd.zhanghao" placeholder="例如：z123456"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="用户密码" prop="mima">
              <el-col :span="20">
                <el-input v-model="ruleFormAdd.mima" type="password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="用户名称" prop="mingcheng">
              <el-col :span="20">
                <el-input v-model="ruleFormAdd.mingcheng" placeholder="例如：清玄逸梦"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="用户手机" prop="shouji">
              <el-col :span="20">
                <el-input v-model="ruleFormAdd.shouji" placeholder="例如：18434763287"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="用户头像" prop="touxiang">
              <el-input v-model="ruleFormAdd.touxiang" v-if="false"></el-input>
              <el-upload
                      class="avatar-uploader"
                      ref="upload"
                      :show-file-list="false"
                      action="http://localhost:8888/addUser"
                      :before-upload="beforeUpload"
                      :on-change="handleChange"
                      :auto-upload="false"
                      :on-success="uploadSuccess" 
                      :data="ruleFormAdd"
                      style=" border: 1px dashed #d9d9d9;border-radius: 6px;width: 150px;height: 150px;">
                  <img v-if="ruleFormAdd.touxiang" :src="ruleFormAdd.touxiang" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleFormAdd')">立即添加</el-button>
              <el-button @click="resetForm('ruleFormAdd')">重置信息</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
  </div>
  <div class="fenye" >
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      align="center">
    </el-pagination>
  </div>
</div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import { isNull } from 'util';
  export default {
    data() {
      return { 
        dialogVisible: false,
        showInput: false,
        ruleFormAdd: {
          zhanghao: '',
          quanxian: '',
          mima: '',
          mingcheng: '',
          touxiang: '',
          shouji: '',
        },
        rules: {
          zhanghao: [
            { required: true, message: '请输入用户账号/ID', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            { pattern: /^[0-9a-zA-Z]+$/, message: '账号只能包含字母和数字', trigger: 'blur' }
          ],
          quanxian: [
            { required: true, message: '请选择用户权限/角色', trigger: 'change' }
          ],
          mima: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          mingcheng: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          touxiang: [
            {required: true, message: '请选择头像', trigger: 'blur'},
          ],
          shouji: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
          ]
        },
        // 总数据
        tableData:[],
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
        // 个数选择器（可修改）
        pageSizes:[5,8,10],
        // 默认每页显示的条数（可修改）
        PageSize:5,
        multipleSelection: [],
        // 状态改变
        vvv: '',
      }
    },
    created(){
      // 页面加载时拉取用户列表
      this.gUsers().then(result => {
      this.tableData=result;
      this.totalCount=result.length;
      })
    },
    methods: {
      ...mapActions('administer',['gUsers','dUser','dSomeUsers','pUser']),
      // 表格状态改变
      ChangeMesg(id) {
        this.showInput=id;
      },
      uploadMesg(row) {
        this.showInput=false;
        this.pUser(row).then(result => {
        this.tableData=result;
        this.totalCount=result.length;
        })
      },
      // 提交表单信息并将表单置空
      submitForm(formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.$refs.upload.submit();
            vm.$refs[formName].resetFields();
            vm.ruleFormAdd.touxiang = '';
            vm.dialogVisible =false;
          } else {
              return false;
          }
        }); 
      },
      // 添加用户时的反馈
      uploadSuccess(res) {
        if(res.status==3000){
          this.$message({
            message: '该用户已存在，无法再添加',
            type: 'warning',
            center: true
          });
        } else {
          this.$message({
            message: '用户添加成功！',
            type: 'success',
            center: true
          });
        }
        this.gUsers().then(result => {
          this.tableData=result;
          this.totalCount=result.length;
        });
      },
      // 重置表单信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleFormAdd.touxiang = '';
      },
      // 获取头像信息
      handleChange (file, fileList) {
        this.ruleFormAdd.touxiang = URL.createObjectURL(file.raw);
      },
      // 验证头像格式和大小
      beforeUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt1M = file.size < 1024*1024;
          if (!(isJPG || isPNG)) {
            this.$message.error('头像格式只能是 JPG或PNG 格式!');
          }
          if (!isLt1M) {
           this.$message.error('头像大小不能超过 1M!');
          }
          return ( isJPG && isLt1M ) || ( isPNG && isLt1M );
      },
      // 获取表格的行信息
      getDetails(row){
        if(this.vvv==2){
          this.deleteMsag(row.userId);
        }
      },
      flagChange1(){
        this.vvv=2;
      },
      // 角色权限显示
      roleFormat(row, column) {
        if (row.userRole === "admin") {
          return "管理员"
        } else  {
          return "普通用户"
        } 
      },
      // 批量选中判定
      deleteSelection(){
        let allrow=this.$refs.multipleTable.selection;
        let ids="";
        let roles="";
        if (allrow.length!=0) {
          allrow.forEach(allrow => {
            ids=ids+allrow.userId+",";
            roles=roles+allrow.userRole;
          });
          if(roles.includes("admin")) {
            this.$alert('选中的用户里包含管理员，管理员无法删除', '删除失败', {
            confirmButtonText: '确定',
            });
          } else {
            this.deletesome(ids);
          }
        } else {
          this.$alert('请选中要删除的用户', '删除行未选择', {
          confirmButtonText: '确定',
          });
        }
      },
      // 批量删除用户
      deletesome(ids){
        this.$confirm('此操作将删除这些用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dSomeUsers(ids).then(result=>{
          this.tableData=result;
          this.totalCount=result.length;
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 删除用户
      deleteMsag(userID){
          this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dUser(userID).then(result=>{
          this.tableData=result;
          this.totalCount=result.length;
        });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 分页
      // 每页显示的条数
      handleSizeChange(val) {
        // 改变每页显示的条数 
        this.PageSize=val
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage=1
      },
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
      },
    }
  }
</script>
<style scoped>
    /* input[type="file"] {
        display: none;
    } */
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
 
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
        border-radius: 6px;
    }
</style>
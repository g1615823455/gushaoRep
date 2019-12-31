<template>
<div class="mesg">
  <div class="mesg-header" style="margin-top:10px">
    <div class="block" style="float: left">
       <span class="demonstration">选择日期</span>
        <el-date-picker
        v-model="value1"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button type="primary" icon="search" @click="search">查询</el-button>
    </div>
    <div style="float: right">
      <el-button @click="toggleSelection()">批量处理</el-button>
      <el-button @click="deleteSelection()">批量删除</el-button>
      <el-button @click="deleteHandeleMes()">删除已处理</el-button>
    </div>
  </div>
  <br>
  <div>
  <el-table
    ref="multipleTable"
    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange" 
    @row-click="getDetails">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="newsDate"
      label="预警时间"
      width="250" 
      align="center" 
      >
    </el-table-column>
    <el-table-column
      prop="newsHeader"
      label="预警类型"
      width="150" 
      align="center">
    </el-table-column>
    <el-table-column
      prop="news"
      label="预警信息"
      width="400" 
      align="center">
    </el-table-column>
    <el-table-column
      prop="newsResult"
      label="处理结果"
      width="200" 
      align="center">
    </el-table-column>
    <el-table-column
      prop="newsHandled"
      label="是否已处理"
      width="150" 
      align="center" 
      :formatter="formatBoolean">
    </el-table-column>
    <el-table-column
      align="center" 
      label="操作"
      width="200">
      <el-button type="primary" @click="flagChange">处理</el-button>
      &nbsp;
      <el-button  @click="flagChange1">删除</el-button>
    </el-table-column>
    </el-table>
  </div>
  <!--
  -->
  <div class="fenye" >
    <center>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </center>
  </div>
</div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import { isNull } from 'util';
  export default {
    data() {
      return {
        //总数居
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
        //  pickerOptions: {
        //   shortcuts: [{
        //     text: '最近一周',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }]
        // },
        value1: '',
        value2: '',
        //日期选择
        startDate: new Date(),
        endDate: new Date(),
        vvv: 'wsw',
      }
    },
    created(){
      
      this.gnews().then(result => {
      this.tableData=result.list;
      this.totalCount=result.list.length;
      })
    },
    methods: {
      ...mapActions('message',['gnews','dnews','pnews','dAllnews','psomenews','dsomenews','gnewsByDate']),
      search(){
          let ti=this.value1;
        if(ti.length!=0){
          this.gnewsByDate(ti).then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
          });
        }else{
          this.$alert('请选择查询日期', '查询日期为空', {
          confirmButtonText: '确定',
          });
        }
      },
      //获取表格的行
      getDetails(row){
        //console.log(row.newsId)//此时就能拿到整行的信息
        //this.vvv=row.newsId;
        if(this.vvv==1){
          this.open(row.newsId);
        }
        if(this.vvv==2){
          this.deleteMsag(row.newsId);
        }
      },
      flagChange(){
        this.vvv=1;
      },
      flagChange1(){
        this.vvv=2;
      },
      //是否已处理
      formatBoolean: function (row, column, cellValue) {
        var ret = ''  //你想在页面展示的值
        if (cellValue) {
            ret = "是"  //根据自己的需求设定
        } else {
            ret = "否"
        }
        return ret;
      },
      //多选删除
      deleteSelection(){
        let allrow=this.$refs.multipleTable.selection;
        let ids="";
        ///News/byNewsIds?newsIds=33%2C34
        if (allrow.length!=0) {
          allrow.forEach(allrow => {
            ids=ids+allrow.newsId+",";
          });
        this.deletesome(ids);
        } else {
          this.$alert('请选中要删除的行', '删除行未选择', {
          confirmButtonText: '确定',
          });
        }
      },
      deletesome(q){
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dsomenews(q).then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
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
      //多选处理
      toggleSelection() {
        let allrow=this.$refs.multipleTable.selection;
        let ids="";
        if (allrow.length!=0) {
          allrow.forEach(allrow => {
            ids=ids+allrow.newsId+",";
          });
        this.allhandled(ids);
        } else {
          this.$alert('请选中要处理的行', '处理行为空', {
          confirmButtonText: '确定',
          });
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleButton(val){
        
      },
      //批量处理
      allhandled(a){
        this.$prompt('请输入处理结果', '处理预警信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]/,
          // inputErrorMessage: '内容不能为空'
          //id=12&newsResult=
          }).then(({value},)=>{
            let s="newsIds="+a+"&newsResult="+value;
            this.psomenews(s).then(result=>{
            this.tableData=result.list;
            this.totalCount=result.list.length;
            });
            this.$message({
              type: 'success',
              message: '处理结果:'+value,
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });       
        });
      },

      //处理结果信息输入
      open(val233) {
        this.$prompt('请输入处理结果', '处理预警信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]/,
          // inputErrorMessage: '内容不能为空'
          //id=12&newsResult=
          }).then(({value},)=>{
            let s="id="+val233+"&newsResult="+value;
            this.pnews(s).then(result=>{
            this.tableData=result.list;
            this.totalCount=result.list.length;
            });
            this.$message({
              type: 'success',
              message: '处理结果:'+value,
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });       
        });

      },
      //删除记录
      deleteMsag(val133){
          this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dnews(val133).then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
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
      //分页
      // 每页显示的条数
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        // 改变每页显示的条数 
        this.PageSize=val
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage=1
      },
      // 显示第几页
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        // 改变默认的页数
        this.currentPage=val
      },
      //删除已处理
      
      deleteHandeleMes(){
        this.$confirm('此操作将删除所有已处理记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.dAllnews("true").then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

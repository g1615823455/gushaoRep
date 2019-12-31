<template>
<div class="mesg">
  <div class="mesg-header" style="margin-top:10px">
    <div class="block" >
      <span class="demonstration">选择日期</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期" 
        unlink-panels>
      </el-date-picker>
      <el-button type="primary" icon="search" @click="search">查询</el-button>
    </div>
    <div id="deal">
      <el-button @click="deleteSelection()">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
  <div id="table">
  <el-table
    ref="multipleTable"
    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    @row-click="getDetails">
    <el-table-column
      type="selection"
      width="100">
    </el-table-column>
    <el-table-column
      prop="secTime"
      label="记录时间"
      width="300" 
      align="center">
    </el-table-column>
    <el-table-column
      prop="secMessage"
      label="记录信息"
      width="550" 
      align="center">
    </el-table-column>
    <el-table-column
      align="center" 
      label="操作"
      width="200"
      show-overflow-tooltip>
      <el-button type="primary" @click="flagChange">播放</el-button>
      &nbsp;
      <el-button  @click="flagChange1">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
  
  <div id="fenye" >
    <center>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
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
  export default {
    data() {
      return {
        tableData: [],
         // 默认显示第几页
        currentPage:1,
         // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
        // 个数选择器（可修改）
        pageSizes:[5,8],
        // 默认每页显示的条数（可修改）
        PageSize:5,
        multipleSelection: [],
        /* pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          
          }]
        },*/
        value1: '',
        value2: '',
        startDate:new Date(),
        endDate: new Date(),
        values:'visit',
        videoUrl:''
        }
      },
      created(){
      
      this.gsec().then(result => {
      this.tableData=result.list;
      this.totalCount=result.list.length;
      })
    },
    methods: {
      ...mapActions('video',['gsec','dsec','psec','dsomesec','gsecByDate']),
      search(){
        let it=this.value1;
        if(it.length!=0){
          this.gsecByDate(it).then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
          console.log(it)
        });
        }else{
          this.$alert('请选择查询日期','查询日期为空',{
           confirmButtonText: '确定', 
          });
        }
      },
      getDetails(row){
        //console.log(row.newsId)//此时就能拿到整行的信息
        //this.vvv=row.securityId;
        if(this.values==1){
          this.videoUrl=row.securityAdres;
          this.open(row.securityAdres);
        }
        if(this.values==2){
          this.deleteMsag(row.securityId);
          
        }
      },
      flagChange(){
        this.values=1;
      },
      flagChange1(){
        this.values=2;
      },
      //是否已处理
      /*formatBoolean: function (row, column, cellValue) {
        var ret = ''  //你想在页面展示的值
        if (cellValue) {
            ret = "是"  //根据自己的需求设定
        } else {
            ret = "否"
        }
        return ret;},*/
      deleteSelection(){
        let allrow=this.$refs.multipleTable.selection;
        let ids="";
        ///video/byVideoIds?VideoIds=33%2C34
        if (allrow.length!=0) {
          allrow.forEach(allrow => {
            ids=ids+allrow.securityId+",";
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
          this.dsomesec(q).then(result=>{
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
       open(allval){
         console.log(this.videoUrl)
        this.$alert('<video src="http://127.0.0.1:8888/'+this.videoUrl+'" controls width="400" height="300"></video>', '录像',{
          dangerouslyUseHTMLString: true
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleButton(val){
        
      },
     
      deleteMsag(allval){
          this.$confirm('此操作将删除该录像, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          console.log(allval)
          this.dsec(allval).then(result=>{
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
      handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
        this.PageSize=val
        this.currentPage=1
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
       this.currentPage=val
      },
  } } 
    
  </script>
  <style scoped>
  .block{
    margin-top: 10px;
    margin-left: 80px;
    position: absolute;
  }
  #deal{
    margin-top: 10px;
    margin-left: 1000px;
    position: absolute;
  }
  #table{
    margin-top: 50px;
    margin-left: 80px;
    width:1150 ;
    height:510px;
    position: absolute;
  }
  #fenye{
    margin-top: 560px;
    margin-left: 400px;
    position: absolute;
  }
  </style>
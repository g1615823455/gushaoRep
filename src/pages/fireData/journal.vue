<template>
<div class="mesg" style="background:white">
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
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
    </div>
    <div style="float: right">
      <el-button @click="deleteSelection()">批量删除</el-button>
      <el-button @click="deleteAllMesg()">清空日志</el-button>
    </div>
  </div>
  <br>
  <br>
  <div>
  <el-table
    ref="multipleTable"
    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange" 
    >
    <el-table-column
      type="selection"
      width="55"
      align="center">
    </el-table-column>
    <el-table-column
      prop="fTime"
      label="记录时间"
      width="200" 
      align="center"
      :formatter="dateString"
      >
    </el-table-column>
    <el-table-column
      prop="coo"
      label="CO2"
      width="150" 
      align="center">
    </el-table-column>
    <el-table-column
      prop="temperature"
      label="温度"
      width="150" 
      align="center">
    </el-table-column>
    <el-table-column
      prop="humidity"
      label="湿度"
      width="150" 
      align="center">
    </el-table-column>
    <el-table-column
      prop="lel"
      label="可燃气体"
      width="150" 
      align="center" 
      :formatter="formatBoolean">
    </el-table-column>
    <el-table-column
      prop="smoke"
      label="烟雾"
      width="150" 
      align="center" 
      :formatter="formatBoolean">
    </el-table-column>
    <el-table-column
      prop="dangerous"
      label="危险等级"
      width="100" 
      align="center">
    </el-table-column>
    <el-table-column
      align="center" 
      label="操作"
      width="100">
      <template slot-scope="scope">
      <el-button icon="el-icon-delete" type="danger" size="small" @click="deleteMsag(scope.row.fId)">删除</el-button>
      </template>
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
        PageSize:8,
        multipleSelection: [],
        value1: '',
        value2: '',
        //日期选择
        startDate: new Date(),
        endDate: new Date(),
      }
    },
    created(){
      
      this.gFireData().then(result => {
      this.tableData=result.list;
      this.totalCount=result.list.length;
      })
    },
    methods: {
      ...mapActions('journal',['gFireData','dFireData','dAllFireDatas','dSomeFireDatas','gFireDataByDate',]),
      search(){
          let ti=this.value1;
        if(ti.length!=0){
          this.gFireDataByDate(ti).then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
          });
        }else{
          this.$alert('请选择查询日期', '查询日期为空', {
          confirmButtonText: '确定',
          });
        }
      },
      // 时间显示处理
      dateString(row) {
        let ds = row.fTime;
        let nds=ds.slice(0,10)+" "+ds.slice(11,19);
        return nds;
      },
      // 烟雾，可燃气显示处理
      formatBoolean(row, column,cellValue) {
        var ret = ''  //你想在页面展示的值
        if (cellValue) {
            ret = "有"  //根据自己的需求设定
        } else {
            ret = "无"
        }
        return ret;
      },
      // 批量删除
      deleteSelection(){
        let allrow=this.$refs.multipleTable.selection;
        let ids="";
        if (allrow.length!=0) {
          allrow.forEach(allrow => {
            ids=ids+allrow.fId+",";
          });
        this.deletesome(ids);
        } else {
          this.$alert('请选中要删除的行', '删除行未选择', {
          confirmButtonText: '确定',
          });
        }
      },
      deletesome(ids){
        this.$confirm('此操作将删除这些记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dSomeFireDatas(ids).then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //删除记录
      deleteMsag(val){
          this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.dFireData(val).then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
        });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
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
      //清空日志记录
      deleteAllMesg(){
        this.$confirm('此操作将所有日志记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.dAllFireDatas().then(result=>{
          this.tableData=result.list;
          this.totalCount=result.list.length;
          });
        }).catch(() => {
        });
      }
    }
  }
</script>

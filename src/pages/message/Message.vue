<template>
  <div class="app-container">
    <!-- 查询框 双向绑定 keyword-->
    <el-input
      v-model="keyword"
      placeholder="请输入关键字"
      clearable
      style="width:500px" />
    <!-- 搜索按钮 -->
    <el-button type="primary" icon="el-icon-search" @click="getDataLog()">搜索</el-button>
    <!-- data就是绑定数据用的 -->
    <el-table
      :data="dataLog"
      height="600"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="错误信息">
              <div v-html="props.row.log"/>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="服务单"
        prop="data"/>
      <el-table-column
        label="时间"
        prop="time"/>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getDataLog" />
      <!-- total总条数
     listQuery.page 当前页
     listQuery.limit 每页几条
     getDataLog 后买点击分页时候要回调的函数 -->
  </div>
</template>
 
<script>
// import { getDataLog } from '@/api/service/dataLog'
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
 
export default {
  components: { Pagination },
  data() {
    return {
      // 搜索关键字
      keyword: '',
      // 数据条数
      total: 0,
      // 分页参数
      listQuery: {
        page: 1,
        limit: 10
      },
      // 列表数据
      dataLog: []
    }
  },
  created() {
    this.getDataLog()
  },
  methods: {
    getDataLog() {
      this.listQuery = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        object: this.keyword
      }
      // mock 请求假数据
      // getDataLog(this.listQuery).then(response => {
      //   this.dataLog = []
      //   this.total = response.data.total
      //   this.dataLog = response.data.items
      //   // 查询后要把关键字给清空
      //   this.keyword = ''
      // })
      // 请求后台获得真实数据
      request({
        url: '/log/getDataLog/',
        method: 'post',
        data: this.listQuery
      }).then(response => {
        this.dataLog = []
        this.total = response.data.pageEntity.total
        this.dataLog = response.data.retData
      })
    }
  }
}
</script>
 
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

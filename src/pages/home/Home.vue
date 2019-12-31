<template>
  <div class='hello'>
    <div style="width:100%;height: 450px;">
     <el-carousel :interval="2000" arrow="always" height="450px">
        <el-carousel-item v-for="item in img_list" :key="item.id">
           <img :src="item.idView" class="image">        
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="butt" style="width:100%;height:250px">
      <div style="width:20%;height:250px;float:left;padding-left:50px;padding-top:50px">
        <img src="../../assets/images/可燃气体.png" alt="" width="100px" height="100px"> {{firedata.lel}}
      </div>
      <div style="width:20%;height:250px;float:left;padding-left:50px;padding-top:50px">
        <img src="../../assets/images/烟雾报警器.png" alt="" width="100px" height="100px"> {{firedata.smoke}}
      </div>
      <div style="width:20%;height:250px;float:left;padding-left:50px;padding-top:50px">
        <img src="../../assets/images/温度.png" alt="" width="100px" height="100px"> {{firedata.temperature}}
      </div>
      <div style="width:20%;height:250px;float:left;padding-left:50px;padding-top:50px">
        <img src="../../assets/images/湿度.png" alt="" width="100px" height="100px"> {{firedata.humidity}}
      </div>
      <div style="width:20%;height:250px;float:left;padding-left:50px;padding-top:50px">
        <img src="../../assets/images/co2.png" alt="" width="100px" height="100px"> {{firedata.coo}}
        <!-- <el-badge :value="ades.aa" class="item">
          <el-button size="small">评论</el-button>
        </el-badge> -->
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import { isNull } from 'util';
export default {
  data() {
    return {
      img_list:[
      {id:0,idView:require("../../assets/images/009.png")},
      {id:1,idView:require("../../assets/images/010.png")},
      {id:2,idView:require("../../assets/images/011.png")}
      ],
      weichuli:111,
      firedata:[]
    }
  },
  created(){
    this.Refresh().then(result => {
      this.firedata=result;
      console.log(this.firedata.lel2);
      })
  },
  methods: {
    ...mapActions('home',['Refresh']),
  }
}
</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>


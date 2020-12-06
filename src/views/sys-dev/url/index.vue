<template>
    <div class="components-container">
      <splitpanes class="default-theme">
          <pane max-size="20">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="url in urlList" :key="url.id" class="text item">
                {{url.name }}
              </div>
            </el-card>
          </pane>
          <pane>
            
            <splitpanes horizontal>
              <pane>
                <div>
                  名称
                </div>
                <div>
                  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                      <el-option label="餐厅名" value="1"></el-option>
                      <el-option label="订单号" value="2"></el-option>
                      <el-option label="用户电话" value="3"></el-option>
                    </el-select>
                    <el-button slot="append">Send</el-button>
                  </el-input>
                </div>
              </pane>
              
              <pane>2</pane>
              <pane>3</pane>
            </splitpanes>
          </pane>
      </splitpanes>
    </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import $ from '@/api/system/urlDebug'
export default {
  name: 'SplitpaneDemo',
  components: { Splitpanes, Pane },
  data(){
    return {
        split2: 0.1,
        urlList: []
    }
  },
  created() {
    this.getPage();
  },
  methods: {
    resize() {
      console.log('resize')
    },
    getPage(){
      $.getPage().then((res) => {
        this.urlList = res.page.list
      })
    }
  }
}
</script>

<style>
    /* .splitpanes__pane {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Helvetica, Arial, sans-serif;
        color: rgba(255, 255, 255, 0.6);
        font-size: 5em;
    } */
</style>
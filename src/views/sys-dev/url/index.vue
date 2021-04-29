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
                <div class="el-li" @click="onLi(url)">{{url.name }}</div>
              </div>
            </el-card>
          </pane>
          <pane>
            
            <splitpanes horizontal>
              <pane>
                <div  class="demo-input-suffix">
                   <el-input title="接口名称" v-model="urlDebug.name" placeholder="请输入内容"></el-input>
                </div>
                <el-divider></el-divider>
                <div>
                  <el-input placeholder="请输入内容" v-model="urlDebug.url" class="input-with-select">
                    <el-select v-model="urlDebug.method" slot="prepend" style="width: 120px">
                      <el-option v-for="method in dictMethods" :key="method.label" :label="method.label" :value="method.label" default-first-option/>
                    </el-select>
                    <el-button slot="append"  @click="request">Send</el-button>
                  </el-input>
                </div>
              </pane>
              
              <pane>2</pane>
              <pane>
                  <json-editor ref="jsonEditor" v-model="jsonData2" />
              </pane>
            </splitpanes>
          </pane>
      </splitpanes>
    </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import JsonEditor from "@/components/JsonEditor"
import $ from '@/api/system/urlDebug'
import dict from '@/api/system/dict'
export default {
  name: 'SplitpaneDemo',
  components: { JsonEditor, Splitpanes, Pane },
  data(){
    return {
        split2: 0.1,
        dictMethods: [],
        urlList: [],
        urlDebug:{
          method: "GET"
        },
        jsonData2:{}
    }
  },
  computed: {
    jsonData : function () {
      if (this.urlDebug.response && Object.prototype.toString.call(this.urlDebug.response)) {
        return  JSON.parse(this.urlDebug.response)
      } else {
        return this.urlDebug.response
      }
    }
  },
  created() {
    this.getPage();
    dict.DICT_DATA_LIST('url_method').then((res) => {
      this.dictMethods = res.list
    })
  },
  methods: {
    resize() {
      console.log('resize')
    },
    onLi(url) {
      console.log(url)
      this.urlDebug = url;
      this.jsonData2 = url.response
    },
    getPage(){
      $.getPage().then((res) => {
        this.urlList = res.page.list
      })
    },

    request(){
      console.log(this.urlDebug)
      this.$ajax({
            method: this.urlDebug.method,
            url: this.urlDebug.url,
            params: this.urlDebug.parameters,
            data: this.urlDebug.body,
      }).then((res) => {
        this.urlDebug.response = res
      }).catch((res) => {
        this.$message.error(res);
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
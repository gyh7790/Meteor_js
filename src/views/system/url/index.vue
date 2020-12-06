<template>
    <div class="app-container">

      <div class="filter-container">
        <el-form :model="queryParams" ref="queryParams" :inline="true">
            <el-form-item label="关键字">
              <el-input v-model="queryParams.keyWord" placeholder="名称、接口"></el-input>
            </el-form-item>
            <el-form-item label="接口类型" prop="queryParams">
              <dict-list v-model="queryParams.type" dictType="url_type" :handleSelectChange="queryParams.type" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getUrlList">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>

      <div class="filter-container">
        <el-button type="primary" size="mini" @click="addUrl">新增</el-button>
      </div>
      
      <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="url" label="接口"/>
        <el-table-column prop="type" label="类型">
          <template slot-scope="{row}">
            <dict-item dictType="url_type" :dictValue="row.type + ''" /> 
          </template>
        </el-table-column>
        <el-table-column prop="menuName" label="接口页面"/>
        <el-table-column prop="auth" label="权限校验" width="80" >
          <template slot-scope="{row}">
            <el-switch v-model.number="row.auth" :value="row.auth" :active-value=1 :inactive-value=0 disabled/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button size="mini" @click="updateUrl(row)" type="warning">
                  编辑
              </el-button>
              <el-button size="mini" @click="deleteUrl(row)" type="danger">
                  删除
              </el-button>
            </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize" @pagination="getUrlList"/>

      <!-- 菜单 的URL管理 -->
      <el-dialog title="URL管理" :visible.sync="dialogURLVisible">
        <el-form :model="urlForm" :rules="urlRules" ref="urlForm" label-position="right" label-width="80px" style="padding:0px 20px">
          <el-row>
            <el-col :span="12">
                <el-form-item label="URL名称" prop="name">
                <el-input v-model="urlForm.name" placeholder="请输URL名称"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="URL" prop="url">
                <el-input v-model="urlForm.url" placeholder="请输URL"/>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <!-- <el-col :span="12">
                <el-form-item label="权限标识" prop="permission">
                <el-input v-model="urlForm.permission" placeholder="请输授权编码"/>
                </el-form-item>
            </el-col> -->
            <el-col :span="12">
                <el-form-item label="接口编码" prop="code">
                <el-input name='code' v-model="urlForm.code" readonly :disabled="!urlFormCode">
                  <el-button v-if="urlFormCode" slot="append" @click="getCode">获取编码</el-button>
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="权限" prop="type">
                  <el-switch v-model.number="urlForm.auth" :value="urlForm.auth" :active-value=1 :inactive-value=0 />
                </el-form-item> 
              </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单权限" prop="menu" >
                  <treeselect v-model="urlForm.menuId" 
                  :options="menuOptions" 
                  :normalizer="normalizer"
                  :disable-branch-nodes="true"
                  placeholder="选择归属菜单" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色" prop="role">
                <el-select v-model="urlForm.roles" multiple filterable clearable placeholder="请选择" :disabled="urlForm.auth == 0">
                  <el-option v-for="item in optUrlRole" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <dict-list :selected="urlForm.type" @select="selectType" dictType="url_type"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注" prop="remarks">
                  <el-input v-model="urlForm.remarks" type="textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
            <el-button @click="dialogURLVisible = false">取消</el-button>
            <el-button type="primary" @click="saveUrl()">提交</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { getMenu } from "@/api/system/menu";
import Pagination from '@/components/Pagination'
import url from "@/api/system/url";
import Treeselect from "@riophae/vue-treeselect";
import DictList from "@/components/DictList"
import DictItem from "@/components/DictItem"
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    components: { Pagination,Treeselect,DictList,DictItem},
    data() {
      return {
        queryParams: {
          pageNo: 1,
          pageSize: 10,
        },
        total: 0,
        tableData: [],
        urlForm: {},
        urlRules: {},
        // 菜单
        menuOptions: [],
        // 角色
        optUrlRole: [],
        // 
        urlFormCode: true,
        dialogURLVisible: false,
        defaultProps: {
          children: "children",
          label: "name"
        }
      }
    },
    created() {
        this.getUrlList()
        this.getMenu()
        this.getRole()
        // this.dictFetch('url_type')
    },
    watch: {
      'queryParams.keyWord': function () {
        console.log('queryParams --- > 有变动')
      }
    },
    methods: {
      normalizer(node){
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.name,
          children: node.children
        };
      },
      getRole(){
        this.$ajax.get('sys/role/listAll').then((res) => {
          if (res.code === 200) {
            this.optUrlRole = res.list
          }
        })
      },
      getMenu() {
        getMenu().then((res) => {
          if (res.code == 200) {
            this.menuOptions = res.data
          }
        })
      },
      getUrlList() {
        url.getPage(this.queryParams).then((res) => {
            if (res.code === 200) {
              this.total = res.page.total;
              this.tableData = res.page.list
            }
        })
        // this.$ajax.get('sys/url/page').then((res) => {
        //     if (res.code === 200) {
        //         this.tableData = res.page.list
        //     }
        // })
      },
      // 更改 权限 校验
      changeSwitch(row){
        this.$ajax.put('sys/url/auth',row).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          if (res.code != 200) {
            row.auth = row.auth == 1 ? 0 : 1;
          }
        })
      },
      selectType(val){
        this.urlForm.type = val
      },
      // 点击新增
      addUrl(){
        this.urlForm = {code:'',auth: '0',type: '1'}
        this.urlFormCode = true;
        this.dialogURLVisible = true;
      },
      // 点击编辑按钮
      updateUrl(row){
        this.urlFormCode = false;
        this.dialogURLVisible = true;
        this.urlForm = row;
      },
      getCode(){
        url.getCode().then((res)=>{
          this.urlForm.code = res.msg
          this.$notify.success('获取code成功')
        });
      },
      saveUrl(){
        url.save(this.urlForm).then(res => {
          this.$msg.success(res.msg);
          this.dialogURLVisible = false;
        })
      },
      // 删除 url
      deleteUrl(row){
        this.$ajax.delete('sys/url/'+row.id).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          this.dialogURLVisible = false;
        });
      }
    }
  }
</script>
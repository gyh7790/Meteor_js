<template>
    <div class="app-container">


      <div class="filter-container">
        <el-button type="primary" size="mini" @click="addUrl">新增</el-button>
      </div>
      
      <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="url" label="接口"/>
        <el-table-column prop="type" label="类型"/>
        <el-table-column prop="menuName" label="接口页面"/>
        <el-table-column prop="auth" label="权限校验" width="80" >
          <template slot-scope="{row}">
            <el-switch v-model.number="row.auth" @change="changeSwitch(row)" :value="row.auth" :active-value=1 :inactive-value=0 />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button v-if="row.auth == 1" size="mini" type="success">
                配置权限
              </el-button>
              <el-button size="mini" @click="updateUrl(row)" type="warning">
                  编辑
              </el-button>
              <el-button size="mini" @click="deleteUrl(row)" type="danger">
                  删除
              </el-button>
            </template>
        </el-table-column>
      </el-table>


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
            <el-col :span="12">
                <el-form-item label="权限标识" prop="permission">
                <el-input v-model="urlForm.permission" placeholder="请输授权编码"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="编码" prop="code">
                <el-input name='code' v-model="urlForm.code" readonly :disabled="!urlFormCode">
                  <el-button v-if="urlFormCode" slot="append" @click="getCode">获取编码</el-button>
                </el-input>
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
                  <el-select v-model="urlForm.roles" multiple filterable clearable placeholder="请选择">
                    <el-option v-for="item in optUrlRole" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="urlForm.remarks" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
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
import { getCode,save } from "@/api/system/url";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    components: { Treeselect },
    data() {
      return {
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
        this.$ajax.get('sys/url/page').then((res) => {
            if (res.code === 200) {
                this.tableData = res.page.list
            }
        })
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
      // 点击新增
      addUrl(){
        this.urlForm = {code:''}
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
        getCode().then((res)=>{
          this.urlForm.code = res.msg
          this.$notify.success('获取code成功')
        });
      },
      saveUrl(){
        save(this.urlForm).then(res => {
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
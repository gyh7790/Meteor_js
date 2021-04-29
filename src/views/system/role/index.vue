<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :model="queryParams" ref="queryParams" :inline="true">
            <el-form-item label="名称" prop="name">
              <el-input v-model="queryParams.keyWord" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getRoleList">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="filter-container">
        <el-button type="primary" size="mini" @click="dialogFormVisible=true;dataForm={};dataForm.dataScope=1">新增</el-button>
    </div>
      
    <el-table :data="tableData" stripe border default-expand-all style="width: 100%">
        <el-table-column type="index" width="50" label="编号" align="center"/>
        <el-table-column prop="enname" label="EN名称" align="center"/>
        <el-table-column prop="name" label="名称" align="center"/>
        <el-table-column prop="type" label="类型" align="center"/>
        <el-table-column prop="dataScope" label="数据范围" align="center"/>
        <el-table-column prop="useable" label="是否可用" align="center">
            <template slot-scope="{row}">
                <el-switch v-model.number="row.useable" :value="row.useable" active-value='1' inactive-value='0' :disabled="true" />
            </template>
        </el-table-column>
        <el-table-column  prop="remarks" label="备注" align="center" :show-overflow-tooltip="true" />
        <el-table-column label="创建时间" align="center" prop="createDate" width="180">
            <template slot-scope="scope">
            <span>{{scope.row.createDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button size="mini" @click="dialogFormVisible=true;dataForm=row" type="warning">
                  编辑
              </el-button>
              <el-button size="mini" @click="getMenuByRole(row.id)" type="warning">
                  分配权限
              </el-button>
              <el-button size="mini" @click="deleteRole(row,$index)" type="danger">
                  删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>


    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :model="dataForm" :rules="dataForm" label-width="80px">
        <el-form-item label="EN名称">
          <el-input v-model="dataForm.enname" placeholder="请输EN名称" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输名称" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="dataForm.type" placeholder="请输类型" />
        </el-form-item>
        <el-form-item label="是否可用">
          <el-switch v-model="dataForm.useable" :value="dataForm.useable" active-value='1' inactive-value='0' active-text="可用" inactive-text="不可用" />
        </el-form-item>
        <el-form-item label="范围">
          <el-input-number v-model.number="dataForm.dataScope" :min=1 :max=1000 />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false; dataForm={}">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="菜单权限" :visible.sync="menuVisible" width="350px">
       <el-tree
            :data="menuOptions"
            show-checkbox
            ref="menu"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuVisible = false;">取 消</el-button>
        <el-button type="primary" @click="submitMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu,getMenuIdByRoleId } from "@/api/system/menu";
import { setEmpower } from "@/api/system/role";
  export default {
    data() {
      return {
        typeOptions: [],
        queryParams: {
          keyWord: ''
        },
        tableData: [],
        page: { pageNo: 1,pageSize: 10 ,total: 0 },
        // 默认字典类型
        defaultDictType: this.$route.query.type,
        // 弹出层标题
        title: "",
        // 菜单
        menuOptions: [],
        // 
        roleId: '',
        // 是否显示弹出层
        dialogFormVisible: false,
        // 菜单弹出层
        menuVisible: false,
        // 修改 内容
        dataForm:{},
         // 表单校验
        dataRules: {
          label: [{ required: true, message: "数据标签不能为空", trigger: "blur" }],
          value: [{ required: true, message: "数据键值不能为空", trigger: "blur" }]
        },
        defaultProps: {
          children: "children",
          label: "name"
        }
      }
    },
    created() {
      this.getRoleList();
    },
    methods: {
      getRoleList(){
        this.$ajax.get('sys/role/page',this.queryParams).then((res) => {
          if (res.code === 200) {
              this.tableData = res.data.list
          }
        })
      },
      getMenuByRole(roleId){
        this.roleId = roleId;
        this.menuVisible = true;
        getMenu().then((res) => {
          if (res.code == 200) {
            this.menuOptions = res.data
            this.$refs.menu.setCheckedKeys([]);
            getMenuIdByRoleId({roleId:roleId}).then((res)=>{
              if (res.code == 200 && res.data) {
                res.data.forEach(e => {
                  var node = this.$refs.menu.getNode(e);
                  if(node && node.isLeaf){
                    this.$refs.menu.setChecked(node, true);
                  }
                });
              }
            });
          }
        });
      },
      // fron 表单数据提交
      submitForm(){
        this.$ajax.post('sys/role/save',this.dataForm).then((res)=>{
          this.$message({
            message: res.msg,
            type: res.code === 200 ? 'success' : 'error'
          })
          if (res.code === 200) {
            this.dialogFormVisible = false;
            this.getRoleList();
          }
        });
      },
      submitMenu(){
        // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
        setEmpower({id:this.roleId,menuIds:[...checkedKeys,...halfCheckedKeys]}).then((res)=>{
           this.$message({
            message: res.msg,
            type: res.code === 200 ? 'success' : 'error'
          })
          if (res.code === 200) {
            this.menuVisible = false;
          }
        });
      },
      deleteRole(row,index){
        this.$ajax.delete('sys/role/'+row.id).then((res)=>{
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          if (res.code === 200) this.tableData.splice(index,1);
        });
      }

    }
  }
</script>
<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button type="primary" size="mini" @click="addMenu('')">新增</el-button>
        </div>

        <!-- 菜单 表格 -->
        <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="name" label="名称" width="250"/>
            <el-table-column prop="target" label="目标"/>
            <el-table-column prop="icon" label="图标"/>
            <el-table-column prop="sort" label="顺序"/>
            <el-table-column label="URL" align="center" width="100" class-name="small-padding fixed-width">
              <template v-if="!row.children" slot-scope="{row}">
                  <el-popover v-show="true" placement="left" border width="378" trigger="hover">
                    <el-table :data="row.urls" stripe border>
                      <el-table-column width="80" property="name" label="名称"></el-table-column>
                      <el-table-column width="190" property="url" label="url"></el-table-column>
                      <el-table-column prop="auth" label="权限校验" width="80" >
                        <template slot-scope="{row}">
                          <el-switch disabled v-model.number="row.auth" :value="row.auth" :active-value=1 :inactive-value=0 />
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-button size="mini" @click="urlManage(row)" slot="reference">URL</el-button>
                  </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button type="primary" size="mini" @click="addMenu(row)">
                        新增
                    </el-button>
                    <el-button size="mini" type="success" @click="updateMenu(row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="dalete(row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 修改或新增 菜单  -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="manuData" :rules="manuRules" ref="manuData" label-position="left" label-width="80px" style="width: 400px; margin-left:70px;">
                <el-form-item v-if="manuData.parentName" label="父级菜单" prop="parentName">
                    <el-input v-model="manuData.parentName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="manuData.name"/>
                </el-form-item>
                <el-form-item label="菜单目标" prop="target">
                    <el-input v-model="manuData.target"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <el-input v-model="manuData.icon"></el-input>
                </el-form-item>
                <el-form-item label="菜单顺序" prop="sort">
                    <el-input type="number" min='1' v-model="manuData.sort"/>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="saveMenu()">提交</el-button>
            </div>
        </el-dialog>

        <!-- 菜单 的URL管理 -->
        <el-dialog title="URL管理" :visible.sync="dialogURLVisible">
          <div class="filter-container">
              <el-button type="primary" size="mini" @click="addMenuUrl()">新增</el-button>
          </div>
          <el-table :data="urlData" style="width: 100%;" row-key="id" stripe border default-expand-all >
            
            <el-table-column label="名称" width="100">
              <template slot-scope="{row}">
                <el-input v-model="row.name" name="name" required>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="url" label="url">
              <template slot-scope="{row}">
                <el-input v-model="row.url" name="url"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="auth" label="权限校验" width="80" >
              <template slot-scope="{row}">
                <el-switch v-model.number="row.auth" :value="row.auth" :active-value=1 :inactive-value=0 />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="daleteUrl(scope.row,scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
           <div slot="footer">
                <el-button @click="dialogURLVisible = false">取消</el-button>
                <el-button type="primary" @click="saveMenuUrl()">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        manuData:{
            parentName: '',
            name: '',
            parentId: '1',
            target: '',
            icon: '',
            sort: 1
        },
        manuRules: {
            name: [{ required: true, trigger: 'blur'}],
            icon: [{ required: true, trigger: 'blur'}],
            target: [{ required: true, trigger: 'blur'}],
            sort: [{ required: true, trigger: 'blur'}]
        },
        tableData: [],
        urlData: [],
        menuId: '',
        dialogTitle: '',
        target: 'add',
        dialogFormVisible: false,
        dialogURLVisible: false
      }
    },
    created() {
        this.getMenuList()
    },
    methods: {
      // 获取 菜单
      getMenuList(){
        this.$ajax.get('sys/menu/getNavUrl').then((res) => {
            if (res.code === 200) {
                this.tableData = res.list
            }
        })
      },
      // 新增 菜单
      addMenu(row){
        this.manuData = {}
        this.target = 'add';
        this.dialogTitle = '新增';
        this.manuData.parentName = row.name;
        this.manuData.parentId = row.id;
        this.dialogFormVisible = true;
      },
      // 点击 编辑菜单
      updateMenu(row){
        this.manuData = {}
        this.target = 'update';
        this.dialogTitle = '修改';
        this.manuData = row;
        this.dialogFormVisible = true;
      },
      // 新增 菜单
      saveMenu(){
        this.$ajax.post('sys/menu/'+this.target,this.manuData).then((res) => {
            this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
            if (res.code === 200) {
                this.dialogFormVisible = false;
                this.getMenuList();
            }
        })
      },
      // 删除 菜单
      dalete(id){
        this.$confirm('删除菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$ajax.delete('sys/menu/'+id).then((res) => {
                this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
                if (res.code === 200) this.getMenuList();
            })
        }).catch(() => {});
      },
      // 管理 URL
      urlManage(row){
        this.menuId = '';
        this.menuId = row.id;
        this.dialogURLVisible = true;
        this.urlData = [];
        this.urlDeleteData = [];
        this.urlData = row.urls;
      },
      // 添加 url
      addMenuUrl(){
        if (this.urlData == undefined) {
          this.urlData = [{menuId:this.menuId,auth: 1}];
        } else {
          this.urlData.push({menuId:this.menuId,auth: 1});
        }
      },
      // 删除 url
      daleteUrl(row,index){
        if (row.id) {
          this.$confirm('该数据已经存在数据库，是否删除', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.$ajax.delete('sys/url/'+row.id).then((res) => {
                if (res.code === 200) {
                  this.urlData.splice(index,1);
                }
              })
          }).catch(() => {});
        } else {
          this.urlData.splice(index,1);
        }
      },
      // 保存 url
      saveMenuUrl() {
        this.$ajax.post('sys/url/add',this.urlData).then((res) => {
            this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
            if (res.code === 200) {
                this.dialogURLVisible = false;
                this.getMenuList();
            }
        });
      }

    }
  }
</script>
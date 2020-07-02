<template>
    <div class="app-container">
      <div class="filter-container">
        <el-button type="primary" size="mini" >新增</el-button>
        <el-button >查询</el-button>
        <el-button >清除所有过滤器</el-button>
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
        <el-form :model="urlData" :rules="urlRules" ref="urlData" label-position="left" label-width="80px" style="width: 400px; margin-left:70px;">
                <el-form-item label="URL名称" prop="name">
                    <el-input v-model="urlData.name"/>
                </el-form-item>
                <el-form-item label="URL" prop="target">
                    <el-input v-model="urlData.url"></el-input>
                </el-form-item>
                <!-- <el-form-item label="菜单图标" prop="icon">
                    <el-switch v-model.number="urlData.auth" :value="urlData.auth" :active-value=1 :inactive-value=0 />
                </el-form-item> -->
            </el-form>
            <div slot="footer">
                <el-button @click="dialogURLVisible = false">取消</el-button>
                <el-button type="primary" @click="saveMenu()">提交</el-button>
            </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        urlData: {},
        urlRules: {},
        dialogURLVisible: false
      }
    },
    created() {
        this.getUrlList()
    },
    methods: {
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
      // 点击编辑按钮
      updateUrl(row){
        this.dialogURLVisible = true;
        this.urlData = row;

      },
      // 删除 url
      deleteUrl(row){
        this.$ajax.delete('sys/url/'+row.id).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
        });
      }
    }
  }
</script>
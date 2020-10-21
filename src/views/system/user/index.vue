<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :model="queryParams" ref="queryParams" :inline="true">
                <el-form-item label="名称" prop="name">
                <el-input v-model="queryParams.keyWord" placeholder="名称、邮箱、手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="getUserList">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="filter-container">
            <el-button type="primary" size="mini" @click="dialogFormVisible=true;dialogTitle='新增'">新增</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
            <el-table-column type="index" width="50" label="编号" align="center"/>
            <el-table-column prop="name" label="name"/>
            <el-table-column prop="loginName" label="登入名称"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="phone" label="手机号"/>
            <el-table-column prop="type" label="类型">

            </el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex == '1' ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createDate" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.createDate}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                <el-button size="mini" @click="updateUser(row)" type="warning">
                    编辑
                </el-button>
                <el-button size="mini" @click="deleteUrl(row)" type="danger">
                    删除
                </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
            <el-form ref="dataForm" :model="dataForm" :rules="dataForm" label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dataForm.name" placeholder="请输名称" />
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        queryParams: {
          keyWord: ''
        },
        dialogTitle: '',
        dialogFormVisible: false,
        dataForm: {},
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
        getUserList(){
            this.$ajax.get('sys/user/page',this.queryParams).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.page.list
                }
            })
        },
        updateUser(row){
            let name = row.name;
            this.dialogTitle = '修改(' + name + ')' 
            this.dialogFormVisible = true
            this.dataForm = row
        }
    }
  }
</script>
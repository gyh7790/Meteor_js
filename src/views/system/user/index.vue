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
            <el-button type="primary" size="mini" @click="addUser">新增</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
            <el-table-column type="index" width="50" label="编号" align="center"/>
            <el-table-column prop="name" label="name"/>
            <el-table-column prop="loginName" label="登入名称"/>
            <el-table-column prop="nickName" label="昵称"/>
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


        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="600px">
            <el-form ref="dataForm" :model="dataForm" :rules="dataFormRules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="登入名称" prop="loginName">
                        <el-input v-model="dataForm.loginName" placeholder="请输登入名称" :disabled="loginNameDis"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="昵称" prop="nickName">
                        <el-input v-model="dataForm.nickName" placeholder="请输昵称"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="dataForm.name" placeholder="请输名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                       <el-form-item label="性别">
                            <el-radio-group v-model="dataForm.sex" size="mini">
                                <el-radio :label="1" border>男</el-radio>
                                <el-radio :label="2" border>女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="dataForm.phone" placeholder="请输入手机号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="dataForm.email" placeholder="请输入邮箱" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="rowShow">
                    <el-col :span="12">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="dataForm.password" placeholder="请输密码" type="password"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="重复密码" prop="repassword">
                            <el-input v-model="dataForm.repassword" placeholder="请再出输入密码" type="password"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="角色">
                            <el-select v-model="dataForm.roles" multiple filterable clearable placeholder="请选择">
                                <el-option v-for="item in optionsRole" :key="item.id" :label="item.name" :value="item.id"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职位">
                            <el-input v-model="dataForm.phone" placeholder="请输名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                        <el-input v-model="dataForm.remarks" type="textarea" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" >
                <el-button @click="dialogFormVisible = false; dataForm={}">取 消</el-button>
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
        const equalToPassword = (rule, value, callback) => {
            if (this.dataForm.password !== value) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };
      return {
        tableData: [],
        queryParams: {
          keyWord: ''
        },
        dialogTitle: '',
        dialogFormVisible: false,
        rowShow: false,
        dataForm: {},
        loginNameDis: true,
        optionsRole: [],
        dataFormRules: {
            nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
            password: [
                { required: true, message: "新密码不能为空", trigger: "blur" },
                { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
            ],
            repassword: [
                { required: true, message: "确认密码不能为空", trigger: "blur" },
                { required: true, validator: equalToPassword, trigger: "blur" }
            ]
        }
      }
    },
    created() {
      this.getUserList();
      this.getRole();
    },
    methods: {
        getRole(){
            this.$ajax.get('sys/role/listAll').then((res) => {
                if (res.code === 200) {
                    this.optionsRole = res.list
                }
            })
        },
        getUserList(){
            this.$ajax.get('sys/user/page',this.queryParams).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.page.list
                }
            })
        },
        addUser(){

            this.dataForm={sex:1}
            this.loginNameDis=false
            this.rowShow=true
            this.dialogFormVisible=true
            this.dialogTitle='新增'
        },
        updateUser(row){
            let name = row.name;
            this.dialogTitle = '修改(' + name + ')' 
            this.rowShow=false
            this.loginNameDis=true
            this.dialogFormVisible = true
            this.dataForm = row
        },
        submitForm(){
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    console.log(this.dataForm)
                    this.$ajax.post('sys/user/save',this.dataForm).then((res)=>{
                        this.$message({
                            message: res.msg,
                            type: res.code === 200 ? 'success' : 'error'
                        })
                        if (res.code === 200) {
                            this.dialogFormVisible = false;
                            this.getUserList();
                        }
                    });
                }
            })
        }
    }
  }
</script>
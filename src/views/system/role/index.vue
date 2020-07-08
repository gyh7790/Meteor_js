<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :model="queryParams" ref="queryParams" :inline="true">
            <el-form-item label="字典名称" prop="dictType">
                <el-select v-model="queryParams.dictType" size="small">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.type"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getRoleList">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetForm('queryParams')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="filter-container">
        <el-button type="primary" size="mini" @click="addDictData">新增</el-button>
    </div>
      
    <el-table :data="tableData" stripe border default-expand-all style="width: 100%">
        <el-table-column type="index" width="50" label="编号" align="center"/>
        <el-table-column prop="enname" label="code" align="center"/>
        <el-table-column prop="name" label="名称" align="center"/>
        <el-table-column prop="type" label="类型" align="center"/>
        <el-table-column prop="dataScope" label="数据范围" align="center"/>
        <el-table-column prop="useable" label="是否可用" align="center">
            <template slot-scope="{row}">
                <el-switch v-model.number="row.useable" :value="row.useable" :active-value=1 :inactive-value=0 />
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
              <el-button size="mini" @click="updateDictData(row)" type="warning">
                  编辑
              </el-button>
              <el-button size="mini" @click="deleteDictData(row,$index)" type="danger">
                  删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>


    <!-- 添加或修改参数配置对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="dataForm" :model="dataForm" :rules="dataForm" label-width="80px">
        <el-form-item label="字典类型">
          <el-input v-model="dataForm.dictType" :disabled="true" />
        </el-form-item>
        <el-form-item label="数据标签" prop="label">
          <el-input v-model="dataForm.label" placeholder="请输入数据标签" />
        </el-form-item>
        <el-form-item label="数据键值" prop="value">
          <el-input v-model="dataForm.value" placeholder="请输入数据键值" />
        </el-form-item>
        <el-form-item label="显示排序">
          <el-input v-model.number="dataForm.sort" :min=0 />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataForm.remarks" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeOptions: [],
        queryParams: {
          dictType: this.$route.query.type
        },
        tableData: [],
        page: { pageNo: 1,pageSize: 10 ,total: 0 },
        // 默认字典类型
        defaultDictType: this.$route.query.type,
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 修改 内容
        dataForm:{},
         // 表单校验
        dataRules: {
          label: [{ required: true, message: "数据标签不能为空", trigger: "blur" }],
          value: [{ required: true, message: "数据键值不能为空", trigger: "blur" }]
        }
      }
    },
    created() {
      this.getRoleList();
    },
    methods: {
      getRoleList(){
        this.$ajax.get('sys/role/page').then((res) => {
          if (res.code === 200) {
              this.tableData = res.page.list
            console.log(this.tableData)
          }
        })
      }
    }
  }
</script>
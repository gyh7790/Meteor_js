<template>
    <div class="app-container">
      <div class="filter-container">
        <el-form :model="params" ref="params" :inline="true">
            <el-form-item label="字典名称" prop="dictType">
              <el-input v-model="params.keyWord" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getDictTypeList">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>

      <div class="filter-container">
        <el-button type="primary" size="mini" @click="addDictDictType">新增</el-button>
      </div>
      
      <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
        <el-table-column type="index" width="50" label="编号" align="center"></el-table-column>
        <el-table-column label="字典名称" align="center" prop="name" :show-overflow-tooltip="true" />
        <el-table-column label="字典类型" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <router-link :to="{ path: '/sys/dict/type/'+scope.row.id, query: { type: scope.row.type}}" class="link-type">
                <span>{{ scope.row.type }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remarks" :show-overflow-tooltip="true" />
        <el-table-column label="创建时间" align="center" prop="createDate" width="180">
            <template slot-scope="scope">
            <span>{{scope.row.createDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button size="mini" @click="updateDictType(row)" type="warning">
                编辑
              </el-button>
              <el-button size="mini" @click="deleteDictType(row,$index)" type="danger">
                删除
              </el-button>
            </template>
        </el-table-column>
      </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="params.pageNo" :limit.sync="params.pageSize" @pagination="getDictTypeList"/>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" :close-on-click-modal='true' append-to-body>
      <el-form ref="dictTypeForm" :model="dictTypeForm" :rules="dictTypeRules" label-width="80px">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="dictTypeForm.name" placeholder="请输入数据标签" />
        </el-form-item>
        <el-form-item label="字典类型" prop="type">
          <el-input v-model="dictTypeForm.type" placeholder="请输入数据键值" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dictTypeForm.remarks" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
  export default {
    components: { Pagination },
    data() {
      return {
        params: {
          keyWord:'',
          pageNo: 1,
          pageSize: 10,
        },
        total: 0,
        tableData: [],
        urlData: {},
        urlRules: {},
        dialogURLVisible: false,
        open: false,
        dictTypeForm: {},
        dictTypeRules: {
          name: [{ required: true, message: "数据标签不能为空", trigger: "blur" }],
          type: [{ required: true, message: "数据键值不能为空", trigger: "blur" }]
        },
        title: '',
      }
    },
    created() {
        this.getDictTypeList();
    },
    methods: {
      getDictTypeList(){
        this.$ajax.get('sys/dictType/page',this.params).then((res) => {
          if (res.code === 200) {
              this.total = res.data.total;
              this.tableData = res.data.list
          }
        })
      },
      cancel(){
        this.open = false;
        this.dictTypeForm = {
          name: undefined,
          type: undefined,
          remarks: undefined
        }
      },
      addDictDictType(){
        this.open = true;
        this.title = '添加字典类型';
      },
      updateDictType(row){
        this.open = true;
        this.title = '修改字典类型';
        this.dictTypeForm = {
          id: row.id,
          name: row.name,
          type: row.type,
          remarks: row.remarks
        };
      },
      submitForm(){
        this.$ajax.post('sys/dictType/save',this.dictTypeForm).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          if (res.code === 200) {
            this.getDictTypeList();
            this.cancel();
          }
        });
      },
      deleteDictType(row,index){
        this.$ajax.delete('sys/dictType/'+row.id).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          if (res.code === 200) this.tableData.splice(index,1);
        });
      }
    }
  }
</script>
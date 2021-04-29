<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :model="queryParams" ref="queryParams" :inline="true">
            <el-form-item label="类型">
                <!-- <el-select v-model="queryParams.type" size="small">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.type"/>
                </el-select> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getVideoItemList()">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetForm('queryParams')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="filter-container">
        <el-button type="primary" size="mini" @click="addDictData">新增</el-button>
    </div>
      
    <el-table :data="tableData" stripe border default-expand-all style="width: 100%">
        <el-table-column prop="on" label="集"  width="55" align="center" />
        <el-table-column prop="title" label="标题" align="center">
          <template slot-scope="{row}">
            <el-link :href="row.url" v-text="row.title" target="_blank">
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="label" label="副标题" align="center"/>
        <el-table-column prop="playTypeStr" label="类型" align="center"/>
        <el-table-column prop="img" label="图片" align="center">
          <template slot-scope="{row}">
            <el-link :href="row.url" target="_blank">
              <el-image :src="row.img" style="width: 80px; height: 50px" />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="prefixTime" label="片头时长" align="center"/>
        <el-table-column prop="suffixTime" label="片尾时长" align="center"/>
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

    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize" @pagination="getVideoItemList"/>


    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
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
    </el-dialog>

  </div>
</template>

<script>
import app from '@/api/app'
import Pagination from '@/components/Pagination'
  export default {
    components: { Pagination },
    data() {
      return {
        typeOptions: [],
        queryParams: {
          pageNo: 1,pageSize: 10,
          videoId: this.$route.query.videoId
        },
        tableData: [],
        total: 0,
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
      this.getDictTypeList();
      this.getVideoItemList(this.$route.query.videoId);
    },
    methods: {
      getDictTypeList(){
        this.$ajax.get('sys/dictType/list').then((res) => {
          if (res.code === 200) {
            this.typeOptions = res.list
          }
        })
      },
      getVideoItemList(){
        app.VIDEO_ITEM_PAGE_LIST(this.queryParams).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.list
             this.total = res.data.total
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancel(){
        this.open = false;
        this.dataForm = {
          label: undefined,
          value: undefined,
          sort: 0,
          defaults: 0,
          remarks: undefined
        }
      },
      addDictData(){
        this.open = true;
        this.title = '添加数据';
        this.dataForm = {
          dictType: this.defaultDictType,
          label: undefined,
          value: undefined,
          sort: 0,
          defaults: 0,
          remarks: undefined
        };
      },
      updateDictData(row){
        this.open = true;
        this.dataForm = row;
        this.title = '修改数据';
        if (!row.dictType) {
          this.dataForm.dictType = this.defaultDictType
        }
      },
      changeSwith(row){
        this.$ajax.put('sys/dictData/default', row ).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          if (res.code === 200) this.getDictDataList(this.defaultDictType);
        });
      },
      submitForm() {
        this.$ajax.post('sys/dictData/save', this.dataForm).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          if (res.code === 200) {
            this.getDictDataList(this.defaultDictType);
            this.cancel();
          }
        });
      },
      deleteDictData(row,index){
        this.$ajax.delete('sys/dictData/'+row.id).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          if (res.code === 200) this.tableData.splice(index,1);
        });
      }
    }
  }
</script>
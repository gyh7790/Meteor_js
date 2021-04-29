<template>
    <div class="app-container">

      <div class="filter-container">
        <el-form :model="queryParams" ref="queryParams" :inline="true">
            <el-form-item label="操作模块">
              <el-input v-model="queryParams.title" placeholder="请输入操作模块" clearable/>
            </el-form-item>
            <el-form-item label="操作人">
              <el-input v-model="queryParams.operName" placeholder="请输入操作人员" clearable/>
            </el-form-item>
            
            <el-form-item label="类型" prop="queryParams">
              <dict-list v-model="queryParams.businessType" dictType="business_type" :handleSelectChange="queryParams.businessType" clearable />
            </el-form-item>
            <el-form-item label="状态" prop="queryParams">
              <dict-list v-model="queryParams.status" dictType="oper_status" :handleSelectChange="queryParams.status" clearable />
            </el-form-item>
            <el-form-item label="操作时间" prop="queryParams">
              <el-date-picker v-model="daterange" type="daterange" @change="onDaterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getOperLog">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
      
      <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
        <el-table-column prop="title" align="center" label="操作模块"/>
        <el-table-column prop="businessType" label="操作类型">
          <template slot-scope="{row}">
            <dict-item dictType="business_type" :dictValue="row.businessType + ''" /> 
          </template>
        </el-table-column>
        <el-table-column prop="requestMethod" align="center" label="请求方式"/>
        <el-table-column prop="operName" align="center" label="操作人"/>

        <el-table-column prop="operIp" align="center" label="主机"/>
        <el-table-column prop="operLocation" align="center" label="操作地点"/>
        <el-table-column prop="statusStr" align="center" label="操作状态"/>
        <el-table-column prop="operTime" align="center" label="操作日期"/>
        <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
                <el-button type="text" icon="el-icon-view" @click="details(row)">详情</el-button>
            </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize" @pagination="getOperLog"/>

      <!-- 菜单 的URL管理 -->
      <el-dialog title="操作日志详细" :visible.sync="dialogURLVisible">
        <el-row>
            <el-col :span="12">
                <el-form-item label="URL名称" prop="name">
                <el-input v-model="rowView.title" placeholder="请输URL名称"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="URL" prop="url">
                <el-input v-model="rowView.businessType" placeholder="请输URL"/>
                </el-form-item>
            </el-col>
        </el-row>

        <div slot="footer">
            <el-button @click="dialogURLVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import log from "@/api/system/log";
import Pagination from '@/components/Pagination'
import DictList from "@/components/DictList"
import DictItem from "@/components/DictItem"
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    components: { Pagination,DictList,DictItem},
    data() {
      return {
        queryParams: {
          pageNo: 1,
          pageSize: 10,
        },
        total: 0,
        tableData: [],
        rowView: {},
        daterange: [],
        urlFormCode: true,
        dialogURLVisible: false,
        defaultProps: {
          children: "children",
          label: "name"
        }
      }
    },
    created() {
        this.getOperLog()
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
      onDaterange(){
          if (this.daterange) {
              this.queryParams.startDate = this.daterange[0];
              this.queryParams.endDate = this.daterange[1];
          }
      },
      getOperLog() {
        log.LOG_PAGE_LIST(this.queryParams).then((res) => {
          if (res.code === 200) {
              this.total = res.data.total;
              this.tableData = res.data.list
            }
        })
      },
      details(row){
          this.dialogURLVisible = true;
          this.rowView = row;
      }
    }
  }
</script>
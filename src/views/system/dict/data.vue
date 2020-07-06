<template>
  <div class="app-container">
    <div class="filter-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
            <el-form-item label="字典名称" prop="dictType">
                <el-select v-model="queryParams.dictType" size="small">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictType"
                />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="filter-container">
        <el-button type="primary" size="mini" >新增</el-button>
    </div>
      
    <el-table :data="tableData" stripe border default-expand-all style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="value" label="值" align="center"/>
        <el-table-column prop="label" label="标签" align="center"/>
        <el-table-column prop="sort" label="排序" align="center"/>
        <el-table-column prop="defaults" label="默认值" align="center" />
        <el-table-column  prop="remarks" label="备注" align="center" :show-overflow-tooltip="true" />
        <el-table-column label="创建时间" align="center" prop="createDate" width="180">
            <template slot-scope="scope">
            <span>{{scope.row.createDate}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button size="mini" @click="updateUrl(row)" type="warning">
                  编辑
              </el-button>
              <el-button size="mini" @click="deleteUrl(row)" type="danger">
                  删除
              </el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryParams: {},
        tableData: [],
        page: { pageNo: 1,pageSize: 10 ,total: 0 }
      }
    },
    created() {
      this.getDictDataList();
    },
    methods: {
        getDictDataList(){ // sys/dictData
            this.$ajax.get('sys/dictData/'+this.$route.query.type).then((res) => {
                if (res.code === 200) {
                    this.tableData = res.list
                }
            })
        }

    }
  }
</script>
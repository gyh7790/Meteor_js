<template>
    <div class="app-container">
      <div class="filter-container">
        <el-button type="primary" size="mini" >新增</el-button>
      </div>
      
      <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
        <el-table-column label="字典编号" align="center" prop="id" />
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

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="pageNo"
      :limit.sync="pageSize"
    />

    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
  export default {
    components: { Pagination },
    data() {
      return {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        urlData: {},
        urlRules: {},
        dialogURLVisible: false
      }
    },
    created() {
        this.getList();
    },
    methods: {
      getList(){
        this.$ajax.get('sys/dictType/page').then((res) => {
          if (res.code === 200) {
              this.total = res.page.total;
              this.tableData = res.page.list
          }
        })
      }
    }
  }
</script>
<template>
    <div class="app-container">

      <div class="filter-container">
        <el-form :model="queryParams" ref="queryParams" :inline="true">
            <el-form-item label="关键字">
              <el-input v-model="queryParams.keyWord" placeholder="名称、接口"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="queryParams">
              <dict-list  v-model="queryParams.type" dictType="banner_type" :handleSelectChange="queryParams.type" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getBanner">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="filter-container">
      <el-button type="primary" size="mini" @click="addBanner">新增</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%;" row-key="id" stripe border default-expand-all >
      <el-table-column prop="title" label="标题"  align="center"/>
      <el-table-column prop="label" label="副标题" align="center"/>
      <el-table-column prop="videoCode" label="视频code" align="center"/>
      <el-table-column prop="img" label="图片" align="center">
        <template slot-scope="{row}">
          <el-image :src="row.img" style="width: 80px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="target" label="目的" align="center">
        <template slot-scope="{row}">
          <dict-item :dataList="bannerTarget" :dictValue="row.target + ''" /> 
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"/>
      <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="{row}">
          <dict-item :dataList="bannerType" :dictValue="row.type" /> 
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
              <el-button size="mini" @click="updateBanner(row)" type="warning">
                  编辑
              </el-button>
              <el-button size="mini" @click="deleteBanner(row)" type="danger">
                  删除
              </el-button>
          </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize" @pagination="getBanner"/>

      <!-- 菜单 的URL管理 -->
      <el-dialog title="编辑轮播图" v-if="dialogVisible" :visible.sync="dialogVisible">
        <el-form :model="bannerForm" :rules="bannerRules" ref="bannerForm" label-position="right" label-width="80px" style="padding:0px 20px">
          <el-row>
            <el-col :span="12">
                <el-form-item label="标题" prop="title">
                <el-input v-model="bannerForm.title" placeholder="请输title名称"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="副标题" prop="label">
                <el-input v-model="bannerForm.label" placeholder="请输label"/>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
                <el-form-item label="视频编码" prop="code">
                  <el-input v-model="bannerForm.videoCode" placeholder="请输code"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="排序" prop="sort">
                   <el-input type="number" min='1' v-model="bannerForm.sort"/>
                </el-form-item> 
              </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="跳转目标" prop="menu" >
                <dict-list :selected="bannerForm.target" @select="(val)=>{this.bannerForm.target = val}" :dictData="bannerTarget"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <dict-list :selected="bannerForm.type" @select="(val)=>{this.bannerForm.type = val}" :dictData="bannerType"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="图片地址" prop="menu" >
                <el-input v-model="bannerForm.img" placeholder="请输图片地址"/>
                 <el-image :src="bannerForm.img" style="width: 180px; height: 100px" />
                <!-- <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false">
                  <img v-if="bannerForm.img" :src="bannerForm.img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="bannerForm.remarks" type="textarea" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
            <el-button @click="dialogVisible = false;">取消</el-button>
            <el-button type="primary" @click="saveBanner()">提交</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import app from '@/api/app'
import dict from '@/api/system/dict'
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
        bannerType: [],
        bannerTarget: [],
        bannerForm: {},
        bannerRules: {},
        // 菜单
        menuOptions: [],
        // 角色
        optUrlRole: [],
        dialogVisible: false,
        defaultProps: {
          children: "children",
          label: "name"
        }
      }
    },
    created() {
      this.getDict('banner_type,banner_target')
      this.getBanner()
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
      getDict(param){
        dict.DICT_DATA_BY_TYPES(param).then((res)=>{
          this.bannerType = res.data['banner_type']
          this.bannerTarget = res.data['banner_target']
        })
      },
      getBanner(){
        app.BANNER_PAGE_LIST(this.queryParams).then((res)=>{
          this.total = res.data.total
          this.tableData = res.data.list
        })
      },
      // 点击新增
      addBanner(){
        this.bannerForm = {}
        this.dialogVisible = true;
      },
      // 点击编辑按钮
      updateBanner(row){
        this.bannerForm = JSON.parse(JSON.stringify(row))
        this.dialogVisible = true;
      },
      saveBanner(){
        console.log(this.bannerForm)
        app.BANNER_SAVE(this.bannerForm).then((res) => {
          this.$msg.success(res.msg);
          this.getBanner();
          this.dialogVisible = false;
        })
      },
      // 删除
      deleteBanner(row){
        app.BANNER_DELETE(row.id).then(res => {
          this.$message({ message: res.msg, type: res.code === 200 ? 'success' : 'error'});
          this.getBanner();
          this.dialogLVisible = false;
        });
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 100px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 180px;
    height: 100px;
    display: block;
  }
</style>
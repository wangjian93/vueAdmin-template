<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-form  :inline="true" :model="listQuery" label-width="100px" style="margin-top:20px;">
      <el-form-item label="日期">
        <el-date-picker
          v-model="listQuery.effectDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">确认</el-button>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="getTree">
        <el-tab-pane label="列表组织" name="first">

          <el-table :data="orgData" border size="mini">
            <el-table-column prop="deptNo" label="部门编号"></el-table-column>
            <el-table-column prop="name" label="部门名称"></el-table-column>
            <el-table-column prop="sname" label="部门简称"></el-table-column>
            <el-table-column prop="ename" label="英文名称"></el-table-column>
            <el-table-column prop="manager" label="部门主管"></el-table-column>
            <el-table-column prop="levelName" label="部门层级"></el-table-column>
            <el-table-column prop="parentName" label="上级部门"></el-table-column>
          </el-table>

          <el-col :span="24" class="toolbar" style="padding-bottom:10px;padding-top:10px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-col>
        </el-tab-pane>

        <el-tab-pane label="树形组织" name="second" @tab-click="getTree">
          <el-tree :data="orgTreeRoot" :props="treeprops"></el-tree>
        </el-tab-pane>
    </el-tabs>
  </div>

</template>


<script>
  import { orgHis, orgTreeHis } from '@/api/org'


  export default {
    name: 'orgHistory',
    data () {
      return {
        activeName: 'first',

        listQuery: {
          effectDate: '',
          page: 1,
          limit: 20
        },
        orgData:[],
        total: null,


        treeprops:{
          children: 'children',
          label: 'label'
        },
        orgTreeRoot:[{
          label: '一级 1',
          children:[]
        }, {
          label: '一级 2',
          children:[]
        }, {
          label: '一级 3',
          children:[]
        }]
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        orgHis(this.listQuery).then(response => {
          this.orgData = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      getTree() {
        this.treeLoading = true
        orgTreeHis(this.listQuery).then(response => {
          this.orgTreeRoot = response.data
          this.treeLoading = false
        })
      }
    }
  }
</script>


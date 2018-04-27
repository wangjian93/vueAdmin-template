<template>
  <div class="app-container" >
    <el-tabs v-model="activeName" tab-position="top" type="card">
      <el-tab-pane label="列表组织" name="first">
        <el-form  :inline="true" :model="listQuery" label-width="100px" style="margin-top:20px;">
          <el-form-item label="部门">
            <el-input v-model="listQuery.dept" size="small" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item label="上级部门">
            <el-input v-model="listQuery.parent" size="small" placeholder="上级部门"></el-input>
          </el-form-item>
          <el-form-item label="部门层级">
            <!--<el-input v-model="listQuery.level" size="mini" placeholder="部门层级"></el-input>-->
            <el-select v-model="listQuery.level" size="small" clearable placeholder="请选择部门层级">
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="getList">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="list" border size="mini"
                  v-loading="listLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading">
          <!--<el-table-column prop="deptId" label="ID" width="100"></el-table-column>-->

          <el-table-column prop="deptNo" label="部门编号" align="center"></el-table-column>
          <el-table-column prop="name" label="部门名称" minWidth="120" align="center"></el-table-column>
          <el-table-column prop="sname" label="部门简称" align="center"></el-table-column>
          <el-table-column prop="ename" label="英文名称" minWidth="120" align="center"></el-table-column>
          <el-table-column prop="manager" label="部门主管" align="center"></el-table-column>
          <el-table-column prop="levelName" label="部门层级" align="center">
            <template slot-scope="scope">
              <el-tag
                size="small"
                :type="success"
                close-transition>{{scope.row.levelName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="parentName" label="上级部门" minWidth="180" align="center"></el-table-column>
          <!--<el-table-column prop="siteId" label="site" align="center"></el-table-column>-->
          <el-table-column prop="sequence" label="排序" width="50" align="center"></el-table-column>
          <el-table-column prop="path" label="path" align="left" minWidth="200"></el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar" style="padding-bottom:10px;padding-top:10px;">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
      </el-tab-pane>

      <el-tab-pane label="树形组织" name="second">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom:10px;"></el-input>
        <el-card class="box-card" shadow="hover">
          <el-tree
            v-loading="treeLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            class="filter-tree" :data="orgTreeRoot" :props="treeprops" default-expand-all :filter-node-method="filterNode" ref="tree2"></el-tree>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="图形组织" name="three">
        <orgTree
          v-loading="treeTLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="orgTreeT" @refreshTree="getTree2"></orgTree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
  import { getOrgInfo, getOrgTree, getOrgTree2, findHrCodes } from '@/api/org'
  import OrgTree from './orgTree/orgTree'

  export default {
    name: 'orgInfra',
    components: {
      OrgTree
    },
    data() {
      return {
        activeName: 'first',
        list: [],
        total: null,
        listQuery: {
          page: 1,
          limit: 20,
          dept: '',
          parent: '',
          level: undefined
        },
        treeprops: {
          children: 'children',
          label: 'label'
        },
        orgTreeRoot: [],
        filterText: '',
        orgTreeT: {},
        levelOptions: [],
        listLoading: true,
        treeLoading: true,
        treeTLoading: true
      }
    },
    created() {
      this.getList()
      this.getLevels()
      this.getTree()
      this.getTree2()
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        getOrgInfo(this.listQuery).then(response => {
          this.list = response.data.items
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
        getOrgTree(this.listQuery).then(response => {
          this.orgTreeRoot = response.data
          this.treeLoading = false
        })
      },
      getTree2(param) {
        this.treeTLoading = true
        getOrgTree2(param).then(response => {
          this.orgTreeT = response.data
          this.treeTLoading = false

        })
      },
      getLevels() {
        findHrCodes().then(response => {
          this.levelOptions = response.data
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    }
  }
</script>


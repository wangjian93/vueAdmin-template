<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-form  :inline="true" :model="listQuery" label-width="100px"  style="margin-top:20px;">
      <el-form-item label="部门">
        <el-input v-model="listQuery.dept" size="mini" placeholder="部门"></el-input>
      </el-form-item>
      <el-form-item label="上级部门">
        <el-input v-model="listQuery.parent" size="mini" placeholder="上级部门"></el-input>
      </el-form-item>
      <!--<el-form-item label="操作时间">-->
        <!--<el-input size="small"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="部门层级">
        <el-input v-model="listQuery.level" size="mini" placeholder="部门层级"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onQuery">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="orgData" border size="mini">
      <el-table-column prop="deptNo" label="部门编号"></el-table-column>
      <el-table-column prop="name" label="部门名称" minWidth="140"></el-table-column>
      <el-table-column prop="sname" label="部门简称"></el-table-column>
      <el-table-column prop="ename" label="英文名称"></el-table-column>
      <el-table-column prop="level" label="部门层级"></el-table-column>
      <el-table-column prop="effectDate" label="生效日期"></el-table-column>
      <el-table-column prop="expireDate" label="失效日期"></el-table-column>
      <el-table-column prop="actionName" label="操作类型"></el-table-column>
      <el-table-column prop="updater" label="操作人员"></el-table-column>
      <el-table-column prop="updateTime" label="操作时间"></el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar" style="padding-bottom:10px;padding-top:10px;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-col>

  </div>
</template>


<script>
  import { orgChangeHis } from '@/api/org'

  export default {
    name: 'orgChangeHistory',
    data() {
      return {
        orgData: [],
        listQuery: {
          page: 1,
          limit: 20,
          dept: '',
          parent: '',
          level: undefined
        }
      }
    },
    created() {
      this.onQuery()
    },
    methods: {
      onQuery() {
        orgChangeHis(this.listQuery).then(response => {
          this.orgData = response.data.items
          this.total = response.data.total
        })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.onQuery()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.onQuery()
      }
    }
  }
</script>


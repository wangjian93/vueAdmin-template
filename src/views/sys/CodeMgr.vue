<template>
  <div class="app-container">
    <!--<el-form :inline="true" :model="query">-->
      <!--<el-form-item label="审批人">-->
        <!--<el-input placeholder="审批人"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="活动区域">-->
        <!--<el-select placeholder="活动区域">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--<el-button type="primary">查询</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->

    <el-table :data="codes" border>
      <el-table-column prop="id" label="CodeId"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="label" label="显示"></el-table-column>
      <el-table-column prop="properties" label="属性"></el-table-column>
      <el-table-column prop="sequence" label="排序"></el-table-column>
      <el-table-column prop="category.name" label="类型"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { getCodes } from '@/api/sys'
  export default {
    name: 'codeMgr',
    data() {
      return {
        codes: []
      }
    },
    methods: {
      query() {
        getCodes().then(response => {
          this.codes = response.data
        })
      }
    },
    created() {
      this.query()
    }
  }
</script>


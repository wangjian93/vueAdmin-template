<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="min-height: 680px;">
      <el-tab-pane label="员工转正" name="first">
        <el-form  :inline="true" size="small" :model="searchForm">
          <el-form-item label="工号">
            <el-input v-model="searchForm.empId" placeholder="员工工号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" placeholder="员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="入职区间">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchForm.register"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="查询范围">
            <template>
              <el-radio-group v-model="searchForm.ifRegular">
                <el-radio :label="false">未转正</el-radio>
                <el-radio :label="true">所有</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="mini" @click="getEmployeeForRegular_">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="employee" border size="mini" style="min-height: 500px;">
        <el-table-column prop="empNo" label="工号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="registerDate" label="入职日期" align="center"></el-table-column>
        <el-table-column prop="regularDate" label="转正日期" align="center"></el-table-column>
        <el-table-column prop="deptName" label="主属部门" align="center"></el-table-column>
        <el-table-column prop="positionName" label="主岗位" align="center"></el-table-column>
        <el-table-column prop="gradeId" label="职等" align="center"></el-table-column>
        <el-table-column prop="titleId" label="职位" align="center"></el-table-column>
        <el-table-column prop="isOperator" label="DL/IDL" align="center"></el-table-column>
        <el-table-column prop="education" label="学历" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.statusId != '正式'" type="primary" size="mini" @click="regular_(scope.$index, scope.row)">转正</el-button>
          </template>
        </el-table-column>
      </el-table>

        <el-col :span="24" class="toolbar" style="padding-bottom:10px;padding-top:10px;">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableTool.current" :page-size="tableTool.pageSize" layout="total, prev, pager, next" :total="tableTool.total">
          </el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="转正记录" name="second">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getEmployeeForRegular, regular } from '@/api/mgr'

  export default {
    name: 'regularMgr',
    data() {
      return {
        activeName: 'first',
        employee: [],
        tableTool:{
          current: 1,
          pageSize: 50,
          total: 0
        },
        searchForm: {
          empNo: '',
          name: '',
          register: '',
          ifRegular: false,
          registerDateBegin: '',
          registerDateEnd: ''

        }
      }
    },
    created: function () {
      this.getEmployeeForRegular_()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val){
        this.tableTool.current = val
        this.getList()
      },
      handleCurrentChange(val){
        this.tableTool.pageSize = val
        this.getList()
      },
      getEmployeeForRegular_() {
        let params = {
          "pageSize": this.tableTool.pageSize,
          "current": this.tableTool.current,
          "ifRegular": this.searchForm.ifRegular,
          "empNo": this.searchForm.empNo,
          "name": this.searchForm.name,
          "registerDateBegin": this.searchForm.register[0],
          "registerDateEnd": this.searchForm.register[1]
        }
        getEmployeeForRegular(params).then(response => {
          this.employee = response.data
          this.tableTool.total = response.total;
        })
      },
      regular_(index, row) {
        let params = { "empId": row.id }
        regular(params).then(response => {
          this.getEmployeeForRegular_()
          this.$message({message: '转正成功', type: 'success'})
        })

      }
    }
  }

</script>


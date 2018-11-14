<template>
  <div class="app-container">
    <el-card shadow="never" style="min-height: 680px;">
      <el-form  :inline="true" :model="searchForm" label-width="100px"  style="margin-top:20px;">

        <el-form-item label="员工">
          <el-input v-model="searchForm.name" size="mini" placeholder="员工"></el-input>
        </el-form-item>


        <!--<el-form-item label="所属组织">-->
          <!--<el-input v-model="searchForm.orgUnit" placeholder="员工"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="职等">-->
          <!--<el-input v-model="searchForm.grade" placeholder="职等"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="职位">-->
          <!--<el-input v-model="searchForm.title" placeholder="职位"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="籍贯">-->
          <!--<el-input v-model="searchForm.origin" placeholder="籍贯"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="民族">-->
          <!--<el-input v-model="searchForm.nation" placeholder="民族"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="学历">-->
          <!--<el-input v-model="searchForm.education" placeholder="学历"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="组别">-->
          <!--<el-input v-model="searchForm.group" placeholder="组别"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="政治面貌">-->
          <!--<el-input v-model="searchForm.politics" placeholder="政治面貌"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="入职日期">-->
          <!--<el-input v-model="searchForm.registerDate" placeholder="入职日期"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item>
          <el-button type="primary" size="mini" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="empData" border size="mini" style="min-height: 520px;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="姓（中文)">
                <span>{{ props.row.firstName }}</span>
              </el-form-item>
              <el-form-item label="名 (中文)">
                <span>{{ props.row.lastName }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="姓（英文)">
                <span>{{ props.row.efirstName }}</span>
              </el-form-item>
              <el-form-item label="姓（英文)">
                <span>{{ props.row.elastName }}</span>
              </el-form-item>
              <el-form-item label="英文名">
                <span>{{ props.row.ename }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.gender }}</span>
              </el-form-item>
              <el-form-item label="出生日">
                <span>{{ props.row.birthDate }}</span>
              </el-form-item>
              <el-form-item label="身份证号码">
                <span>{{ props.row.idNumber }}</span>
              </el-form-item>
              <el-form-item label="名族">
                <span>{{ props.row.nation }}</span>
              </el-form-item>
              <el-form-item label="籍贯">
                <span>{{ props.row.origin }}</span>
              </el-form-item>
              <el-form-item label="学历">
                <span>{{ props.row.education }}</span>
              </el-form-item>
              <el-form-item label="政治面貌">
                <span>{{ props.row.politics }}</span>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <span>{{ props.row.isMarried }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="居住地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="身份证地址">
                <span>{{ props.row.idAddress }}</span>
              </el-form-item>
              <el-form-item label="归属公司">
                <span>{{ props.row.scopeId }}</span>
              </el-form-item>
              <el-form-item label="DL/IDL标识">
                <span>{{ props.row.isOperator }}</span>
              </el-form-item>
              <el-form-item label="组别">
                <span>{{ props.row.groupId }}</span>
              </el-form-item>
              <el-form-item label="入职时间">
                <span>{{ props.row.registerDate }}</span>
              </el-form-item>
              <el-form-item label="员工来源">
                <span>{{ props.row.source }}</span>
              </el-form-item>
              <el-form-item label="来源说明">
                <span>{{ props.row.sourceMemo }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.statusId }}</span>
              </el-form-item>
              <el-form-item label="结算方式">
                <span>{{ props.row.settlingId }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>


        <el-table-column type="index" width="40" align="center"></el-table-column>
        <el-table-column prop="empNo" label="工号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center" minWidth="100"></el-table-column>
        <el-table-column prop="positionName" label="岗位" align="center" minWidth="140"></el-table-column>
        <el-table-column prop="gradeId" label="职等" align="center"></el-table-column>
        <el-table-column prop="titleId" label="职位" align="center"></el-table-column>
        <el-table-column prop="registerDate" label="入职日期" align="center" minWidth="100"></el-table-column>
        <el-table-column prop="regularDate" label="转正日期" align="center" minWidth="100"></el-table-column>
        <el-table-column prop="isOperator" label="DL/IDL" align="center"></el-table-column>
        <el-table-column prop="education" label="学历" align="center"></el-table-column>
        <el-table-column prop="statusId" label="状态" align="center"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              @click.native.prevent="openRow(scope.$index, scope.row)"
              type="text"
              size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--<el-col :span="24" class="toolbar" style="padding-bottom:10px;">-->
        <!--<el-pagination layout="total, sizes,prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="tableTool.pageSize" :total="tableTool.total" style="float:right;">-->
        <!--</el-pagination>-->
      <!--</el-col>-->
      <el-col :span="24" class="toolbar" style="padding-bottom:10px;padding-top:10px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableTool.current" :page-sizes="[10,20,30, 50]" :page-size="tableTool.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableTool.total">
        </el-pagination>
      </el-col>
    </el-card>
  </div>
</template>

<script>

  import NProgress from 'nprogress'
  import { getEmployeeList, findEmployee } from '@/api/mgr';

  export default {
    name: 'empInfra',
    data () {
      return {
        searchForm: {
          "empId":"",
          "name":"",
          "orgUnit":"",
          "grade":"",
          "title":"",
          "origin":"",
          "nation":"",
          "education":"",
          "registerDate":"",
          "politics":""
        },
        empData:[],
        tableTool:{
          current: 1,
          pageSize: 50,
          total: 0
        }
      }
    },
    created: function() {
      this.onQuery()
    },
    methods: {
      onQuery(){
          let para = {
            "pageSize": this.tableTool.pageSize,
            "current": this.tableTool.current
          }
          findEmployee(para).then((res) => {
            this.empData = res.data;
            this.tableTool.total = res.total;
          })
      },
      openRow(index, row) {
        var empId = row.id;
        //this.$router.push({ path: '/empInfraMgr/editEmp2', query:{empId: empId}})
        this.$router.push({ path: '/empInfraMgr/employeeInfo', query:{empId: empId}})

      },
      handleSizeChange(val){
        this.tableTool.current = val
        this.getList()
      },
      handleCurrentChange(val){
        this.tableTool.pageSize = val
        this.getList()
      }
    }
  }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

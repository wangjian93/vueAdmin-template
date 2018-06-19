<template>
  <div class="app-container" style="margin-top: -20px;">
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

    <el-table :data="empData" border size="mini">
      <el-table-column prop="empNo" label="工号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="genderName" label="性别" align="center"></el-table-column>
      <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
      <el-table-column prop="position" label="岗位" align="center"></el-table-column>
      <el-table-column prop="gradeIdName" label="职等" align="center"></el-table-column>
      <el-table-column prop="titleIdName" label="职位" align="center"></el-table-column>
      <el-table-column prop="registerDate" label="入职日期" align="center"></el-table-column>
      <el-table-column prop="isOperatorName" label="DL/IDL" align="center"></el-table-column>
      <el-table-column prop="educationName" label="学历" align="center"></el-table-column>
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
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableTool.current" :page-sizes="[10,20,30, 50]" :page-size="tableTool.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-col>

  </div>
</template>

<script>

  import NProgress from 'nprogress'
  import { getEmployeeList } from '@/api/mgr';

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
          current:1,
          pageSize:50,
          total:0
        }
      }
    },
    methods: {
      onQuery(){
          var me = this;
          let para = {
            "page": me.tableTool.pageSize,
            "org":me.searchForm.org,
            "parent":me.searchForm.parent,
            "level":me.searchForm.level
          }
          NProgress.start();
          getEmployeeList( para ).then((res) => {
            me.tableTool.total = res.data.total;
            me.empData = res.data.items;
          NProgress.done();
        });
      },
      openRow(index, row) {
        var empId = row.empId;
        this.$router.push({ path: '/empInfraMgr/editEmp', query:{empId: empId}})
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

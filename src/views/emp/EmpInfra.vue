<template>
  <div>
    <el-form  :inline="true" :model="searchForm" label-width="100px" style="margin-top:20px;">

      <el-form-item label="员工">
        <el-input v-model="searchForm.name" placeholder="员工"></el-input>
      </el-form-item>
      <el-form-item label="所属组织">
        <el-input v-model="searchForm.orgUnit" placeholder="员工"></el-input>
      </el-form-item>
      <el-form-item label="职等">
        <el-input v-model="searchForm.grade" placeholder="职等"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="searchForm.title" placeholder="职位"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="searchForm.origin" placeholder="籍贯"></el-input>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="searchForm.nation" placeholder="民族"></el-input>
      </el-form-item>
      <el-form-item label="学历">
        <el-input v-model="searchForm.education" placeholder="学历"></el-input>
      </el-form-item>
      <el-form-item label="组别">
        <el-input v-model="searchForm.group" placeholder="组别"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-input v-model="searchForm.politics" placeholder="政治面貌"></el-input>
      </el-form-item>
      <el-form-item label="入职日期">
        <el-input v-model="searchForm.registerDate" placeholder="入职日期"></el-input>
      </el-form-item>
    </el-form>

    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
      <el-button type="primary" @click="onQuery">查询</el-button>
    </el-col>


    <el-table
      :data="empData"
      border
      max-height="500"
      style="width: 100%">
      <el-table-column
        fixed
        prop="empId"
        label="工号"
        width="120">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="orgUnit"
        label="部门"
        width="120">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="职等"
        width="80">
      </el-table-column>
      <el-table-column
        prop="title"
        label="职位"
        width="120">
      </el-table-column>
      <el-table-column
        prop="registerDate"
        label="入职日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="settling"
        label="DL/IDL"
        width="120">
      </el-table-column>
      <el-table-column
        prop="education"
        label="学历"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="职位"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80">
        <template scope="scope">
          <el-button
            @click.native.prevent="openRow()"
            type="text"
            size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
      <el-pagination layout="total, sizes,prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="tableTool.pageSize" :total="tableTool.total" style="float:right;">
      </el-pagination>
    </el-col>

  </div>
</template>

<script>

  import NProgress from 'nprogress'
  import { getEmployeeList } from '../../api/api';

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
            me.empData = res.data.records;
          NProgress.done();
        });
      },
      openRow(index, rows) {

      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
  }
</script>

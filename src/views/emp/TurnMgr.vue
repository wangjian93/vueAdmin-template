<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-form  :inline="true" :model="searchForm" label-width="100px" style="margin-top:10px;">
      <el-form-item label="工号">
        <el-input v-model="searchForm.empId" placeholder="员工工号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="入职区间">
        <el-date-picker
          v-model="searchForm.section"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="查询范围">
        <template>
          <el-radio class="radio" v-model="searchForm.scope" label="1">未转正</el-radio>
          <el-radio class="radio" v-model="searchForm.scope" label="2">所有</el-radio>
        </template>
      </el-form-item>

    </el-form>

    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
      <el-button type="primary" @click="onQuery">查询</el-button>
      <el-button type="primary" @click="trunBatch">批量转正</el-button>
    </el-col>

    <el-table
      :data="empData"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        fixed
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="employeeId"
        label="工号"
        width="100">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        fixed
        prop="registerDate"
        label="入职日期"
        width="120">
      </el-table-column>
      <el-table-column
        fixed
        prop="effectDate"
        label="转正日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="orgUnit"
        label="主要部门"
        >
      </el-table-column>
      <el-table-column
        prop="grade"
        label="职等"
        width="120">
      </el-table-column>
      <el-table-column
        prop="title"
        label="职位"
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
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80">
        <template scope="scope">
          <el-button v-if= "scope.row.valid > 0 "
            @click.native.prevent="trunRow(scope.$index, scope.row)"
            type="text"
            size="small">
            转正
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tableCount.current"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="tableCount.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableCount.total">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    name: 'trunMgr',
    data () {
      return {
        searchForm: {
          "scope": "1",
          "empId":"",
          "name":"",
          "section":""
        },
        empData:[{
          "employeeId":"100001",
          "name":"王小虎",
          "orgUnit":"组织部",
          "grade":"7级",
          "title":"部长",
          "registerDate":"2016-12-23",
          "effectDate":"2017-03-23",
          "settling":"",
          "education":"",
          "valid":0
        },{
          "employeeId":"100002",
          "name":"赵大龙",
          "orgUnit":"组织部",
          "grade":"7级",
          "title":"部长",
          "registerDate":"2016-12-23",
          "effectDate":"2017-02-23",
          "settling":"",
          "education":"",
          "valid":1
        }],
        tableCount:{
          current:1,
          pageSize:100,
          total:1
        }
      }
    },
    methods: {
      onQuery(){
        var me = this;
        let para = me.searchForm;
        alert( "Query" );
      },
      trunRow(index, rows) {
        alert("单个转正")
      },
      trunBatch(){
        var me = this;
        alert( "批量转正" );
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
  }
</script>

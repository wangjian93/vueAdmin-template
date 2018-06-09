<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-form :model="empInfra" :rules="rules" label-width="100px" style="margin:10px 10px 10px 10px;">

      <el-row>
        <el-col :span="8">
          <el-form-item label="员工工号"  prop="empId">
            <el-input v-model="empInfra.empId" placeholder="员工工号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="empInfra.name" placeholder="员工姓名" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离职日期">
            <el-input v-model="empInfra.registerDate" placeholder="离职日期" readonly ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="组别">
            <el-input v-model="empInfra.group" placeholder="组别" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="IDL/DL">
            <el-input v-model="empInfra.settling" placeholder="IDL/DL"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>

      <div style="margin:5px 0px 10px 20px;">复职信息</div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="职务" prop="change_title">
            <el-input v-model="empInfra.change_title" placeholder="请选择复职后职务"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职等" prop="change_grade">
            <el-input v-model="empInfra.change_grade" placeholder="请选择复职后职等"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="复职日期" prop="effect_date">
            <el-date-picker
              v-model="empInfra.effect_date"
              type="date"
              placeholder="复职日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="部门名称"   prop="orgUnit">
            <el-input v-model="empInfra.orgUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="岗位"   prop="position">
            <template>
              <el-radio class="radio" v-model="empInfra.position" label="1">主管</el-radio>
              <el-radio class="radio" v-model="empInfra.position" label="2">副主管</el-radio>
              <el-radio class="radio" v-model="empInfra.position" label="3">文员</el-radio>
              <el-radio class="radio" v-model="empInfra.position" label="4">员工</el-radio>
            </template>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-col :span="24" class="toolbar" style="margin-bottom:10px;">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button type="primary" @click="onSubmit">保存清空</el-button>
      <el-button type="primary" @click="onSubmit">清空</el-button>
    </el-col>

    <el-table
      :data="empInfra.path"
      border
      max-height="500"
      style="width: 100%">
      <el-table-column
        prop="empId"
        label="员工编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="所属组织">
      </el-table-column>
      <el-table-column
        prop="title"
        label="职务"
        width="120">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="职等"
        min-width = "100"
      >
      </el-table-column>
      <el-table-column
        prop="effect_date"
        label="生效日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="effect_date"
        label="失效日期"
        width="120">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import { generateEmpNumber,getIssuedOrgUnitInfra } from '@/api/mgr';



  export default {
    name: 'empRestore',
    data () {
      return {
        empInfra:{
          "empId": "C0605001",
          "name" : "张三",
          "registerDate" : "2016-06-08",
          "effect_date" : "2012-11-19",
          "orgUnit":"",
          "position":"",
          "title" : "",
          "grade" : "",
          "settling" : "",
          "group" : "",
          "change_title":"",
          "change_grade":""
        },
        rules: {
          empId: [
            { required: true, message: '请输入员工工号' }
          ],
          effect_date: [
            { required: true, message: '请输入员工工号' }
          ],
          change_title: [
            { required: true, message: '请输入员工工号' }
          ],
          change_grade: [
            { required: true, message: '请输入员工工号' }
          ],
          orgUnit: [
            { required: true, message: '请输入员工工号' }
          ],
          position: [
            { required: true, message: '请输入员工工号' }
          ]
        }
      }
    },
    methods: {
      onSubmit(){

      }
    }
  }
</script>

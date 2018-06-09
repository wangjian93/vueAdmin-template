<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-form  :model="empInfra" :rules="rules" label-width="100px" ref="empInfra" style="margin:10px 10px 10px 10px; ">

      <el-row>
        <el-col :span="8">
          <el-form-item label="员工工号"  prop="empId">
            <el-input v-model="empInfra.empId" placeholder="员工工号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="empInfra.name" placeholder="员工姓名" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职日期">
            <el-input v-model="empInfra.registerDate" placeholder="入职日期" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="margin:5px 0px 10px 20px;">部门信息</div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="部门名称"   prop="orgUnit">
            <template>
              <el-select
                v-model="empInfra.orgUnit"
                filterable
                remote
                clearable
                placeholder="请输入部门ID或名称"
                :remote-method="remoteGetOrg" >
                <el-option
                  v-for="item in orgUnitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
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

      <el-row>
        <el-col :span="8">
          <el-form-item label="主属部门"   prop="isMaster">
            <template>
              <el-checkbox v-model="empInfra.isMaster" >是</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="生效日期" prop="effect_date">
            <el-date-picker
              v-model="empInfra.effect_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-col :span="24" class="toolbar" style="margin-bottom:10px;">
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button type="primary" @click="onClear">清空</el-button>
    </el-col>

    <el-table
        :data="empOrgUnitList"
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
          prop="orgUnit"
          label="部门"
          width="120">
        </el-table-column>
      <el-table-column
        prop="position"
        label="职位"
        width="120">
      </el-table-column>
      <el-table-column
        prop="isMaster"
        width="140"
        label="主属部门">
      </el-table-column>
      <el-table-column
        prop="effect_date"
        label="生效日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="invalid_date"
        label="失效日期"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template scope="scope">
          <el-button
            @click="editOrg(scope.$index, scope.row)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click="voidOrg(scope.$index, scope.row)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import { getIssuedOrgUnitInfra,queryOrgUnit } from '@/api/mgr';

  export default {
    name: 'empOrgUnitMgr',
    data () {
      return {
        orgUnitList:[],
        empInfra:{
          "id":"",
          "empId": "",
          "name" : "",
          "registerDate" : "",
          "orgUnit" : "",
          "position":"",
          "isMaster":false
        },
        empOrgUnitList:[
          {
            "id":"",
            "empId": "A01010101",
            "name" : "BBBBBBB",
            "effect_date" : "2016-05-24",
            "invalid_date":"",
            "orgUnit" : "",
            "position":"",
            "isMaster":true
          }, {
             "id":"",
            "empId": "A01010101",
            "name" : "BBBBBBB",
            "effect_date" : "2016-10-23",
            "invalid_date":"",
            "orgUnit" : "",
            "position":"",
            "isMaster":false
          }
        ],
        watch:{
          'empInfra.empId':'getEmpUnitInfra'
        },
        rules: {
          empId: [
            { required: true, message: '请输入员工工号' }
          ],
          orgUnit: [
            { required: true, message: '请选择部门' }
          ],
          position: [
            { required: true, message: '请选择岗位' }
          ],
          isMaster: [
            { required: true, message: '请选择是否主属部门' }
          ],
          effect_date: [
            { required: true, message: '请选择生效日期' }
          ]
        }
      }
    },
    methods: {
      getEmpUnitInfra( value, oldValue ){
        alert( value + " " + oldValue );
       /* var me = this;
        if( me.empInfra.empId == "")  {
         me.onClear();
          return;
        }
        //--------------------------------------------------------------------------------------------------------------
        var para = { empId:value}; */


      },
      onSave(){
        var me = this;
        //--------------------------------------------------------------------------------------------------------------
        me.$refs[ "empInfra" ].validate((valid) => {
          if ( valid ) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //远程获取组织信息
      remoteGetOrg( query ) {
        var me = this;
        //--------------------------------------------------------------------------------------------------------------
        if (query !== '') {
          let para = {
            query: query
          };
          NProgress.start();
          queryOrgUnit(para).then((res) => {
            me.orgUnitList = res.data.records;
          });
          NProgress.done();
        } else {
          this.orgUnitList = [];
        }
      },
      onClear(){
        var me = this;
        //--------------------------------------------------------------------------------------------------------------
        me.$refs[ "empInfra" ].resetFields();
        me.empOrgUnitList = [];
      },
      editOrg(){

      },
      voidOrg(){

      }
    }
  }
</script>

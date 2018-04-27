<template>
  <div>
    <el-form  :model="empInfra" :rules="rules" label-width="100px" style="margin:10px 10px 10px 10px; ">

      <el-row>
        <el-col :span="8">
          <el-form-item label="员工工号"  prop="empId">
            <el-input v-model="empInfra.empId" placeholder="员工工号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="empInfra.name" placeholder="员工姓名" readonly=true></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职日期">
            <el-input v-model="empInfra.registerDate" placeholder="入职日期" readonly=true></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="margin:5px 0px 10px 20px;">证件信息</div>

      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类别" prop="idType">
            <el-select v-model="empInfra.idType" placeholder="请选择">
              <el-option
                v-for="item in idTypes"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件名称" prop="idName">
            <el-input v-model="empInfra.idName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="证件号码" prop="idNumber">
            <el-input v-model="empInfra.idNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="发放机构" prop="issuingAgency">
            <el-input v-model="empInfra.issuingAgency"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="发放日期" prop="issuingDate">
            <el-input v-model="empInfra.issuingDate"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效日期" prop="effectDate">
            <el-input v-model="empInfra.effectDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>



    </el-form>

    <el-col :span="24" class="toolbar" style="margin-bottom:10px;">
      <el-button type="primary" @click="onQuery">查询</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button type="primary" @click="onClear">清空</el-button>
    </el-col>

    <el-table
        :data="empCertificates"
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
          label="员工姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="idType"
          label="证件类型"
          width="100">
        </el-table-column>
      <el-table-column
        prop="idName"
        label="证件名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="idNumber"
        width="140"
        label="证件编号">
      </el-table-column>
      <el-table-column
        prop="issuingAgency"
        width="120"
        label="发放单位">
      </el-table-column>
      <el-table-column
        prop="issuingDate"
        label="发放日期">
      </el-table-column>
      <el-table-column
        prop="effectDate"
        label="有效日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button
            @click="editCertificate(scope.$index, scope.row)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click="voidCertificate(scope.$index, scope.row)"
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

  import util from '../../common/util'
  import NProgress from 'nprogress'
  import { generateEmpNumber,getIssuedOrgUnitInfra } from '../../api/api';

  export default {
    name: 'empCertificates',
    data () {
      return {
        idTypes:[{
          value: '1',
          label: '身份证'
        },{
          value: '2',
          label: '军官证'
        },{
          value: '3',
          label: '台胞证'
        },{
          value: '4',
          label: '护照'
        },{
          value: '4',
          label: '专业认证'
        }
        ],
        empInfra:{
          "id":"",
          "empId": "A01010101",
          "name" : "BBBBBBB",
          "idType" : "",
          "idName" : "",
          "idNumber" : "",
          "issuingAgency":"",
          "issuingDate":"",
          "effectDate":""
        },
        empCertificates:[
          {
            "id":"",
            "empId": "A01010101",
            "name" : "BBBBBBB",
            "idType" : "",
            "idName" : "",
            "idNumber" : "",
            "issuingAgency":"",
            "issuingDate":"",
            "effectDate":""
          }
        ],
        rules: {
          empId: [
            { required: true, message: '请输入员工工号' }
          ],
          relation: [
            { required: true, message: '请选择亲友关系' }
          ],
          contactName: [
            { required: true, message: '请填写亲友姓名' }
          ]
        }
      }
    },
    methods: {
      onQuery(){
        var me = this;
        //--------------------------------------------------------------------------------------------------------------
        if( me.empInfra.empId == "")  {
          me.$alert( "员工工号是必须填写的", '提醒');
          return;
        }
        //--------------------------------------------------------------------------------------------------------------
        var para = {

        };
        //--------------------------------------------------------------------------------------------------------------
        NProgress.start();

        NProgress.done();
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
      onClear(){

      },
      editCertificate(){

      },
      voidCertificate(){

      }
    }
  }
</script>

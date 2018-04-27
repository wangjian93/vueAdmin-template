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

      <div style="margin:5px 0px 10px 20px;">亲友信息</div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="亲友关系" prop="relation">
            <el-select v-model="empInfra.relation" placeholder="请选择">
              <el-option
                v-for="item in relationList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="亲友姓名" prop="contactName">
            <el-input v-model="empInfra.contactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="亲友电话" prop="contactPhone">
            <el-input v-model="empInfra.contactPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="亲友地址" prop="relation">
            <el-input v-model="empInfra.contactAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="紧急连络人" prop="relation">
            <template>
              <el-checkbox v-model="empInfra.isConnect" >是</el-checkbox>
            </template>
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
        :data="empRelatives"
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
          prop="relation"
          label="亲友关系"
          width="120">
        </el-table-column>
      <el-table-column
        prop="contactName"
        label="亲友名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="contactPhone"
        width="140"
        label="亲友电话">
      </el-table-column>
      <el-table-column
        prop="isConnect"
        width="120"
        label="紧急连络人">
      </el-table-column>
      <el-table-column
        prop="contactAddress"
        label="亲友地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template scope="scope">
          <el-button
            @click="editRelative(scope.$index, scope.row)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click="voidRelative(scope.$index, scope.row)"
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
    name: 'empRelative',
    data () {
      return {
        relationList: [{
          value: '1',
          label: '夫妻'
        }, {
          value: '2',
          label: '父子'
        }, {
          value: '3',
          label: '朋友'
        }
        ],
        empInfra:{
          "id":"",
          "empId": "A01010101",
          "name" : "BBBBBBB",
          "relation" : "",
          "contactName" : "",
          "contactPhone":"",
          "contactAddress":"",
          "isConnect":false
        },
        empRelatives:[
          {
            "id":"",
            "empId": "A01010101",
            "name" : "BBBBBBB",
            "relation" : "",
            "contactName" : "",
            "contactPhone":"",
            "contactAddress":"",
            "isConnect":false
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
      editRelative(){

      },
      voidRelative(){

      }
    }
  }
</script>

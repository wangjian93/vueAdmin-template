<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-col :span="24" class="toolbar" style="margin-bottom:10px;float:right;">
      <el-button type="primary" @click="batchImport">批量导入</el-button>
    </el-col>
    <el-form  :model="empInfra" :rules="rules" label-width="100px"  ref="empForm" style="margin:10px 10px 10px 10px; ">

      <el-row>
        <el-col :span="8">
          <el-form-item label="员工工号"  prop="empId">
            <el-input @keyup.enter="getEmpGradeInfra" v-model="empInfra.empId" placeholder="员工工号"></el-input>
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

      <el-row>
        <el-col :span="8">
          <el-form-item label="现任职务">
            <el-select disabled v-model="empInfra.title" placeholder="请选择职务">
              <el-option
                v-for="item in titleList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现任职等">
            <el-select  disabled  v-model="empInfra.grade" placeholder="请选择职等">
              <el-option
                v-for="item in gradeList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>

      <div style="margin:5px 0px 10px 20px;">调整后</div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="调整职务" prop="change_title">
            <el-select v-model="empInfra.change_title" placeholder="请选择调整后职务">
              <el-option
                v-for="item in titleList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调整职等" prop="change_grade">
            <el-select v-model="empInfra.change_grade" placeholder="请选择调整后职等">
              <el-option
                v-for="item in gradeList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
      <el-button type="primary" @click="onSaveAndClear">保存清空</el-button>
      <el-button type="primary" @click="onClear">清空</el-button>
    </el-col>

    <el-table
        :data="promotionPath"
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
       <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template scope="scope">
          <el-button
            @click="delRow(scope.$index, scope.row)"
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
  import { generateEmpNumber,getIssuedOrgUnitInfra } from '@/api/mgr';

  export default {
    name: 'empTransfer',
    data () {
      return {
        titleList:[],
        gradeList:[],
        empInfra:{
          "empId": "",
          "name" : "",
          "registerDate" : "",
          "effect_date" : "",
          "title" : "",
          "grade" : "",
          "change_title":"",
          "change_grade":""
        },
        "promotionPath":[{
         "empId": "C0605001",
         "name" : "张三",
         "title" : "",
         "grade" : "",
         "effect_date" : "",
         "void_date":""
         }],
        watch:{
          'empInfra.empId':'getEmpGradeInfra'
        },
        rules: {
          empId: [
            { required: true, message: '请输入员工工号', trigger: 'blur' }
          ],
          change_title: [
            { required: true, message: '请输入变更后的职称', trigger: 'change' }
          ],
          change_grade: [
            { required: true, message: '请输入变更后的等级', trigger: 'change' }
          ],
          effect_date: [
            { required: true, message: '请输入生效日期', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      getEmpGradeInfra(){
        alert( "123445" );
        var me = this;
        //--------------------------------------------------------------------------------------------------------------
        var me = this;
        if( me.empInfra.empId == "")  {
          me.onClear();
          return;
        }

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
      onSaveAndClear(){
        var me = this;
        //--------------------------------------------------------------------------------------------------------------

      },
      onClear(){
        var me = this;
        //--------------------------------------------------------------------------------------------------------------
      },
      batchImport(){
        var me = this;
        //--------------------------------------------------------------------------------------------------------------
      },
      delRow(){
        var me = this;
        //--------------------------------------------------------------------------------------------------------------

      }
    }
  }
</script>

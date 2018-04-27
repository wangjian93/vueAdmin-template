<template>
  <div>
    <el-form  :model="empForm" :rules="rules"  ref="empForm" label-width="100px" style="margin:10px 10px 10px 10px;">
      <el-form-item>
        <el-col :span="24" class="toolbar">
          <el-button type="primary" size="large" @click="formSubmit('empForm')">保存</el-button>
          <el-button type="primary" size="large" @click="formSubmitNext('empForm')">保存继续</el-button>
          <el-button type="primary" size="large" @click="formReset('empForm')">清空</el-button>
          <!--
          <el-button type="primary" size="large" @click="confireEmpNum">生成工号</el-button>
          <el-button type="primary" size="large" @click="formCopy('empForm')">复制模板</el-button>
          -->
          <el-button type="primary" size="large" @click="batchUpLoad">批量导入</el-button>
        </el-col>
      </el-form-item>

      <el-col :span="16" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="工号"  prop="empId">
              <el-input v-model="empForm.empId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="empForm.gender" placeholder="请选择">
                <el-option
                  v-for="item in genders"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      <el-row>
          <el-col :span="12">
            <el-form-item label="姓" prop="firstName">
              <el-input v-model="empForm.firstName"  placeholder="请输入姓"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名" prop="lastName">
              <el-input v-model="empForm.lastName"  placeholder="请输入名"></el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类别" prop="idType">
            <el-select v-model="empForm.idType" placeholder="请选择">
              <el-option
                v-for="item in idTypes"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码" prop="idNumber">
            <el-input v-model="empForm.idNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
              v-model="empForm.birthDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="nation">
            <el-select v-model="empForm.nation" placeholder="请选择">
              <el-option
                v-for="item in nationList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-col>

      <el-col :span="8">
        <div align="center" >
           <img  :src="empForm.pictureUrl"  width="160" height="180">
        </div>
        <div align="center">
          <el-upload
            class="upload-demo"
            action="//jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </el-col>

      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <el-form-item label="身份证地址" prop="idAddress">
              <el-input v-model="empForm.idAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="姓(英)" prop="efirstName">
              <el-input v-model="empForm.elastName" placeholder="请输入英文姓" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名(英)" prop="efirstName">
              <el-input v-model="empForm.efirstName" placeholder="请输入英文名" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="politics">
              <el-select v-model="empForm.politics" placeholder="请选择">
                <el-option
                  v-for="item in politics"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="isMarried">
              <el-select v-model="empForm.isMarried" placeholder="请选择">
                <el-option
                  v-for="item in marriedList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="籍贯" prop="origin">
              <el-select v-model="empForm.origin" placeholder="请选择">
                <el-option
                  v-for="item in originList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学历" prop="education">
              <el-select v-model="empForm.education" placeholder="请选择">
                <el-option
                  v-for="item in educationList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="margin:5px 0px 10px 20px;">入职信息</div>

        <el-row>
          <el-col :span="8">
            <el-form-item label="职务" prop="promotions.title">
              <el-select v-model="empForm.promotions.title" placeholder="请选择">
                <el-option
                  v-for="item in titleList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职等" prop="promotions.grade">
              <el-select v-model="empForm.promotions.grade" placeholder="请选择">
                <el-option
                  v-for="item in gradeList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IDL/DL" prop="settling">
              <el-select v-model="empForm.settling" placeholder="请选择">
                <el-option
                  v-for="item in settlingList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="结算方式" prop="isOperator">
              <el-select v-model="empForm.isOperator" placeholder="请选择">
                <el-option
                  v-for="item in operatorList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入职日期" prop="registerDate">
              <el-date-picker
                v-model="empForm.registerDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组别" prop="group">
              <el-select v-model="empForm.group" placeholder="请选择">
                <el-option
                  v-for="item in groupList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="来源" prop="source">
            <el-select v-model="empForm.source" placeholder="请选择">
              <el-option
                v-for="item in sourceList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来源说明" prop="sourceDesc">
            <el-input v-model="empForm.sourceDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="范围" prop="scope">
            <el-select v-model="empForm.scope" placeholder="请选择">
              <el-option
                v-for="item in scopeList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="主属部门"   prop="positions.orgUnit">
            <template>
              <el-select
                v-model="empForm.positions.orgUnit"
                filterable
                remote
                clearable
                placeholder="请输入关键词"
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
          <el-form-item label="岗位"   prop="positions.position">
            <template>
              <el-radio class="radio" v-model="empForm.positions.position" label="1">主管</el-radio>
              <el-radio class="radio" v-model="empForm.positions.position" label="2">副主管</el-radio>
              <el-radio class="radio" v-model="empForm.positions.position" label="3">文员</el-radio>
              <el-radio class="radio" v-model="empForm.positions.position" label="4">员工</el-radio>
            </template>
          </el-form-item>
        </el-col>
      </el-row>

        <div style="margin:5px 0px 10px 20px;">连系方式</div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="empForm.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="Email" prop="email">
            <el-input v-model="empForm.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="居住地址" prop="address">
            <el-input v-model="empForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

        <div style="margin:5px 0px 10px 20px;">紧急连络人</div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="关系" prop="relation">
            <el-select v-model="empForm.relations.relation" placeholder="请选择">
              <el-option
                v-for="item in relationList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="empForm.relations.contactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话" prop="contactPhone">
            <el-input v-model="empForm.relations.contactPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      </el-col>
    </el-form>

    <el-dialog title="批量创建" v-model="batchUploadVisible">
      <el-form :model="batchUploadForm" label-width="100px">
        <el-upload
          class="upload-demo"
          action="//jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="batchUploadForm.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能按导入模板上传Excel文件，且不超过5000kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="batchUploadVisible = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import util from '../../common/util'
  import NProgress from 'nprogress'
  import { generateEmpNumber, queryOrgUnit, getEmpMainData } from '../../api/api';

  export default {
    name: 'addEmp',
    data () {
      {
        return {
          genders: [],
          idTypes:[],
          politics:[],
          marriedList: [],
          educationList:[],
          relationList: [],
          scopeList:[],
          nationList:[],
          originList:[],
          operatorList:[],
          titleList:[],
          gradeList:[],
          settlingList:[],
          groupList:[],
          orgUnitList:[],
          sourceList:[],
          batchUploadVisible:false,
          batchUploadForm:{
            "fileList":[]
          },
          empForm: {
            "empId": "",
            "firstName": "",
            "lastName" : "",
            "name" : "",
            "efirstName" : "",
            "elastName" : "",
            "ename" : "",
            "idType": "",
            "idNumber" : "",
            "gender" : "",
            "birthDate" : "",
            "nation" : "",
            "politics" : "",
            "isMarried" : false,
            "origin" : "",
            "education" : "",
            "email" : "",
            "phone" : "",
            "idAddress" : "",
            "address" : "",
            "isOperator" : "",
            "scope":"",
            "source":"",
            "sourceDesc":"",
            "settling" : "",
            "group" : "",
            "registerDate" : "",
            "effect_date" : "",
            "pictureUrl":"./assets/user.png",
            "promotions":{"title" : "","grade" : ""},
            "relations":{"relation" : "","contactName" : "", "contactPhone" : "" },
            "positions":{ "orgUnit":"","position":""}
          },
          rules: {
            empId: [
              { required: true, message: '请获得工号', trigger: 'blur'  }
            ],
            gender: [
               { required: true, message: '请选择性别', trigger: 'change' }
            ],
            idType: [
              { required: true, message: '请选择证件类型', trigger: 'change' }
            ],
            idNumber: [
              { required: true, message: '请输入证件号码', trigger: 'blur' }
            ],
            firstName: [
              { required: true, message: '请输入姓', trigger: 'blur' }
            ],
            lastName: [
              { required: true, message: '请输入名', trigger: 'blur' }
            ],
            nation: [
              { required: true, message: '请输民族', trigger: 'blur' }
            ],
            birthDate: [
              { required: true, message: '请选择出生日期', trigger: 'change' }
            ],
            education: [
              { required: true, message: '请选择学历', trigger: 'change' }
            ],
            politics: [
              { required: true, message: '请选择政治面貌', trigger: 'change' }
            ],
            isMarried: [
              { required: true, message: '请选择婚姻状况', trigger: 'change' }
            ],
            registerDate: [
              { required: true, message: '请选择入职日期', trigger: 'change' }
            ],
            isOperator: [
              { required: true, message: '请选择结算方式', trigger: 'change' }
            ],
            "promotions.title": [
              { required: true, message: '请选择职务', trigger: 'change' }
            ],
            "promotions.grade": [
              { required: true, message: '请选择职等', trigger: 'change' }
            ],
            group: [
              { required: true, message: '请选择组别', trigger: 'change' }
            ],
            settling: [
              { required: true, message: '请选择IDL/DL', trigger: 'change' }
            ],
            "positions.orgUnit": [
              { required: true, message: '请选择部门', trigger: 'change' }
            ],
            "positions.position": [
              { required: true, message: '请选择岗位', trigger: 'change' }
            ],
            scope: [
              { required: true, message: '请选择范围', trigger: 'change' }
            ],
            source: [
              { required: true, message: '请选择来源', trigger: 'change' }
            ]
          }
        }
      }
    },
    created: function () {
      var me = this;
      //获得员工工号
      me.generateEmpID();
      //获得下拉框选项内容
      me.getMainData();
    },
    methods: {
      generateEmpID(){
        var me = this;
        NProgress.start();
        generateEmpNumber( "" ).then(( res ) => {
          me.empForm.empId = res.data.empId;
        NProgress.done();
      });
      },
      getMainData(){
        var me = this;
        getEmpMainData( "" ).then(( res ) => {
          for (var key of Object.keys( res.data )) {
             if( me[key] )me[key] = res.data[key];
          }
        });
      },
      formSubmit( formName ) {
          this.$refs[ formName ].validate((valid) => {
              if ( valid ) {
                return false;
              } else {
                return false;
              }
          });
      },
      formSubmitNext( formName ) {
          var me = this;
          this.$refs[ formName ].validate((valid) => {
              if ( valid ) {

                me.formCopy();
                return true;
              } else {
                return false;
              }
          });
      },
      formReset( formName ){
        var me = this;
        me.$refs[formName].resetFields();
        me.generateEmpID();
      },
      formCopy(  ){
          var me = this;
          me.generateEmpID();
          me.empForm.name = "";
          me.empForm.firstName = "";
          me.empForm.lastName = "";
          me.empForm.efirstName = "";
          me.empForm.elastName  = "";
          me.empForm.ename = "";
          me.empForm.idNumber = "";
          me.empForm.gender = "";
          me.empForm.birthDate = "";
          me.empForm.nation = "";
          me.empForm.origin = "";
          me.empForm.education = "";
          me.empForm.email = "";
          me.empForm.phone = "";
          me.empForm.idAddress = "";
          me.empForm.address = "";
          me.empForm.contactName = "";
          me.empForm.relation = "";
          me.empForm.contactPhone = "";
          me.empForm.isOperator = "";
          me.empForm.registerDate = "";
          me.empForm.effect_date = "";
          me.empForm.settling = "";
      },
      batchUpLoad()
      {
         var  me = this;
         me.batchUploadVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //远程获取组织信息
      remoteGetOrg( query ) {
        var me = this;
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
      handleSelect(item) {
        alert( item );
      }
    }
  }
</script>

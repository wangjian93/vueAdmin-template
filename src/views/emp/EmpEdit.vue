<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-form  :model="empForm" status-icon :rules="rules" ref="empForm" size="small" label-position="left" label-width="100px" style="margin:10px 10px 10px 10px;">
      <el-form-item>
        <el-button type="primary" size="small" @click="formSubmit('empForm')">保存</el-button>
        <!--<el-button type="success" size="small" @click="formReset('empForm')">清空</el-button>-->
        <el-button type="success" size="small" @click="formReset('empForm')">导出</el-button>
      </el-form-item>

      <el-card class="box-card">
        <div style="margin:5px 0px 10px 20px;">基本信息</div>
        <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
          <el-col :span="8">
            <el-form-item label="工号"  prop="empNo">
              <el-input v-model="empForm.base.empNo"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
              <el-select v-model="empForm.base.gender" placeholder="请选择">
                <el-option
                  v-for="item in genderList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="姓名"  prop="name">
              <el-input v-model="empForm.base.name"></el-input>
            </el-form-item>

            <el-form-item label="英文名"  prop="ename">
              <el-input v-model="empForm.base.ename"></el-input>
            </el-form-item>

            <el-form-item label="姓 (中文)"  prop="firstName">
              <el-input v-model="empForm.base.firstName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名 (中文)"  prop="firstName">
              <el-input v-model="empForm.base.lastName"></el-input>
            </el-form-item>

            <el-form-item label="姓 (英文)"  prop="efirstName">
              <el-input v-model="empForm.base.efirstName"></el-input>
            </el-form-item>

            <el-form-item label="名 (英文)"  prop="elastName">
              <el-input v-model="empForm.base.elastName"></el-input>
            </el-form-item>

            <el-form-item label="身份证号" prop="idNumber">
              <el-input v-model="empForm.base.idNumber"></el-input>
            </el-form-item>

            <el-form-item label="出生日期" prop="birthDate">
              <el-date-picker
                v-model="empForm.base.birthDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" align="center">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="empForm.imageUrl" :src="empForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
          <el-col :span="8">
            <el-form-item label="民族" prop="nation">
              <el-select v-model="empForm.base.nation" placeholder="请选择">
                <el-option
                  v-for="item in nationList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="籍贯" prop="origin">
              <el-select v-model="empForm.base.origin" placeholder="请选择">
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
              <el-select v-model="empForm.base.education" placeholder="请选择">
                <el-option
                  v-for="item in educationList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="政治面貌" prop="politics">
              <el-select v-model="empForm.base.politics" placeholder="请选择">
                <el-option
                  v-for="item in politicsList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="isMarried">
              <el-select v-model="empForm.base.isMarried" placeholder="请选择">
                <el-option
                  v-for="item in marriedList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <div style="margin:5px 0px 10px 20px;">连系方式</div>
        <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
          <el-col :span="8">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="empForm.base.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email" prop="email">
              <el-input v-model="empForm.base.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
          <el-col :span="24">
            <el-form-item label="居住地址" prop="address">
              <el-input v-model="empForm.base.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
          <el-col :span="24">
            <el-form-item label="身份证地址" prop="idAddress">
              <el-input v-model="empForm.base.idAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="margin:5px 0px 10px 20px;">紧急联络人</div>
        <el-row :gutter="80" style="margin:5px 0px 10px 20px;" v-for="(f, index) in empForm.family">
          <el-col :span="8">
            <el-form-item label="姓名" prop="contactName">
              <el-input v-model="f.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="contactPhone">
              <el-input v-model="f.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关系" prop="relation">
              <el-select v-model="f.relation" placeholder="请选择">
                <el-option
                  v-for="item in relationList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="2">-->
          <!--<el-button @click.prevent="removeDomain(f)">删除</el-button>-->
          <!--</el-col>-->
        </el-row>
        <!--<el-row>-->
        <!--<el-button @click="addDomain">添加亲属</el-button>-->
        <!--</el-row>-->

        <div style="margin:5px 0px 10px 20px;">入职信息</div>
        <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
          <el-col :span="8">
            <el-form-item label="职务">
              <el-select v-model="empForm.promotion.titleId" placeholder="请选择">
                <el-option
                  v-for="item in titleIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="主属部门">
              <template>
                <el-input
                  v-model="empForm.position.orgName"
                  @click.native="showInnerVisible"
                  placeholder="请输入部门"
                  :disabled=orgInfraDialog.parent>
                </el-input>
              </template>
            </el-form-item>

            <el-form-item label="来源" prop="source">
              <el-select v-model="empForm.base.source" placeholder="请选择">
                <el-option
                  v-for="item in sourceList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="入职日期" prop="registerDate">
              <el-date-picker
                v-model="empForm.base.registerDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职等">
              <el-select v-model="empForm.promotion.gradeId" placeholder="请选择">
                <el-option
                  v-for="item in gradeIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="岗位">
              <el-select v-model="empForm.position.posId" placeholder="请选择">
                <el-option
                  v-for="item in selectList.positionList"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="来源说明" prop="sourceMemo">
              <el-input v-model="empForm.base.sourceMemo"></el-input>
            </el-form-item>

            <el-form-item label="组别" prop="group">
              <el-select v-model="empForm.base.groupId" placeholder="请选择">
                <el-option
                  v-for="item in groupIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算方式" prop="settling">
              <el-select v-model="empForm.base.settlingId" placeholder="请选择">
                <el-option
                  v-for="item in settlingList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="IDL/DL" prop="isOperator">
              <el-select v-model="empForm.base.isOperator" placeholder="请选择">
                <el-option
                  v-for="item in operatorList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="范围" prop="scopeId">
              <el-select v-model="empForm.base.scopeId" placeholder="请选择">
                <el-option
                  v-for="item in scopeIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态"   prop="statusId">
              <el-select v-model="empForm.base.statusId" placeholder="请选择">
                <el-option
                  v-for="item in statusIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-card>
    </el-form>

    <el-dialog
      width="30%"
      title="部门选择"
      :visible.sync="orgInfraDialog.innerVisible"
      append-to-body>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom:10px;"></el-input>
      <el-card class="box-card" shadow="always" style="height:400px;overflow:auto;">
        <el-tree
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          class="filter-tree"
          :data="orgTree"
          node-key="id"
          :props="treeprops"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
          :highlight-current="true"
          :filter-node-method="filterNode"
          ref="tree"
          accordion
          append-to-body></el-tree>
      </el-card>
    </el-dialog>

  </div>
</template>

<script>

  import NProgress from 'nprogress'
  import { getEmpBasicInfra, queryOrgUnit, getEmpMainData, getEmpInfo, getFamily, getPromotion, getPosition, getPositionList, updateEmp } from '@/api/mgr';
  import { getOrgTree } from '@/api/org'
  import img_404 from '@/assets/404_images/404.png'

  export default {
    name: 'editEmp',
    data () {
      {
        return {
          isEdit: false,

          orgInfraDialog: {
            innerVisible: false
          },
          filterText: '',
          orgTree: [],
          treeprops: {
            children: 'children',
            label: 'label'
          },

          genderList: [
            {label: '男', value: '0'},
            {label: '女', value: '1'}
          ],
          nationList: [
            {label: '汉族', value: '0'},
            {label: '藏族', value: '1'}
          ],
          originList: [
            {label: '上海', value: '0'},
            {label: '北京', value: '1'},
            {label: '江苏', value: '2'}
          ],
          educationList: [
            {label: '专科', value: '0'},
            {label: '本科', value: '1'},
            {label: '研究生', value: '2'},
            {label: '博士', value: '3'},
            {label: '其他', value: '4'}
          ],
          politicsList:[
            {label: '党员', value: '0'},
            {label: '团员', value: '1'},
            {label: '其他', value: '2'}
          ],
          marriedList: [
            {label: '未婚', value: '0'},
            {label: '已婚', value: '1'},
            {label: '离异', value: '2'}
          ],
          relationList: [
            {label: '父亲', value: '0'},
            {label: '母亲', value: '1'},
            {label: '兄弟', value: '2'},
            {label: '姐妹', value: '3'},
            {label: '朋友', value: '4'},
            {label: '其他', value: '5'}
          ],
          scopeIdList: [
            {label: 'IVO', value: '0'},
            {label: 'IVE', value: '1'}
          ],
          operatorList:[
            {label: 'IDL', value: '0'},
            {label: 'DL', value: '1'}
          ],

          groupIdList: [
            {label: 'J', value: '0'},
            {label: 'T', value: '1'},
            {label: 'C', value: '2'}
          ],
          sourceList:[
            {label: '推荐', value: '0'},
            {label: '外包', value: '1'},
            {label: '派遣', value: '2'}
          ],
          statusIdList: [
            {label: '临时', value: '0'},
            {label: '实习', value: '1'},
            {label: '试用', value: '2'},
            {label: '正式', value: '3'}
          ],
          gradeIdList: [
            {label: 'G5', value: '0'},
            {label: 'G6', value: '1'},
            {label: 'G7', value: '2'}
          ],
          titleIdList: [
            {label: '员工', value: '0'},
            {label: '课长', value: '1'},
            {label: '经理', value: '2'}
          ],
          orgUnitList:[
            {label: '电子商务服务课', value: '5d85ad81dfe24414836c460e837091a9'},
          ],

          positionList: [],
          settlingList: [
            {label: '未定义', value: '0'}
          ],

          idTypes:[],
          batchUploadVisible:false,
          batchUploadForm:{
            "fileList":[]
          },




          selectList: {
            genderList: [
              {label: '男', value: '0'},
              {label: '女', value: '1'}
            ],
            nationList: [
              {label: '汉族', value: '0'},
              {label: '藏族', value: '1'}
            ],
            originList: [
              {label: '上海', value: '0'},
              {label: '北京', value: '1'},
              {label: '江苏', value: '2'}
            ],
            educationList: [
              {label: '专科', value: '0'},
              {label: '本科', value: '1'},
              {label: '研究生', value: '2'},
              {label: '博士', value: '3'},
              {label: '其他', value: '4'}
            ],
            politicsList: [
              {label: '党员', value: '0'},
              {label: '团员', value: '1'},
              {label: '其他', value: '2'}
            ],
            marriedList: [
              {label: '未婚', value: '0'},
              {label: '已婚', value: '1'},
              {label: '离异', value: '2'}
            ],
            relationList: [
              {label: '父亲', value: '0'},
              {label: '母亲', value: '1'},
              {label: '兄弟', value: '2'},
              {label: '姐妹', value: '3'},
              {label: '朋友', value: '4'},
              {label: '其他', value: '5'}
            ],
            scopeIdList: [
              {label: 'IVO', value: '0'},
              {label: 'IVE', value: '1'}
            ],
            operatorList: [
              {label: 'IDL', value: '0'},
              {label: 'DL', value: '1'}
            ],

            groupIdList: [
              {label: 'C', value: '0'},
              {label: 'J', value: '2'},
              {label: 'T', value: '3'}

            ],
            sourceList: [
              {label: '推荐', value: '0'},
              {label: '外包', value: '1'},
              {label: '派遣', value: '2'}
            ],
            statusIdList: [
              {label: '临时', value: '0'},
              {label: '实习', value: '1'},
              {label: '试用', value: '2'},
              {label: '正式', value: '3'}
            ],
            gradeIdList: [
              {label: 'G5', value: '0'},
              {label: 'G6', value: '1'},
              {label: 'G7', value: '2'}
            ],
            titleIdList: [
              {label: '员工', value: '0'},
              {label: '课长', value: '1'},
              {label: '经理', value: '2'}
            ],
            orgUnitList: [
              {label: '电子商务服务课', value: '5d85ad81dfe24414836c460e837091a9'},
            ],

            positionList: [],
            settlingList: [
              {label: '未定义', value: '0'}
            ]
          },
          empForm: {
            base: {
              empNo: '',             //工号
              firstName: '',         //姓（中文）
              lastName: '',          //名 (中文)
              name: '',              //姓名
              efirstName: '',        //姓（英文）
              elastName: '',         //名（英文）
              ename: '',             //英文名
              gender: '',            //性别
              birthDate: '',         //出生日
              idNumber: '',          //身份证号码
              nation: '',            //名族
              origin: '',            //籍贯
              education: '',         //学历
              politics: '',          //政治面貌
              isMarried: '',         //婚姻状况
              email: '',             //邮箱
              phone: '',             //电话
              address: '',           //居住地址
              idAddress: '',         //身份证地址

              scopeId: '',           //归属公司，或叫员工范围
              isOperator: '',        //DL/IDL标识
              groupId: '',           //组别－J team; T team; C team   通过组别可控制是否需要打卡
              firstRegisterDate: '', //初次入职时间；用于控制复职员工的年资；如果FIRST_REGISTER_DATE与REGISTER_DATE不相等就是复职人员
              registerDate: '',      //入职时间
              regularDate: '',       //转正日期
              resignDate: '',        //离职日期
              source: '',           //员工来源；推荐、外包、派遣
              sourceMemo: '',        //来源说明备注  公司名称、员工工号
              statusId: '',         //状态：临时、实习、试用、正式
              effectDate: '',        //生效日
              expireDate: '',        //失效日
              settlingId: ''         //结算方式
            },

            family: [
              {relation: '', name: '', phone: '', isKey: 's'},
            ],                  //紧急联系人

            promotion: {gradeId: '', titleId: ''},     //职务（晋升）
            position: {posId: '', isMaster: '', orgUnit: '', posName: '', orgName: ''},  //岗位

            imageUrl: ''
          },
          rules: {
//            empId: [
//              { required: true, message: '请获得工号', trigger: 'blur'  }
//            ],
//            gender: [
//               { required: true, message: '请选择性别', trigger: 'change' }
//            ],
//            idType: [
//              { required: true, message: '请选择证件类型', trigger: 'change' }
//            ],
//            idNumber: [
//              { required: true, message: '请输入证件号码', trigger: 'blur' }
//            ],
//            firstName: [
//              { required: true, message: '请输入姓', trigger: 'blur' }
//            ],
//            lastName: [
//              { required: true, message: '请输入名', trigger: 'blur' }
//            ],
//            nation: [
//              { required: true, message: '请输民族', trigger: 'blur' }
//            ],
//            birthDate: [
//              { required: true, message: '请选择出生日期', trigger: 'change' }
//            ],
//            education: [
//              { required: true, message: '请选择学历', trigger: 'change' }
//            ],
//            politics: [
//              { required: true, message: '请选择政治面貌', trigger: 'change' }
//            ],
//            isMarried: [
//              { required: true, message: '请选择婚姻状况', trigger: 'change' }
//            ],
//            registerDate: [
//              { required: true, message: '请选择入职日期', trigger: 'change' }
//            ],
//            isOperator: [
//              { required: true, message: '请选择结算方式', trigger: 'change' }
//            ],
//            group: [
//              { required: true, message: '请选择组别', trigger: 'change' }
//            ],
//            settling: [
//              { required: true, message: '请选择IDL/DL', trigger: 'change' }
//            ],
//            scope: [
//              { required: true, message: '请选择范围', trigger: 'change' }
//            ],
//            source: [
//              { required: true, message: '请选择来源', trigger: 'change' }
//            ]
          }
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
    },
    created: function () {
      var me = this;
      //获得下拉框选项内容
      me.getMainData();
      var params = {empId : this.$route.query.empId}
      getEmpInfo(params).then(response => {
        this.empForm.base = response.data
        this.empForm.imageUrl = 'api/SpringMVC006/image?empNo=' + this.empForm.base.empNo
      })
      getFamily(params).then(response => {
        this.empForm.family = response.data
      })
      getPromotion(params).then(response => {
        this.empForm.promotion = response.data
      })
      getPosition(params).then(response => {
        this.empForm.position = response.data
        this.deptName
        this.getPositions(this.empForm.position.orgUnit)
      })
      //获取组织树
      me.getTree()
    },
    methods: {
      getTree() {
        getOrgTree().then(response => {
          this.orgTree = response.data
        })
      },
      showInnerVisible() {
        this.orgInfraDialog.innerVisible = true
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        this.orgInfraDialog.innerVisible = false
        this.empForm.position.orgName = "["+data.id+"]" + data.label
        this.empForm.position.orgUnit = data.attributes[0].id
        this.getPositions(this.empForm.position.orgUnit)
      },
      getPositions(deptId) {
        let param = { 'deptId': deptId }
        getPositionList(param).then(response => {
          this.selectList.positionList = response.data
        })
      },

      formSubmit( formName ) {
        var flag
        this.$refs[ formName ].validate((valid) => {
          if ( valid ) {
            flag = true
          } else {
            flag = false
          }
        });
        console.log(flag)

        if(flag) {
          updateEmp(this.empForm.base).then(response => {
            var empNo = response.empNo
            this.empForm.empNo = empNo
            console.log(this.empForm.empNo)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        }
      },

      getEmpFormInfra(  ){
        //var me = this;
        alert(  "1234" );
      /*  var param = { empId:value };
        getEmpBasicInfra( param ).then(( res ) => {
            me.empForm = res.data.empInfra
       }); */

      },
      getMainData(){
        var me = this;
        getEmpMainData( "" ).then(( res ) => {
          for (var key of Object.keys( res.data )) {
          if( me[key] )me[key] = res.data[key];
        }
      });
      },
      formReset( formName ){
        var me = this;
        me.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
    },
    watch: {
      empForm:{
        handler:function(obj){
          console.log(obj);
        },
        deep:true
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 220px;
    height: 220px;
    line-height: 220px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 220px;
    display: block;
  }
</style>

<template>
  <div>
    <el-card class="box-card">
      <el-form  :model="empForm" ref="empForm" size="small" label-position="left" label-width="100px" style="margin:10px 10px 10px 10px;">
        <el-card class="box-card">
          <el-row>
            <el-button size="small" @click="back()">返回</el-button>
            <el-button type="primary" size="small" @click="save()">保存</el-button>
            <!--<el-button type="success" size="small" @click="saveNext()">保存继续</el-button>-->
            <!--<el-button type="info" size="small" @click="formReset('empForm')">清空</el-button>-->
          </el-row>
          <p></p>

          <div class="tip">
            <p>基本信息</p>
          </div>
          <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
            <el-col :span="8">
              <el-form-item label="工号"  prop="empNo">
                <el-input v-model="empForm.employee.empNo"></el-input>
              </el-form-item>

              <el-form-item label="性别" prop="gender">
                <el-select v-model="empForm.employee.gender" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.genderList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="姓名"  prop="name">
                <el-input v-model="empForm.employee.name"></el-input>
              </el-form-item>

              <el-form-item label="英文名"  prop="ename">
                <el-input v-model="empForm.employee.ename"></el-input>
              </el-form-item>

              <el-form-item label="姓 (中文)"  prop="firstName">
                <el-input v-model="empForm.employee.firstName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="名 (中文)"  prop="firstName">
                <el-input v-model="empForm.employee.lastName"></el-input>
              </el-form-item>

              <el-form-item label="姓 (英文)"  prop="efirstName">
                <el-input v-model="empForm.employee.efirstName"></el-input>
              </el-form-item>

              <el-form-item label="名 (英文)"  prop="elastName">
                <el-input v-model="empForm.employee.elastName"></el-input>
              </el-form-item>

              <el-form-item label="身份证号" prop="idNumber">
                <el-input v-model="empForm.employee.idNumber"></el-input>
              </el-form-item>

              <el-form-item label="出生日期" prop="birthDate">
                <el-date-picker
                  v-model="empForm.employee.birthDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" align="center">
              <el-upload
                class="avatar-uploader"
                :data="image.data"
                action="api/SpringMVC006/fileUpload3.do"
                :show-file-list="true"
                :limit=1
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="image.url" v-bind:src="image.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-col>
          </el-row>
          <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
            <el-col :span="8">
              <el-form-item label="民族" prop="nation">
                <el-select v-model="empForm.employee.nation" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.nationList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="籍贯" prop="origin">
                <el-select v-model="empForm.employee.origin" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.originList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历" prop="education">
                <el-select v-model="empForm.employee.education" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.educationList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="政治面貌" prop="politics">
                <el-select v-model="empForm.employee.politics" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.politicsList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况" prop="isMarried">
                <el-select v-model="empForm.employee.isMarried" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.marriedList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="tip">
            <p>连系方式</p>
          </div>
          <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
            <el-col :span="8">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="empForm.employee.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Email" prop="email">
                <el-input v-model="empForm.employee.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
            <el-col :span="24">
              <el-form-item label="居住地址" prop="address">
                <el-input v-model="empForm.employee.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
            <el-col :span="24">
              <el-form-item label="身份证地址" prop="idAddress">
                <el-input v-model="empForm.employee.idAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="tip">
            <p>紧急联络人</p>
          </div>
          <el-row :gutter="80" style="margin:5px 40px 10px 40px;" v-for="(f, index) in empForm.family">
            <el-table :data="empForm.family" border size="mini">
              <el-table-column type="index" width="40" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" align="center"></el-table-column>
              <el-table-column prop="relation" label="关系" align="center"></el-table-column>
              <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
            </el-table>
          </el-row>
          <!--<el-row :gutter="80" style="margin:5px 0px 10px 20px;" v-for="(f, index) in empForm.family">-->
            <!--<el-col :span="8">-->
              <!--<el-form-item label="姓名" prop="contactName">-->
                <!--<el-input v-model="f.name"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<el-form-item label="电话" prop="contactPhone">-->
                <!--<el-input v-model="f.phone"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<el-form-item label="关系" prop="relation">-->
                <!--<el-select v-model="f.relation" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in selectList.relationList"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <!--&lt;!&ndash;<el-col :span="2">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button @click.prevent="removeDomain(f)">删除</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
          <!--</el-row>-->
          <!--<el-row>-->
          <!--<el-button @click="addDomain">添加亲属</el-button>-->
          <!--</el-row>-->

          <div class="tip">
            <p>入职信息</p>
          </div>
          <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
            <el-col :span="8">
              <el-form-item label="职务">
                <el-select v-model="empForm.promotion.titleId" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.titleIdList"
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
                <el-select v-model="empForm.employee.source" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.sourceList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="入职日期" prop="registerDate">
                <el-date-picker
                  v-model="empForm.employee.registerDate"
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
                    v-for="item in selectList.gradeIdList"
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
                <el-input v-model="empForm.employee.sourceMemo"></el-input>
              </el-form-item>

              <el-form-item label="组别" prop="group">
                <el-select v-model="empForm.employee.groupId" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.groupIdList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算方式" prop="settling">
                <el-select v-model="empForm.employee.settlingId" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.settlingList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="IDL/DL" prop="isOperator">
                <el-select v-model="empForm.employee.isOperator" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.operatorList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="范围" prop="scopeId">
                <el-select v-model="empForm.employee.scopeId" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.scopeIdList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="状态"   prop="statusId">
                <el-select v-model="empForm.employee.statusId" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.statusIdList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-card>
      </el-form>
    </el-card>

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
  import { saveEmp, createFamily, getPositionList, saveEmployee, saveEmployee2, queryNotSubmitEmployee,
    submitEmployeeBatch, findEmployeeById, updateEmployee } from '@/api/mgr';
  import { getOrgTree } from '@/api/org';
  import { getEmployeeSelectOptions } from '@/api/sys';

  export default {
    name: 'addEmp2',
    data() {
      return {
        empForm: {
          employee: {
            id: '',
            empNo: '',
            firstName: '',                   //姓（中文）
            lastName: '',                    //名 (中文)
            name: '',                      //姓名
            efirstName: '',               //姓（英文）
            elastName: '',                //名（英文）
            ename: '',                //英文名
            gender: '',                      //性别
            birthDate: '',          //出生日
            idNumber: '',    //身份证号码
            nation: '',                      //名族
            origin: '',                      //籍贯
            education: '',                   //学历
            politics: '',                    //政治面貌
            isMarried: '',                   //婚姻状况
            email: '',         //邮箱
            phone: '',                   //电话
            address: '',                   //居住地址
            idAddress: '',                 //身份证地址
            scopeId: '',                     //归属公司，或叫员工范围
            isOperator: '',                  //DL/IDL标识
            groupId: '',                     //组别－J team; T team; C team   通过组别可控制是否需要打卡
            registerDate: '',       //入职时间
            source: '',                      //员工来源；推荐、外包、派遣
            sourceMemo: '',                   //来源说明备注  公司名称、员工工号
            statusId: '',                    //状态：临时、实习、试用、正式
            settlingId: '',                  //结算方式
          },

          family: [
            {relation: '', name: '', phone: '', isKey: ''},
          ],                  //紧急联系人

          promotion: {gradeId: '', titleId: ''},     //职务（晋升）

          position: {posId: '', isMaster: '', orgUnit: '', orgName: ''}    //岗位
        },

        image: {
          url: '',
          data: {
            empId: ''
          }
        },


        orgInfraDialog: {
          innerVisible: false
        },
        filterText: '',
        orgTree: [],
        treeprops: {
          children: 'children',
          label: 'label'
        },

        selectList: {
          genderList: [],
          nationList: [],
          originList: [],
          educationList: [],
          politicsList: [],
          marriedList: [],
          relationList: [],
          scopeIdList: [],
          operatorList: [],
          groupIdList: [],
          sourceList: [],
          statusIdList: [],
          gradeIdList: [],
          titleIdList: [],
          settlingList: [{label: '未定义', value: '0'}],
          positionList: []
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
    },
    created: function () {
      this.getSelectList()
      this.getTree()
      this.getEmployeeInfo()
      this.image.data.empId = this.$route.query.empId
      this.image.url = 'api/SpringMVC006/image?empId=' + this.$route.query.empId
    },
    methods: {

      //获取组织树
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

      //选择岗位
      getPositions(deptId) {
        let param = { 'deptId': deptId }
        getPositionList(param).then(response => {
          this.selectList.positionList = response.data
        })
      },

      //获取下拉框选项
      getSelectList() {
        getEmployeeSelectOptions().then(response => {
          console.log(response.data)
          this.selectList.genderList = response.data.gender
          this.selectList.nationList = response.data.nation
          this.selectList.originList = response.data.origin
          this.selectList.educationList = response.data.education
          this.selectList.politicsList = response.data.politics
          this.selectList.marriedList = response.data.isMarried
          this.selectList.relationList = response.data.relation
          this.selectList.scopeIdList = response.data.scopeId
          this.selectList.operatorList = response.data.isOperator
          this.selectList.groupIdList = response.data.groupId
          this.selectList.sourceList = response.data.source
          this.selectList.statusIdList = response.data.statusId
          this.selectList.gradeIdList = response.data.gradeId
          this.selectList.titleIdList = response.data.titleId

        })
      },

      //图片上传前
      beforeAvatarUpload(file) {
        if(this.image.data.empId === '') {
          this.$message.error('上传前请先保存');
          return false
        }
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M
      },

      //图片上传成功后
      handleAvatarSuccess(res, file) {
        var empId = this.image.data.empId;
        this.image.url = 'api/SpringMVC006/image?empId=' + empId;
      },


      //获取员工基础信息
      getEmployeeInfo() {
        var empId = this.$route.query.empId
        var param = { 'empId': empId }
        findEmployeeById(param).then(response => {
          this.empForm.employee = response.employee
          this.empForm.family = response.families
          this.empForm.promotion = response.promotion
        })
      },

      //获取职务信息
      getPromotionInfo() {
        var empId = this.$route.query.empId
        var param = { 'empId': empId }
      },

      //获取岗位信息
      getPositionInfo() {
        var empId = this.$route.query.empId
        var param = { 'empId': empId }
      },

      //获取亲属信息
      getFamilyInfo() {
        var empId = this.$route.query.empId
        var param = { 'empId': empId }
      },

      //保存更改
      save() {
        updateEmployee(this.empForm.employee).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
      },

      save2(empId) {
        var param = {};
        param.relation = this.empForm.family[0].relation
        param.name = this.empForm.family[0].name
        param.phone = this.empForm.family[0].phone
        param.gradeId = this.empForm.promotion.gradeId
        param.titleId =  this.empForm.promotion.titleId
        param.posId =  this.empForm.position.posId
        param.empId = empId

        saveEmployee2(param).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
      },


      //保存后继续
      saveNext() {
        saveEmployee(this.empForm.employee).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.image.data.empId = response.empId
        })
      },

      //返回
      back() {
        this.$router.push({ path: '/empInfraMgr/empInfra'})
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

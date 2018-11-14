<template>
  <div class="app-container">
    <el-card class="box-card">

      <h4>
        个人信息
        <el-button
          v-if="!editFlag.personalInformation"
          size="small"
          type="text"
          icon="el-icon-edit"
          @click="editFlag.personalInformation=true">
          修改
        </el-button>
        <el-button
          v-if="editFlag.personalInformation"
          size="small"
          type="text"
          icon="el-icon-close"
          @click="editFlag.personalInformation=false">
          取消
        </el-button>
        <el-button
          v-if="editFlag.personalInformation"
          size="small"
          type="text"
          icon="el-icon-check"
          @click="savePersonalInformation">
          保存
        </el-button>
      </h4>
      <el-card v-if="!editFlag.personalInformation" shadow="never">
        <el-row :gutter="20">
          <el-col :span="20">
              <el-form size="small" label-position="left" inline label-width="120px" class="demo-table-expand">
                <el-form-item label="工号">
                  <span>{{ personalInformation.empNo }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ personalInformation.gender }}</span>
                </el-form-item>
                <el-form-item label="籍贯">
                  <span>{{ personalInformation.origin }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ personalInformation.name }}</span>
                </el-form-item>
                <el-form-item label="姓（中文)">
                  <span>{{ personalInformation.firstName }}</span>
                </el-form-item>
                <el-form-item label="名 (中文)">
                  <span>{{ personalInformation.lastName }}</span>
                </el-form-item>

                <el-form-item label="英文名">
                  <span>{{ personalInformation.ename }}</span>
                </el-form-item>
                <el-form-item label="姓（英文)">
                  <span>{{ personalInformation.efirstName }}</span>
                </el-form-item>
                <el-form-item label="姓（英文)">
                  <span>{{ personalInformation.elastName }}</span>
                </el-form-item>


                <el-form-item label="出生日">
                  <span>{{ personalInformation.birthDate }}</span>
                  <span><i class="el-input__icon el-icon-date"></i></span>
                </el-form-item>
                <el-form-item label="身份证号码">
                  <span>{{ personalInformation.idNumber }}</span>
                </el-form-item>
                <el-form-item label="名族">
                  <span>{{ personalInformation.nation }}</span>
                </el-form-item>

                <el-form-item label="学历">
                  <span>{{ personalInformation.education }}</span>
                </el-form-item>
                <el-form-item label="政治面貌">
                  <span>{{ personalInformation.politics }}</span>
                </el-form-item>
                <el-form-item label="婚姻状况">
                  <span>{{ personalInformation.isMarried }}</span>
                </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <img v-bind:src="imageUrl" class="avatar">
          </el-col>
        </el-row>
      </el-card>
      <el-card v-else shadow="hover">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form size="small" label-position="left" inline label-width="90px" class="demo-table-expand">
              <el-form-item label="工号">
                <el-input v-model="personalInformation.empNo"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="personalInformation.gender" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.genderList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-select v-model="personalInformation.origin" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.originList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="personalInformation.name"></el-input>
              </el-form-item>
              <el-form-item label="姓（中文)">
                <el-input v-model="personalInformation.firstName"></el-input>
              </el-form-item>
              <el-form-item label="名 (中文)">
                <el-input v-model="personalInformation.lastName"></el-input>
              </el-form-item>

              <el-form-item label="英文名">
                <el-input v-model="personalInformation.ename"></el-input>
              </el-form-item>
              <el-form-item label="姓（英文)">
                <el-input v-model="personalInformation.efirstName"></el-input>
              </el-form-item>
              <el-form-item label="姓（英文)">
                <el-input v-model="personalInformation.elastName"></el-input>
              </el-form-item>


              <el-form-item label="出生日">
                <el-date-picker
                  v-model="personalInformation.birthDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="身份证号码">
                <el-input v-model="personalInformation.idNumber"></el-input>
              </el-form-item>
              <el-form-item label="名族">
                <el-select v-model="personalInformation.nation" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.nationList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="学历">
                <el-select v-model="personalInformation.education" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.educationList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-model="personalInformation.politics" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.politicsList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="婚姻状况">
                <el-select v-model="personalInformation.isMarried" placeholder="请选择">
                  <el-option
                    v-for="item in selectList.marriedList"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">

            <el-upload
              class="upload-demo"
              action="api/SpringMVC006/fileUpload3.do"
              :data="imageUpload"
              :show-file-list=false
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-bind:src="imageUrl" class="avatar">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-card>

      <h4>联系方式
        <el-button
          v-if="!editFlag.contact"
          size="small"
          type="text"
          icon="el-icon-edit"
          @click="editFlag.contact=true">
          修改
        </el-button>
        <el-button
          v-if="editFlag.contact"
          size="small"
          type="text"
          icon="el-icon-close"
          @click="editFlag.contact=false">
          取消
        </el-button>
        <el-button
          v-if="editFlag.contact"
          size="small"
          type="text"
          icon="el-icon-check"
          @click="saveContact">
          保存
        </el-button>
      </h4>
      <el-table v-show="!editFlag.contact" :data="contacts" border size="mini">
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="address" label="居住地址" align="center"></el-table-column>
        <el-table-column prop="idAddress" label="身份证地址" align="center"></el-table-column>
      </el-table>

      <el-table v-show="editFlag.contact" :data="contacts" border size="mini">
        <el-table-column prop="email" label="邮箱" align="center">
          <template slot-scope="scope">
            <el-input v-model="contact.email"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center">
          <template slot-scope="scope">
            <el-input v-model="contact.phone"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="居住地址" align="center">
          <template slot-scope="scope">
            <el-input v-model="contact.address"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="idAddress" label="身份证地址" align="center">
          <template slot-scope="scope">
            <el-input v-model="contact.idAddress"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <h4>亲属信息
        <el-button
          v-if="!editFlag.relativeInformation"
          size="small"
          type="text"
          icon="el-icon-edit"
          @click="editFlag.relativeInformation=true">
          修改
        </el-button>
        <el-button
          v-if="editFlag.relativeInformation"
          size="small"
          type="text"
          icon="el-icon-close"
          @click="editFlag.relativeInformation=false">
          取消
        </el-button>
        <el-button
          v-if="editFlag.relativeInformation"
          size="small"
          type="text"
          icon="el-icon-check"
          @click="savePersonalInformation">
          保存
        </el-button>
        <el-button
          v-if="editFlag.relativeInformation"
          size="small"
          type="text"
          icon="el-icon-close"
          @click="dialogRelativeInformation=true">
          添加
        </el-button>
      </h4>
      <el-table
        v-show="!editFlag.relativeInformation"
        :data="relativeInformation" border size="mini">
        <el-table-column prop="relation" label="关系" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="isKey" label="是否紧急联系人" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.isKey" class="el-icon-check"></i>
          </template>
        </el-table-column>
      </el-table>



      <el-table
        v-show="editFlag.relativeInformation"
        :data="relativeInformation" border size="mini">
        <el-table-column prop="relation" label="关系" align="center">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.relation" placeholder="请选择" >
              <el-option
                v-for="item in selectList.relationList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="isKey" label="是否紧急联系人" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isKey"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text"><i class="el-icon-delete"></i>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加亲属" :visible.sync="dialogRelativeInformation">
        <el-form ref="newRelatives" :model="newRelatives" label-width="80px">
          <el-form-item label="关系">
            <el-select v-model="newRelatives.relation" placeholder="请选择">
              <el-option
                v-for="item in selectList.relationList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="newRelatives.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="newRelatives.phone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogRelativeInformation = false">取 消</el-button>
          <el-button type="primary" @click="addRelativeInformation">确 定</el-button>
        </div>
      </el-dialog>




      <h4>工作信息</h4>
      <el-card shadow="hover">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="职务">
            <span>{{ jobInformation.titleId }}</span>
          </el-form-item>

          <el-form-item label="职等">
            <span>{{ jobInformation.gradeId }}</span>
          </el-form-item>

          <el-form-item label="状态"   prop="statusId">
            <span>{{ jobInformation.statusId }}</span>
          </el-form-item>

          <el-form-item label="主属部门">
            <span>{{ jobInformation.department }}</span>
          </el-form-item>

          <el-form-item label="岗位">
            <span>{{ jobInformation.position }}</span>
          </el-form-item>

          <el-form-item label="IDL/DL" prop="isOperator">
            <span>{{ jobInformation.isOperator }}</span>
          </el-form-item>

          <el-form-item label="入职日期" prop="registerDate">
            <span>{{ jobInformation.registerDate }}</span>
          </el-form-item>

          <el-form-item label="来源" prop="source">
            <span>{{ jobInformation.source }}</span>
          </el-form-item>

          <el-form-item label="来源说明" prop="sourceMemo">
            <span>{{ jobInformation.sourceMemo }}</span>
          </el-form-item>

          <el-form-item label="组别" prop="group">
            <span>{{ jobInformation.groupId }}</span>
          </el-form-item>

          <el-form-item label="范围" prop="scopeId">
            <span>{{ jobInformation.scopeId }}</span>
          </el-form-item>

          <el-form-item label="结算方式" prop="settling">
            <span>{{ jobInformation.settlingId }}</span>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>
<script>
  import { getPersonalInformation, getContact, getRelativeInformation, getJobInformation,
    updatePersonalInformation, updateContact } from '@/api/mgr'
  import { getEmployeeSelectOptions } from '@/api/sys'

  export default {
    name: 'addEmp2',
    data() {
      return {
        empId: '',
        //个人信息
        personalInformation: {
          lastName:	"红",
          politics:	"非党员",
          education:	"本科",
          gender:	"女",
          nation:	"壮族",
          elastName:	"hong",
          origin:	"江苏",
          empNo:	"C1806116",
          idNumber:	"34112519904181234",
          birthDate:	"1993-04-18",
          isMarried:	"未婚",
          firstName:	"小",
          ename:	"xiaohong",
          efirstName:	"xiao",
          name:	"小红",
          empId:	"d24a17d20b2c470484d05e7f2809ac00"
        },
        //联系方式
        contacts: [],
        contact: {
          empId: '',
          address:	"昆山",
          phone:	"123456",
          email:	"xiohong@ivo.com",
          idAddress:	"昆山",
        },
        //亲属信息
        relativeInformation: [{
          phone:	"123456",
          isKey:	true,
          name:	"xh",
          relation:	"父亲"
        }],
        //工作信息
        jobInformation: {
          scopeId:	"IVO",
          gradeId:	"G5",
          groupId:	"C",
          titleId:	"员工",
          sourceMemo:	"",
          source:	"校招",
          isOperator:	"DL",
          statusId:	"正式",
          regularDate:	"2018-09-12",
          position:	"龙腾光电_员工",
          settlingId:	"0",
          department:	"龙腾光电",
          registerDate:	"2018-06-12"
        },

        imageUrl: '',
        imageUpload: { empId: '' },

        //修改/显示界面
        editFlag: {
          personalInformation: false,
          contact: false,
          relativeInformation: false
        },

        dialogRelativeInformation: false,
        newRelatives: {
          phone:	'',
          isKey:	false,
          name:	'',
          relation:	''
        },

        //下拉框
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
        },

        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },

    created: function () {
      this.empId = this.$route.query.empId
      this.query()
      this.imageUrl = 'api/SpringMVC006/image?empId=' + this.empId
      this.imageUpload.empId = this.empId
      this.getSelectList()
    },
    methods: {
      //后台查询数据
      query() {
        let param = { 'empId': this.$route.query.empId }
        this.getgetPersonalInformation_()
        this.getContact_()
        this.getRelativeInformation_()
        this.getJobInformation_()
      },

      getgetPersonalInformation_() {
        let param = { empId : this.empId }
        getPersonalInformation(param).then(response => {
          this.personalInformation = response.data
        })
      },

      getContact_() {
        let param = { empId : this.empId }
        getContact(param).then(response => {
          this.contact = response.data
          this.contacts = []
          this.contacts.push(this.contact)
        })
      },

      getRelativeInformation_() {
        let param = { empId : this.empId }
        getRelativeInformation(param).then(response => {
          this.relativeInformation = response.data
        })
      },

      getJobInformation_() {
        let param = { empId : this.empId }
        getJobInformation(param).then(response => {
          this.jobInformation = response.data
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
        if(this.imageUpload.empId === '') {
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
        this.imageUrl = 'api/SpringMVC006/image?empId=' + this.imageUpload.empId + "&random=" +Math.random();
      },

      //保存个人信息
      savePersonalInformation() {
        updatePersonalInformation(this.personalInformation).then(response => {
          this.$message({message: '保存成功', type: 'success'})
          this.getgetPersonalInformation_()
          this.editFlag.personalInformation = false
        })
      },

      //保存联系信息
      saveContact() {
        updateContact(this.contact).then(response => {
          this.$message({message: '保存成功', type: 'success'})
          this.getContact_()
          this.editFlag.contact = false
        })
      },

      //添加亲属
      addRelativeInformation() {
        this.relativeInformation.push(this.newRelatives)
      }
    }
  }
</script>

<style>
  .avatar {
    width: 183px;
    height: 243px;
    display: block;
    padding-bottom: 10px;
  }

  .demo-table-expand label {
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    width: 31%;
  }
</style>

<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row>
        <el-button size="small" @click="back()">返回</el-button>
        <el-button type="primary" size="small" @click="save_()">保存</el-button>
      </el-row>
      <p></p>

      <h4>个人信息</h4>
      <el-card shadow="never">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form label-position="left" label-width="120px">
              <!--<el-form-item label="工号">-->
                <!--<el-input v-model="personalInformation.empNo"></el-input>-->
              <!--</el-form-item>-->
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
          <el-col :span="8" align="center">
            <el-upload
              class="upload-demo"
              action="api/SpringMVC006/fileUpload3.do"
              :data="imageUpload"
              :show-file-list=false
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <div style="border:1px solid #cceff5;background:#fafcfd">
                <img v-bind:src="imageUrl" class="avatar">
              </div>
              <br>
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-card>

      <h4>联系方式</h4>
      <el-card shadow="never">
        <el-form label-position="left" label-width="120px">
          <el-col :span="16">
            <el-form-item label="邮箱">
              <el-input v-model="contact.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="contact.phone"></el-input>
            </el-form-item>
            <el-form-item label="居住地址">
              <el-input v-model="contact.address"></el-input>
            </el-form-item>
            <el-form-item label="身份证地址">
              <el-input v-model="contact.idAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>

      <h4>亲属信息</h4>
      <el-card shadow="never">
        <el-table :data="relativeInformation" border size="mini">
          <el-table-column prop="relation" label="关系" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.relation" placeholder="请选择" >
                <el-option
                  v-for="item in selectList.relationList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="联系方式" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.phone"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="isKey" label="是否紧急联系人" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isKey"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="info" size="mini" @click="addRelativeInformation">删除</el-button>
            </template>
          </el-table-column>
        </el-table>


        <el-button type="info" size="mini" @click="addRelativeInformation">添加</el-button>

      </el-card>

      <h4>工作信息</h4>
      <el-card shadow="never">
        <el-form label-position="left" label-width="120px">
          <el-col :span="16">
            <el-form-item label="职务">
              <el-select v-model="jobInformation.titleId" placeholder="请选择">
                <el-option
                  v-for="item in selectList.titleIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="职等">
              <el-select v-model="jobInformation.gradeId" placeholder="请选择">
                <el-option
                  v-for="item in selectList.gradeIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="jobInformation.statusId" placeholder="请选择">
                <el-option
                  v-for="item in selectList.statusIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="主属部门">
              <!-- 引入子组件 定义一个on的方法监听子组件的状态-->
              <departmentTree v-on:childByValue="childByValue"
                              :departmentName="jobInformation.departmentName"
                              :departmentId="jobInformation.departmentId"></departmentTree>
            </el-form-item>

            <el-form-item label="岗位">
              <el-select v-model="jobInformation.position" placeholder="请选择">
                <el-option
                  v-for="item in selectList.positionList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="IDL/DL">
              <el-select v-model="jobInformation.isOperator" placeholder="请选择">
                <el-option
                  v-for="item in selectList.operatorList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="入职日期">
              <el-date-picker
                v-model="jobInformation.registerDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="来源">
              <el-select v-model="jobInformation.source" placeholder="请选择">
                <el-option
                  v-for="item in selectList.sourceList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="来源说明">
              <el-input v-model="jobInformation.sourceMemo"></el-input>
            </el-form-item>

            <el-form-item label="组别">
              <el-select v-model="jobInformation.groupId" placeholder="请选择">
                <el-option
                  v-for="item in selectList.groupIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="范围">
              <el-select v-model="jobInformation.scopeId" placeholder="请选择">
                <el-option
                  v-for="item in selectList.scopeIdList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="结算方式">
              <el-select v-model="jobInformation.settlingId" placeholder="请选择">
                <el-option
                  v-for="item in selectList.settlingList"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>
<script>
  import { getEmployeesInfoById, getPositionList, save } from '@/api/mgr'
  import { getEmployeeSelectOptions } from '@/api/sys'

  import departmentTree from './DepartmentTree'

  export default {
    name: 'addEmp2',
    components: { departmentTree },
    data() {
      return {
        id: '',
        empId: '',
        //个人信息
        personalInformation: {
          lastName:	"",
          politics:	"",
          education:	"",
          gender:	"",
          nation:	"",
          elastName:	"",
          origin:	"",
          empNo:	"",
          idNumber:	"",
          birthDate:	"",
          isMarried:	"",
          firstName:	"",
          ename:	"",
          efirstName:	"",
          name:	"",
        },
        //联系方式
        contact: {
          address:	"",
          phone:	"",
          email:	"",
          idAddress:	""
        },
        //亲属信息
        relativeInformation: [],
        //工作信息
        jobInformation: {
          scopeId:	"",
          groupId:	"",
          sourceMemo:	"",
          source:	"",
          isOperator:	"",
          statusId:	"",
          settlingId:	"",
          departmentName: '',
          departmentId: '',
          registerDate:	"",
          gradeId:	"",
          titleId:	"",
          position:	"",

          promotionId: "",
          responsibilityId: ""
        },

        imageUrl: '',
        imageUpload: { empId: '' },

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

        //用于提交保存
        employee: {},
      }
    },

    created: function () {
      this.id = this.$route.query.id
      this.empId = this.$route.query.empId
      this.imageUrl = 'api/SpringMVC006/image?empId=' + this.empId
      this.imageUpload.empId = this.empId
      this.getSelectList()
      this.getEmployeesInfoById_()
    },
    methods: {
      //获取信息
      getEmployeesInfoById_() {
        let param = {id: this.id}
        getEmployeesInfoById(param).then(response => {
          let employees = response.employees
          let promotion = response.promotion
          let responsibility = response.responsibility
          let families = response.families
          let departmentName = response.departmentName
          let departmentId = response.departmentId
          console.log(employees.registerDate == null)
          this.jobInformation = {
            scopeId:	employees.scopeId,
            groupId:	employees.groupId,
            sourceMemo:	employees.sourceMemo,
            source:	employees.source,
            isOperator:	employees.isOperator,
            statusId:	employees.statusId,
            settlingId:	'0',
            registerDate: employees.registerDate == null ? '' : employees.registerDate,

            departmentName: departmentName,
            departmentId: departmentId,

            gradeId:	promotion.gradeId,
            titleId:	promotion.titleId,
            position:	responsibility.posId,

            promotionId: promotion.id,
            responsibilityId: responsibility.id
          };

          this.getPositions()

          this.personalInformation = {
              lastName:	employees.lastName,
              politics:	employees.politics,
              education:	employees.education,
              gender:	employees.gender,
              nation:	employees.nation,
              elastName:	employees.elastName,
              origin:	employees.origin,
              empNo:	employees.empNo,
              idNumber:	employees.idNumber,
              birthDate: employees.birthDate == null ? '' : employees.birthDate,
              isMarried:	employees.isMarried,
              firstName:	employees.firstName,
              ename:	employees.ename,
              efirstName:	employees.efirstName,
              name:	employees.name
          }

          this.contact = {
            address:	employees.address,
            phone:	employees.phone,
            email:	employees.email,
            idAddress:	employees.idAddress
          }

          this.relativeInformation = response.families
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

      //返回
      back() {
        this.$router.push({ path: '/empInfraMgr/addEmp'})
      },

      //保存
      save_() {
        this.copy()
        save(this.employee).then(response => {

        })
      },

      //添加亲属
      addRelativeInformation() {
        this.relativeInformation.push({
          empId: this.empId,
          phone:	'',
          isKey:	false,
          name:	'',
          relation:	'',
        })
      },

      //部门树子组件传值给父组件
      childByValue(departmentName, departmentId) {
        this.jobInformation.departmentName = departmentName
        this.jobInformation.departmentId = departmentId
        console.log(this.jobInformation.departmentName)
        console.log(this.jobInformation.departmentId)
        this.getPositions()
      },

      //获取岗位
      getPositions() {
        let options = []
        let param = { 'deptId': this.jobInformation.departmentId }
        getPositionList(param).then(response => {
          let positions = response.data
          for(var i=0; i<positions.length; i++) {
            let position = positions[i];
            let option = {}
            option.label = position.name
            option.value = position.id
            options.push(option)
          }
//          this.jobInformation.position = ''
          this.selectList.positionList = options
        })
      },

      //将要保存的信息放入employee传入后台
      copy() {

        this.employee = {
          empId: this.empId,
          id: this.id,
          promotionId: this.jobInformation.promotionId,
          responsibilityId: this.jobInformation.responsibilityId,

          lastName:	this.personalInformation.lastName,
          politics:	this.personalInformation.politics,
          education:	this.personalInformation.education,
          gender:	this.personalInformation.gender,
          nation:	this.personalInformation.nation,
          elastName:	this.personalInformation.elastName,
          origin:	this.personalInformation.origin,
          empNo:	this.personalInformation.empNo,
          idNumber:	this.personalInformation.idNumber,
          birthDate:	this.personalInformation.birthDate,
          isMarried:	this.personalInformation.isMarried,
          firstName:	this.personalInformation.firstName,
          ename:	this.personalInformation.ename,
          efirstName:	this.personalInformation.efirstName,
          name:	this.personalInformation.name,

          address:	this.contact.address,
          phone:	this.contact.phone,
          email:	this.contact.email,
          idAddress:	this.contact.idAddress,

          scopeId:	this.jobInformation.scopeId,
          groupId:	this.jobInformation.groupId,
          sourceMemo:	this.jobInformation.sourceMemo,
          source:	this.jobInformation.source,
          isOperator:	this.jobInformation.isOperator,
          statusId:	this.jobInformation.statusId,
          settlingId:	this.jobInformation.settlingId,
          registerDate:	this.jobInformation.registerDate,

          titleId:	this.jobInformation.titleId,
          gradeId:	this.jobInformation.gradeId,
          position:	this.jobInformation.position,

          family: JSON.stringify(this.relativeInformation)
        }
        console.log(" #: " + this.employee.registerDate)
      }
    }
  }
</script>

<style scoped>
  .avatar {
    width: 183px;
    height: 243px;
    display: block;
  }
</style>



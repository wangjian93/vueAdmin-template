<template>
  <div class="app-container" >
    <el-card class="box-card" style="min-height: 680px;">
      <el-row>
        <el-button type="primary" size="small" @click="submit()">入职提交</el-button>
        <el-button type="success" size="small" @click="addEmp()">信息录入</el-button>
        <el-button type="warning" size="small" v-popover:popover>批量录入</el-button>
        <el-button type="warning" size="small" @click="download()">批量模板</el-button>
      </el-row>
      <p></p>
      <el-table
        :data="entryData"
        @selection-change="handleSelectionChange"
        border
        size="mini">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓（中文)">
              <span>{{ props.row.firstName }}</span>
            </el-form-item>
            <el-form-item label="名 (中文)">
              <span>{{ props.row.lastName }}</span>
            </el-form-item>
            <!--<el-form-item label="姓名">-->
            <!--<span>{{ props.row.name }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="姓（英文)">
              <span>{{ props.row.efirstName }}</span>
            </el-form-item>
            <el-form-item label="姓（英文)">
              <span>{{ props.row.elastName }}</span>
            </el-form-item>
            <!--<el-form-item label="英文名">-->
            <!--<span>{{ props.row.ename }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="性别">-->
            <!--<span>{{ props.row.gender }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="出生日">-->
            <!--<span>{{ props.row.birthDate }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="身份证号码">
              <span>{{ props.row.idNumber }}</span>
            </el-form-item>
            <!--<el-form-item label="名族">-->
            <!--<span>{{ props.row.nation }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="籍贯">-->
            <!--<span>{{ props.row.origin }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="学历">-->
            <!--<span>{{ props.row.education }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="政治面貌">
              <span>{{ props.row.politics }}</span>
            </el-form-item>
            <el-form-item label="婚姻状况">
              <span>{{ props.row.isMarried }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="居住地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="身份证地址">
              <span>{{ props.row.idAddress }}</span>
            </el-form-item>
            <el-form-item label="归属公司">
              <span>{{ props.row.scopeId }}</span>
            </el-form-item>
            <!--<el-form-item label="DL/IDL标识">-->
            <!--<span>{{ props.row.isOperator }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="组别">
              <span>{{ props.row.groupId }}</span>
            </el-form-item>
            <!--<el-form-item label="入职时间">-->
            <!--<span>{{ props.row.registerDate }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="员工来源">-->
            <!--<span>{{ props.row.source }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="来源说明">
              <span>{{ props.row.sourceMemo }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.statusId }}</span>
            </el-form-item>
            <!--<el-form-item label="生效日">-->
            <!--<span>{{ props.row.effectDate }}</span>-->
            <!--</el-form-item>-->
            <el-form-item label="结算方式">
              <span>{{ props.row.settlingId }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="英文名"
        prop="ename">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="gender">
      </el-table-column>
      <el-table-column
        label="出生日"
        prop="birthDate">
      </el-table-column>
      <el-table-column
        label="名族"
        prop="nation">
      </el-table-column>
      <el-table-column
        label="籍贯"
        prop="origin">
      </el-table-column>
      <el-table-column
        label="学历"
        prop="education">
      </el-table-column>

      <el-table-column
        label="DL/IDL标识"
        prop="isOperator">
      </el-table-column>
      <el-table-column
        label="入职时间"
        prop="registerDate">
      </el-table-column>
      <el-table-column
        label="来源"
        prop="source">
      </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
            <el-button @click.native.prevent="handleClickDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>

    </el-table>
    </el-card>

    <el-popover
      ref="popover"
      placement="bottom"
      width="450"
      trigger="click">
      <el-upload
        class="upload-demo"
        action="api/SpringMVC006/uploadExcel.do"
        multiple
        :limit="3"
        :on-success="handleExceed"
        :on-exceed="handleExceed"
        :on-preview="handlePreview">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-popover>
  </div>
</template>
<script>
  import { saveEmp, createFamily, getPositionList, saveEmployee, queryNotSubmitEmployee, submitEmployeeBatch,
    deleteEmployees, downloadExcelTemplate } from '@/api/mgr';

  export default {
    name: 'entryMgr',
    data() {
      return {
        entryData: [],
        multipleSelection: []
      }
    },
    created: function () {
      this.getNotSubmitEmployee()
    },
    methods: {
      //查询到还没有做提交的employee数据
      getNotSubmitEmployee() {
        queryNotSubmitEmployee().then(response => {
          this.entryData = response.data
        })
      },

      //处理复选框选中项
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //提交选中的employee
      submit() {
        submitEmployeeBatch(this.multipleSelection).then(response => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.getNotSubmitEmployee()
        })
      },

      //前往录入新员工
      addEmp() {
        this.$router.push({ path: '/empInfraMgr/addEmp2' })
      },

      //批量excel上传前
      handlePreview(file) {
      },

      //批量excel上传成功后
      handleExceed() {
        this.getNotSubmitEmployee()
      },

      //查看
      handleClick(index, row) {
        var id = row.id;
        var empId = row.empId;
        this.$router.push({ path: '/empInfraMgr/editEmp3', query:{id: id, empId: empId}})
      },

      //删除
      handleClickDelete(index, row) {
        var id = row.id;
        var param = { id: id}
        deleteEmployees(param).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getNotSubmitEmployee()
        })
      },

      //下载
      download() {
        window.open("http://localhost:8080/nexhrs/SpringMVC006/load")
//        downloadExcelTemplate().then(response => {
//
//        })
      }


    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

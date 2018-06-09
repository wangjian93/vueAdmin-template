<template>
  <div class="app-container" style="margin-top: -20px;">
    <el-form :rules="rules" :model="empInfra" label-width="100px" style="margin:10px 10px 10px 10px;">

      <el-row>
        <el-col :span="8">
        <el-form-item label="员工工号"  prop="empId">
          <el-input v-model="empInfra.empId" placeholder="员工工号"></el-input>
        </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="empInfra.name" placeholder="员工姓名" readonly ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入职日期">
              <el-input v-model="empInfra.registerDate" placeholder="入职日期" readonly ></el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="职务">
            <el-input v-model="empInfra.title" placeholder="职务" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职等">
            <el-input v-model="empInfra.grade" placeholder="职等" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="IDL/DL">
            <el-input v-model="empInfra.settling" placeholder="IDL/DL" readonly ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="组别">
            <el-input v-model="empInfra.group" placeholder="组别" readonly ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>

      <div style="margin:5px 0px 10px 20px;">离职信息</div>

      <el-row>
        <el-col :span="8">
          <el-form-item label="离职日期" prop="effect_date">
            <el-date-picker
              v-model="empInfra.effect_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离职原因" prop="quitType">
            <el-select v-model="empInfra.quitType" placeholder="请选择">
              <el-option
                v-for="item in quitTypeList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="原因说明">
            <el-input type="textarea" v-model="empInfra.reason" placeholder="离职原因说明"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="意见和建议">
            <el-input type="textarea" v-model="empInfra.proposal" placeholder="给出对公司的意见和建议"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="离职去向">
            <el-select v-model="empInfra.ahereabouts" placeholder="请选择">
              <el-option
                v-for="item in whereaboutsList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="前员工联盟">
            <template>
              <el-checkbox v-model="empInfra.union">加入</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row>

      <el-form-item label="满意度">
        <el-rate
          v-model="empInfra.satisfaction"
          show-text
          text-color="#ff9900">
        </el-rate>
      </el-form-item>



    </el-form>

    <el-col :span="24" class="toolbar" style="padding-bottom:10px;">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button type="primary" @click="onSubmit">保存并清空</el-button>
    </el-col>

  </div>
</template>

<script>
  export default {
    name: 'empQuit',
    data () {
      return {
        quitTypeList:[
          {
            value: '1',
            label: '自已离开'
          },{
            value: '2',
            label: '公司功退'
          }
        ],
        whereaboutsList:[
          {
            value: '1',
            label: '创业'
          },{
            value: '2',
            label: '跳槽'
          },{
            value: '3',
            label: '休息'
          }
        ],
        empInfra:{
          "empId": "C0605001",
          "name" : "张三",
          "registerDate" : "2016-06-08",
          "effect_date" : "",
          "title" : "",
          "grade" : "",
          "settling" : "",
          "group" : "",
          "quit":"",
          "union":false,
          "proposal":"",
          "reason":"",
          "quitType":"",
          "whereabouts":"",
          "satisfaction":1
        },
        rules: {
          empId: [
            { required: true, message: '请输入员工工号' }
          ],
          effect_date: [
            { required: true, message: '请选择离职时间' }
          ],
          quitType: [
            { required: true, message: '请选择离职类别' }
          ]
        }
      }
    },
    methods: {
      onSubmit(){

      }
    }
  }
</script>

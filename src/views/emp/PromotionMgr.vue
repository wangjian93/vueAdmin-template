<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="min-height: 680px;">
      <el-tab-pane label="员工晋升" name="first">
        <!--<h4>查询条件:</h4>-->
        <el-card shadow="never">
          <el-form :model="searchForm" ref="searchForm" size="small" label-width="100px" label-position="left">
            <el-row :gutter="80">
              <el-col :span="10">
                <el-form-item label="工号">
                  <el-input v-model="searchForm.empNo" placeholder="员工工号"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                  <el-input v-model="searchForm.deptName" placeholder="员工工号"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                  <el-select v-model="searchForm.titleId" placeholder="请选择调整后职务">
                    <el-option
                      v-for="item in selectList.titleIdList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item label="姓名">
                  <el-input v-model="searchForm.name" placeholder="员工姓名"></el-input>
                </el-form-item>
                <el-form-item label="入职日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="searchForm.registerDate"
                    placeholder="选择日期范围">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="职等">
                  <el-select v-model="searchForm.gradeId" placeholder="请选择调整后职务">
                    <el-option
                      v-for="item in selectList.gradeIdList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" size="small" @click="findPromotion_">查询</el-button>
              <el-button type="" size="small" @click="onClear">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <h4>查询信息:</h4>
        <el-table :data="promotion" border size="mini" style="min-height: 400px;">
          <el-table-column type="index" width="40" align="center"></el-table-column>
          <el-table-column prop="empNo" label="工号" align="center"></el-table-column>
          <el-table-column prop="empName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="titleId" label="职位" align="center"></el-table-column>
          <el-table-column prop="gradeId" label="职等" align="center"></el-table-column>
          <el-table-column label="生效日期" align="center" minWidth="120">
            <template slot-scope="scope">
              <el-tag>
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.effectDate }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="expireDate" label="失效日期" align="center" minWidth="120">
            <template scope="scope">
              <span v-if="scope.row.expireDate == '9999-12-31'">-</span>
              <el-tag v-else type="danger">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.expireDate }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button
                v-if="scope.row.expireDate == '9999-12-31'"
                type="text"
                size="small"
                @click="edit(scope.$index, scope.row)">
                晋升
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="晋升记录" name="second">
        <el-form  :inline="true" size="small" :model="searchForm">
          <el-form-item label="工号">
            <el-input v-model="searchFormHis.empId" placeholder="员工工号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="searchFormHis.name" placeholder="员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="searchFormHis.deptName" placeholder="员工工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="findPromotionHis_">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="promotion_" border size="mini" style="min-height: 400px;">
          <el-table-column type="index" width="40" align="center"></el-table-column>
          <el-table-column prop="empNo" label="工号" align="center"></el-table-column>
          <el-table-column prop="empName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="titleId" label="职位" align="center"></el-table-column>
          <el-table-column prop="gradeId" label="职等" align="center"></el-table-column>
          <el-table-column label="生效日期" align="center" minWidth="120">
            <template slot-scope="scope">
              <el-tag>
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.effectDate }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="expireDate" label="失效日期" align="center" minWidth="120">
            <template scope="scope">
              <span v-if="scope.row.expireDate == '9999-12-31'">-</span>
              <el-tag v-else type="danger">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.expireDate }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="晋升" :visible.sync="dialogFormVisible">
      <el-form :model="form" :ref="form" label-width="100px">
        <el-form-item label="职位">
          <el-select v-model="form.titleId" placeholder="请选择调整后职务">
            <el-option
              v-for="item in selectList.titleIdList"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职等">
          <el-select v-model="form.gradeId" placeholder="请选择调整后职务">
            <el-option
              v-for="item in selectList.gradeIdList"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.effectDate"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="promote_">晋升</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import { getEmployeeSelectOptions } from '@/api/sys'
  import { findPromotion, promote, findPromotionHis } from '@/api/promotion'


  export default {
    name: 'empTransfer',
    data () {
      return {
        activeName: 'first',

        //下拉框
        selectList: {
          gradeIdList: [],
          titleIdList: []
        },

        promotion: [],
        promotion_: [],
        searchForm: {
          empNo: '',
          name: '',
          registerDate: '',
          deptName: '',
          titleId: '',
          gradeId: ''
        },
        searchFormHis: {
          empNo: '',
          name: '',
          deptName: ''
        },

        dialogFormVisible: false,
        form: {
          empId: '',
          titleId: '',
          gradeId: '',
          effectDate: ''
        },
      }
    },
    created: function() {
      this.getSelectList()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      findPromotion_() {
        let params = this.searchForm
        findPromotion(params).then(response => {
          this.promotion = response.data
        })
      },

      //查询晋升记录
      findPromotionHis_() {
        let params = this.searchFormHis
        findPromotionHis(params).then(response => {
          this.promotion_ = response.data
        })
      },

      onClear(){
        this.searchForm = {
          empNo: '',
          name: '',
          registerDate: '',
          deptName: '',
          titleId: '',
          gradeId: ''
        }
      },

      //获取下拉框选项
      getSelectList() {
        getEmployeeSelectOptions().then(response => {
          this.selectList.gradeIdList = response.data.gradeId
          this.selectList.titleIdList = response.data.titleId

        })
      },

      edit($index, row) {
        this.form = {
          empId: row.empId,
          titleId: '',
          gradeId: '',
          effectDate: ''
        }
        this.dialogFormVisible = true
      },

      //晋升操作
      promote_() {
        let params = this.form
        promote(params).then(response => {
          this.$message({message: '保存成功', type: 'success'})
        })
      }


    }
  }
</script>

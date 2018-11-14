<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="min-height: 680px;">
      <el-tab-pane label="员工调职" name="first">
          <!--<h4>查询条件:</h4>-->
          <el-card shadow="never">
            <el-form :model="searchForm" size="small" ref="searchForm" label-width="100px" label-position="left">
              <el-row :gutter="80">
                <el-col :span="10">
                  <el-form-item label="工号">
                    <el-input v-model="searchForm.empNo" placeholder="员工工号"></el-input>
                  </el-form-item>
                  <el-form-item label="部门">
                    <el-input v-model="searchForm.deptName" placeholder="员工工号"></el-input>
                  </el-form-item>
                  <el-form-item label="岗位类型">
                    <template>
                      <el-radio-group v-model="searchForm.rank">
                        <el-radio :label="0">主管</el-radio>
                        <el-radio :label="1">副主管</el-radio>
                        <el-radio :label="2">员工</el-radio>
                        <el-radio :label="3">文员</el-radio>
                      </el-radio-group>
                    </template>
                  </el-form-item>
                  <el-form-item label="是否主岗位">
                    <template>
                      <el-checkbox v-model="searchForm.isMaster" >是</el-checkbox>
                    </template>
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
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" size="small" @click="findPositions_">查询</el-button>
                <el-button type="" size="small" @click="onClear">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>


          <!--</el-card>-->

          <!--<el-card>-->
          <h4>查询信息:</h4>
          <el-table :data="responsibility" border size="mini" style="min-height: 400px;">
            <el-table-column type="index" width="40" align="center"></el-table-column>
            <el-table-column
              prop="empNo" label="工号" align="center">
            </el-table-column>
            <el-table-column
              prop="empName" label="姓名" align="center">
            </el-table-column>
            <el-table-column
              prop="deptName" label="部门" align="center" minWidth="120">
            </el-table-column>
            <el-table-column
              prop="posName" label="岗位" align="center" minWidth="120">
            </el-table-column>
            <el-table-column
              prop="rank" label="岗位类型" align="center">
            </el-table-column>
            <el-table-column label="是否主岗位" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isMaster">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column label="生效日期" align="center" minWidth="120">
              <template slot-scope="scope">
                <el-tag>
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.effectDate }}</span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="失效日期" align="center" minWidth="120">
              <template scope="scope">
                <span v-if="scope.row.expireDate == '9999-12-31'">-</span>
                <el-tag v-else type="danger">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.expireDate }}</span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template scope="scope" v-if="scope.row.expireDate == '9999-12-31'">
                <el-button
                  v-if="scope.row.isMaster"
                  @click="edit(scope.$index, scope.row)"
                  type="text"
                  size="small">
                  转岗
                </el-button>
                <el-button
                  v-if="scope.row.isMaster"
                  @click="add(scope.$index, scope.row)"
                  type="text"
                  size="small">添加副岗位
                </el-button>
                <el-button
                  v-else
                  @click="del(scope.$index, scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>

      <el-tab-pane label="调职记录" name="second">
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
            <el-button type="primary" size="mini" @click="findPositionsHis_">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="responsibility_" border size="mini" style="min-height: 400px;">
          <el-table-column type="index" width="40" align="center"></el-table-column>
          <el-table-column
            prop="empNo" label="工号" align="center">
          </el-table-column>
          <el-table-column
            prop="empName" label="姓名" align="center">
          </el-table-column>
          <el-table-column
            prop="deptName" label="部门" align="center" minWidth="120">
          </el-table-column>
          <el-table-column
            prop="posName" label="岗位" align="center" minWidth="120">
          </el-table-column>
          <el-table-column
            prop="rank" label="岗位类型" align="center">
          </el-table-column>
          <el-table-column label="是否主岗位" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isMaster">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column label="生效日期" align="center" minWidth="120">
            <template slot-scope="scope">
              <el-tag>
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.effectDate }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="失效日期" align="center" minWidth="120">
            <template scope="scope">
              <span v-if="scope.row.expireDate == '9999-12-31'">-</span>
              <el-tag v-else type="danger">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.expireDate }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <!--<template scope="scope" v-if="scope.row.expireDate == '9999-12-31'">-->
              <!--<el-button-->
                <!--v-if="scope.row.isMaster"-->
                <!--@click="edit(scope.$index, scope.row)"-->
                <!--type="text"-->
                <!--size="small">-->
                <!--转岗-->
              <!--</el-button>-->
              <!--<el-button-->
                <!--v-if="scope.row.isMaster"-->
                <!--@click="add(scope.$index, scope.row)"-->
                <!--type="text"-->
                <!--size="small">添加副岗位-->
              <!--</el-button>-->
              <!--<el-button-->
                <!--v-else-->
                <!--@click="del(scope.$index, scope.row)"-->
                <!--type="text"-->
                <!--size="small">-->
                <!--删除-->
              <!--</el-button>-->
            <!--</template>-->
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="调职" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm" :ref="editForm" label-width="100px">
        <el-form-item label="主属部门">
          <!-- 引入子组件 定义一个on的方法监听子组件的状态-->
          <departmentTree v-on:childByValue="childByValue"></departmentTree>
        </el-form-item>

        <el-form-item label="主岗位">
          <el-select v-model="editForm.position" placeholder="请选择">
            <el-option
              v-for="item in selectList.positionList"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生效日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="editForm.effectDate"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="transfer_">调职</el-button>
      </div>
    </el-dialog>

    <el-dialog title="副岗位添加" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm" :ref="addForm" label-width="100px">
        <el-form-item label="部门">
          <!-- 引入子组件 定义一个on的方法监听子组件的状态-->
          <departmentTree v-on:childByValue="childByValue2"></departmentTree>
        </el-form-item>

        <el-form-item label="岗位">
          <el-select v-model="addForm.position" placeholder="请选择">
            <el-option
              v-for="item in selectList.positionList"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生效日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="addForm.effectDate"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPosition_">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="副岗位删除" :visible.sync="dialogDeleteFormVisible">
      <el-form :model="deleteForm" :ref="deleteForm" label-width="100px">
        <el-form-item label="失效日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="deleteForm.expireDate"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletePosition_">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { findPositions, transfer, addPosition, deletePosition, findPositionsHis  } from '@/api/position';
  import { getPositionList } from '@/api/mgr'
  import departmentTree from './DepartmentTree'

  export default {
    name: 'empOrgUnitMgr',
    components: { departmentTree },
    data () {
      return {
        activeName: 'first',
        searchForm: {
          empNo: '',
          name: '',
          registerDate: '',
          deptName: '',
          rank: '',
          isMaster: '0'
        },
        searchFormHis: {
          empNo: '',
          name: '',
          deptName: ''
        },
        responsibility: [],
        responsibility_: [],

        //下拉框
        selectList: {
          positionList: []
        },

        dialogEditFormVisible: false,
        dialogAddFormVisible: false,
        dialogDeleteFormVisible: false,
        editForm: {
          empId: '',
          departmentName: '',
          departmentId: '',
          position: '',
          effectDate: '',
        },
        addForm: {
          empId: '',
          departmentName: '',
          departmentId: '',
          position: '',
          effectDate: '',
        },
        deleteForm: {
          id: '',
          expireDate: '',
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      findPositions_() {
        let params = this.searchForm
        findPositions(params).then(response => {
          this.responsibility = response.data
        })
      },
      findPositionsHis_() {
        let params = this.searchFormHis
        findPositionsHis(params).then(response => {
          this.responsibility_ = response.data
        })
      },
      onClear() {
        this.searchForm = {
          empNo: '',
            name: '',
            registerDate: '',
            deptName: '',
            rank: '',
            isMaster: '0'
        }
      },

      edit($index, row) {
        this.editForm = {
          empId: row.empId,
          departmentName: '',
          departmentId: '',
          position: '',
          effectDate: '',
        }
        this.dialogEditFormVisible = true
      },

      add($index, row) {
        this.addForm = {
          empId: row.empId,
          departmentName: '',
          departmentId: '',
          position: '',
          effectDate: '',
        }
        this.dialogAddFormVisible = true
      },

      del($index, row) {
        this.deleteForm = {
          id: row.id,
          effectDate: ''
        }
        this.dialogDeleteFormVisible = true
      },

      //调岗位：主岗位
      transfer_() {
        let params = {
          empId: this.editForm.empId,
          positionId: this.editForm.position,
          effectDate: this.editForm.effectDate
        }
        transfer(params).then(response => {
          this.$message({message: '调职/转岗成功！', type: 'success'})
        })
      },

      //添加副岗位
      addPosition_() {
        let params = {
          empId: this.addForm.empId,
          positionId: this.addForm.position,
          effectDate: this.addForm.effectDate
        }
        addPosition(params).then(response => {
          this.$message({message: '岗位添加成功！', type: 'success'})
        })
      },

      //删除副岗位
      deletePosition_() {
        let params = {
          id: this.deleteForm.id,
          expireDate: this.deleteForm.expireDate
        }
        deletePosition(params).then(response => {
          this.$message({message: '岗位删除成功！', type: 'success'})
        })
      },

      //部门树子组件传值给父组件
      childByValue(departmentName, departmentId) {
        this.editForm.departmentName = departmentName
        this.editForm.departmentId = departmentId

        let param = { 'deptId': this.editForm.departmentId }
        this.getPositions(param)
      },

      childByValue2(departmentName, departmentId) {
        this.addForm.departmentName = departmentName
        this.addForm.departmentId = departmentId

        let param = { 'deptId': this.addForm.departmentId }
        this.getPositions(param)
      },

      //获取岗位
      getPositions(param) {
        let options = []
        getPositionList(param).then(response => {
          let positions = response.data
          for(var i=0; i<positions.length; i++) {
            let position = positions[i];
            let option = {}
            option.label = position.name
            option.value = position.id
            options.push(option)
          }
          this.selectList.positionList = options
        })
      },
    }
  }
</script>

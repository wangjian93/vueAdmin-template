<template>
  <div class="app-container">
    <el-tabs v-model="activeName" tab-position="top" type="card" @tab-click="getTree">
      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-date"></i>列表组织</span>
        <el-form  :inline="true" :model="listQuery">
          <el-form-item label="部门">
            <el-input v-model="listQuery.dept" size="small" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item label="上级部门">
            <el-input v-model="listQuery.parent" size="small" placeholder="上级部门"></el-input>
          </el-form-item>
          <el-form-item label="部门层级">
            <el-select v-model="listQuery.level" size="small" clearable placeholder="请选择部门层级">
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="onQuery">搜索</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" @click="addNewOrg">新增组织</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="success"  size="small" v-popover:popover4 @click="getReleseTable">
              <svg-icon icon-class="batch"></svg-icon>
              批量发布</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="orgData" border size="small" :row-class-name="tableRowClassName">
          <!--<el-table-column prop="deptId" label="ID" width="100" hidden></el-table-column>-->
          <el-table-column prop="deptNo" label="部门编号" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="部门名称" align="center"></el-table-column>
          <el-table-column prop="sname" label="部门简称" align="center"></el-table-column>
          <el-table-column prop="ename" label="英文名称" align="center"></el-table-column>
          <!--<el-table-column prop="manager" label="部门主管"></el-table-column>-->
          <el-table-column prop="levelName" label="部门层级" align="center"></el-table-column>
          <el-table-column prop="parentName" label="上级部门" align="center"></el-table-column>
          <el-table-column prop="sequence" label="排序" width="50" align="center"></el-table-column>
          <el-table-column prop="effectDate" label="生效日期" align="center"></el-table-column>
          <!--<el-table-column prop="expireDate" label="失效日期" width="100" hidden></el-table-column>-->
          <el-table-column prop="statusName" label="状态" width="70" align="center"></el-table-column>
          <el-table-column prop="actionName" label="操作类型" width="70" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button
                @click="editOrg(scope.$index, scope.row)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                @click="changeOrg(scope.$index, scope.row)"
                type="text"
                size="small">
                变动
              </el-button>

              <el-button
                @click="voidOrg(scope.$index, scope.row)"
                type="text"
                size="small">
                废止
              </el-button>

              <el-button
              v-show="scope.row.status==1"
              @click="releaseClick(scope.$index, scope.row)"
                type="text"
                size="small">
                发布
              </el-button>
              <!--<el-button-->
                <!--v-show="scope.row.status==1"-->
                <!--@click="recall(scope.$index, scope.row)"-->
                <!--type="text"-->
                <!--size="small">-->
                <!--撤回-->
              <!--</el-button>-->
            </template>
          </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar" style="padding-bottom:10px;padding-top:10px;">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>

        <el-dialog :title=orgInfraDialog.title :visible.sync="orgInfraDialog.show" center width="30%">
          <el-form :model="orgInfra" label-width="100px" size="small">
            <!--<el-form-item label="部门编号">-->
              <!--<el-input v-model="orgInfra.deptNo" placeholder="请输入部门编号"   :readonly=orgInfraDialog.deptNo></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="部门名称" >
              <el-input v-model="orgInfra.name" placeholder="请输入部门名称"   :disabled=orgInfraDialog.name></el-input>
            </el-form-item>
            <el-form-item label="部门简称">
              <el-input v-model="orgInfra.sname" placeholder="请输入部门简称"   :disabled=orgInfraDialog.sname></el-input>
            </el-form-item>
            <el-form-item label="英文名称">
              <el-input v-model="orgInfra.ename" placeholder="请输入英文名称"  :disabled=orgInfraDialog.ename></el-input>
            </el-form-item>
            <el-form-item label="上级部门">
              <el-input v-model="orgInfra.parentName" @click.native="showInnerVisible" placeholder="请输入上级部门"  :disabled=orgInfraDialog.parent></el-input>
            </el-form-item>
            <el-form-item label="部门层级">
              <el-select v-model="levelSelect" clearable placeholder="请选择部门层级" :disabled=orgInfraDialog.level>
                <el-option
                  v-for="item in levelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
              <!--<orgSelect></orgSelect>-->
            </el-form-item>
            <el-form-item label="部门排序">
              <el-input-number v-model="orgInfra.sequence" :min="1" :max="orgInfra.sequence" label="描述文字"></el-input-number>
              <!--<el-input v-model="orgInfra.sequence" :min="1"  :readonly=orgInfraDialog.sequence></el-input>-->
            </el-form-item>
            <el-form-item label="生效日期" v-show="orgInfraDialog.delFlag == false">
              <el-date-picker
                v-model="orgInfra.effectDate"
                type="date"
                value-format="yyyy-MM-dd"
                :readonly=orgInfraDialog.effect_date
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="废止日期" v-show="orgInfraDialog.delFlag == true">
              <el-date-picker
                v-model="orgInfra.expireDate"
                type="date"
                value-format="yyyy-MM-dd"
                :readonly=orgInfraDialog.void_date
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="orgInfraSave" v-show="orgInfraDialog.delFlag == false">保存</el-button>
            <!--<el-button type="primary" @click="orgInfraAction">立即生效</el-button>-->
            <el-button type="primary" @click="orgInfraRelease">发布</el-button>
          </div>

          <el-dialog
            width="30%"
            title="部门选择"
            :visible.sync="orgInfraDialog.innerVisible"
            append-to-body>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom:10px;"></el-input>
            <el-card class="box-card" shadow="always" style="height:400px;overflow:auto;">
              <el-tree
                v-loading="treeLoading"
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
        </el-dialog>

        <el-dialog
          width="30%"
          title="选择生效时间"
          :visible.sync="orgInfraDialog.effectDateShow"
          append-to-body>
          <el-form :model="orgInfra" label-width="100px" size="small">
            <el-form-item label="生效日期">
              <el-date-picker
                v-model="orgInfra.effectDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
              <el-button type="primary" @click="releaseAction">发布</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog
          width="30%"
          title="选择废止时间"
          :visible.sync="orgInfraDialog.expireDateShow"
          append-to-body>
          <el-form :model="orgInfra" label-width="100px" size="small">
            <el-form-item label="废止日期">
              <el-date-picker
                v-model="orgInfra.expireDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
              <el-button type="primary" @click="orgAbolish">废止</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-popover
          ref="popover4"
          placement="bottom"
          width="450"
          trigger="click">
          <el-button type="primary" @click="bitchRelease" size="mini">发布</el-button>
          <el-table :data="gridData" size="mini" max-height="400" @selection-change="changeFun">
            <el-table-column type="selection" width="55" @selection-change="changeFun"></el-table-column>
            <el-table-column property="effectDate" label="生效时间"></el-table-column>
            <el-table-column property="name" label="部门"></el-table-column>
            <el-table-column property="actionName" label="操作类型"></el-table-column>
          </el-table>
        </el-popover>

      </el-tab-pane>

      <el-tab-pane label="树形组织" name="second">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom:10px;"></el-input>
        <el-card class="box-card" shadow="hover">
          <el-tree
            class="filter-tree" :data="orgTree" :props="treeprops" default-expand-all :filter-node-method="filterNode" ref="tree2"></el-tree>
        </el-card>
      </el-tab-pane>

      <!--<el-tab-pane label="树形组织" name="three">-->
        <!--&lt;!&ndash;<m-tree&ndash;&gt;-->
          <!--&lt;!&ndash;v-model="orgTree"&ndash;&gt;-->
          <!--&lt;!&ndash;@SaveEdit="SaveEdit"&ndash;&gt;-->
          <!--&lt;!&ndash;@DelNode="DelNode"&ndash;&gt;-->
          <!--&lt;!&ndash;@NodeClick="handleNodeClick">&ndash;&gt;-->
        <!--&lt;!&ndash;</m-tree>&ndash;&gt;-->
      <!--</el-tab-pane>-->

      <el-tab-pane label="树形组织" name="four">

        <!--<el-row>-->
          <!--<el-button type="success"  size="small" @click="handle2">提交</el-button>-->
          <!--<el-button type="warning"  size="small" @click="handle2">撤回</el-button>-->
        <!--</el-row>-->
        <span></span>
        <span></span>
        <el-row>
          <el-col :span="12">
            <el-tree
              :data="orgTree"
              node-key="id"
              draggable
              :expand-on-click-node="false"
              :render-content="renderContent">
            </el-tree>
          </el-col>
        </el-row>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import { getOrgInfoHis, saveOrg, updateOrg, getOrgMrgTree, findHrCodes, release, save, abolish, allAbolish, getRelese } from '@/api/org'
  import { formatDate } from '@/utils/index'
  import MTree from '@/components/tree/Index.vue'

  let id = 1000;

  export default {
    name: 'orgMgr',
    components:{
      MTree
    },
    data() {
      return {
        activeName: 'first',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        orgData: [],
        total: null,
        listQuery: {
          page: 1,
          limit: 20,
          dept: '',
          parent: '',
          level: undefined
        },
        orgInfraDialog: {
          innerVisible: false,
          show: false,
          title: '新建',
          delFlag: false,
//          deptNo: true,
          name: true,
          sname: true,
          ename: true,
          parent: true,
          parentName: true,
          level: true,
          effect_date: true,
          void_date: true,
          sequence: true,
          effectDateShow: false,
          expireDateShow: false
        },
        orgInfra: {
          id: '',
          action: 1,
          deptId: '',
          deptNo: '',
          name: '',
          sname: '',
          ename: '',
          parent: '',
          level: '',
          sequence: '',
          // siteId: '1',
          effectDate: '',
          expireDate: '',
          parentName: ''
        },
        treeprops: {
          children: 'children',
          label: 'label'
        },
        orgTree: [],
        treeLoading: true,
        filterText: '',
        levelOptions: [],
        levelSelect: '',

        gridData: [],
        multipleSelection: []
      }
    },
    created() {
      this.onQuery()
      this.getLevels()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
      levelSelect(val) {
        this.orgInfra.level = val
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        const status = row.status
        if (status === 1) {
          return 'warning-row';
        } else if (status === 2) {
          return 'success-row';
        }
        return '';
      },
      handleNodeClick(data) {
        this.orgInfraDialog.innerVisible = false
        this.orgInfra.parentName = data.label
        this.orgInfra.parent = data.id
        this.orgInfra.sequence = data.children.length + 1
        let level = data.attributes[0].level
        this.getLevels(this.orgInfra.parent)
      },
      getLevels(parent) {
        let param = { 'parent':parent }
        findHrCodes(param).then(response => {
          this.levelOptions = response.data
        })
      },
      showInnerVisible() {
        this.getTree()
        this.orgInfraDialog.innerVisible = true
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getTree() {
        this.treeLoading = true
        getOrgMrgTree().then(response => {
          this.orgTree = response.data
          this.treeLoading = false
        })
      },
      onQuery() {
        getOrgInfoHis(this.listQuery).then(response => {
          this.orgData = response.data.items
          this.total = response.data.total
        })
      },
      addNewOrg() {
        var me = this
        me.changDialogInfra(true, '新建部门', false)
        me.clearOrgInfra()
        me.readOnlySet(false, [])
        me.orgInfra.action=1
      },
      editOrg(index, row) {
        var me = this
        me.changDialogInfra(true, '编辑部门', false)
        me.copyOrgInfr(row)
        me.readOnlySet(true, ['name', 'sname', 'ename', 'sequence', 'effect_date'])
        me.orgInfra.action=2
      },
      changeOrg(index, row) {
        var me = this
        me.changDialogInfra(true, '部门变动', false)
        me.copyOrgInfr(row)
        me.readOnlySet(true, ['level', 'parent', 'effect_date', 'sequence'])
        me.orgInfra.action=3
      },
      voidOrg(index, row) {
        var me = this
        me.orgInfraDialog.expireDateShow = true
        me.copyOrgInfr(row)
        me.orgInfra.action=4
      },
//      recall(index, row) {
//        var me = this
//        me.copyOrgInfr(row)
//        this.$message({
//          type: 'info',
//          message: '撤回失败'
//        })
//      },
      releaseClick(index, row) {
        var me = this
        me.copyOrgInfr(row)
        me.releaseAction()
      },
      releaseAction() {
        var curTime = new Date();
        var effectDate = new Date(Date.parse(this.orgInfra.effectDate));
        if (effectDate < curTime) {
          this.$message({
            message: '生效时间已过期，不能发布,请重新选择生效时间',
            type: 'success'
          })
          return
        }
        release(this.orgInfra).then(response => {
          me.onQuery()
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        })
      },

      changDialogInfra(bShow, sTitle, bDel) {
        var me = this
        me.orgInfraDialog.innerVisible = false
        me.orgInfraDialog.show = bShow
        me.orgInfraDialog.title = sTitle
        me.orgInfraDialog.delFlag = bDel
      },
      clearOrgInfra() {
        var me = this
        for (var p in me.orgInfra) {
          me.orgInfra[p] = ''
        }
        this.getLevels()
        me.levelSelect = ''
      },
      copyOrgInfr(row) {
        var me = this
        for (var p in me.orgInfra) {
          me.orgInfra[p] = row[p]
        }
        this.getLevels(me.orgInfra.parent)
        me.levelSelect = ''+me.orgInfra.level
      },
      readOnlySet(bReadOnly, oppositeArray) {
        var me = this
        for (var p in me.orgInfraDialog) {
          if (p!== 'effectDateShow' && p!== 'expireDateShow' && p!== 'innerVisible' && p !== 'show' && p !== 'title' && p !== 'delFlag') {
            me.orgInfraDialog[p] = bReadOnly
          }
        }
        for (var value of oppositeArray) {
          me.orgInfraDialog[value] = !bReadOnly
        }
      },
      orgInfraSave() {
        var me = this
        var effectDate = this.orgInfra.effectDate
        if(effectDate == "") {
          this.$message({
            message: '请选择生效时间',
            type: 'warning'
          })
          return
        }
        save(this.orgInfra).then(response => {
          this.$message({
            message: '保存成功,确认无误后请及时发布',
            type: 'success'
          })
          me.orgInfraDialog.show = false
          me.onQuery()
        })
      },
      orgInfraAction() {
        var me = this
        const str_date = formatDate(new Date(), 'yyyy-MM-dd')
        me.orgInfra.effectDate = str_date
        me.orgInfraSave()
      },
      orgInfraRelease() {
        var me = this
        if (me.orgInfra.deptId === '') {
          saveOrg(this.orgInfra).then(response => {
            this.$message({
              message: '部门添加成功',
              type: 'success'
            })
            me.orgInfraDialog.show = false
            me.onQuery()
          })
        } else {
          updateOrg(this.orgInfra).then(response => {
            this.$message({
              message: '部门修改成功',
              type: 'success'
            })
            me.orgInfraDialog.show = false
            me.onQuery()
          })
        }
      },
      orgAbolish() {
        var me = this
        abolish(this.orgInfra).then(response => {
          if(response.success) {
            this.$message({
              message: '部门废止成功',
              type: 'success'
            })
            this.onQuery()
          } else {
            me.open2()
          }
          me.orgInfraDialog.expireDateShow = false
          me.onQuery()
        })
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.onQuery()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.onQuery()
      },
      open2() {
        this.$confirm('该部门下含有子部门需同时废止, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          allAbolish(this.orgInfra).then(response => {
            this.$message({
              message: '部门废止成功',
              type: 'success'
            })
            this.onQuery()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消废止'
          })
        })
      },

//////////////////////////////////////////////////////
//      handleNodeClick(nodeData){
////            if(nodeData.status == -1 ){
////              this.$http.get(this.HOST+'/admin/data/table/'+nodeData.label+'/create').then((response) => {
////                if(response.status == 200){
////                  var data = response.body.data
////                  var tableParam = {
////                    name:nodeData.label,
////                    label:nodeData.label,
////                    type:'data',
////                    info:data,
////                    active:true
////                  }
////                  this.$store.commit('addTabItem', tableParam)
////                }
////              })
////            }
//      },
//      SaveEdit(parentNode,data,next){
////        var param = {
////          isAdd:data.isAdd,
////          parentNode:parentNode,
////          node:data
////        }
//        next(true, 2222222)
////        id = id + 1
////            this.$http.post(this.HOST+'/admin/system/tree/edit',param).then((response) => {
////              if(response.status == 200){
////                if(data.isAdd){
////                  next(true,response.body.data.tid)
////                }else{
////                  next(true)
////                }
////              }
////            })
//      },
//      DelNode(parentNode,data,next){
////        var param = {
////          node:data
////        }
//        next(true)
////            this.$http.post(this.HOST+'/admin/system/tree/del',param).then((response) => {
////              if(response.status == 200){
////                next(true)
////              }
////            })
//      },
///////////////////////////////////////////////


      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [], attributes:[] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span>{node.label} || {data.attributes[0].level}</span>
        <span>
          <i
          style="color:#606266; font-size:1.2em; vertical-align:middle; margin: 0 5px;"
          class="el-icon-edit-outline"
          on-click={ () => this.append(data) }></i>

          <i
          style="color:#606266; font-size:1.2em; vertical-align:middle; margin: 0 5px;"
          class="el-icon-delete"
          on-click={ () => this.remove(node, data) }>

          </i>
        </span>
        </span>);
      },

      handle2() {
        this.getTree()
      },

      getReleseTable() {
        getRelese().then(response => {
          this.gridData = response.data
        })
      },
      changeFun(val) {
        this.multipleSelection = val
      },
      bitchRelease() {
        var arr = this.multipleSelection
        console.log(arr)
        for(var index in arr){
          release(arr[index]).then(response => {
            this.$message({
              message: '发布成功',
              type: 'success'
            })
            this.onQuery()
            this.getReleseTable()
          })
        }
      }

    }
  }
</script>
<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .warning-row {
    background: oldlace;
  }
</style>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

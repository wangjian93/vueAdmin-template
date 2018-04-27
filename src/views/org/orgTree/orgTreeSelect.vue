<template>
  <div>
    <el-input v-model="vaule" @click.native="selectOrg"></el-input>
    <!--<el-input v-model="deptNo"></el-input>-->
    <el-dialog title="部门选择" :visible.sync="show">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom:10px;"></el-input>
      <el-card class="box-card" shadow="hover">
        <el-tree
          v-loading="treeLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          class="filter-tree"
          :data="orgTree"
          :props="treeprops"
          node-click="nodeClick"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
          append-to-body></el-tree>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
  import { getOrgTree } from '@/api/org'

  export default {
    name: 'orgSelect',
    data() {
      return {
        treeLoading: true,
        filterText: '',
        orgTree: [],
        show: false,
        vaule: '',
        deptNo: '',
        treeprops: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getTree() {
        this.treeLoading = true
        getOrgTree(this.listQuery).then(response => {
          this.orgTree = response.data
          this.treeLoading = false
        })
      },
      selectOrg() {
        console.log("打开")
        this.getTree()
        this.show = true
      },
      nodeClick(data) {
        this.vaule = data.label
        this.deptNo = data.value
        this.show = false
      }
    }
  }
</script>

<template>
  <div>
    <el-input
      v-model="departmentName"
      @click.native="showInnerVisible"
      placeholder="请输入部门">
    </el-input>

    <el-dialog
      width="30%"
      title="部门选择"
      :visible.sync="innerVisible"
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
  import { getOrgTree } from '@/api/org'
  export default {
    name: 'departmentTree',
//    props: {
//      departmentName: '',
//      departmentId: ''
//    },
    data() {
      return {
        departmentName: '',
        departmentId: '',
        orgTree: [],
        filterText: '',
        orgTree: [],
        treeprops: { children: 'children', label: 'label'},
        innerVisible: false
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
    },
    created: function () {
      this.getOrgTree_()
    },
    methods: {
      getOrgTree_() {
        getOrgTree().then(response => {
          this.orgTree = response.data
        })
      },

      showInnerVisible() {
        this.innerVisible = true
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        this.innerVisible = false
        this.departmentName = "["+data.id+"]" + data.label
        this.departmentId = data.attributes[0].id
        this.$emit('childByValue', this.departmentName, this.departmentId)
      },
    }
  }
</script>

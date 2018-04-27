<template>
  <span class="custom-tree-node">
    <el-input v-if="node.status == 1"
      style="width:20%"
      size="mini"
      placeholder="请输入部门名称"
      prefix-icon="el-icon-search"
      v-model="node.label">
    </el-input>
    <el-input v-if="node.status == 1"
      style="width:20%"
      size="mini"
      placeholder="请输入部门简称"
      prefix-icon="el-icon-search"
      v-model="node.label">
    </el-input>
    <el-input v-if="node.status == 1"
      style="width:20%"
      size="mini"
      placeholder="请输入英文名称"
      prefix-icon="el-icon-search"
      v-model="node.label">
    </el-input>
    <el-date-picker v-if="node.status == 1"
      style="width:20%"
      size="mini"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>

    <i v-if="node.status == 1"
       style="color:#67C23A; font-size:1.5em; vertical-align:middle; margin: 0 5px;"
       class="el-icon-success"
       @click="SaveEdit">
    </i>
    <i v-if="node.status == 1"
       style="color:#E6A23C; font-size:1.5em; vertical-align:middle; margin: 0 5px;"
       class="el-icon-error"
       @click="CancelEdit">
    </i>


    <span v-if="node.status == 0">{{node.label}}</span>
    <span>
        <i v-if="node.status == 0"
           style="color:#606266; font-size:1.5em; vertical-align:middle; margin: 0 5px;"
           class="el-icon-edit-outline"
           @click="OpenEdit"></i>
        <i v-if="node.status == 0"
           style="color:#606266; font-size:1.5em; vertical-align:middle; margin: 0 5px;"
           class="el-icon-share"
           @click="Append"></i>
        <i v-if="node.status == 0"
           style="color:#606266; font-size:1.5em; vertical-align:middle; margin: 0 5px;"
           class="el-icon-delete"
           @click="Delete"></i>
    </span>
  </span>
</template>

<script>
    export default {
      data() {
        return {
          node:this.value,
          nodeData:JSON.parse(JSON.stringify(this.value))
        }
      },
      props:{
        value:{
          default: function () {
            return {}
          }
        },
        treeNode:{
          default: function () {
            return {}
          }
        }
      },
      methods:{
        OpenEdit(){
          this.node.status = 1
          this.node.isAdd = false
        },
        Append(){
          //添加节点事件
          this.$emit('Append')
        },
        SaveEdit(){
          //保存节点事件
          this.$emit('SaveEdit',this.nodeData)
        },
        CancelEdit(){
          this.node.status = 0
          this.$emit('CancelEdit',this.nodeData)
        },
        Delete(){
          this.$emit('Delete',this.nodeData)
        },

      },
      watch:{
        value:{
          handler:function(val,oldVal){
            this.node = val
          },
          deep:true
        },
        node:{
          handler:function(val){
            this.$emit('input',val)
          },
          deep:true
        }
      }
    }
</script>


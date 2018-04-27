<template>
  <div style="margin-left: 5px;">
    <Button  style="margin-top: 10px" type="info" @click="addNode" long>添加根目录</Button>
    <el-tree
      :data="treeData"
      @node-click="handleNodeClick"
      ref="tree"
      node-key="value"
      :expand-on-click-node="false"
      :render-content="renderContent"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
    </el-tree>
  </div>
</template>

<script>
  import TreeItem from './TreeItem.vue'
  export default {
    data() {
      return {
        treeData:this.value,
        runParam:{}
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      addNode(){
        this.treeData.splice(0,0,{
          value:this.$utilHelper.generateUUID(),
          label: '请输入模块名称',
          children: [],
          status:1,
          isAdd:true
        })
      },
      handleNodeClick(nodeData) {
        this.$emit('NodeClick',nodeData)
      },
      renderContent(h, { node, data, store }) {
        console.log("重新渲染")
        console.log(node)
        console.log(data)
        console.log(node.label)
        //设置status状态
        if(!data.status) {
          this.$set(data, 'status', 0)
        }
        return h(TreeItem,{
          props:{
            value:data,
            treeNode:node
          },
          on:{
            input:(node)=>{
              data = node
            },
            Append: () => {
              node.expanded = true
              data.children.push({ value: this.$utilHelper.generateUUID(), label: '请输入模块名称', children: [], status:1,isAdd:true })
            },
            //删除节点
            Delete: (nodeData) => {
              //递归查找父节点
              var parentNode = this.$utilHelper.getNode(this.treeData,data.value).parentNode
              this.runParam.parentNode = parentNode
              this.runParam.data = data
              this.runParam.nodeData = nodeData
              this.$emit('DelNode',parentNode,data,this.CanDelNext)

            },
            //保存节点
            SaveEdit:(nodeData)=> {
              //递归查找父节点
              var parentNode = this.$utilHelper.getNode(this.treeData,data.value).parentNode
              this.runParam.parentNode = parentNode
              this.runParam.data = data
              this.runParam.nodeData = nodeData
              this.$emit('SaveEdit',parentNode,data,this.CanSaveNext)
            },
            //撤销修改
            CancelEdit:(nodeData)=>{
              //递归查找父节点
              var parentNode = this.$utilHelper.getNode(this.treeData,data.value).parentNode
              if(data.isAdd){
                parentNode.children.forEach((v,i)=>{
                  if(v.value == data.value){
                    parentNode.children.splice(i,1)
                  }
                })
              }else{
                parentNode.children.forEach((v,i)=>{
                  if(v.value == data.value){
                    parentNode.children.splice(i,1,JSON.parse(JSON.stringify(nodeData)))
                  }
                })
              }
            }
          }
        })
      },
      CanSaveNext(isNext,nodeId){
        let parentNode = this.runParam.parentNode
        let nodeData = this.runParam.nodeData
        let data = this.runParam.data
        if(isNext){
          parentNode.children.forEach((v,i)=>{
            if(v.value == data.value){
              if(this.HOST != "static"&&data.isAdd){
                data.value = nodeId
              }
              data.status = 0
              parentNode.children.splice(i,1,data)
            }
          })
        }else{
          if(!data.isAdd){
            parentNode.children.forEach((v,i)=>{
              if(v.value == nodeData.value){
                data.label = nodeData.label
                parentNode.children.splice(i,1,data)
              }
            })
          }
        }
        this.runParam = {}
      },
      CanDelNext(isNext){
        let parentNode = this.runParam.parentNode
        let nodeData = this.runParam.nodeData
        let data = this.runParam.data
        if(isNext){
          parentNode.children.forEach((v,i)=>{
            if(v.value == data.value){
              parentNode.children.splice(i,1)
            }
          })
        }
        this.runParam = {}
      },


      handleDragStart(node, ev) {
        console.log('drag start', node);
        console.log("status:  " + node.status  + "       " + node.label);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', draggingNode.label,dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode) {
        return dropNode.data.label !== '二级 3-1';
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-1-1') === -1;
      }

    },
    props:{
      value:Array
    },
    watch:{
      value:{
        handler:function(val,oldVal){
          this.treeData = val
        },
        deep:true
      },
      treeData:{
        handler:function(val){
          this.$emit('input',val)
        },
        deep:true
      }
    },
    components:{
      TreeItem
    }
  }
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree-node__content {
    height: 40px;
  }
</style>

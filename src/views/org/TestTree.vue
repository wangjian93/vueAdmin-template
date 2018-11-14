<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <m-tree
          v-model="tableTree"
          @SaveEdit="SaveEdit"
          @DelNode="DelNode"
          @NodeClick="handleNodeClick"></m-tree>
        </el-col>
    </el-row>
  </div>
</template>

    <script>
      import { getOrgInfo, getOrgTree, getOrgTree2, findHrCodes } from '@/api/org'
      import MTree from '@/components/tree/Index.vue'

      let id = 1000;
      export default {
        components:{
          MTree
        },
        data() {
          return {
            data6: [],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            loading: true,

            tableTree: [
              {
                "value": 1,
                "label": "安检部",
                "children": [
                  {
                    "value": 2,
                    "label": "DOTA2",
                    "children": []
                  },
                  {
                    "value": 3,
                    "label": "测试表格二",
                    "children": []
                  },
                  {
                    "value": 4,
                    "label": "测试表格三",
                    "children": []
                  }
                ]
              },
              {
                "value": 5,
                "label": "护卫部",
                "children": [
                  {
                    "value": 6,
                    "label": "测试表格四",
                    "children": []
                  },
                  {
                    "value": 7,
                    "label": "测试表格五",
                    "children": []
                  }
                ]
              },
              {
                "value": 8,
                "label": "其他部",
                "children": [
                  {
                    "value": 9,
                    "label": "其他一部",
                    "children": [
                      {
                        "value": 11,
                        "label": "内容测试",
                        "children": [
                          {
                            "value": 12,
                            "label": "测试表格六",
                            "children": []
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "value": 10,
                    "label": "其他二部",
                    "children": [
                      {
                        "value": 13,
                        "label": "测试表格七",
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },


        created() {
          this.getTree()
        },
        methods: {
          getTree() {
            this.loading = true
            getOrgTree(this.listQuery).then(response => {
              this.data6 = response.data
              this.loading = false
            })

          },
          handleNodeClick(nodeData){
//            if(nodeData.status == -1 ){
//              this.$http.get(this.HOST+'/admin/data/table/'+nodeData.label+'/create').then((response) => {
//                if(response.status == 200){
//                  var data = response.body.data
//                  var tableParam = {
//                    name:nodeData.label,
//                    label:nodeData.label,
//                    type:'data',
//                    info:data,
//                    active:true
//                  }
//                  this.$store.commit('addTabItem', tableParam)
//                }
//              })
//            }
          },
          SaveEdit(parentNode,data,next){
            var param = {
              isAdd:data.isAdd,
              parentNode:parentNode,
              node:data
            }
            next(true, id)
            id = id + 1
//            this.$http.post(this.HOST+'/admin/system/tree/edit',param).then((response) => {
//              if(response.status == 200){
//                if(data.isAdd){
//                  next(true,response.body.data.tid)
//                }else{
//                  next(true)
//                }
//              }
//            })
          },
          DelNode(parentNode,data,next){
            var param = {
              node:data
            }
            next(true)
//            this.$http.post(this.HOST+'/admin/system/tree/del',param).then((response) => {
//              if(response.status == 200){
//                next(true)
//              }
//            })
          }

        }
      };
    </script>


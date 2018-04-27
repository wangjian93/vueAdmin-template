<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark">
          <label>
            <span style="font-size:8px" class="bg-orange">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <font size="1">董事会/总裁</font>
          </label>
          <label>
            <span style="font-size:8px" class="bg-cornflowerBlue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <font size="1">中心</font>
          </label>
          <label>
            <span style="font-size:8px" class="bg-yellow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <font size="1">厂处</font>
          </label>
          <label>
            <span style="font-size:8px" class="bg-limeGreen">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <font size="1">部</font>
          </label>
          <label>
            <span style="font-size:8px" class="bg-skyBlue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <font size="1">课</font>
          </label>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <label>
            <input type="checkbox" v-model="horizontal" > horizontal
          </label>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <label>
            <input type="checkbox" v-model="collapsable"> collapsable
          </label>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <el-checkbox v-model="checked">虚拟部门隐藏</el-checkbox>
        </div>
      </el-col>
    </el-row>

    <p><br></p>

    <el-row style="text-align:center;overflow:auto;">
      <div style="width:100%;font-size:10px;">
        <org-tree
          :data="data"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-class-name="labelClassName"
          :render-content="renderContent"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        >
        </org-tree>
      </div>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{ dialogInfo }}</span>
    </el-dialog>

    <!--<div class="row">-->
      <!--<div class="col-md-12">-->
        <!--<form class="form-horizontal row">-->
          <!--<div class="col-md-2">-->
            <!--<div class="checkbox">-->
              <!--<label>-->
                <!--<span style="font-size:8px" class="bg-orange">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                <!--<font size="1">公司</font>-->
              <!--</label>-->
              <!--<label>-->
                <!--<span style="font-size:8px" class="bg-gold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                <!--<font size="1">中心</font>-->
              <!--</label>-->
              <!--<label>-->
                <!--<span style="font-size:8px" class="bg-gray">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                <!--<font size="1">厂处</font>-->
              <!--</label>-->
              <!--<label>-->
                <!--<span style="font-size:8px" class="bg-lightpink">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                <!--<font size="1">部</font>-->
              <!--</label>-->
              <!--<label>-->
                <!--<span style="font-size:8px" class="bg-chocolate">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                <!--<font size="1">课</font>-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div class="col-md-2 col-md-offset-6">-->
            <!--<div class="checkbox">-->
              <!--<label>-->
                <!--<input type="checkbox" v-model="horizontal" > horizontal-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="col-md-2">-->
            <!--<div class="checkbox">-->
              <!--<label>-->
                <!--<input type="checkbox" v-model="collapsable"> collapsable-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->

          <!--&lt;!&ndash;<div class="col-md-6">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="form-group">&ndash;&gt;-->
              <!--&lt;!&ndash;<label class="control-label col-md-5">labelClassName:</label>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="col-md-7">&ndash;&gt;-->
                <!--&lt;!&ndash;<select class="form-control" v-model="labelClassName">&ndash;&gt;-->
                  <!--&lt;!&ndash;<option value="bg-white">bg-white</option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<option value="bg-orange">bg-orange</option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<option value="bg-gold">bg-gold</option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<option value="bg-gray">bg-gray</option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<option value="bg-lightpink">bg-lightpink</option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<option value="bg-chocolate">bg-chocolate</option>&ndash;&gt;-->
                  <!--&lt;!&ndash;<option value="bg-tomato">bg-tomato</option>&ndash;&gt;-->
                <!--&lt;!&ndash;</select>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</form>-->
      <!--</div>-->
    <!--</div>-->
    <!--<p><br></p>-->
    <!--<div class="text-center">-->
      <!--<org-tree-->
        <!--:data="data"-->
        <!--:horizontal="horizontal"-->
        <!--:collapsable="collapsable"-->
        <!--:label-class-name="labelClassName"-->
        <!--:render-content="renderContent"-->
        <!--@on-expand="onExpand"-->
        <!--@on-node-click="onNodeClick"-->
      <!--&gt;-->
      <!--</org-tree>-->
    <!--</div>-->
  </div>
</template>

<script>
import OrgTree from '@/components/org-tree'

export default {
  name: 'app',
  components: {
    OrgTree
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogInfo: '',
      horizontal: true,
      collapsable: false,
      checked: false,
      labelClassName: function(data) {
        let className
        if (!data.attributes) {
          return 'bg-white'
        }
        const level = data.attributes[0].level
        switch (level) {
          case 10:
            className = 'bg-orange'
            break
          case 20:
            className = 'bg-orange'
            break
          case 30:
            className = 'bg-orange'
            break
          case 40:
            className = 'bg-orange'
            break
          case 50:
            className = 'bg-cornflowerBlue'
            break
          case 60:
            className = 'bg-yellow'
            break
          case 70:
            className = 'bg-yellow'
            break
          case 80:
            className = 'bg-skyBlue'
            break
          case 90:
            className = 'bg-limeGreen'
            break
          default:
            className = 'bg-white'
        }
        return className
      }
    }
  },
  watch: {
    checked(val, oldval) {
      console.log(val)
      const param = { 'isHidden': val }
      console.log(param)
      this.$emit('refreshTree', param)
    }
  },
  methods: {
    renderContent(h, data) {
      return data.label
    },
    onExpand(data) {
      if ('expand' in data) {
        data.expand = !data.expand

        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    onNodeClick(e, data) {
      this.dialogInfo = data.label
      this.dialogVisible = true
    },
    collapse(list) {
      list.forEach(child => {
        if (child.expand) {
          child.expand = false
        }

        child.children && this.collapse(child.children)
      })
    }
  }
}
</script>

<style>
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-cornflowerBlue {
  background-color: cornflowerBlue ;
}
.bg-yellow {
  background-color: yellow;
}
.bg-limeGreen {
  background-color: LimeGreen  ;
}
.bg-skyBlue {
  background-color: SkyBlue  ;
}
.bor {
  border:1px dashed #F00;
}



.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>
<!--<style lang="css">-->
  <!--@import 'https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css';-->
<!--</style>-->

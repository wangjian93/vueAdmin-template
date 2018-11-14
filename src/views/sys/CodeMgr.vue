<template>
  <div class="app-container">


    <el-table :data="codes" border size="small">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column prop="id" label="CodeId"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="label" label="Label"></el-table-column>
      <el-table-column prop="properties" label="属性"></el-table-column>
      <el-table-column prop="sequence" label="排序"></el-table-column>
      <el-table-column prop="category.label" label="类型"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Code添加"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <span>
        <el-form :model="code" size="small" label-position="left" label-width="100px">
          <el-form-item label="name">
            <el-input v-model="code.name"></el-input>
          </el-form-item>
          <el-form-item label="label">
            <el-input v-model="code.label"></el-input>
          </el-form-item>
          <el-form-item label="property">
            <el-input v-model="code.property"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getCodes, saveCode } from '@/api/sys'
  export default {
    name: 'codeMgr',
    data() {
      return {
        codes: [],
        dialogVisible: false,
        code: {
          parentId: '',
          name: '',
          label: '',
          property: ''
        }
      }
    },
    created() {
      this.query()
    },
    methods: {
      //查询
      query() {
        getCodes().then(response => {
          this.codes = response.data
        })
      },
      //点击添加事件
      handleClick(row) {
        this.code.parentId = row.id
        this.dialogVisible = true
      },
      //保存
      save() {
        saveCode(this.code).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.query()
        })
      }
    }
  }
</script>


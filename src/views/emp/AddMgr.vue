<template>
  <div class="app-container" style="margin-top: -20px;">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="人员录入" name="first">
        <el-form  :model="empForm" :rules="rules" ref="empForm" size="small" label-position="left" label-width="100px" style="margin:10px 10px 10px 10px;">
          <el-card class="box-card">
            <el-form-item>
              <el-button type="primary" size="small" @click="formSubmit('empForm')">保存</el-button>
              <el-button type="success" size="small" @click="formSubmitNext('empForm')">保存继续</el-button>
              <el-button type="info" size="small" @click="formReset('empForm')">清空</el-button>
              <!--<el-button type="primary" size="small" @click="confireEmpNum">生成工号</el-button>-->
              <el-button type="primary" size="small" @click="formCopy('empForm')">复制模板</el-button>
              <el-button type="warning" size="small" @click="batchUpLoad">批量导入</el-button>
            </el-form-item>

            <div class="tip">
              <p>基本信息</p>
            </div>
            <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
              <el-col :span="8">
                <el-form-item label="工号"  prop="empNo">
                  <el-input v-model="empForm.empNo" :disabled="true" placeholder="保存自动生成.."></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                  <el-select v-model="empForm.gender" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.genderList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="姓名"  prop="name">
                  <el-input v-model="empForm.name"></el-input>
                </el-form-item>

                <el-form-item label="英文名"  prop="ename">
                  <el-input v-model="empForm.ename"></el-input>
                </el-form-item>

                <el-form-item label="姓 (中文)"  prop="firstName">
                  <el-input v-model="empForm.firstName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名 (中文)"  prop="firstName">
                  <el-input v-model="empForm.lastName"></el-input>
                </el-form-item>

                <el-form-item label="姓 (英文)"  prop="efirstName">
                  <el-input v-model="empForm.efirstName"></el-input>
                </el-form-item>

                <el-form-item label="名 (英文)"  prop="elastName">
                  <el-input v-model="empForm.elastName"></el-input>
                </el-form-item>

                <el-form-item label="身份证号" prop="idNumber">
                  <el-input v-model="empForm.idNumber"></el-input>
                </el-form-item>

                <el-form-item label="出生日期" prop="birthDate">
                  <el-date-picker
                    v-model="empForm.birthDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" align="center">
                <el-upload
                  class="avatar-uploader"
                  :disabled="imageUpload.disabled"
                  :data="imageUpload.data"
                  action="api/SpringMVC006/fileUpload3.do"
                  :show-file-list="true"
                  :limit=1
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUpload.flag" v-bind:src="imageUpload.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
            <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
              <el-col :span="8">
                <el-form-item label="民族" prop="nation">
                  <el-select v-model="empForm.nation" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.nationList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="籍贯" prop="origin">
                  <el-select v-model="empForm.origin" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.originList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="学历" prop="education">
                  <el-select v-model="empForm.education" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.educationList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="政治面貌" prop="politics">
                  <el-select v-model="empForm.politics" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.politicsList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="婚姻状况" prop="isMarried">
                  <el-select v-model="empForm.isMarried" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.marriedList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>


            <div style="margin:5px 0px 10px 20px;">连系方式</div>
            <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
              <el-col :span="8">
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="empForm.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Email" prop="email">
                  <el-input v-model="empForm.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
              <el-col :span="24">
                <el-form-item label="居住地址" prop="address">
                  <el-input v-model="empForm.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
              <el-col :span="24">
                <el-form-item label="身份证地址" prop="idAddress">
                  <el-input v-model="empForm.idAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div style="margin:5px 0px 10px 20px;">紧急联络人</div>
            <el-row :gutter="80" style="margin:5px 0px 10px 20px;" v-for="(f, index) in empForm.family">
              <el-col :span="8">
                <el-form-item label="姓名" prop="contactName">
                  <el-input v-model="f.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话" prop="contactPhone">
                  <el-input v-model="f.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关系" prop="relation">
                  <el-select v-model="f.relation" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.relationList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--<el-col :span="2">-->
              <!--<el-button @click.prevent="removeDomain(f)">删除</el-button>-->
              <!--</el-col>-->
            </el-row>
            <!--<el-row>-->
            <!--<el-button @click="addDomain">添加亲属</el-button>-->
            <!--</el-row>-->

            <div style="margin:5px 0px 10px 20px;">入职信息</div>
            <el-row :gutter="80" style="margin:5px 0px 10px 20px;">
              <el-col :span="8">
                <el-form-item label="职务">
                  <el-select v-model="empForm.promotion.titleId" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.titleIdList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="主属部门">
                  <template>
                    <el-input
                      v-model="empForm.position.orgName"
                      @click.native="showInnerVisible"
                      placeholder="请输入部门"
                      :disabled=orgInfraDialog.parent>
                    </el-input>
                  </template>
                </el-form-item>

                <el-form-item label="来源" prop="source">
                  <el-select v-model="empForm.source" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.sourceList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="入职日期" prop="registerDate">
                  <el-date-picker
                    v-model="empForm.registerDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职等">
                  <el-select v-model="empForm.promotion.gradeId" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.gradeIdList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="岗位">
                  <el-select v-model="empForm.position.posId" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.positionList"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="来源说明" prop="sourceMemo">
                  <el-input v-model="empForm.sourceMemo"></el-input>
                </el-form-item>

                <el-form-item label="组别" prop="group">
                  <el-select v-model="empForm.groupId" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.groupIdList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算方式" prop="settling">
                  <el-select v-model="empForm.settlingId" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.settlingList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="IDL/DL" prop="isOperator">
                  <el-select v-model="empForm.isOperator" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.operatorList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="范围" prop="scopeId">
                  <el-select v-model="empForm.scopeId" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.scopeIdList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="状态"   prop="statusId">
                  <el-select v-model="empForm.statusId" placeholder="请选择">
                    <el-option
                      v-for="item in selectList.statusIdList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

          </el-card>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <el-table
          :data="tableData5"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          border
          size="mini">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓（中文)">
                  <span>{{ props.row.firstName }}</span>
                </el-form-item>
                <el-form-item label="名 (中文)">
                  <span>{{ props.row.lastName }}</span>
                </el-form-item>
                <!--<el-form-item label="姓名">-->
                  <!--<span>{{ props.row.name }}</span>-->
                <!--</el-form-item>-->
                <el-form-item label="姓（英文)">
                  <span>{{ props.row.efirstName }}</span>
                </el-form-item>
                <el-form-item label="姓（英文)">
                  <span>{{ props.row.elastName }}</span>
                </el-form-item>
                <!--<el-form-item label="英文名">-->
                  <!--<span>{{ props.row.ename }}</span>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="性别">-->
                  <!--<span>{{ props.row.gender }}</span>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="出生日">-->
                  <!--<span>{{ props.row.birthDate }}</span>-->
                <!--</el-form-item>-->
                <el-form-item label="身份证号码">
                  <span>{{ props.row.idNumber }}</span>
                </el-form-item>
                <!--<el-form-item label="名族">-->
                  <!--<span>{{ props.row.nation }}</span>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="籍贯">-->
                  <!--<span>{{ props.row.origin }}</span>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="学历">-->
                  <!--<span>{{ props.row.education }}</span>-->
                <!--</el-form-item>-->
                <el-form-item label="政治面貌">
                  <span>{{ props.row.politics }}</span>
                </el-form-item>
                <el-form-item label="婚姻状况">
                  <span>{{ props.row.isMarried }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="电话">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="居住地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="身份证地址">
                  <span>{{ props.row.idAddress }}</span>
                </el-form-item>
                <el-form-item label="归属公司">
                  <span>{{ props.row.scopeId }}</span>
                </el-form-item>
                <!--<el-form-item label="DL/IDL标识">-->
                  <!--<span>{{ props.row.isOperator }}</span>-->
                <!--</el-form-item>-->
                <el-form-item label="组别">
                  <span>{{ props.row.groupId }}</span>
                </el-form-item>
                <!--<el-form-item label="入职时间">-->
                  <!--<span>{{ props.row.registerDate }}</span>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="员工来源">-->
                  <!--<span>{{ props.row.source }}</span>-->
                <!--</el-form-item>-->
                <el-form-item label="来源说明">
                  <span>{{ props.row.sourceMemo }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.statusId }}</span>
                </el-form-item>
                <el-form-item label="生效日">
                  <span>{{ props.row.effectDate }}</span>
                </el-form-item>
                <el-form-item label="结算方式">
                  <span>{{ props.row.settlingId }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="英文名"
            prop="ename">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender">
          </el-table-column>
          <el-table-column
            label="出生日"
            prop="birthDate">
          </el-table-column>
          <el-table-column
            label="名族"
            prop="nation">
          </el-table-column>
          <el-table-column
            label="籍贯"
            prop="origin">
          </el-table-column>
          <el-table-column
            label="学历"
            prop="education">
          </el-table-column>

          <el-table-column
            label="DL/IDL标识"
            prop="isOperator">
          </el-table-column>
          <el-table-column
            label="入职时间"
            prop="registerDate">
          </el-table-column>
          <el-table-column
            label="来源"
            prop="source">
          </el-table-column>

        </el-table>

        <div style="margin-top: 20px">
          <el-button @click="submit()">提交</el-button>
        </div>


      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-dialog title="批量创建" v-model="batchUploadVisible" :visible.sync="batchUploadVisible">
      <el-form :model="batchUploadForm" label-width="100px">
        <el-upload
          class="upload-demo"
          action="api/SpringMVC006/uploadExcel.do"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过1000kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="batchUploadVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      title="部门选择"
      :visible.sync="orgInfraDialog.innerVisible"
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

  import { saveEmp, createFamily, getPositionList, saveEmployee, queryNotSubmitEmployee, submitEmployeeBatch } from '@/api/mgr';
  import { getOrgTree } from '@/api/org'

  import img_404 from '@/assets/404_images/404.png';

  export default {
    name: 'addEmp',
    data () {
      return {
        multipleSelection: [],
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        activeName: 'second',

        fileList: [],
        loading: 'false',


        orgInfraDialog: {
          innerVisible: false
        },
        filterText: '',
        orgTree: [],
        treeprops: {
          children: 'children',
          label: 'label'
        },

        batchUploadVisible: false,
        batchUploadForm:{
          "fileList":[]
        },



        selectList: {
          genderList: [
            {label: '男', value: '0'},
            {label: '女', value: '1'}
          ],
          nationList: [
            {label: '汉族', value: '0'},
            {label: '藏族', value: '1'}
          ],
          originList: [
            {label: '上海', value: '0'},
            {label: '北京', value: '1'},
            {label: '江苏', value: '2'}
          ],
          educationList: [
            {label: '专科', value: '0'},
            {label: '本科', value: '1'},
            {label: '研究生', value: '2'},
            {label: '博士', value: '3'},
            {label: '其他', value: '4'}
          ],
          politicsList: [
            {label: '党员', value: '0'},
            {label: '团员', value: '1'},
            {label: '其他', value: '2'}
          ],
          marriedList: [
            {label: '未婚', value: '0'},
            {label: '已婚', value: '1'},
            {label: '离异', value: '2'}
          ],
          relationList: [
            {label: '父亲', value: '0'},
            {label: '母亲', value: '1'},
            {label: '兄弟', value: '2'},
            {label: '姐妹', value: '3'},
            {label: '朋友', value: '4'},
            {label: '其他', value: '5'}
          ],
          scopeIdList: [
            {label: 'IVO', value: '0'},
            {label: 'IVE', value: '1'}
          ],
          operatorList: [
            {label: 'IDL', value: '0'},
            {label: 'DL', value: '1'}
          ],

          groupIdList: [
            {label: 'C', value: '0'},
            {label: 'J', value: '2'},
            {label: 'T', value: '3'}

          ],
          sourceList: [
            {label: '推荐', value: '0'},
            {label: '外包', value: '1'},
            {label: '派遣', value: '2'}
          ],
          statusIdList: [
            {label: '临时', value: '0'},
            {label: '实习', value: '1'},
            {label: '试用', value: '2'},
            {label: '正式', value: '3'}
          ],
          gradeIdList: [
            {label: 'G5', value: '0'},
            {label: 'G6', value: '1'},
            {label: 'G7', value: '2'}
          ],
          titleIdList: [
            {label: '员工', value: '0'},
            {label: '课长', value: '1'},
            {label: '经理', value: '2'}
          ],
          orgUnitList: [
            {label: '电子商务服务课', value: '5d85ad81dfe24414836c460e837091a9'},
          ],

          positionList: [],
          settlingList: [
            {label: '未定义', value: '0'}
          ]
        },

        empForm: {
          empNo: '',             //工号
          firstName: '小',         //姓（中文）
          lastName: '红',          //名 (中文)
          name: '小红',              //姓名
          efirstName: 'xiao',        //姓（英文）
          elastName: 'hong',         //名（英文）
          ename: 'xiaohong',             //英文名
          gender: '0',            //性别
          birthDate: '1993-04-18',         //出生日
          idNumber: '34112519904181234',          //身份证号码
          nation: '1',            //名族
          origin: '1',            //籍贯
          education: '1',         //学历
          politics: '1',          //政治面貌
          isMarried: '0',         //婚姻状况
          email: 'xiohong@ivo.com',             //邮箱
          phone: '123456',             //电话
          address: '昆山',           //居住地址
          idAddress: '昆山',         //身份证地址

          scopeId: '0',           //归属公司，或叫员工范围
          isOperator: '0',        //DL/IDL标识
          groupId: '0',           //组别－J team; T team; C team   通过组别可控制是否需要打卡
          firstRegisterDate: '', //初次入职时间；用于控制复职员工的年资；如果FIRST_REGISTER_DATE与REGISTER_DATE不相等就是复职人员
          registerDate: '2018-06-12',      //入职时间
          regularDate: '',       //转正日期
          resignDate: '',        //离职日期
          source: '0',           //员工来源；推荐、外包、派遣
          sourceMemo: '',        //来源说明备注  公司名称、员工工号
          statusId: '0',         //状态：临时、实习、试用、正式
          effectDate: '',        //生效日
          expireDate: '',        //失效日
          settlingId: '0',        //结算方式

          family: [
            {relation: '0', name: 'xh', phone: '123456', isKey: '1'},
          ],                  //紧急联系人

          promotion: {gradeId: '0', titleId: '0'},     //职务（晋升）
          position: {posId: '', isMaster: '1', orgUnit: '', orgName: ''},  //岗位

        },

        imageUpload: {
          flag: false,
          imageurl: '',
          disabled: true,
          data: {
            empNo: ''
          }
        },



        rules: {
          empNo: [
            {required: false, message: '请获得工号', trigger: 'blur'}
          ],
          firstName: [
            {required: true, message: '请输入姓', trigger: 'blur'}
          ],
          lastName: [
            {required: true, message: '请输入名', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          efirstName: [
            {required: true, message: '请输入姓', trigger: 'blur'}
          ],
          elastName: [
            {required: true, message: '请输入姓', trigger: 'blur'}
          ],
          ename: [
            {required: true, message: '请输入英文名', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          birthDate: [
            {required: true, message: '请选择出生日期', trigger: 'change'}
          ],
          idNumber: [
            {required: true, message: '请输入证件号码', trigger: 'blur'}
          ],
          nation: [
            {required: true, message: '请选择名族', trigger: 'change'}
          ],
          origin: [
            {required: true, message: '请选择籍贯', trigger: 'change'}
          ],
          education: [
            {required: true, message: '请选择学历', trigger: 'change'}
          ],
          politics: [
            {required: true, message: '请选择政治面貌', trigger: 'change'}
          ],
          isMarried: [
            {required: true, message: '请选择婚姻状况', trigger: 'change'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入居住地址', trigger: 'blur'}
          ],
          idAddress: [
            {required: true, message: '请输入身份证地址', trigger: 'blur'}
          ],


          registerDate: [
            {required: false, message: '请选择入职日期', trigger: 'change'}
          ],
          isOperator: [
            {required: false, message: '请选择结算方式', trigger: 'change'}
          ],
          "promotions.title": [
            {required: false, message: '请选择职务', trigger: 'change'}
          ],
          "promotions.grade": [
            {required: false, message: '请选择职等', trigger: 'change'}
          ],
          group: [
            {required: false, message: '请选择组别', trigger: 'change'}
          ],
          settling: [
            {required: false, message: '请选择IDL/DL', trigger: 'change'}
          ],
          "positions.orgUnit": [
            {required: false, message: '请选择部门', trigger: 'change'}
          ],
          "positions.position": [
            {required: false, message: '请选择岗位', trigger: 'change'}
          ],
          scope: [
            {required: false, message: '请选择范围', trigger: 'change'}
          ],
          source: [
            {required: false, message: '请选择来源', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      empNo() {
        return this.empForm.empNo
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
      empNo(newValue, oldValue) {
        this.imageUpload.data.empNo = newValue
        this.imageUpload.disabled = false
        console.log(this.imageUpload.data)
      }
    },
    created: function () {
      var me = this;
      //获得员工工号
      me.generateEmpID();
      //获得下拉框选项内容
      me.getMainData();
      //获取组织树
      me.getTree()
      me.getNotSubmitEmployee()
    },
    methods: {
      submit() {
        console.log(this.multipleSelection);
        var params = JSON.stringify(this.multipleSelection)
        submitEmployeeBatch(params).then(response => {
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getNotSubmitEmployee() {
        queryNotSubmitEmployee().then(response => {
          this.tableData5 = response.data
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },




      getTree() {
        getOrgTree().then(response => {
          this.orgTree = response.data
        })
      },
      showInnerVisible() {
        this.orgInfraDialog.innerVisible = true
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNodeClick(data) {
        this.orgInfraDialog.innerVisible = false
        this.empForm.position.orgName = "["+data.id+"]" + data.label
        this.empForm.position.orgUnit = data.attributes[0].id
        this.getPositions(this.empForm.position.orgUnit)
      },
      getPositions(deptId) {
        let param = { 'deptId': deptId }
        getPositionList(param).then(response => {
          this.selectList.positionList = response.data
        })
      },



      formSubmit( formName ) {
        var flag
        this.$refs[ formName ].validate((valid) => {
          if ( valid ) {
            flag = true
          } else {
            flag = false
          }
        });
        if(flag) {
          saveEmployee(this.empForm).then(response => {
            var empNo = response.empNo
            this.empForm.empNo = empNo
            console.log(this.empForm.empNo)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        }
      },




      generateEmpID(){
        var me = this;
//        generateEmpNumber( "" ).then(( res ) => {
//          me.empForm.empId = res.data.empId;
//      });
      },
      getMainData(){
        var me = this;
//        getEmpMainData( "" ).then(( res ) => {
//          for (var key of Object.keys( res.data )) {
//             if( me[key] )me[key] = res.data[key];
//          }
//        });
      },

      formSubmitNext( formName ) {
//          var me = this;
//          this.$refs[ formName ].validate((valid) => {
//              if ( valid ) {
//
//                me.formCopy();
//                return true;
//              } else {
//                return false;
//              }
//          });
        const loading = this.$loading({
          lock: true,
          text: '保存中...',
          spinner: 'el-icon-loading'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
      formReset( formName ){
        var me = this;
        me.$refs[formName].resetFields();
        me.generateEmpID();
      },
      formCopy(  ){
          var me = this;
          me.generateEmpID();
          me.empForm.name = "";
          me.empForm.firstName = "";
          me.empForm.lastName = "";
          me.empForm.efirstName = "";
          me.empForm.elastName  = "";
          me.empForm.ename = "";
          me.empForm.idNumber = "";
          me.empForm.gender = "";
          me.empForm.birthDate = "";
          me.empForm.nation = "";
          me.empForm.origin = "";
          me.empForm.education = "";
          me.empForm.email = "";
          me.empForm.phone = "";
          me.empForm.idAddress = "";
          me.empForm.address = "";
          me.empForm.contactName = "";
          me.empForm.relation = "";
          me.empForm.contactPhone = "";
          me.empForm.isOperator = "";
          me.empForm.registerDate = "";
          me.empForm.effect_date = "";
          me.empForm.settling = "";
      },
      handleExceed() {

      },
      batchUpLoad() {
         var  me = this;
         me.batchUploadVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        console.log(file.raw)
        console.log(URL.createObjectURL(file.raw))
        //this.imageUpload.imageUrl = URL.createObjectURL(file.raw);

        var empNo = this.empForm.empNo;
        this.imageUpload.imageUrl = 'api/SpringMVC006/image?empNo=' + empNo;
        this.imageUpload.flag = true
        console.log(this.imageUpload.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      //远程获取组织信息
      remoteGetOrg( query ) {
        var me = this;
        if (query !== '') {
          let para = {
            query: query
          };
          NProgress.start();
          queryOrgUnit(para).then((res) => {
            me.orgUnitList = res.data.records;
          });
          NProgress.done();
        } else {
          this.orgUnitList = [];
        }
      },
      handleSelect(item) {
        alert( item );
      },

      removeDomain(item) {
        var index = this.empForm.family.indexOf(item)
        if (index !== -1) {
          this.empForm.family.splice(index, 1)
        }
      },
      addDomain() {
        this.empForm.family.push({relation: '3', name: 'wj', phone: '654321', isKey: '0'},);
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 220px;
    height: 220px;
    line-height: 220px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 220px;
    display: block;
  }
</style>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>


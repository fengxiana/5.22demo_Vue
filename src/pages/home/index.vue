<template>
  <div class="pages_home">
    <el-container>
      <el-aside width="170px" class="home_aside">Aside</el-aside>
      <el-container>
        <el-header class="home_header">Header</el-header>
        <el-main class="home_main">
          <div class="main_top">
            <el-button type="primary" @click="handleAdd">添加</el-button>
          </div>
          <div class="main_end">
            <!-- 数据表格 -->
            <el-table :data="listData" border style="width: 100%">
              <el-table-column prop="supplierName" label="供应商" width="150">
              </el-table-column>
              <el-table-column prop="supplierContact" label="联系人" width="150">
              </el-table-column>
              <el-table-column prop="phone" label="电话">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
              <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="myDelete(scope.row.supplierId)">删除</el-button>
              </template>
            </el-table-column>
            </el-table>
          </div>
        </el-main>
        <!-- 对话框 -->
        <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="handleClose"
        >
          <el-form 
          :model="ruleForm" 
          status-icon 
          :rules="rules" 
          ref="ruleForm" 
          label-width="100px" 
          class="demo-ruleForm"
          >
            <el-form-item prop="supplierName" class="item">
              <el-input v-model="ruleForm.supplierName" placeholder="供应商">
              </el-input>
            </el-form-item>
            <el-form-item prop="supplierContact" class="item">
              <el-input v-model="ruleForm.supplierContact" placeholder="联系人">
              </el-input>
            </el-form-item>
            <el-form-item prop="phone" class="item">
              <el-input v-model="ruleForm.phone" placeholder="电话">
              </el-input>
            </el-form-item>
            <el-form-item prop="address" class="item">
              <el-input v-model="ruleForm.address" placeholder="地址">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </span>
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import './styles.less'
import { mapActions, mapState, mapMutations } from 'vuex' //辅助函数

export default {
  computed: {
    ...mapState('home', ['listData', 'title', 'currentId'])
  },
  methods: {

    ...mapMutations({
      getTitle: 'home/HOME_DIFFERENT_MUTATION'
    }),

    ...mapActions({ 
      getData: 'home/FETCH_HOME_DATA',
      getAdd: 'home/FETCH_HOME_ADD',
      getUpdate: 'home/FETCH_HOME_UPDATE',
      getDelete: 'home/FETCH_HOME_DELETE'
     }),

    //提交表单
    submitForm() {
      if (this.title === '添加') {
        const obj = { ...this.ruleForm }
        this.getAdd(obj) 
      } else {
        const obj = { ...this.ruleForm, supplierId: this.currentId }
        this.getUpdate(obj)
      }
      this.initData()
      this.$data.dialogVisible = false
    },    

    //点击添加弹出对话框
    handleAdd() {
      this.getTitle({ text: '添加' })
      this.$data.dialogVisible = true
    },

    //点击修改弹出对话框
    handleEdit(obj) {
      this.getTitle({ text: '修改', id: obj.supplierId })
      this.editBack(obj)
      this.$data.dialogVisible = true
    },

    //编辑数据回显
    editBack (obj) {
      this.ruleForm = { ...obj }
    },

    //删除
    myDelete(id) {
      this.getDelete({ id })
      this.initData()
    },

    //初始化数据
    initData() {
      this.getData()
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {})
    }
  },
  data() {
    const check = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(`${rule.field}不能为空!`));
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        supplierName: '',
        supplierContact: '',
        phone: '',
        address: '',
        status: '1',
        description: '1'
      },
      rules: {
        supplierName: [{ validator: check, trigger: 'blur' }],
        supplierContact: [{ validator: check, trigger: 'blur' }],
        phone: [{ validator: check, trigger: 'blur' }],
        address: [{ validator: check, trigger: 'blur' }]
      }      
    }
  },
  created() {
    this.initData()
  }
}
</script>
<template>
  <div class="pages_login">
    <div class="center_box">
      <h1 class="title">管理员登录</h1>
      <el-form 
        :model="ruleForm" 
        status-icon 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="demo-ruleForm"
      >
        <el-form-item prop="username" class="item">
          <el-input 
            v-model="ruleForm.username"
            placeholder="用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input 
            v-model="ruleForm.pwd"
            type="password"
            placeholder="密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import './styles.less'
import { mapActions, mapState } from 'vuex' //辅助函数

export default {
    computed: {
      ...mapState('login', ['loginStatus', 'loginMessage'])
    },
    methods: {
      
      ...mapActions({
        login: 'login/FETCH_LOGIN_INTO'
      }),

      //登录
      submitForm() {
        const obj = { ...this.ruleForm }
        this.login(obj)
        setTimeout(() => {
          if (Number(this.loginStatus) === 200) {
            alert(this.loginMessage)
            this.$router.push('/home')
          } else {
            alert(this.loginMessage)
          }
        }, 100)
      }
      
    },
    data() {
      const checkName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('用户名不能为空'));
        }
      }
      const checkPwd = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码不能为空'));
        }
      }
      return {
        ruleForm: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            { validator: checkName, trigger: 'blur' }
          ],
          pwd: [
            { validator: checkPwd, trigger: 'blur' }
          ]
        }
      }
    }
}
</script>
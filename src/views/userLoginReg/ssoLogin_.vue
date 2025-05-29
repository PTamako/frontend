<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
        <router-link :to="{ name: 'recover', params: { user: 'aaa' } }" class="forge-password"
          style="float: right;">忘记密码</router-link>
        <a href="http://cer.njucm.edu.cn/login?service=http://dzjf.njucm.edu.cn/user/ssologin">登录</a>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn"
          :disabled="state.loginBtn">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { ssologin } from '@/api/modular/system/loginManage'
import { mapActions } from 'vuex'
import store from '@/store'
import { triggerWindowResizeEvent } from '@/utils/util'

function getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export default {
  components: {
  },
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      accountLoginErrMsg: '',
      captchaOpen: false, // 是否开启验证码
      tenantsList: [],
      loginParams: {ticket:'ST-616622-ZQRD465RDfghvrLT52kc-6332ea25b46f',redirectUrl:'cccc'} // 登录参数
    }
  },
  created() {
    var predirectUrl = getParameterByName('redirectUrl','')
    if  (predirectUrl == 'undefined' || predirectUrl == null || predirectUrl == ''){
      predirectUrl = "http://dzjf.njucm.edu.cn/"
    }
    var ssoUrl = "http://dzjf.njucm.edu.cn/user/ssologin?redirectUrl="+predirectUrl
    ssoUrl = encodeURIComponent(ssoUrl)
    
    var pticket = getParameterByName('ticket','')
    if(pticket == 'undefined' || pticket == null || pticket == ''){
      window.location.href ='http://cer.njucm.edu.cn/login?service='+ssoUrl
    }
    this.loginParams = {ticket:pticket,redirectUrl:predirectUrl}

    const that = this;
    ssologin(this.loginParams)
      .then((res) => {if (res.success) {
						const token = res.data;
            alert(token)
            that.$ls.remove(ALL_APPS_MENU)
            that.$ls.set(ACCESS_TOKEN, token)
						window.open(`${window.location.origin}/`)
					} else {
						this.$message.error('登录失败：' + res.message)
					}
      })
    
    // ssologin(this.loginParams).then((res) => {
    //     if (res.success) {
    //       //this.$message.success('新增成功')
    //       window.location.href = predirectUrl
    //     } else {
    //       this.$message.error('新增失败')
    //     }
    //   }).finally((res) => {
    // })
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'dictTypeData', 'getNoticReceiveList']),

  handleSubmit(e) {
    const that = this;
    ssologin(this.loginParams)
      .then((res) => {if (res.success) {
						const token = res.data;
            alert(token)
            that.$ls.remove(ALL_APPS_MENU)
            that.$ls.set(ACCESS_TOKEN, token)
						window.open(`${window.location.origin}/`)
					} else {
						this.$message.error('登录失败：' + res.message)
					}
      })

      // ssologin(this.loginParams).then((res) => {
      //   if (res.success) {
      //     this.$message.success('新增成功')
      //   } else {
      //     this.$message.error('新增失败')
      //   }
      // }).finally((res) => {
      // })
    }
  },
  loginSuccess (res) {
    this.$router.push({ path: '/' })
    // 加载字典所有字典到缓存中
    this.dictTypeData().then((res) => { })
  },
  requestFailed (err) {
    // this.accountLoginErrMsg = err
    // this.isLoginError = true
  }
}
</script>


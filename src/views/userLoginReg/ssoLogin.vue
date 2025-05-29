<script>
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { ssologin,getSmsCaptcha, getCaptchaOpen } from '@/api/modular/system/loginManage'
import Verify from '@/components/verifition/Verify'
import store from '@/store'
import {  ACCESS_TOKEN,	ALL_APPS_MENU} from '@/store/mutation-types'

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
    TwoStepCaptcha,
    Verify
  },
  data () {
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
      loginParams: [] // 登录参数

    }
  },
  created () {
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

    ssologin(this.loginParams)
      .then((res) => {if (res.success) {
						const token = res.data;
            this.$ls.set(ACCESS_TOKEN, token)
            // commit('SET_TOKEN', result)
						window.location.href = predirectUrl
            // window.open(`${window.location.origin}/`)
					} else {
						this.$message.error('登录失败：' + res.message)
					}
      })
  },
  methods: {
    ...mapActions(['Login','ssoLogin', 'Logout', 'dictTypeData']),
    // handler    
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true
      const validateFieldsKey = customActiveKey === 'tab1' ? ['account', 'password'] : ['mobile', 'captcha']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        this.loginParams = values
        if (!err) {
          // 是否开启验证码
          if (this.captchaOpen) {
            this.$refs.verify.show()
            state.loginBtn = false
            return
          }
          const loginParams = { ...values }
          delete loginParams.account
          loginParams[!state.loginType ? 'account' : 'account'] = values.account
          loginParams.password = values.password
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
   
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      this.isLoginError = false
      // 加载字典所有字典到缓存中
      this.dictTypeData().then((res) => { })
    },
    requestFailed (err) {
      this.accountLoginErrMsg = err
      this.isLoginError = true
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>

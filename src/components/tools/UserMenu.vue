<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer ref="settingDrawer"></setting-drawer>
      <a href="javascript:;" @click="$refs.settingDrawer.toggle()">
        <span class="action">
          <a-icon type="setting"></a-icon>
        </span>
      </a>

      <notice-icon class="action"/>

      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar v-if="avatar" class="avatar" size="small" :src="avatar" :loadError="loadError"/>
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="4" v-if="mode === 'sidemenu'">
            <a @click="appToggled()" >
              <a-icon type="swap"/>
              <span>切换应用</span>
            </a>
          </a-menu-item>
          <!--          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item> -->

          <!-- Setting Drawer (show in development mode) -->
          <!-- <a-menu-item v-if="!production" key="2">
            <a href="javascript:;" @click="$refs.settingDrawer.toggle()">
              <a-icon type="appstore"/>
              <span>界面设置</span>
            </a>
          </a-menu-item>
          <a-menu-divider/> -->
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <a-modal
      title="切换应用"
      :visible="visible"
      :footer="null"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form1" >
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="选择应用"
        >
          <a-menu
            mode="inline"
            :default-selected-keys="this.defApp"
            style="border-bottom:0px;lineHeight:55px;"
          >
            <a-menu-item v-for="(item) in userInfo.apps" :key="item.code" style="top:0px;" @click="switchApp(item.code)">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import config from '@/config/defaultSettings'
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import { ALL_APPS_MENU } from '@/store/mutation-types'
import Vue from 'vue'
import { message } from 'ant-design-vue/es'
import SettingDrawer from '@/components/SettingDrawer'
export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    SettingDrawer
  },
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    }
  },
  data () {
    return {
      production: config.production,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      form1: this.$form.createForm(this),
      defApp: []
    }
  },

  computed: {
    ...mapGetters(['token', 'nickname', 'avatar', 'userInfo'])
  },
   // 设置signalr令牌
      async mounted() {
        await this.$socket.authenticate(this.token)
      },
  methods: {
    ...mapActions(['Logout', 'MenuChange']),
    loadError() {
      console.log('加载失败失败失败')
      this.$store.commit('SET_AVATAR', '/avatar2.jpg'); //
    },
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    },

    /**
     * 打开切换应用框
     */
    appToggled () {
      this.visible = true
      this.defApp.push(Vue.ls.get(ALL_APPS_MENU)[0].code)
    },

    switchApp (appCode) {
      this.visible = false
      this.defApp = []
      const applicationData = this.userInfo.apps.filter(item => item.code === appCode)
      const hideMessage = message.loading('正在切换应用！', 0)
      this.MenuChange(applicationData[0]).then((res) => {
        hideMessage()
      // eslint-disable-next-line handle-callback-err
      }).catch((err) => {
        message.error('应用切换异常')
      })
    },
    handleCancel () {
      this.form1.resetFields()
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
    .appRedio {
    border:1px solid #91d5ff;
    padding:10px 20px;
    background: #e6f7ff;
    border-radius:2px;
    margin-bottom:10px;
      color: #91d5ff;
    /*display: inline;
    margin-bottom:10px;*/
    }
</style>

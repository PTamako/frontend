<template>
  <div class="logo">
    <router-link :to="{name:'Console'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">{{ this.titles }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  mixins: [mixin, mixinDevice],
  data () {
    return {
      titles: ''
    }
  },
  props: {
    title: {
      type: String,
      default: '管理系统',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  created () {
    if (this.layoutMode === 'topmenu') {
      if (this.title.length > 8) {
        this.titles = this.title.substring(0, 8) + '...'
      } else {
        this.titles = this.title
      }
    } else {
      if (this.title.length > 10) {
        this.titles = this.title.substring(0, 8) + '...'
      } else {
        this.titles = this.title
      }
    }
  }
}
</script>

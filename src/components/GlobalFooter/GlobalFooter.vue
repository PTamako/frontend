<template>
  <div class="footer">
    <div class="links">
    </div>
    <div class="copyright">
      Copyright © 2023 <a target="_blank" href="javascript:;">{{compname}}</a> All rights reserved. v1.3.2
    </div>
  </div>
</template>

<script>
import { domAppName,domCompName } from '@/utils/domUtil'
export default {
  name: 'GlobalFooter',
  data () {
    return {
      appname:null,
      compname:null,
      compurl:null
    }
  },
  created () {
    this.appname=domAppName
    this.compname= domCompName
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 0 0 10px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>

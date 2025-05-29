<template>
  <a-modal
    title="选择特定用户"
    :width="900"
    :visible="visible"
    :destroyOnClose="true"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-row :gutter="24">     
      <a-col :md="24" :sm="24">        
        <a-card :bordered="false">
          <a-table 
            ref="table"
            size="middle"
            :pagination="{ pageSize: 5 }"
            :columns="columns"
            :dataSource="loadData"
            :alert="true"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            >
            </a-table>
        </a-card>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
  import {
    STable,
    XCard
  } from '@/components'
  import {
    Empty
  } from 'ant-design-vue'
  export default {
    components: {
      XCard,
      STable,
    },
    data() {
      return {
        // 高级搜索 展开/关闭
        advanced: false,
        visible:false,
        // 表头
        columns: [
          {
            title: '姓名',
            dataIndex: 'name'
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: [],
        selectedRowKeys: [],
        selectedRows: [],
        defaultExpandedKeys: [],
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        replaceFields: {
          key: 'id'
        }
      }
    },
    methods: {
      userList(ids,names) {
        this.visible = true
        debugger
         for(let i=0;i<ids.length;i++)
          this.loadData.push({
            id:ids[i],
            name:names[i]
          })
      },      
      /**
       * 点击左侧机构树查询列表
       */
      handleClick(e) {
        this.queryParam = {
          'sysEmpParam.orgId': e.toString()
        }
        this.$refs.table.refresh(true)
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },

      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      handleSubmit () {
        this.visible = false
        this.loadData = []
				this.$emit('ok',this.selectedRows);
      },
      handleCancel () {
        this.visible = false
        this.loadData = []
      }
    }
  }
</script>
<style lang="less">
  .table-operator {
    margin-bottom: 18px;
  }

  button {
    margin-right: 8px;
  }
</style>

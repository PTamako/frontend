﻿<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('keyanproject:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入项目名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="项目金额">
                <a-input v-model="queryParam.fee_authorize" allow-clear placeholder="请输入项目金额"/>
              </a-form-item>
            </a-col><template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="负责人姓名">
                  <a-input v-model="queryParam.charger_name" allow-clear placeholder="请输入负责人姓名"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="负责人职工号">
                  <a-input v-model="queryParam.charger_account" allow-clear placeholder="请输入负责人职工号"/>
                </a-form-item>
              </a-col>            </template>

            <a-col :md="8" :sm="24" >
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px"> {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>

          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template class="table-operator" slot="operator" v-if="hasPerm('keyanproject:add')" >
          <a-button type="primary" v-if="hasPerm('keyanproject:add')" icon="plus" @click="$refs.addForm.add()">新增科研系统项目</a-button>
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('keyanproject:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('keyanproject:edit') & hasPerm('keyanproject:delete')"/>
          <a-popconfirm v-if="hasPerm('keyanproject:delete')" placement="topRight" title="确认删除？" @confirm="() => keyanprojectDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable } from '@/components'
  import { keyanprojectPage, keyanprojectDelete } from '@/api/modular/main/keyanprojectManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  export default {
    components: {
      STable,
      addForm,
      editForm
    },
    data () {
      return {
        advanced: false, // 高级搜索 展开/关闭
        queryParam: {},
        columns: [
          {
            title: '项目名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '项目金额',
            align: 'center',
            dataIndex: 'fee_authorize'
          },
          {
            title: '负责人姓名',
            align: 'center',
            dataIndex: 'charger_name'
          },
          {
            title: '负责人职工号',
            align: 'center',
            dataIndex: 'charger_account'
          },
          {
            title: '单位名称',
            align: 'center',
            dataIndex: 'unit_name'
          },
          {
            title: '已到账经额',
            align: 'center',
            dataIndex: 'receive_fee'
          },
          {
            title: '未到账金额',
            align: 'center',
            dataIndex: 'no_receive_fee'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return keyanprojectPage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      if (this.hasPerm('keyanproject:edit') || this.hasPerm('keyanproject:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }
    },
    methods: {
      /**
       * 查询参数组装
       */
      switchingDate () {
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      keyanprojectDelete (record) {
        keyanprojectDelete(record).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table.refresh()
          } else {
            this.$message.error('删除失败') // + res.message
          }
        })
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      handleOk () {
        this.$refs.table.refresh()
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
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

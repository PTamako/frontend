﻿<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('CustomsTravelExpense:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="出差人姓名">
                <a-input v-model="queryParam.userName" allow-clear placeholder="请输入出差人姓名"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="出差事由">
                <a-input v-model="queryParam.travelTitle" allow-clear placeholder="请输入出差事由"/>
              </a-form-item>
            </a-col><template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="转账单位名称">
                  <a-input v-model="queryParam.transCompaNme" allow-clear placeholder="请输入转账单位名称"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="流程">
                  <a-input v-model="queryParam.stageFlg" allow-clear placeholder="请输入流程"/>
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
        <template class="table-operator" slot="operator" v-if="hasPerm('CustomsTravelExpense:add')" >
          <a-button type="primary" v-if="hasPerm('CustomsTravelExpense:add')" icon="plus" @click="$refs.addForm.add()">新增差旅费报销</a-button>
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('CustomsTravelExpense:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('CustomsTravelExpense:edit') & hasPerm('CustomsTravelExpense:delete')"/>
          <a-popconfirm v-if="hasPerm('CustomsTravelExpense:delete')" placement="topRight" title="确认删除？" @confirm="() => CustomsTravelExpenseDelete(record)">
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
  import { CustomsTravelExpensePage, CustomsTravelExpenseDelete } from '@/api/modular/main/CustomsTravelExpenseManage'
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
            title: '出差人姓名',
            align: 'center',
            dataIndex: 'userName'
          },
          {
            title: '出差事由',
            align: 'center',
            dataIndex: 'travelTitle'
          },
          {
            title: '合计金额',
            align: 'center',
            dataIndex: 'amountTotal'
          },
          {
            title: '流程',
            align: 'center',
            dataIndex: 'stageFlg'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return CustomsTravelExpensePage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      if (this.hasPerm('CustomsTravelExpense:edit') || this.hasPerm('CustomsTravelExpense:delete')) {
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
      CustomsTravelExpenseDelete (record) {
        CustomsTravelExpenseDelete(record).then((res) => {
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

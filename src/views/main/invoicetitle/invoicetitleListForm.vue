<template>
  <a-modal title="选择开票信息" :width="900" :visible="visible" @ok="handleSubmit" @cancel="handleCancel">
    <x-card v-if="hasPerm('invoicetitle:page')">
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="发票抬头">
                <a-input v-model="queryParam.invoiceTitle" allow-clear placeholder="请输入发票抬头"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
                <a-form-item label="纳税人识别号">
                  <a-input v-model="queryParam.taxpayerid" allow-clear placeholder="请输入纳税人识别号"/>
                </a-form-item>
              </a-col>
            <a-col :md="8" :sm="24" >
                <a-button type="primary" @click="$refs.table.refresh(true)" >查询</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </x-card>
    <a-card :bordered="false">
      <s-table ref="table" :columns="columns" :data="loadData" :alert="true" :rowKey="(record) => record.id"
        :rowSelection="{type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
      </s-table>
    </a-card>
  </a-modal>
</template>

<script>
import { STable, XCard } from '@/components'
import { invoicetitlePage } from '@/api/modular/main/invoicetitleManage'
export default {
  components: {
    XCard,
    STable,
  },

  data() {
    return {
      // 查询参数
      queryParam: {lookType:6},
      visible: false,
      // 表头
      columns: [
          {
            title: '发票抬头',
            align: 'center',
            dataIndex: 'invoiceTitle'
          },
          {
            title: '开具类型',
            align: 'center',
            dataIndex: 'customerType',
            scopedSlots: { customRender: 'customerTypescopedSlots' }
          },
          {
            title: '发票类型',
            align: 'center',
            dataIndex: 'invoicetype',
            scopedSlots: { customRender: 'invoicetypescopedSlots' }
          },
          {
            title: '纳税人识别号',
            align: 'center',
            dataIndex: 'taxpayerid'
          },
      {
            title: '邮箱',
            align: 'center',
            dataIndex: 'user_mail'
          },
          {
            title: '电话',
            align: 'center',
            dataIndex: 'linkmobile'
          }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return invoicetitlePage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },

  methods: {
    invoicetitleList(record) {
      this.visible = true
    },   
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleSubmit() {
      this.visible = false
      this.$emit('invoicetitleOK', this.selectedRows);
    },
    handleCancel() {
      this.visible = false
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

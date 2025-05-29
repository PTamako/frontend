<template>
  <a-modal title="选择预借票据" :width="1200" :visible="visible" @ok="handleSubmit" @cancel="handleCancel">
    <x-card>
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="发票抬头">
                <a-input v-model="queryParam.invoicetitle" allow-clear placeholder="请输入发票抬头" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="纳税人识别号">
                <a-input v-model="queryParam.taxpayerid" allow-clear placeholder="请输入纳税人识别号" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
            </a-col>

          </a-row>
        </a-form>
      </div>
    </x-card>
    <a-card :bordered="false">
      <a-table ref="table" :columns="columns" :dataSource="loadData" :alert="true" :rowKey="(record) => record.id"
        :rowSelection="{ type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
      </a-table>
    </a-card>
  </a-modal>
</template>

<script>
import { STable, XCard } from '@/components'
import { lendinvoiceList } from '@/api/modular/main/invoiceManage'
export default {
  components: {
    XCard,
    STable,
  },

  data() {
    return {
      advanced: false, // 高级搜索 展开/关闭
      // 查询参数
      queryParam: {unino:'829554'},
      visible: false,
      // 表头
      columns: [
        {
          title: '发票抬头',
          align: 'center',
          dataIndex: 'payerPartyName'
        },
        {
          title: '统一社会信用代码',
          align: 'center',
          dataIndex: 'payerAccount'
        },
        {
          title: '发票金额',
          align: 'center',
          dataIndex: 'totalAmount'
        },
        {
          title: '发票号码',
          align: 'center',
          dataIndex: 'invoiceNumber'
        },
        {
          title: '经办人',
          align: 'center',
          dataIndex: 'jbrNo'
        },
        {
          title: '开具时间',
          align: 'center',
          dataIndex: 'issueDate'
        },
        {
          title: 'fkChannelCode',
          align: 'center',
          dataIndex: 'fkChannelCode'
        },
        {
          title: 'invoiceCode',
          align: 'center',
          dataIndex: 'invoiceCode'
        }
      ],
      loadData:[],
      selectedRowKeys: [],
      selectedRows: []
    }
  },

  methods: {
    lendinvoiceList(record) {
      this.queryParam =  {unino:'829554'}
      lendinvoiceList(this.queryParam).then((res) => {
        this.loadData = res.data
      })
      this.visible = true
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleSubmit() {
      this.visible = false
      this.$emit('lendinvoiceOK', this.selectedRows);
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

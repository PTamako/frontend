<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('invoicetitle:page')">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="发票抬头">
                <a-input v-model="queryParam.invoiceTitle" allow-clear placeholder="请输入发票抬头" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="纳税人识别号">
                <a-input v-model="queryParam.taxpayerid" allow-clear placeholder="请输入纳税人识别号" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table ref="table" :columns="columns" :data="loadData" :alert="true" :rowKey="(record) => record.id"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template class="table-operator" slot="operator" v-if="hasPerm('invoicetitle:add')">
          <a-button type="primary" v-if="hasPerm('invoicetitle:add')" icon="plus"
            @click="$refs.addForm.add()">新增</a-button>
        </template>
        <span slot="customerTypescopedSlots" slot-scope="text">
          {{ 'customertype' | dictType(text) }}
        </span>
        <span slot="invoicetypescopedSlots" slot-scope="text">
          {{ 'invoicetype' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('invoicetitle:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('invoicetitle:edit') & hasPerm('invoicetitle:delete')" />
          <a-popconfirm v-if="hasPerm('invoicetitle:delete')" placement="topRight" title="确认删除？"
            @confirm="() => invoicetitleDelete(record)">
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
import { invoicetitlePage, invoicetitleDelete } from '@/api/modular/main/invoicetitleManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
export default {
  components: {
    STable,
    addForm,
    editForm
  },
  data() {
    return {
      advanced: false, // 高级搜索 展开/关闭
      queryParam: {lookType:6},
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
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return invoicetitlePage(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      },
      customerTypeData: [],
      invoicetypeData: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    if (this.hasPerm('invoicetitle:edit') || this.hasPerm('invoicetitle:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
    const customerTypeOption = this.$options
    this.customerTypeData = customerTypeOption.filters['dictData']('customertype')
    const invoicetypeOption = this.$options
    this.invoicetypeData = invoicetypeOption.filters['dictData']('invoicetype')
  },
  methods: {
    /**
     * 查询参数组装
     */
    switchingDate() {
      const obj = JSON.parse(JSON.stringify(this.queryParam))
      return obj
    },
    invoicetitleDelete(record) {
      invoicetitleDelete(record).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.$refs.table.refresh()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
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

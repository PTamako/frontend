<template>
  <a-modal title="选择科研项目" :width="1000" :visible="visible" @ok="handleSubmit" @cancel="handleCancel">
    <x-card v-if="hasPerm('keyanproject:page')">
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="12" :sm="24">
              <a-form-item label="项目名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入项目名称" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </x-card>
    <a-card :bordered="false">
      <s-table ref="table" :columns="columns" :data="loadData" :alert="true" :rowKey="(record) => record.id"
          :rowSelection="{ type: 'radio', selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        </s-table>
    </a-card>
  </a-modal>
</template>

<script>
import { STable, XCard } from '@/components'
import { keyanprojectPage } from '@/api/modular/main/keyanprojectManage'
export default {
  components: {
    XCard,
    STable,
  },

  data() {
    return {
      advanced: false, // 高级搜索 展开/关闭
      // 查询参数
      queryParam: {},
      visible: false,
      // 表头
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
            title: '未到账金额',
            align: 'center',
            dataIndex: 'no_receive_fee'
          }
      ],
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

  methods: {
    projectList(record) {
      this.visible = true
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },    
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleSubmit() {
      this.visible = false
      this.$emit('projectOK', this.selectedRows);
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

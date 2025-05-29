<template>
  <a-modal title="选择申请信息" :width="1000" :visible="visible" @ok="handleSubmit" @cancel="handleCancel">
    <x-card v-if="hasPerm('keyanproject:page')">
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="申请名称" >
                <a-input v-model="queryParam.customName" allow-clear placeholder="请输入申请名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </a-col>
            <a-col :md="8" :sm="24">
            </a-col>
          </a-row>
        </a-form>
      </div>
    </x-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowKey="(record) => record.id"
        :rowSelection="{ type: 'radio',selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="isFinish" slot-scope="text, record">
          <a-tag
            :color="tags[record.isFinish]"
          >
            {{ statusFilter(text) }}
          </a-tag>
        </span>
      </s-table>
    </a-card>
  </a-modal>
</template>

<script>
import { STable, XCard } from '@/components'
import { flowinstancePage} from '@/api/modular/flowCenter/flowinstanceManage'
export default {
  components: {
    XCard,
    STable,
  },

  data() {
    return {
      advanced: false, // 高级搜索 展开/关闭
      // 查询参数
      queryParam: {IsFinish:1},
      visible: false,
      // 表头
      columns: [
          {
            title: '申请编号',
            dataIndex: 'code',
            width:'140px'
          },
          {
            title: '申请名称',
            dataIndex: 'customName',
            width:'280px'
          },
          {
            title: '当前节点',
            dataIndex: 'activityName'
          },
          {
            title: '申请时间',
            dataIndex: 'createdTime'
          },{
            title: '申请人',
            dataIndex: 'createdUserName'
          }
        ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
          return flowinstancePage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },
      selectedRowKeys: [],
      selectedRows: [],
      tags:{0:"#5bc0de",//正在处理
            1:"#7ccb7c",//已完成
            3:"#d9534f",//不同意
            2:"#faad14",//被撤回
            4:"#faad14"}//被驳回      
    }
  },

  methods: {
    instanceList(_stageflg,_schemeId) {
      this.queryParam =  {IsFinish:_stageflg,SchemeId:_schemeId}
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
      this.$emit('instanceOK', this.selectedRows);
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

<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('bankrollapply:page')">
        <a-form layout="inline">
          <a-row :gutter="48">            
              <a-col :md="8" :sm="24">
                <a-form-item label="申请标题">
                  <a-input v-model="queryParam.applytitle" allow-clear placeholder="请输入申请标题"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="流程状态">
                  <a-select style="width: 100%" v-model="queryParam.stageflg" placeholder="请选择流程状态">
                    <a-select-option v-for="(item,index) in stageflgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            <a-col :md="8" :sm="24" >
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {lookType:1}">重置</a-button>
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
        :rowKey="(record) => record.id"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <span slot="stageflgscopedSlots" slot-scope="text">
          {{ 'njucm161' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="$refs.auditForm.open(record)">处理</a>
        </span>
      </s-table>
      <audit-form ref="auditForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable } from '@/components'
  import { bankrollapplyPage } from '@/api/modular/main/bankrollapplyManage'
  import auditForm from './auditForm.vue'
  export default {
    components: {
      STable,
      auditForm
    },
    data () {
      return {
        advanced: false, // 高级搜索 展开/关闭
        queryParam: {lookType:1},
        columns: [
          {
            title: '申请时间',
            align: 'center',
            dataIndex: 'inputtime'
          },{
            title: '申请人',
            align: 'center',
            dataIndex: 'applyusername'
          },
          {
            title: '申请标题',
            dataIndex: 'applytitle',
            width:'280px'
          },
          {
            title: '文号',
            align: 'center',
            dataIndex: 'docid'
          },
          {
            title: '项目代码',
            align: 'center',
            dataIndex: 'projectcode'
          },
          {
            title: '申请金额(元)',
            align: 'center',
            dataIndex: 'confirm_amount'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'stageflg',
            scopedSlots: { customRender: 'stageflgscopedSlots' }
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return bankrollapplyPage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },
        syncflg_keyanData: [],
        syncflg_caiwuData: [],
        stageflgData: [],
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
      const stageflgOption = this.$options
      this.stageflgData = stageflgOption.filters['dictData']('njucm161')
    },
    methods: {
      /**
       * 查询参数组装
       */
      switchingDate () {
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
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

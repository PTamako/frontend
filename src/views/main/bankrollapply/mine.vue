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
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
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
        <span slot="syncflg_keyanscopedSlots" slot-scope="text">
          {{ 'yes_or_no' | dictType(text) }}
        </span>
        <span slot="syncflg_caiwuscopedSlots" slot-scope="text">
          {{ 'yes_or_no' | dictType(text) }}
        </span>
        <span slot="stageflgscopedSlots" slot-scope="text">
          {{ 'njucm161' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('bankrollapply:detail')" @click="$refs.detailForm.open(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('bankrollapply:edit')"/>
          <a v-if="hasPerm('bankrollapply:edit') & record.stageflg == 'draftback'" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('bankrollapply:edit') & hasPerm('bankrollapply:delete') & record.stageflg == 'draftback'"/>
          <a-popconfirm v-if="hasPerm('bankrollapply:delete') & record.stageflg == 'draftback'" placement="topRight" title="确认删除？" @confirm="() => bankrollapplyDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <detail-form ref="detailForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable } from '@/components'
  import { bankrollapplyPage, bankrollapplyDelete } from '@/api/modular/main/bankrollapplyManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  import detailForm from './detailForm.vue'
  export default {
    components: {
      STable,
      addForm,
      editForm,
      detailForm
    },
    data () {
      return {
        advanced: false, // 高级搜索 展开/关闭
        queryParam: {lookType:6},
        columns: [
          {
            title: '申请时间',
            align: 'center',
            dataIndex: 'createdTime'
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
      if (this.hasPerm('bankrollapply:detail') || this.hasPerm('bankrollapply:edit')|| this.hasPerm('bankrollapply:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }
      this.syncflg_keyanData = this.$options.filters['dictData']('yes_or_no')
      this.syncflg_caiwuData = this.$options.filters['dictData']('yes_or_no')
      this.stageflgData = this.$options.filters['dictData']('njucm161')
    },
    methods: {
      /**
       * 查询参数组装
       */
      switchingDate () {
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      bankrollapplyDelete (record) {
        bankrollapplyDelete(record).then((res) => {
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

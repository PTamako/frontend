<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('caiwuclear:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
                <a-form-item label="汇款单位或事由">
                  <a-input v-model="queryParam.sabstract" allow-clear placeholder="请输入汇款单位或事由"/>
                </a-form-item>
              </a-col><a-col :md="8" :sm="24">
                <a-form-item label="到账金额">
                  <a-input-number v-model="queryParam.dz_amt" style="width: 100%" allow-clear placeholder="请输入到账金额"/>
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
        :rowKey="(record) => record.main_key"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template class="table-operator" slot="operator" v-if="false" >
          <a-button type="primary" v-if="hasPerm('caiwuclear:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('caiwuclear:edit')" @click="$refs.editForm.edit(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('caiwuclear:edit') & hasPerm('caiwuclear:delete')"/>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable } from '@/components'
  import moment from 'moment'
  import { caiwuclearPage, caiwuclearDelete } from '@/api/modular/main/caiwuclearManage'
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
            title: '汇款单位或事由',
            align: 'center',
            dataIndex: 'sabstract'
          },
          {
            title: '核销代码',
            align: 'center',
            dataIndex: 'clr_order'
          },
          {
            title: '到账日期',
            align: 'center',
            dataIndex: 'clr_date'
          },
          {
            title: '到账金额',
            align: 'center',
            dataIndex: 'dz_amt'
          },
          {
            title: '未核销金额',
            align: 'center',
            dataIndex: 'jf_amt'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return caiwuclearPage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      if (this.hasPerm('caiwuclear:edit') || this.hasPerm('caiwuclear:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }
    },
    methods: {
      moment,
      /**
       * 查询参数组装
       */
      switchingDate () {
        const queryParamclr_date = this.queryParam.clr_datedate
        if (queryParamclr_date != null) {
            this.queryParam.clr_date = moment(queryParamclr_date).format('YYYY-MM-DD')
            if (queryParamclr_date.length < 1) {
                delete this.queryParam.clr_date
            }
        }else
        {
          delete this.queryParam.clr_date
        }
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      caiwuclearDelete (record) {
        caiwuclearDelete(record).then((res) => {
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
      onChangeclr_date(date, dateString) {
        this.clr_dateDateString = dateString
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

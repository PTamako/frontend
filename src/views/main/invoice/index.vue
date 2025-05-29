<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('invoice:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
                <a-form-item label="发票抬头">
                  <a-input v-model="queryParam.invoicetitle" allow-clear placeholder="请输入发票抬头"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="状态">
                  <a-select style="width: 100%" v-model="queryParam.stageflg" placeholder="请选择状态">
                    <a-select-option v-for="(item,index) in stageflgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="开具时间">
                  <a-date-picker style="width: 100%" placeholder="请选择开具时间" v-model="queryParam.invouicetimeDate" @change="onChangeinvouicetime"/>
                </a-form-item>
              </a-col>
              
            <a-col :md="8" :sm="24">
              <a-form-item label="发票类型">
                <a-input v-model="queryParam.invoicetype" allow-clear placeholder="请输入发票类型"/>
              </a-form-item>
            </a-col>           
            </template>

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
        <template class="table-operator" slot="operator" v-if="false" >
          <a-button type="primary" v-if="hasPerm('invoice:add')" icon="plus" @click="$refs.addForm.add()">新增发票开具</a-button>
        </template> 
        <span slot="invoicetypescopedSlots" slot-scope="text">
          {{ 'invoicetype' | dictType(text) }}
        </span>
        <span slot="stageflgscopedSlots" slot-scope="text">
          {{ 'invoicestageflg' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('invoice:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('invoice:edit') & hasPerm('invoice:delete')"/>
          <a-popconfirm style="display: none;" v-if="hasPerm('invoice:delete')" placement="topRight" title="确认删除？" @confirm="() => invoiceDelete(record)">
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
  import moment from 'moment'
  import { invoicePage, invoiceDelete } from '@/api/modular/main/invoiceManage'
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
        queryParam: {LookType:9},
        columns: [
          {
            title: '教职工号',
            align: 'center',
            dataIndex: 'student_id'
          },
          {
            title: '发票抬头',
            align: 'center',
            dataIndex: 'invoicetitle'
          },
          {
            title: '发票类型',
            align: 'center',
            dataIndex: 'invoicetype',
            scopedSlots: { customRender: 'invoicetypescopedSlots' }
          },
          {
            title: '发票金额',
            align: 'center',
            dataIndex: 'invoiceamount'
          },
          {
            title: '申请日期',
            align: 'center',
            dataIndex: 'inputtime'
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
          return invoicePage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        invoicetypeData: [],
        stageflgData: [],
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      if (this.hasPerm('invoice:edit') || this.hasPerm('invoice:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }
      this.invoicetypeData = this.$options.filters['dictData']('invoicetype')
      this.stageflgData = this.$options.filters['dictData']('invoicestageflg')
    },
    methods: {
      moment,
      /**
       * 查询参数组装
       */
      switchingDate () {
        const queryParaminvouicetime = this.queryParam.invouicetimeDate
        if (queryParaminvouicetime != null) {
            this.queryParam.invouicetime = moment(queryParaminvouicetime).format('YYYY-MM-DD')
            if (queryParaminvouicetime.length < 1) {
                delete this.queryParam.invouicetime
            }
        }else
        {
          delete this.queryParam.invouicetime
        }
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      invoiceDelete (record) {
        invoiceDelete(record).then((res) => {
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
      onChangeinvouicetime(date, dateString) {
        this.invouicetimeDateString = dateString
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

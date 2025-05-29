<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('smedebtapply:page')">
        <a-form layout="inline">
          <a-row :gutter="48"><a-col :md="8" :sm="24">
              <a-form-item label="合同日期">
                <a-date-picker style="width: 100%" placeholder="请选择合同日期" v-model="queryParam.contractdateDate" @change="onChangecontractdate"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="企业名称">
                <a-input v-model="queryParam.debtcompname" allow-clear placeholder="请输入债务企业名称"/>
              </a-form-item>
            </a-col><template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="项目名称">
                  <a-input v-model="queryParam.projname" allow-clear placeholder="请输入项目名称"/>
                </a-form-item>
              </a-col><a-col :md="8" :sm="24">
                <a-form-item label="项目金额">
                  <a-input-number v-model="queryParam.projamt" style="width: 100%" allow-clear placeholder="请输入项目金额"/>
                </a-form-item>
              </a-col><a-col :md="8" :sm="24">
                <a-form-item label="欠款金额">
                  <a-input-number v-model="queryParam.debtamt" style="width: 100%" allow-clear placeholder="请输入欠款金额"/>
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
        :rowKey="(record) => record.id"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template class="table-operator" slot="operator" v-if="hasPerm('smedebtapply:add')" >
          <a-button type="primary" v-if="hasPerm('smedebtapply:add')" icon="plus" @click="$refs.addForm.add()">新增清欠台账</a-button>
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('smedebtapply:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('smedebtapply:edit') & hasPerm('smedebtapply:delete')"/>
          <a-popconfirm v-if="hasPerm('smedebtapply:delete')" placement="topRight" title="确认删除？" @confirm="() => smedebtapplyDelete(record)">
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
  import { smedebtapplyPage, smedebtapplyDelete } from '@/api/modular/main/smedebtapplyManage'
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
            title: '合同日期',
            align: 'center',
            dataIndex: 'contractdate'
          },
          {
            title: '债务企业名称',
            align: 'center',
            dataIndex: 'debtcompname'
          },
          {
            title: '项目名称',
            align: 'center',
            dataIndex: 'projname'
          },
          {
            title: '项目金额',
            align: 'center',
            dataIndex: 'projamt'
          },
          {
            title: '欠款金额',
            align: 'center',
            dataIndex: 'debtamt'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return smedebtapplyPage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      if (this.hasPerm('smedebtapply:edit') || this.hasPerm('smedebtapply:delete')) {
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
        const queryParamcontractdate = this.queryParam.contractdateDate
        if (queryParamcontractdate != null) {
            this.queryParam.contractdate = moment(queryParamcontractdate).format('YYYY-MM-DD')
            if (queryParamcontractdate.length < 1) {
                delete this.queryParam.contractdate
            }
        }else
        {
          delete this.queryParam.contractdate
        }
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      smedebtapplyDelete (record) {
        smedebtapplyDelete(record).then((res) => {
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
      onChangecontractdate(date, dateString) {
        this.contractdateDateString = dateString
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

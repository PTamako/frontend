<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('keyanincome:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目名称">
                <a-input v-model="queryParam.nAME" allow-clear placeholder="请输入项目名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="单位名称">
                <a-input v-model="queryParam.uNIT_NAME" allow-clear placeholder="请输入单位名称"/>
              </a-form-item>
            </a-col><template v-if="advanced"><a-col :md="8" :sm="24">
                <a-form-item label="认领时间">
                  <a-date-picker style="width: 100%" placeholder="请选择认领时间" v-model="queryParam.iNCOME_DATEDate" @change="onChangeiNCOME_DATE"/>
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template class="table-operator" slot="operator" v-if="hasPerm('keyanincome:add')" >
          <a-button type="primary" v-if="hasPerm('keyanincome:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('keyanincome:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('keyanincome:edit') & hasPerm('keyanincome:delete')"/>
          <a-popconfirm v-if="hasPerm('keyanincome:delete')" placement="topRight" title="确认删除？" @confirm="() => keyanincomeDelete(record)">
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
  import { keyanincomePage, keyanincomeDelete } from '@/api/modular/main/keyanincomeManage'
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
            title: '项目编号',
            align: 'center',
            dataIndex: 'pROJECT_ID'
          },
          {
            title: '项目名称',
            align: 'center',
            dataIndex: 'nAME'
          },
          {
            title: '认领金额',
            align: 'center',
            dataIndex: 'iNCOME_FEE'
          },
          {
            title: '认领时间',
            align: 'center',
            dataIndex: 'iNCOME_DATE'
          },
          {
            title: '科研是否同步',
            align: 'center',
            customRender: (value) => (value ? <a-tag color="green">True</a-tag> : <a-tag color="volcano">False</a-tag>),
            dataIndex: 'iS_SYNC'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return keyanincomePage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      if (this.hasPerm('keyanincome:edit') || this.hasPerm('keyanincome:delete')) {
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
        const queryParamiNCOME_DATE = this.queryParam.iNCOME_DATEDate
        if (queryParamiNCOME_DATE != null) {
            this.queryParam.iNCOME_DATE = moment(queryParamiNCOME_DATE).format('YYYY-MM-DD')
            if (queryParamiNCOME_DATE.length < 1) {
                delete this.queryParam.iNCOME_DATE
            }
        }else
        {
          delete this.queryParam.iNCOME_DATE
        }
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      keyanincomeDelete (record) {
        keyanincomeDelete(record).then((res) => {
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
      onChangeiNCOME_DATE(date, dateString) {
        this.iNCOME_DATEDateString = dateString
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

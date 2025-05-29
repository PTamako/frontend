<template>
  <div>
    <a-alert v-show="applyStep1OpenShow" message="输入汇款单位(事由)或到账金额，点击查询后开始进行认领" banner closable type="info" how-icon/>
    <a-card :bordered="false" v-show="applyStep1OpenShow" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper">
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
    <a-card :bordered="false" v-show="applyStep1OpenShow">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowKey="(record) => record.main_key"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <span slot="action" slot-scope="text, record">
          <a @click="applyStep2Open(record)">开始认领</a>
        </span>
      </s-table>
    </a-card>   
    <apply-step2 ref="applyStep2" @ok="handleResetOpen" /> 
  </div>
</template>
<script>
  import { STable } from '@/components'
  import moment from 'moment'
  import { caiwuclearPage, caiwuclearDelete } from '@/api/modular/main/caiwuclearManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  import applyStep2 from './applyStep2.vue'
  export default {
    components: {
      STable,
      addForm,
      editForm,
      applyStep2
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
        loadData:null,
        loadData: parameter => {
          return caiwuclearPage(Object.assign(parameter, this.switchingDate())).then((res) => {           
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: [],
        applyStep1OpenShow: true
      }
    },
    created () {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    },
    methods: {
      moment,
      /**
       * 查询参数组装
       */
      switchingDate () {
        const queryParamcLR_DATE = this.queryParam.cLR_DATEDate
        if (queryParamcLR_DATE != null) {
            this.queryParam.cLR_DATE = moment(queryParamcLR_DATE).format('YYYY-MM-DD')
            if (queryParamcLR_DATE.length < 1) {
                delete this.queryParam.cLR_DATE
            }
        }else
        {
          delete this.queryParam.cLR_DATE
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
      /**
       * 打开修改界面
       */
      applyStep2Open (record) {
        this.applyStep1OpenShow = false
        this.$refs.applyStep2.open(record)
      },
      /**
       * 详细配置界面返回
       */
      handleResetOpen () {
        this.applyStep1OpenShow = true
        this.$refs.table.refresh()
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      onChangecLR_DATE(date, dateString) {
        this.cLR_DATEDateString = dateString
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

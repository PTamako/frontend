<template>
  <div>
    <x-card v-if="hasPerm('sysOpLog:page')">
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="日志名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入日志名称" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="请求方式">
                <a-input v-model="queryParam.reqMethod" allow-clear placeholder="请求方式" />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="是否成功">
                  <a-select v-model="queryParam.success" placeholder="请选择是否成功">
                    <a-select-option v-for="(item,index) in successDict" :key="index" :value="item.code">
                      {{ item.value }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="10" :sm="24">
                <a-form-item label="操作时间">
                  <a-range-picker
                    v-model="queryParam.dates"
                    :show-time="{
                      hideDisabledOptions: true,
                      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                    }"
                    format="YYYY-MM-DD HH:mm:ss" />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template slot="operator" v-if="hasPerm('sysOpLog:delete')">
          <a-popconfirm @confirm="() => sysOpLogDelete()" placement="top" title="确认清空日志？">
            <a-button>清空日志</a-button>
          </a-popconfirm>
        </template>
        <span slot="opType" slot-scope="text">
          {{ opTypeFilter(text) }}
        </span>
        <span slot="success" slot-scope="text">
          {{ successFilter(text) }}
        </span>
        <span slot="name" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="url" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="opTime" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <span slot="action">
            <a @click="$refs.detailsOplog.details(record)">查看详情</a>
          </span>
        </span>
      </s-table>
      <details-oplog ref="detailsOplog" />
    </a-card>
  </div>
</template>
<script>
  import {
    STable,
    Ellipsis,
    XCard
  } from '@/components'
  import {
    sysOpLogPage,
    sysOpLogDelete
  } from '@/api/modular/system/logManage'
  import detailsOplog from './details'
  import {
    sysEnumDataList
  } from '@/api/modular/system/enumManage'
  import moment from 'moment'
  export default {
    name:"sys_log_mgr_op_log",
    components: {
      XCard,
      STable,
      Ellipsis,
      detailsOplog
    },
    data() {
      return {
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [{
            title: '请求方式',
            dataIndex: 'reqMethod',
            scopedSlots: {
              customRender: 'reqMethod',
              sorter: true
            }
          },
          {
            title: '执行结果',
            dataIndex: 'success',
            scopedSlots: {
              customRender: 'success',
              sorter: true
            }
          },
          {
            title: 'IP',
            dataIndex: 'ip',
            sorter: true
          },
          {
            title: '请求地址',
            dataIndex: 'url',
            scopedSlots: {
              customRender: 'url',
              sorter: true
            }
          },
          {
            title: '操作时间',
            dataIndex: 'opTime',
            scopedSlots: {
              customRender: 'opTime',
              sorter: true
            }
          },
          {
            title: '操作人',
            dataIndex: 'name',
            scopedSlots: {
              customRender: 'name',
              sorter: true
            }
          },
          {
            title: '操作人帐号',
            dataIndex: 'account',
            sorter: true
          },
          {
            title: '详情',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: {
              customRender: 'action'
            }
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return sysOpLogPage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        selectedRowKeys: [],
        selectedRows: [],
        defaultExpandedKeys: [],
        opTypeDict: [],
        successDict: []
      }
    },
    created() {
      this.sysEnumDataList()
    },
    methods: {
      moment,
      opTypeFilter(opType) {
        // eslint-disable-next-line eqeqeq
        const values = this.opTypeDict.filter(item => item.code == opType)
        if (values.length > 0) {
          return values[0].value
        }
      },
      successFilter(success) {
        // eslint-disable-next-line eqeqeq
        const values = this.successDict.filter(item => item.code == success)
        if (values.length > 0) {
          return values[0].value
        }
      },
      /**
       * 查询参数组装
       */
      switchingDate() {
        const dates = this.queryParam.dates
        if (dates != null) {
          this.queryParam.searchBeginTime = moment(dates[0]).format('YYYY-MM-DD HH:mm:ss')
          this.queryParam.searchEndTime = moment(dates[1]).format('YYYY-MM-DD HH:mm:ss')
          if (dates.length < 1) {
            delete this.queryParam.searchBeginTime
            delete this.queryParam.searchEndTime
          }
        }
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        delete obj.dates
        return obj
      },
      /**
       * 获取枚举数据
       */
      sysEnumDataList() {
        sysEnumDataList({
          enumName: 'YesOrNot'
        }).then((res) => {
          this.successDict = res.data
        })
      },
      /**
       * 清空日志
       */
      sysOpLogDelete() {
        sysOpLogDelete().then((res) => {
          if (res.success) {
            this.$message.success('清空成功')
            this.$refs.table.refresh(true)
          } else {
            this.$message.error('清空失败：' + res.message)
          }
        })
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
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

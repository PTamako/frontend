<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">

      <div class="table-page-search-wrapper" v-if="hasPerm('bankrollapply:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="申请标题">
                <a-input v-model="queryParam.applytitle" allow-clear placeholder="请输入申请标题" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="流程状态">
                <a-select style="width: 100%" v-model="queryParam.stageflg" placeholder="请选择流程状态">
                  <a-select-option v-for="(item, index) in stageflgData" :key="index" :value="item.code">{{ item.name
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced"><a-col :md="8" :sm="24">
                <a-form-item label="财务系统同步标记">
                  <a-select style="width: 100%" v-model="queryParam.syncflg_caiwu" placeholder="请选择财务系统同步标记">
                    <a-select-option v-for="(item, index) in syncflg_caiwuData" :key="index" :value="item.code">{{
                      item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="科研系统同步标记">
                  <a-select style="width: 100%" v-model="queryParam.syncflg_keyan" placeholder="请选择科研系统同步标记">
                    <a-select-option v-for="(item, index) in syncflg_keyanData" :key="index" :value="item.code">{{
                      item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="科研系统项目ID">
                  <a-input v-model="queryParam.relateid_keyan" allow-clear placeholder="请输入科研系统项目ID" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="项目负责人">
                  <a-input v-model="queryParam.project_manager" allow-clear placeholder="请输入项目负责人" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="项目经办人">
                  <a-input v-model="queryParam.project_operator" allow-clear placeholder="请输入项目经办人" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="需要发票标记">
                  <a-input v-model="queryParam.needinvoice" allow-clear placeholder="请输入需要发票标记" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="相关到账名称">
                  <a-input v-model="queryParam.relatetitle" allow-clear placeholder="请输入相关到账名称" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="核销代码">
                  <a-input v-model="queryParam.hxcode" allow-clear placeholder="请输入核销代码" />
                </a-form-item>
              </a-col> </template>

            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px"> {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>

          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table ref="table" :columns="columns" :data="loadData" :alert="true" :rowKey="(record) => record.id"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <template class="table-operator" slot="operator" v-if="hasPerm('bankrollapply:add')">
          <a-button style="display: none;" type="primary" v-if="hasPerm('bankrollapply:add')" icon="plus"
            @click="$refs.addForm.add()">新增经费认领</a-button>
        </template>
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
  data() {
    return {
      advanced: false, // 高级搜索 展开/关闭
      queryParam: { lookType: 9 },
      columns: [{
        title: '申请人',
        align: 'center',
        dataIndex: 'applyuser'
      },
      {
        title: '申请标题',
        dataIndex: 'applytitle',
        width:'280px'
      },
      {
        title: '申请金额(元)',
        align: 'center',
        dataIndex: 'apply_amount'
      },
      {
        title: '申请时间',
        align: 'center',
        dataIndex: 'createdTime'
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
  created() {
    if (this.hasPerm('bankrollapply:edit') || this.hasPerm('bankrollapply:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
    const Options = this.$options
    this.syncflg_keyanData = Options.filters['dictData']('yes_or_no')
    this.syncflg_caiwuData = Options.filters['dictData']('yes_or_no')
    this.stageflgData = Options.filters['dictData']('njucm161')
  },
  methods: {
    /**
     * 查询参数组装
     */
    switchingDate() {
      const obj = JSON.parse(JSON.stringify(this.queryParam))
      return obj
    },
    bankrollapplyDelete(record) {
      bankrollapplyDelete(record).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.$refs.table.refresh()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    handleOk() {
      this.$refs.table.refresh()
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

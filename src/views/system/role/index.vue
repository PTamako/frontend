<template>
  <div>
    <x-card v-if="hasPerm('sysRole:page')">
      <div slot="content" class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="角色名">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入角色名" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="唯一编码">
                <a-input v-model="queryParam.code" allow-clear placeholder="请输入唯一编码" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template slot="operator" v-if="hasPerm('sysRole:add')">
          <a-button @click="$refs.addForm.add()" icon="plus" type="primary" v-if="hasPerm('sysRole:add')"
            >新增角色</a-button
          >
        </template>
        <span slot="action" slot-scope="text, record">
          <template v-if="record.roleType!=1">
            <a v-if="hasPerm('sysRole:edit')" @click="$refs.editForm.edit(record)">编辑</a>
            <a-divider type="vertical" v-if="hasPerm('sysRole:edit')" />
            <a-dropdown
              v-if="hasPerm('sysRole:grantMenu') || hasPerm('sysRole:grantData') || hasPerm('sysRole:delete')"
            >
              <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
              <a-menu slot="overlay">
                <a-menu-item v-if="hasPerm('sysRole:grantMenu')">
                  <a @click="$refs.roleMenuForm.roleMenu(record)">授权菜单</a>
                  <a @click="$refs.roleApiForm.roleMenu(record)">授权Api</a>
                </a-menu-item>
                <a-menu-item v-if="hasPerm('sysRole:grantData')">
                  <a @click="$refs.roleOrgForm.roleOrg(record)">授权数据</a>
                </a-menu-item>
                <a-menu-item v-if="hasPerm('sysRole:delete')">
                  <a-popconfirm placement="topRight" title="确认删除？" @confirm="() => sysRoleDelete(record)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </span>
      </s-table>

      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <role-menu-form ref="roleMenuForm" @ok="handleOk" />
      <role-org-form ref="roleOrgForm" @ok="handleOk" />
      <role-api-form ref="roleApiForm" @ok="handleOk" />
    </a-card>
  </div>
</template>

<script>
import { STable, XCard } from '@/components'
import { getRolePage, sysRoleDelete } from '@/api/modular/system/roleManage'
import addForm from './addForm'
import editForm from './editForm'
import roleMenuForm from './roleMenuForm'
import roleApiForm from './roleApiForm'
import roleOrgForm from './roleOrgForm'
export default {
  name:"sys_role_mgr",
  components: {
    XCard,
    STable,
    addForm,
    editForm,
    roleMenuForm,
    roleOrgForm,
    roleApiForm
  },

  data() {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '角色名',
          dataIndex: 'name',
        },
        {
          title: '唯一编码',
          dataIndex: 'code',
        },
        {
          title: '排序',
          dataIndex: 'sort',
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        return getRolePage(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
    }
  },

  created() {
    if (
      this.hasPerm('sysRole:edit') ||
      this.hasPerm('sysRole:grantMenu') ||
      this.hasPerm('sysRole:grantData') ||
      this.hasPerm('sysRole:delete')
    ) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
      })
    }
  },

  methods: {
    sysRoleDelete(record) {
      sysRoleDelete(record)
        .then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table.refresh()
          } else {
            this.$message.error('删除失败：' + res.message)
          }
        })
        .catch((err) => {
          this.$message.error('删除错误：' + err.message)
        })
    },

    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
  },
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

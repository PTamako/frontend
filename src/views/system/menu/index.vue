/* eslint-disable */
<template>
  <a-row :gutter="24">
    <a-col :md="5" :sm="24" style="padding: 0 0 0 0;">
      <a-card :bordered="true">
        <a-table
          ref="table"
          size="middle"
          :rowKey="(record) => record.code"
          :pagination="false"
          :defaultExpandAllRows="true"
          :columns="appColumns"
          :dataSource="appData"
          :loading="loading"
          showPagination="auto"
          :row-selection="{ selectedRowKeys: selectedAppKeys, onChange: onAppSelectChange,type:'radio' }"
          :customRow="click"
        >
          <!--:rowSelection="rowSelectionon"-->

          <span slot="type" slot-scope="text">
            {{ typeFilter(text) }}
          </span>

          <span slot="icon" slot-scope="text">
            <div v-if="text != null && text != ''">
              <a-icon :type="text"/>
            </div>
          </span>
        </a-table>
      </a-card>
    </a-col>
    <a-col :md="19" :sm="24">
      <a-card :bordered="false">
        <div class="table-operator" v-if="hasPerm('sysMenu:add')">
          <a-button type="primary" v-if="hasPerm('sysMenu:add')" icon="plus" @click="$refs.addForm.add()">新增菜单
          </a-button>
        </div>
        <!--<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
          <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{this.selectedRowKeys.length }}</a>项&nbsp;&nbsp;
          <a style="margin-left: 24px" @click="clearSele()">清空</a>
        </div>-->
        <a-table
          :scroll="{y: '70vh' }"
          ref="table"
          size="middle"
          :rowKey="(record) => record.id"
          :pagination="false"
          :defaultExpandAllRows="true"
          :columns="columns"
          :dataSource="data"
          :loading="loading"
          showPagination="auto"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <!--:rowSelection="rowSelectionon"-->

          <span slot="type" slot-scope="text">
            {{ typeFilter(text) }}
          </span>

          <span slot="icon" slot-scope="text">
            <div v-if="text != null && text != ''">
              <a-icon :type="text"/>
            </div>
          </span>

          <span slot="action" slot-scope="text, record">
            <template>
              <a v-if="hasPerm('sysMenu:edit')" @click="$refs.editForm.edit(record)">编辑</a>
              <a-divider type="vertical" v-if="hasPerm('sysMenu:edit') & hasPerm('sysMenu:delete')"/>
              <a-popconfirm v-if="hasPerm('sysMenu:delete')" placement="topRight" title="删除本菜单与下级？"
                            @confirm="() => handleDel(record)">
                <a>删除</a>
              </a-popconfirm>
            </template>
          </span>
        </a-table>

        <add-form ref="addForm" @ok="handleOk"/>
        <edit-form ref="editForm" @ok="handleOk"/>
      </a-card>
    </a-col>
  </a-row>

</template>

<script>
    import { getMenuList, sysMenuDelete } from '@/api/modular/system/menuManage'
    import addForm from './addForm'
    import editForm from './editForm'
    import { sysDictTypeDropDown } from '@/api/modular/system/dictManage'
    import { getAppList } from '@/api/modular/system/appManage'

    export default {
        name:"sys_menu_mgr",
        components: {
            addForm,
            editForm
        },
        data() {
            return {
                queryParam: {},
                data: [],
                appData: [],
                loading: true,
                columns: [
                    {
                        title: '菜单名称',
                        dataIndex: 'name',
                        width: '20%'
                    },
                    {
                        title: '菜单类型',
                        dataIndex: 'type',
                        scopedSlots: { customRender: 'type' }
                    },
                    {
                        title: '图标',
                        dataIndex: 'icon',
                        scopedSlots: { customRender: 'icon' }
                    },
                    {
                        title: '组件',
                        dataIndex: 'component',
                        width: '20%',
                        ellipsis: true
                    },
                    {
                        title: '路由地址',
                        dataIndex: 'router',
                        key: 'router',
                        ellipsis: true
                    },
                    {
                        title: '排序',
                        dataIndex: 'sort'
                    }
                ],
                appColumns: [{
                    title: '应用名称',
                    dataIndex: 'name'
                }

                ],
                selectedRowKeys: [],
                selectedAppKeys: [],
                typeDict: []
            }
        },
        created() {
            this.loadData()
            if (this.hasPerm('sysMenu:edit') || this.hasPerm('sysMenu:delete')) {
                this.columns.push({
                    title: '操作',
                    dataIndex: 'action',
                    width: '150px',
                    scopedSlots: { customRender: 'action' }
                })
            }
        },

        methods: {
            loadData() {
                this.loading = true
                getAppList(this.queryParam).then((res) => {
                    if (res.success) {
                        this.appData = res.data
                        this.removeEmptyChildren(this.appData)
                    }
                }).finally(() => {
                    this.loading = false
                })
                this.sysDictTypeDropDown()
            },

            removeEmptyChildren(data) {
                if (data == null || data.length === 0) return
                for (let i = 0; i < data.length; i++) {
                    const item = data[i]
                    if (item.children != null && item.children.length === 0) {
                        item.children = null
                    } else {
                        this.removeEmptyChildren(item.children)
                    }
                }
            },

            typeFilter(type) {
                // eslint-disable-next-line eqeqeq
                const values = this.typeDict.filter(item => item.code == type)
                if (values.length > 0) {
                    return values[0].value
                }
            },

            /**
             * 获取字典数据
             */
            sysDictTypeDropDown() {
                sysDictTypeDropDown({ code: 'menu_type' }).then((res) => {
                    this.typeDict = res.data
                })
            },

            refreshSele() {
                this.onAppSelectChange(this.selectedAppKeys)
            },
            handleOk() {
                this.onAppSelectChange(this.selectedAppKeys)
            },
            handleDel(record) {
                sysMenuDelete(record).then((res) => {
                    if (res.success) {
                        this.$message.success('删除成功')
                        this.onAppSelectChange(this.selectedAppKeys)
                    } else {
                        this.$message.error('删除失败：' + res.message)
                    }
                }).catch((err) => {
                    this.$message.error('错误：' + err.message)
                })
            },

            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys
            },
            onAppSelectChange(selectedRowKeys) {
                this.selectedAppKeys = selectedRowKeys
                if (selectedRowKeys.length > 0) {
                    this.queryParam.application = selectedRowKeys[0]
                    getMenuList(this.queryParam).then((res) => {
                        if (res.success) {
                            this.data = res.data
                            this.removeEmptyChildren(this.data)
                        }
                    }).finally(() => {
                        this.loading = false
                    })
                }
            },
            click(record, index) {
                return {
                    on: {
                        click: () => {
                            const keys = []
                            keys.push(record.code)
                            this.selectedAppKeys = keys
                            this.onAppSelectChange(this.selectedAppKeys)
                        }
                    }
                }
            },
            clearSele() {
                this.selectedRowKeys = []
            }
        }
    }

</script>
<style scoped>

  .table-operator {
    margin-bottom: 18px;
  }

  button {
    margin-right: 8px;
  }

</style>

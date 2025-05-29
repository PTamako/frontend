<template>
  <a-spin :spinning="formLoading">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="需求部门" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
            <a-tree-select
              v-decorator="['RequiredOrgid', { rules: [{ required: true, message: '请选择需求部门！' }] }]"
              style="width: 100%"
              :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
              :treeData="orgTree"
              tree-checkable
              placeholder="请选择需求部门"
              treeDefaultExpandAll
              @change="e => initRequiredOrgName(e)"
              :disabled="disabled"
            >
              <span slot="title" slot-scope="{ id }">{{ id }}</span>
            </a-tree-select>
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['RequiredOrgName']" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item
            :disabled="disabled"
            label="需求人员"
            :labelCol="labelCol_one"
            :wrapperCol="wrapperCol_one"
            has-feedback
          >
            <a-input
              placeholder="请输入需求人员"
              v-decorator="['RequireUserName', { rules: [{ required: true, message: '请输入需求人员！' }] }]"
              :disabled="disabled"
            />
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['RequireUserId']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-col :xs="24" :sm="24">
        <a-form-item :disabled="disabled" label="采购类型" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one">
          <a-radio-group
            v-decorator="['BuyingType', { rules: [{ required: true, message: '请选择采购类型！' }] }]"
            :disabled="disabled"
          >
            <a-radio v-for="(item, index) in BuyingTypeOption" :key="index" :value="item.code">{{ item.name }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="24">
        <a-form-item :disabled="disabled" label="采购方式" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one">
          <a-radio-group
            v-decorator="['BuyingMethods', { rules: [{ required: true, message: '请选择采购方式！' }] }]"
            :disabled="disabled"
          >
            <a-radio v-for="(item, index) in BuyingMethodsOption" :key="index" :value="item.code">{{
              item.name
            }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="执行部门" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
            <a-tree-select
              v-decorator="['ExecutiveOrgid', { rules: [{ required: true, message: '请选择执行部门！' }] }]"
              style="width: 100%"
              :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
              :treeData="orgTree"
              placeholder="请选择执行部门"
              treeDefaultExpandAll
              @change="e => initExecutiveOrgName(e)"
              :disabled="disabled"
            >
              <span slot="title" slot-scope="{ id }">{{ id }}</span>
            </a-tree-select>
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['ExecutiveOrgName']" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24" v-if="false">
          <a-form-item
            label="合计金额"
            :labelCol="labelCol_one"
            :wrapperCol="wrapperCol_one"
            has-feedback
            :disabled="disabled"
          >
            <a-input placeholder="请输入合计金额" v-decorator="['AmountTotal']" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider orientation="left">采购内容</a-divider>
      <a-col :xs="24" :sm="24">
        <a-form-item>
          <a-table
            :disabled="disabled"
            size="middle"
            bordered
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :loading="memberLoading"
          >
            <template
              v-for="(col, index) in ['Index', 'GoodsName', 'GoodsQuantity', 'GoodsSpec', 'GoodsAmount']"
              :slot="col"
              slot-scope="text, record, i"
            >
              <template v-if="index == 0">
                <template> {{ i + 1 }}</template>
              </template>
              <template v-if="index == 1">
                <a-select
                  :key="col"
                  mode="combobox"
                  v-if="record.editable"
                  :options="optionsName"
                  style="width: 100%"
                  placeholder="请输入名称"
                  @change="e => handleChange(e, record.key, col)"
                >
                  <span slot="title" slot-scope="{ id }">{{ id }} </span>
                </a-select>
                <template v-else>{{ text }}</template>
              </template>
              <template v-if="index == 2 || index == 4">
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    type="number"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.key, col)"
                  />
                  <template v-else>
                    {{ text }}
                  </template>
                </div>
              </template>
              <template v-if="index == 3">
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.key, col)"
                  />
                  <template v-else>
                    {{ text }}
                  </template>
                </div>
              </template>
            </template>
            <template slot="operation" slot-scope="text, record">
              <a @click="remove(record.key)">删除</a>
            </template>
          </a-table>
          <a-button
            style="width: 100%; margin-top: 16px; margin-bottom: 8px"
            type="dashed"
            icon="plus"
            @click="newMember"
          >
            增行
          </a-button>
        </a-form-item>
      </a-col>
    </a-form>
  </a-spin>
</template>

<script>
import { getOrgTree, getOrgList } from '@/api/modular/system/orgManage'
export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelCol_one: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol_one: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'Index',
          scopedSlots: { customRender: 'Index' },
          width: 50,
          align: 'center'
        },
        {
          title: '名称',
          dataIndex: 'GoodsName',
          scopedSlots: { customRender: 'GoodsName' }
        },
        {
          title: '数量',
          dataIndex: 'GoodsQuantity',
          scopedSlots: { customRender: 'GoodsQuantity' },
          width: 100
        },
        {
          title: '规格型号',
          dataIndex: 'GoodsSpec',
          scopedSlots: { customRender: 'GoodsSpec' },
          width: 300
        },
        {
          title: '预计金额',
          dataIndex: 'GoodsAmount',
          key: 'GoodsAmount',
          scopedSlots: { customRender: 'GoodsAmount' },
          width: 150
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' },
          width: 60,
          align: 'center'
        }
      ],
      data: [],
      BuyingTypeOption: [
        // { label: '已采购直接领用', value: 1 },
        // { label: '政府采购', value: 2 },
        // { label: '零星采购', value: 3 }
      ],
      BuyingMethodsOption: [
        // { label: '公开招标', value: 1 },
        // { label: '邀请招标', value: 2 },
        // { label: '竞磋', value: 3 },
        // { label: '竞谈', value: 4 },
        // { label: '单一来源', value: 5 },
        // { label: '询价', value: 6 },
        // { label: '合格供应商', value: 7 },
        // { label: '其他', value: 8 }
      ],
      sysEmpParamExtList: [],
      optionsName: [
        {
          value: '键盘',
          label: '键盘'
        },
        {
          value: '鼠标',
          label: '鼠标'
        },
        {
          value: '硒鼓',
          label: '硒鼓'
        }
      ],
      name: null,
      visible: false,
      confirmLoading: false,
      formLoading: false,
      memberLoading: false,
      disabled: false,
      orgTree: [],
      orgList: [],
      form: this.$form.createForm(this)
    }
  },
  created() {
    this.BuyingTypeOption = this.$options.filters['dictData']('projtype')
    this.BuyingMethodsOption = this.$options.filters['dictData']('doc_label')
    this.getOrgData()
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        var AmountTotal = newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.GoodsAmount)), 0)
        this.form.setFieldsValue({
          AmountTotal: AmountTotal
        })
      }
    }
  },
  methods: {
    finite(val) {
      if (isFinite(val)) {
        return val
      } else {
        return 0
      }
    },
    /**
     * 增行
     */
    newMember() {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        GoodsName: '',
        GoodsQuantity: '',
        GoodsSpec: '',
        GoodsAmount: '',
        editable: true,
        isNew: true
      })
    },
    /**
     * 删除
     */
    remove(key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    /**
     * 选择子表单单项触发
     */
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    /**
     * 子表单json重构
     */
    JsonReconsitution() {
      this.sysEmpParamExtList = []
      const newData = [...this.data]
      newData.forEach(item => {
        // eslint-disable-next-line eqeqeq
        if ((item.GoodsName != '') & (item.GoodsQuantity != '')) {
          this.sysEmpParamExtList.push({
            GoodsName: item.GoodsName,
            GoodsQuantity: item.GoodsQuantity,
            GoodsSpec: item.GoodsSpec,
            GoodsAmount: item.GoodsAmount
          })
        }
      })
    },
    /**
     * 获取机构数据，并加载于表单中
     */
    getOrgData() {
      getOrgTree().then(res => {
        this.orgTree = res.data
      })
      getOrgList().then(res => {
        this.orgList = res.data
      })
    },
    /**
     * 选择树机构，初始化机构名称于表单中
     */
    initRequiredOrgName(value) {
      if (value.length !== 0) {
        for (var i = 0; i < value.length; i++) {
          var tmpOrgName = this.orgList.find(item => value[i].toString() === item.id).name
          this.form.getFieldDecorator('RequiredOrgName', { initialValue: tmpOrgName })
        }
      } else {
        this.form.getFieldDecorator('RequiredOrgName', { initialValue: '' })
      }
    },
    initExecutiveOrgName(value) {
      var tmpOrgName = this.orgList.find(item => value === item.id).name
      this.form.getFieldDecorator('ExecutiveOrgName', { initialValue: tmpOrgName })
    },
    // 初始化方法
    edit(record) {
      this.formLoading = false
      setTimeout(() => {
        this.form.setFieldsValue({
          RequiredOrgid: record.RequiredOrgid,
          RequireUserId: record.RequireUserId,
          RequiredOrgName: record.RequiredOrgName,
          RequireUserName: record.RequireUserName,
          AmountTotal: record.AmountTotal,
          BuyingType: record.BuyingType,
          BuyingMethods: record.BuyingMethods
        })
        this.data = []
        record.rds.forEach(item => {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            GoodsName: item.GoodsName,
            GoodsQuantity: item.GoodsQuantity,
            GoodsSpec: item.GoodsSpec,
            GoodsAmount: item.GoodsAmount
          })
        })
        console.log(this.data)
      }, 100)
    },
    setData(record) {
      setTimeout(() => {
        this.form.setFieldsValue({
          RequiredOrgid: record.RequiredOrgid,
          RequireUserId: record.RequireUserId,
          RequiredOrgName: record.RequiredOrgName,
          RequireUserName: record.RequireUserName,
          AmountTotal: record.AmountTotal,
          ExecutiveOrgid: record.ExecutiveOrgid,
          ExecutiveOrgName: record.ExecutiveOrgName,
          BuyingType: record.BuyingType,
          BuyingMethods: record.BuyingMethods
        })
        this.data = []
        record.rds.forEach(item => {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            GoodsName: item.GoodsName,
            GoodsQuantity: item.GoodsQuantity,
            GoodsSpec: item.GoodsSpec,
            GoodsAmount: item.GoodsAmount
          })
        })
      }, 100)
      console.log(this.data)
    },
    disable(record) {
      this.disabled = true
    },
    getData() {
      return new Promise((resolve, reject) => {
        try {
          const {
            form: { validateFields }
          } = this
          validateFields((errors, values) => {
            if (!errors) {
              this.JsonReconsitution()
              values.rds = this.sysEmpParamExtList
              resolve(values)
            } else {
              reject(errors)
            }
          })
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
</script>

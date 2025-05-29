<template>
  <a-spin :spinning="formLoading">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="部门" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
            <a-tree-select
              v-decorator="['RequiredOrgid', { rules: [{ required: true, message: '请选择部门！' }] }]"
              style="width: 100%"
              :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
              :treeData="orgTree"
              placeholder="请选择部门"
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
            label="经办人"
            :labelCol="labelCol_one"
            :wrapperCol="wrapperCol_one"
            has-feedback
          >
            <a-input
              placeholder="请输入经办人"
              v-decorator="['RequireUserName', { rules: [{ required: true, message: '请输入经办人！' }] }]"
              :disabled="disabled"
            />
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['RequireUserId']" />
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <a-divider orientation="left">采购内容</a-divider> -->
      <a-row :gutter="24">
        <a-col :md="24" :sm="24">
        <a-form-item label="采购内容" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback>
          <a-table
            :disabled="disabled"
            size="middle"
            bordered
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :loading="memberLoading"
            style="width: 100%;"
          >
            <template
              v-for="(col, index) in ['Index', 'GoodsName', 'eInvoiceNo', 'FinType', 'GoodsAmount', 'GoodsMemo']"
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
              <template v-if="index == 4">
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
              <template v-if="index == 2 || index == 3|| index == 5">
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
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="合计金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback :disabled="disabled">
            <a-input-number placeholder="请输入合计金额" v-decorator="['AmountTotal']" :disabled="disabled" style="width: 100%;"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="附件单据数量" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback :disabled="disabled">
            <a-input-number placeholder="请输入附件单据数量" v-decorator="['VoucherQuantity']" :disabled="disabled" style="width: 100%;"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="汇款单位名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback :disabled="disabled">
            <a-input placeholder="请输入汇款单位名称" v-decorator="['TransCompaNme']" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="纳税人识别号" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback :disabled="disabled">
            <a-input placeholder="请输入纳税人识别号" v-decorator="['TransTaxpayerId']" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="银行名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback :disabled="disabled">
            <a-input placeholder="请输入银行名称" v-decorator="['TransBankName']" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="银行账号" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback :disabled="disabled">
            <a-input placeholder="请输入银行账号" v-decorator="['TransBankNo']" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      </a-row>      
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item :disabled="disabled" label="请款性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group
              v-decorator="['RenderType', { rules: [{ required: true, message: '请选择请款性质！' }] }]"
              :disabled="disabled"
            >
              <a-radio v-for="(item, index) in RenderTypeOption" :key="index" :value="item.code">{{ item.name }}</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="执行部门" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback>
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
      </a-row>
      
      <a-divider orientation="left">公务卡记录</a-divider>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="刷卡日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback :disabled="disabled">
            <a-date-picker placeholder="请输入日期" v-decorator="['Card_Date1']" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="刷卡金额" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback :disabled="disabled">
            <a-input-number placeholder="请输入刷卡金额号" v-decorator="['Card_Fee1']" :disabled="disabled" style="width: 100%;"/>
          </a-form-item>
        </a-col>
      </a-row> 
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="刷卡日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback :disabled="disabled">
            <a-date-picker placeholder="请输入日期" v-decorator="['Card_Date2']" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="刷卡金额" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback :disabled="disabled">
            <a-input-number placeholder="请输入刷卡金额号" v-decorator="['Card_Fee2']" :disabled="disabled" style="width: 100%;"/>
          </a-form-item>
        </a-col>
      </a-row> 
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <a-form-item label="刷卡日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback :disabled="disabled">
            <a-date-picker placeholder="请输入日期" v-decorator="['Card_Date3']" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="刷卡金额" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback :disabled="disabled">
            <a-input-number placeholder="请输入刷卡金额号" v-decorator="['Card_Fee3']" :disabled="disabled" style="width: 100%;"/>
          </a-form-item>
        </a-col>
      </a-row>   
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
          title: '摘要（或用途，设备请注明名称和型号）',
          dataIndex: 'GoodsName',
          scopedSlots: { customRender: 'GoodsName' }
        },
        {
          title: '电子票号',
          dataIndex: 'eInvoiceNo',
          scopedSlots: { customRender: 'eInvoiceNo' },
          width: 180
        },
        {
          title: '业务分类',
          dataIndex: 'FinType',
          scopedSlots: { customRender: 'FinType' },
          width: 300
        },
        {
          title: '金额',
          dataIndex: 'GoodsAmount',
          key: 'GoodsAmount',
          scopedSlots: { customRender: 'GoodsAmount' },
          width: 150
        },
        {
          title: '备注',
          dataIndex: 'GoodsMemo',
          scopedSlots: { customRender: 'GoodsMemo' },
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
      RenderTypeOption: [],
      BuyingMethodsOption: [],
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
    this.RenderTypeOption = this.$options.filters['dictData']('DicRenderType')
    this.BuyingMethodsOption = this.$options.filters['dictData']('DicBuyingMethods')
    this.getOrgData()
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        var t_AmountTotal = newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.GoodsAmount)), 0)
        this.form.setFieldsValue({
          AmountTotal: t_AmountTotal
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
        eInvoiceNo: '',
        FinType: '',
        GoodsAmount: '',
        GoodsMemo: '',
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
        if ((item.GoodsName != '') & (item.GoodsAmount != '')) {
          this.sysEmpParamExtList.push({
            GoodsName: item.GoodsName,
            eInvoiceNo: item.eInvoiceNo,
            FinType: item.FinType,
            GoodsAmount: item.GoodsAmount,
            GoodsMemo: item.GoodsMemo
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
      var tmpOrgName = this.orgList.find(item => value === item.id).name
      this.form.getFieldDecorator('RequiredOrgName', { initialValue: tmpOrgName })
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
          RenderType: record.RenderType,
          TransCompaNme: record.TransCompaNme,
          TransTaxpayerId: record.TransTaxpayerId,
          TransBankName: record.TransBankName,
          TransBankNo: record.TransBankNo,
          Card_No: record.Card_No,
          Card_Date1: record.Card_Date1,
          Card_Fee1: record.Card_Fee1,
          Card_Date2: record.Card_Date2,
          Card_Fee2: record.Card_Fee2,
          Card_Date3: record.Card_Date3,
          Card_Fee3: record.Card_Fee3,
          CashAmount: record.CashAmount
        })
        this.data = []
        record.rds.forEach(item => {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            GoodsName: item.GoodsName,
            eInvoiceNo: item.eInvoiceNo,
            FinType: item.FinType,
            GoodsAmount: item.GoodsAmount,
            GoodsMemo: item.GoodsMemo
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
          VoucherQuantity: record.VoucherQuantity,
          ExecutiveOrgid: record.ExecutiveOrgid,
          ExecutiveOrgName: record.ExecutiveOrgName,
          RenderType: record.RenderType,          
          TransCompaNme: record.TransCompaNme,
          TransTaxpayerId: record.TransTaxpayerId,
          TransBankName: record.TransBankName,
          TransBankNo: record.TransBankNo,
          Card_No: record.Card_No,
          Card_Date1: record.Card_Date1,
          Card_Fee1: record.Card_Fee1,
          Card_Date2: record.Card_Date2,
          Card_Fee2: record.Card_Fee2,
          Card_Date3: record.Card_Date3,
          Card_Fee3: record.Card_Fee3,
          CashAmount: record.CashAmount
        })
        this.data = []
        record.rds.forEach(item => {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            GoodsName: item.GoodsName,
            eInvoiceNo: item.eInvoiceNo,
            FinType: item.FinType,
            GoodsAmount: item.GoodsAmount,
            GoodsMemo: item.GoodsMemo
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

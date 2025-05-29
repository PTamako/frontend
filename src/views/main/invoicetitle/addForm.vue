<template>
  <a-modal title="新增发票抬头管理" :width="1000" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="学号或教工号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入学号或教工号"
                v-decorator="['studentid', { rules: [{ required: true, message: '请输入学号或教工号！' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入姓名"
                v-decorator="['studentname', { rules: [{ required: true, message: '请输入姓名！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="发票抬头" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入发票抬头"
                v-decorator="['invoiceTitle', { rules: [{ required: true, message: '请输入发票抬头！' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="开具类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width: 100%" placeholder="请选择开具类型"
                v-decorator="['customerType', { rules: [{ required: true, message: '请选择开具类型！' }] }]">
                <a-select-option v-for="(item, index) in  customerTypeData" :key="index" :value="item.code">{{ item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="发票类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width: 100%" placeholder="请选择发票类型"
                v-decorator="['invoicetype', { rules: [{ required: true, message: '请选择发票类型！' }] }]">
                <a-select-option v-for="(item, index) in  invoicetypeData" :key="index" :value="item.code">{{ item.name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="纳税人识别号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入纳税人识别号"
                v-decorator="['taxpayerid', { rules: [{ required: true, message: '请输入纳税人识别号！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="基本开户银行名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入基本开户银行名称" v-decorator="['bank']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="基本开户账号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入基本开户账号" v-decorator="['bankNo']" />
            </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="注册场所地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入注册场所地址" v-decorator="['contactname']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="注册固定电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入注册固定电话" v-decorator="['contactphone']" />
            </a-form-item></a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="电子邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入电子邮箱" v-decorator="['user_mail']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="联系手机" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入联系手机" v-decorator="['linkmobile']" />
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入状态" v-decorator="['workflg']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="显示顺序" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input-number placeholder="请输入显示顺序" style="width: 100%" v-decorator="['sortid']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import {
  invoicetitleAdd
} from '@/api/modular/main/invoicetitleManage'

export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      customerTypeData: [],
      invoicetypeData: [],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // 初始化方法
    add(record) {
      this.visible = true
      const customerTypeOption = this.$options
      this.customerTypeData = customerTypeOption.filters['dictData']('customertype')
      const invoicetypeOption = this.$options
      this.invoicetypeData = invoicetypeOption.filters['dictData']('invoicetype')
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          for (const key in values) {
            if (typeof (values[key]) === 'object' && !(values[key] === null)) {
              values[key] = JSON.stringify(values[key])
            }
          }
          invoicetitleAdd(values).then((res) => {
            if (res.success) {
              this.$message.success('新增成功')
              this.confirmLoading = false
              this.$emit('ok', values)
              this.handleCancel()
            } else {
              this.$message.error('新增失败')// + res.message
            }
          }).finally((res) => {
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>

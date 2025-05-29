<template>
  <a-modal
    title="新增差旅费报销"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="出差人ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入出差人ID" v-decorator="['userId']" />
        </a-form-item>
        <a-form-item label="出差人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入出差人姓名" v-decorator="['userName']" />
        </a-form-item>
        <a-form-item label="出差申请ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入出差申请ID" v-decorator="['travelId']" />
        </a-form-item>
        <a-form-item label="出差事由" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入出差事由" v-decorator="['travelTitle']" />
        </a-form-item>
        <a-form-item label="合计金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入合计金额" v-decorator="['amountTotal']" />
        </a-form-item>
        <a-form-item label="现金报销金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入现金报销金额" v-decorator="['amountCash']" />
        </a-form-item>
        <a-form-item label="公务卡报销金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入公务卡报销金额" v-decorator="['amountCard']" />
        </a-form-item>
        <a-form-item label="转账报销金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入转账报销金额" v-decorator="['amountTrans']" />
        </a-form-item>
        <a-form-item label="转账单位名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入转账单位名称" v-decorator="['transCompaNme']" />
        </a-form-item>
        <a-form-item label="转账单位纳税人识别号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入转账单位纳税人识别号" v-decorator="['transTaxpayerId']" />
        </a-form-item>
        <a-form-item label="转账单位银行名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入转账单位银行名称" v-decorator="['transBankName']" />
        </a-form-item>
        <a-form-item label="转账单位银行账号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入转账单位银行账号" v-decorator="['transBankNo']" />
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备注" v-decorator="['expenseDesc']" />
        </a-form-item>
        <a-form-item label="流程" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入流程" v-decorator="['stageFlg']" />
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入状态" v-decorator="['workFlg']" />
        </a-form-item>
        <a-form-item label="部门ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入部门ID" v-decorator="['orgid']" />
        </a-form-item>
        <a-form-item label="部门名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入部门名称" v-decorator="['orgName']" />
        </a-form-item>
        <a-form-item label="主键Id" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入主键Id" v-decorator="['id']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {
    CustomsTravelExpenseAdd
  } from '@/api/modular/main/CustomsTravelExpenseManage'

  export default {
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        },
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
      },
      /**
       * 提交表单
       */
      handleSubmit () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            for (const key in values) {
              if (typeof (values[key]) === 'object' && !(values[key]===null)) {
                values[key] = JSON.stringify(values[key])
              }
            }
            CustomsTravelExpenseAdd(values).then((res) => {
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
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>

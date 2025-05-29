<template>
  <a-modal
    title="新增发票开具"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="发票申请编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入发票申请编号" style="width: 100%" v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="收费项目编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入收费项目编号" v-decorator="['fee_id']" />
        </a-form-item>
        <a-form-item label="缴费编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入缴费编号" v-decorator="['feeuser_id']" />
        </a-form-item>
        <a-form-item label="订单号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入订单号" v-decorator="['order_no']" />
        </a-form-item>
        <a-form-item label="外部编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入外部编号" v-decorator="['trade_no']" />
        </a-form-item>
        <a-form-item label="用户号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入用户号" style="width: 100%" v-decorator="['user_id']" />
        </a-form-item>
        <a-form-item label="教职工号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入教职工号" v-decorator="['student_id']" />
        </a-form-item>
        <a-form-item label="用户名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入用户名称" v-decorator="['user_name']" />
        </a-form-item>
        <a-form-item label="用户邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入用户邮箱" v-decorator="['user_mail']" />
        </a-form-item>
        <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入联系电话" v-decorator="['linkphone']" />
        </a-form-item>
        <a-form-item label="发票类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票类型" v-decorator="['invoicetype']" />
        </a-form-item>
        <a-form-item label="发票抬头" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票抬头" v-decorator="['invoicetitle']" />
        </a-form-item>
        <a-form-item label="开票项目代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入开票项目代码" v-decorator="['invoiceitem']" />
        </a-form-item>
        <a-form-item label="开票项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入开票项目名称" v-decorator="['invoicecontent']" />
        </a-form-item>
        <a-form-item label="纳税人识别号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入纳税人识别号" v-decorator="['taxpayerid']" />
        </a-form-item>
        <a-form-item label="发票金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票金额" v-decorator="['invoiceamount']" />
        </a-form-item>
        <a-form-item label="发票号码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票号码" v-decorator="['invoicenumber']" />
        </a-form-item>
        <a-form-item label="开具时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择开具时间" v-decorator="['invouicetime']" @change="onChangeinvouicetime"/>
        </a-form-item>
        <a-form-item label="开票人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入开票人" v-decorator="['invoicedrawer ']" />
        </a-form-item>
        <a-form-item label="开具状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择开具状态" v-decorator="['stageflg']" >
            <a-select-option v-for="(item,index) in  stageflgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="申请日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择申请日期" v-decorator="['inputtime']" @change="onChangeinputtime"/>
        </a-form-item>
        <a-form-item label="购货方银行" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入购货方银行" v-decorator="['buyerbankname']" />
        </a-form-item>
        <a-form-item label="购货方银行账号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入购货方银行账号" v-decorator="['buyerbankno']" />
        </a-form-item>
        <a-form-item label="购货方地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入购货方地址" v-decorator="['buyeraddresss']" />
        </a-form-item>
        <a-form-item label="购货方固定电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入购货方固定电话" v-decorator="['buyertelephone']" />
        </a-form-item>
        <a-form-item label="发票开具流水号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票开具流水号" v-decorator="['issuerequestid']" />
        </a-form-item>
        <a-form-item label="发票开具结果" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票开具结果" v-decorator="['issueresult']" />
        </a-form-item>
        <a-form-item label="税收分类编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入税收分类编码" v-decorator="['taxcode']" />
        </a-form-item>
        <a-form-item label="原发票代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入原发票代码" v-decorator="['rawinvoicecode']" />
        </a-form-item>
        <a-form-item label="原发票号码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入原发票号码" v-decorator="['rawinvoicenumber']" />
        </a-form-item>
        <a-form-item label="发票代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票代码" v-decorator="['invoicecode']" />
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择状态" v-decorator="['workflg']" >
            <a-select-option v-for="(item,index) in  workflgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="开票类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择开票类型" v-decorator="['makeouttype']" >
            <a-select-option v-for="(item,index) in  makeouttypeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="开票备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入开票备注" v-decorator="['makeoutdesc']" />
        </a-form-item>
        <a-form-item label="电子发票二维码数据" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入电子发票二维码数据" v-decorator="['einvoiceqrcode']" />
        </a-form-item>
        <a-form-item label="发票税率" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票税率" v-decorator="['invoicetax']" />
        </a-form-item>
        <a-form-item label="发票税额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票税额" v-decorator="['invoiceonlytax']" />
        </a-form-item>
        <a-form-item label="发票不含税金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票不含税金额" v-decorator="['invoicehasnotax']" />
        </a-form-item>
        <a-form-item label="缴费来源" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入缴费来源" v-decorator="['feesource']" />
        </a-form-item>
        <a-form-item label="关联ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入关联ID" v-decorator="['relatenid']" />
        </a-form-item>
        <a-form-item label="通知url" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入通知url" v-decorator="['notifymethod']" />
        </a-form-item>
        <a-form-item label="开具通知标记" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择开具通知标记" v-decorator="['notifyflg']" >
            <a-select-option v-for="(item,index) in  notifyflgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="通知次数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入通知次数" style="width: 100%" v-decorator="['notifytimes']" />
        </a-form-item>
        <a-form-item label="基本开户银行名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入基本开户银行名称" v-decorator="['bank']" />
        </a-form-item>
        <a-form-item label="基本开户账号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入基本开户账号" v-decorator="['bankNo']" />
        </a-form-item>
        <a-form-item label="发票性质" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票性质" v-decorator="['einvoiceflg']" />
        </a-form-item>
        <a-form-item label="电子发票url" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入电子发票url" v-decorator="['einvoiceurl']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {
    invoiceAdd
  } from '@/api/modular/main/invoiceManage'

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
        invouicetimeDateString: '',
        stageflgData: [],
        inputtimeDateString: '',
        workflgData: [],
        makeouttypeData: [],
        notifyflgData: [],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        const stageflgOption = this.$options
        this.stageflgData = stageflgOption.filters['dictData']('vis_type')
        const workflgOption = this.$options
        this.workflgData = workflgOption.filters['dictData']('vis_type')
        const makeouttypeOption = this.$options
        this.makeouttypeData = makeouttypeOption.filters['dictData']('vis_type')
        const notifyflgOption = this.$options
        this.notifyflgData = notifyflgOption.filters['dictData']('yes_or_no')
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
            values.invouicetime = this.invouicetimeDateString
            values.inputtime = this.inputtimeDateString
            invoiceAdd(values).then((res) => {
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
      onChangeinvouicetime(date, dateString) {
        this.invouicetimeDateString = dateString
      },
      onChangeinputtime(date, dateString) {
        this.inputtimeDateString = dateString
      },
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>

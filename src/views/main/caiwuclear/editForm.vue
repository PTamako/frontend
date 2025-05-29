<template>
  <a-modal
    title="编辑未核销往来账"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="到款往来标识" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入到款往来标识" v-decorator="['main_key']" />
        </a-form-item>
        <a-form-item label="到款往来辅助标识" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入到款往来辅助标识" v-decorator="['smark']" />
        </a-form-item>
        <a-form-item label="往来日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择往来日期" v-decorator="['clr_date']" @change="onChangeclr_date"/>
        </a-form-item>
        <a-form-item label="往来科目" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入往来科目" v-decorator="['sUBJ']" />
        </a-form-item>
        <a-form-item label="往来单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入往来单位" v-decorator="['unit_code']" />
        </a-form-item>
        <a-form-item label="核销代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入核销代码" v-decorator="['cLR_ORDER']" />
        </a-form-item>
        <a-form-item label="往来凭证号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入往来凭证号" v-decorator="['uNI_NO']" />
        </a-form-item>
        <a-form-item label="往来分录号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入往来分录号" v-decorator="['rECORD_NO']" />
        </a-form-item>
        <a-form-item label="摘要" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入摘要" v-decorator="['sABSTRACT']" />
        </a-form-item>
        <a-form-item label="借方金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入借方金额" style="width: 100%" v-decorator="['j_AMOUNT']" />
        </a-form-item>
        <a-form-item label="贷方金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入贷方金额" style="width: 100%" v-decorator="['d_AMOUNT']" />
        </a-form-item>
        <a-form-item label="经办人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择经办人" v-decorator="['oPERATE']" @change="onChangeoPERATE"/>
        </a-form-item>
        <a-form-item label="项目代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目代码" v-decorator="['uNI_PRJ_ORDER']" />
        </a-form-item>
        <a-form-item label="借款人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入借款人" v-decorator="['cLRSNO']" />
        </a-form-item>
        <a-form-item label="未核销金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入未核销金额" style="width: 100%" v-decorator="['jf_amt']" />
        </a-form-item>
        <a-form-item label="原始到账金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入原始到账金额" style="width: 100%" v-decorator="['dZ_AMT']" />
        </a-form-item>
        <a-form-item label="LASTUPD_DTTM" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择LASTUPD_DTTM" v-decorator="['lASTUPD_DTTM']" @change="onChangelASTUPD_DTTM"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import {
    caiwuclearEdit
  } from '@/api/modular/main/caiwuclearManage'
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
        clr_dateDateString: '',
        oPERATEDateString: '',
        lASTUPD_DTTMDateString: '',
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      moment,
      // 初始化方法
      edit (record) {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              main_key: record.main_key,
              smark: record.smark,
              sUBJ: record.sUBJ,
              uNIT_CODE: record.uNIT_CODE,
              cLR_ORDER: record.cLR_ORDER,
              uNI_NO: record.uNI_NO,
              rECORD_NO: record.rECORD_NO,
              sABSTRACT: record.sABSTRACT,
              j_AMOUNT: record.j_AMOUNT,
              d_AMOUNT: record.d_AMOUNT,
              uNI_PRJ_ORDER: record.uNI_PRJ_ORDER,
              cLRSNO: record.cLRSNO,
              jf_amt: record.jf_amt,
              dZ_AMT: record.dZ_AMT
            }
          )
        }, 100)
        this.form.getFieldDecorator('clr_date', { initialValue: moment(record.clr_date, 'YYYY-MM-DD') })
        this.clr_dateDateString = moment(record.clr_date).format('YYYY-MM-DD')
        this.form.getFieldDecorator('oPERATE', { initialValue: moment(record.oPERATE, 'YYYY-MM-DD') })
        this.oPERATEDateString = moment(record.oPERATE).format('YYYY-MM-DD')
        this.form.getFieldDecorator('lASTUPD_DTTM', { initialValue: moment(record.lASTUPD_DTTM, 'YYYY-MM-DD') })
        this.lASTUPD_DTTMDateString = moment(record.lASTUPD_DTTM).format('YYYY-MM-DD')
      },
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
            values.clr_date = this.clr_dateDateString
            values.oPERATE = this.oPERATEDateString
            values.lASTUPD_DTTM = this.lASTUPD_DTTMDateString
            caiwuclearEdit(values).then((res) => {
              if (res.success) {
                this.$message.success('编辑成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('编辑失败')//  + res.message
              }
            }).finally((res) => {
              this.confirmLoading = false
            })
          } else {
            this.confirmLoading = false
          }
        })
      },
      onChangeclr_date(date, dateString) {
        this.clr_dateDateString = dateString
      },
      onChangeoPERATE(date, dateString) {
        this.oPERATEDateString = dateString
      },
      onChangelASTUPD_DTTM(date, dateString) {
        this.lASTUPD_DTTMDateString = dateString
      },
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>

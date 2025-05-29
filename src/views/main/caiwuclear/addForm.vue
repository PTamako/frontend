<template>
  <a-modal
    title="新增未核销往来账"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="到款往来标识" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入到款往来标识" v-decorator="['mAIN_KEY']" />
        </a-form-item>
        <a-form-item label="到款往来辅助标识" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入到款往来辅助标识" v-decorator="['sMARK']" />
        </a-form-item>
        <a-form-item label="往来日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择往来日期" v-decorator="['cLR_DATE']" @change="onChangecLR_DATE"/>
        </a-form-item>
        <a-form-item label="往来科目" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入往来科目" v-decorator="['sUBJ']" />
        </a-form-item>
        <a-form-item label="往来单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入往来单位" v-decorator="['uNIT_CODE']" />
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
          <a-input-number placeholder="请输入未核销金额" style="width: 100%" v-decorator="['jF_AMT']" />
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
  import {
    caiwuclearAdd
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
        cLR_DATEDateString: '',
        oPERATEDateString: '',
        lASTUPD_DTTMDateString: '',
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
            values.cLR_DATE = this.cLR_DATEDateString
            values.oPERATE = this.oPERATEDateString
            values.lASTUPD_DTTM = this.lASTUPD_DTTMDateString
            caiwuclearAdd(values).then((res) => {
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
      onChangecLR_DATE(date, dateString) {
        this.cLR_DATEDateString = dateString
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

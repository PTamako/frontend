<template>
  <a-modal
    title="编辑科研系统回写"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="项目编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目编号" v-decorator="['pROJECT_ID']" />
        </a-form-item>
        <a-form-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目名称" v-decorator="['nAME']" />
        </a-form-item>
        <a-form-item label="项目金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目金额" v-decorator="['fEE_AUTHORIZE']" />
        </a-form-item>
        <a-form-item label="负责人名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入负责人名称" v-decorator="['cHARGER_NAME']" />
        </a-form-item>
        <a-form-item label="负责人职工号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入负责人职工号" v-decorator="['cHARGER_ACCOUNT']" />
        </a-form-item>
        <a-form-item label="单位名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入单位名称" v-decorator="['uNIT_NAME']" />
        </a-form-item>
        <a-form-item label="认领金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入认领金额" v-decorator="['iNCOME_FEE']" />
        </a-form-item>
        <a-form-item label="认领时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择认领时间" v-decorator="['iNCOME_DATE']" @change="onChangeiNCOME_DATE"/>
        </a-form-item>
        <a-form-item label="来款单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入来款单位" v-decorator="['iNCOME_UNIT_NAME']" />
        </a-form-item>
        <a-form-item label="科研是否同步" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-switch v-decorator="['iS_SYNC', { valuePropName: 'checked' }]" />
        </a-form-item>
        <a-form-item label="到款往来标识" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入到款往来标识" v-decorator="['mAIN_KEY']" />
        </a-form-item>
        <a-form-item label="到款往来辅助标识" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入到款往来辅助标识" v-decorator="['sMARK']" />
        </a-form-item>
        <a-form-item label="往来日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入往来日期" v-decorator="['cLR_DATE']" />
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
          <a-input placeholder="请输入借方金额" v-decorator="['j_AMOUNT']" />
        </a-form-item>
        <a-form-item label="贷方金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入贷方金额" v-decorator="['d_AMOUNT']" />
        </a-form-item>
        <a-form-item label="经办人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入经办人" v-decorator="['oPERATE']" />
        </a-form-item>
        <a-form-item label="项目代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目代码" v-decorator="['uNI_PRJ_ORDER']" />
        </a-form-item>
        <a-form-item label="借款人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入借款人" v-decorator="['cLRSNO']" />
        </a-form-item>
        <a-form-item label="未核销金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入未核销金额" v-decorator="['jF_AMT']" />
        </a-form-item>
        <a-form-item label="原始到账金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入原始到账金额" v-decorator="['dZ_AMT']" />
        </a-form-item>
        <a-form-item label="发票号码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票号码" v-decorator="['fPHM']" />
        </a-form-item>
        <a-form-item label="发票代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票代码" v-decorator="['fPDM']" />
        </a-form-item>
        <a-form-item label="开票日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入开票日期" v-decorator="['kPRQ']" />
        </a-form-item>
        <a-form-item label="发票金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票金额" v-decorator="['kPJE']" />
        </a-form-item>
        <a-form-item label="发票税额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票税额" v-decorator="['kPSE']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import {
    keyanincomeEdit
  } from '@/api/modular/main/keyanincomeManage'
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
        iNCOME_DATEDateString: '',
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
              pROJECT_ID: record.pROJECT_ID,
              nAME: record.nAME,
              fEE_AUTHORIZE: record.fEE_AUTHORIZE,
              cHARGER_NAME: record.cHARGER_NAME,
              cHARGER_ACCOUNT: record.cHARGER_ACCOUNT,
              uNIT_NAME: record.uNIT_NAME,
              iNCOME_FEE: record.iNCOME_FEE,
              iNCOME_UNIT_NAME: record.iNCOME_UNIT_NAME,
              iS_SYNC: record.iS_SYNC,
              mAIN_KEY: record.mAIN_KEY,
              sMARK: record.sMARK,
              cLR_DATE: record.cLR_DATE,
              sUBJ: record.sUBJ,
              uNIT_CODE: record.uNIT_CODE,
              cLR_ORDER: record.cLR_ORDER,
              uNI_NO: record.uNI_NO,
              rECORD_NO: record.rECORD_NO,
              sABSTRACT: record.sABSTRACT,
              j_AMOUNT: record.j_AMOUNT,
              d_AMOUNT: record.d_AMOUNT,
              oPERATE: record.oPERATE,
              uNI_PRJ_ORDER: record.uNI_PRJ_ORDER,
              cLRSNO: record.cLRSNO,
              jF_AMT: record.jF_AMT,
              dZ_AMT: record.dZ_AMT,
              fPHM: record.fPHM,
              fPDM: record.fPDM,
              kPRQ: record.kPRQ,
              kPJE: record.kPJE,
              kPSE: record.kPSE
            }
          )
        }, 100)
        this.form.getFieldDecorator('iNCOME_DATE', { initialValue: moment(record.iNCOME_DATE, 'YYYY-MM-DD') })
        this.iNCOME_DATEDateString = moment(record.iNCOME_DATE).format('YYYY-MM-DD')
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
            values.iNCOME_DATE = this.iNCOME_DATEDateString
            keyanincomeEdit(values).then((res) => {
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
      onChangeiNCOME_DATE(date, dateString) {
        this.iNCOME_DATEDateString = dateString
      },
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>

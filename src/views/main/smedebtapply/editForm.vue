<template>
  <a-modal
    title="编辑清欠台账"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-show="false"><a-input v-decorator="['id']" /></a-form-item>
        <a-form-item label="合同日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-date-picker style="width: 100%" placeholder="请选择合同日期" v-decorator="['contractdate']" @change="onChangecontractdate"/>
        </a-form-item>
        <a-form-item label="债务企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入债务企业名称" v-decorator="['debtcompname']" />
        </a-form-item>
        <a-form-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目名称" v-decorator="['projname']" />
        </a-form-item>
        <a-form-item label="项目金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入项目金额" style="width: 100%" v-decorator="['projamt']" />
        </a-form-item>
        <a-form-item label="欠款金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入欠款金额" style="width: 100%" v-decorator="['debtamt']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import {
    smedebtapplyEdit
  } from '@/api/modular/main/smedebtapplyManage'
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
        contractdateDateString: '',
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
              id: record.id,
              debtcompname: record.debtcompname,
              projname: record.projname,
              projamt: record.projamt,
              debtamt: record.debtamt
            }
          )
        }, 100)
        this.form.getFieldDecorator('contractdate', { initialValue: moment(record.contractdate, 'YYYY-MM-DD') })
        this.contractdateDateString = moment(record.contractdate).format('YYYY-MM-DD')
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
            values.contractdate = this.contractdateDateString
            smedebtapplyEdit(values).then((res) => {
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
      onChangecontractdate(date, dateString) {
        this.contractdateDateString = dateString
      },
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>

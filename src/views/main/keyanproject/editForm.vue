<template>
  <a-modal
    title="编辑科研系统项目"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="项目类型名称" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入项目类型名称" v-decorator="['project_class']" />
        </a-form-item>
        <a-form-item label="项目类型编号" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入项目类型编号" v-decorator="['subject_class_id']" />
        </a-form-item>
        <a-form-item label="项目批准号" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入项目批准号" v-decorator="['code']" />
        </a-form-item>
        <a-form-item label="项目名称" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入项目名称" v-decorator="['name']" />
        </a-form-item>
        <a-form-item label="项目金额" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入项目金额" v-decorator="['fee_authorize']" />
        </a-form-item>
        <a-form-item label="负责人姓名" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入负责人姓名" v-decorator="['charger_name']" />
        </a-form-item>
        <a-form-item label="负责人职工号" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入负责人职工号" v-decorator="['charger_account']" />
        </a-form-item>
        <a-form-item label="负责人类型" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入负责人类型" v-decorator="['charger_type']" />
        </a-form-item>
        <a-form-item label="单位名称" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入单位名称" v-decorator="['unit_name']" />
        </a-form-item>
        <a-form-item label="已到账经额" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入已到账经额" v-decorator="['receive_fee']" />
        </a-form-item>
        <a-form-item label="未到账金额" :labelcol="labelcol" :wrappercol="wrappercol" has-feedback>
          <a-input placeholder="请输入未到账金额" v-decorator="['no_receive_fee']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {
    keyanprojectEdit
  } from '@/api/modular/main/keyanprojectManage'
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
      edit (record) {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              project_class: record.project_class,
              subject_class_id: record.subject_class_id,
              code: record.code,
              name: record.name,
              fee_authorize: record.fee_authorize,
              charger_name: record.charger_name,
              charger_account: record.charger_account,
              charger_type: record.charger_type,
              unit_name: record.unit_name,
              receive_fee: record.receive_fee,
              no_receive_fee: record.no_receive_fee
            }
          )
        }, 100)
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
            keyanprojectEdit(values).then((res) => {
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
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>

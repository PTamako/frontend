<template>
  <a-modal
    title="新增科研系统项目"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="项目类型名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目类型名称" v-decorator="['pROJECT_CLASS']" />
        </a-form-item>
        <a-form-item label="项目类型编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目类型编号" v-decorator="['sUBJECT_CLASS_ID']" />
        </a-form-item>
        <a-form-item label="项目批准号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目批准号" v-decorator="['cODE']" />
        </a-form-item>
        <a-form-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目名称" v-decorator="['nAME']" />
        </a-form-item>
        <a-form-item label="项目金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目金额" v-decorator="['fEE_AUTHORIZE']" />
        </a-form-item>
        <a-form-item label="负责人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入负责人姓名" v-decorator="['cHARGER_NAME']" />
        </a-form-item>
        <a-form-item label="负责人职工号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入负责人职工号" v-decorator="['cHARGER_ACCOUNT']" />
        </a-form-item>
        <a-form-item label="负责人类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入负责人类型" v-decorator="['cHARGER_TYPE']" />
        </a-form-item>
        <a-form-item label="单位名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入单位名称" v-decorator="['uNIT_NAME']" />
        </a-form-item>
        <a-form-item label="已到账经额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入已到账经额" v-decorator="['rECEIVE_FEE']" />
        </a-form-item>
        <a-form-item label="未到账金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入未到账金额" v-decorator="['nO_RECEIVE_FEE']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {
    keyanprojectAdd
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
            keyanprojectAdd(values).then((res) => {
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

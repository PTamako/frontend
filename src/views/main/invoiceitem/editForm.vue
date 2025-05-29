<template>
  <a-modal
    title="编辑财务开票项目"
    :placement="left"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="主键Id" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入主键Id" v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="发票项目类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择发票项目类型" v-decorator="['itemtype', {rules: [{ required: true, message: '请选择发票项目类型！' }]}]">
            <a-select-option v-for="(item,index) in itemtypeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="发票项目编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票项目编号" v-decorator="['itemid', {rules: [{required: true, message: '请输入发票项目编号！'}]}]" />
        </a-form-item>
        <a-form-item label="税收分类编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入税收分类编码" v-decorator="['taxcode', {rules: [{required: true, message: '请输入税收分类编码！'}]}]" />
        </a-form-item>
        <a-form-item label="发票项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票项目名称" v-decorator="['itemname', {rules: [{required: true, message: '请输入发票项目名称！'}]}]" />
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备注" v-decorator="['itemdesc']" />
        </a-form-item>
        <a-form-item label="税率" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入税率" style="width: 100%" v-decorator="['taxrate', {rules: [{required: true, message: '请输入税率！'}]}]" />
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入状态" v-decorator="['workflg']" />
        </a-form-item>
        <a-form-item label="显示顺序" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入显示顺序" style="width: 100%" v-decorator="['sortid', {rules: [{required: true, message: '请输入显示顺序！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {
    invoiceitemEdit
  } from '@/api/modular/main/invoiceitemManage'
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
        itemtypeData: [],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      edit (record) {
        this.visible = true
        const itemtypeOption = this.$options
        this.itemtypeData = itemtypeOption.filters['dictData']('menu_type')
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              id: record.id,
              itemtype: record.itemtype.toString(),
              itemid: record.itemid,
              taxcode: record.taxcode,
              itemname: record.itemname,
              itemdesc: record.itemdesc,
              taxrate: record.taxrate,
              workflg: record.workflg,
              sortid: record.sortid
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
            invoiceitemEdit(values).then((res) => {
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

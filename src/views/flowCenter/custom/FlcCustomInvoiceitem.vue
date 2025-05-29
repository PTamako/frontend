<template>
    <a-spin :spinning="formLoading">
      <a-form :form="form">
        <a-form-item label="主键Id"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入主键Id" :disabled="disabled" v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="发票项目编号"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票项目编号" :disabled="disabled" v-decorator="['itemid', {rules: [{required: true, message: '请输入发票项目编号！'}]}]" />
        </a-form-item>
        <a-form-item label="税收分类编码"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入税收分类编码" :disabled="disabled" v-decorator="['taxcode', {rules: [{required: true, message: '请输入税收分类编码！'}]}]" />
        </a-form-item>
        <a-form-item label="发票项目名称"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入发票项目名称" :disabled="disabled" v-decorator="['itemname', {rules: [{required: true, message: '请输入发票项目名称！'}]}]" />
        </a-form-item>
        <a-form-item label="备注"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备注" :disabled="disabled" v-decorator="['itemdesc']" />
        </a-form-item>
        <a-form-item label="税率"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入税率" :disabled="disabled" style="width: 100%" v-decorator="['taxrate', {rules: [{required: true, message: '请输入税率！'}]}]" />
        </a-form-item>
        <a-form-item label="状态"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入状态" :disabled="disabled" v-decorator="['workflg']" />
        </a-form-item>
        <a-form-item label="显示顺序"  :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input-number placeholder="请输入显示顺序" :disabled="disabled" style="width: 100%" v-decorator="['sortid', {rules: [{required: true, message: '请输入显示顺序！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
</template>
<script>
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
        name : null,
        visible: false,
        confirmLoading: false,
        formLoading: false,
        disabled:false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      setData(record)
      {
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              id:record.id,
              id:record.id,
              itemid:record.itemid,
              taxcode:record.taxcode,
              itemname: record.itemname,
              itemdesc: record.itemdesc,
              taxrate: record.taxrate,
              workflg: record.workflg,
              sortid: record.sortid
            }
          )
        }, 100)
      },
      disable(record)
      {
        this.disabled = true;
      },
      getData () {
        return new Promise((resolve, reject) => {
          try {
            const { form: { validateFields } } = this
            validateFields((errors, values) => {
              if (!errors) {
                resolve(values);
              } else {
                reject(errors);
              }
            })
          } catch (err) {
            reject(err);
          }
        });
      },
    }
  }
</script>

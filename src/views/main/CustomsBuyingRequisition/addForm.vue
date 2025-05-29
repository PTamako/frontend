<template>
  <a-modal
    title="新增采购申请"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="流程ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入流程ID" v-decorator="['flowInstanceId']" />
        </a-form-item>
        <a-form-item label="部门ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入部门ID" v-decorator="['orgid']" />
        </a-form-item>
        <a-form-item label="部门名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入部门名称" v-decorator="['orgName']" />
        </a-form-item>
        <a-form-item label="需求人ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入需求人ID" v-decorator="['requireUserId']" />
        </a-form-item>
        <a-form-item label="需求人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入需求人姓名" v-decorator="['requireUserName']" />
        </a-form-item>
        <a-form-item label="需求部门ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入需求部门ID" v-decorator="['requiredOrgid']" />
        </a-form-item>
        <a-form-item label="需求部门名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入需求部门名称" v-decorator="['requiredOrgName']" />
        </a-form-item>
        <a-form-item label="执行部门ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入执行部门ID" v-decorator="['executiveOrgid']" />
        </a-form-item>
        <a-form-item label="执行部门名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入执行部门名称" v-decorator="['executiveOrgName']" />
        </a-form-item>
        <a-form-item label="填写人ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入填写人ID" v-decorator="['userId']" />
        </a-form-item>
        <a-form-item label="填写人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入填写人姓名" v-decorator="['userName']" />
        </a-form-item>
        <a-form-item label="采购类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group placeholder="请选择采购类型" v-decorator="['buyingType']" >
            <a-radio v-for="(item,index) in  buyingTypeData" :key="index" :value="item.code">{{ item.name }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="采购方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-checkbox-group placeholder="请选择采购方式" v-decorator="['buyingMethods']" >
            <a-checkbox v-for="(item,index) in buyingMethodsData" :key="index" :value="item.code">{{ item.name }}</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="合计金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入合计金额" v-decorator="['amountTotal']" />
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备注" v-decorator="['expenseDesc']" />
        </a-form-item>
        <a-form-item label="流程" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择流程" v-decorator="['stageFlg']" >
            <a-select-option v-for="(item,index) in  stageFlgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入状态" v-decorator="['workFlg']" />
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
    CustomsBuyingRequisitionAdd
  } from '@/api/modular/main/CustomsBuyingRequisitionManage'

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
        buyingTypeData: [],
        buyingMethodsData: [],
        stageFlgData: [],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        const buyingTypeOption = this.$options
        this.buyingTypeData = buyingTypeOption.filters['dictData']('vis_type')
        const buyingMethodsOption = this.$options
        this.buyingMethodsData = buyingMethodsOption.filters['dictData']('vis_type')
        const stageFlgOption = this.$options
        this.stageFlgData = stageFlgOption.filters['dictData']('vis_type')
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
            CustomsBuyingRequisitionAdd(values).then((res) => {
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

<template>
  <a-modal
    title="编辑经费认领"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="科研系统项目ID" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入科研系统项目ID" v-decorator="['relateid_keyan']" />
        </a-form-item>
        <a-form-item label="科研系统同步标记" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择科研系统同步标记" v-decorator="['syncflg_keyan']">
            <a-select-option v-for="(item,index) in syncflg_keyanData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="财务系统同步标记" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择财务系统同步标记" v-decorator="['syncflg_caiwu']">
            <a-select-option v-for="(item,index) in syncflg_caiwuData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="项目负责人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目负责人" v-decorator="['project_manager']" />
        </a-form-item>
        <a-form-item label="项目经办人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目经办人" v-decorator="['project_operator']" />
        </a-form-item>
        <a-form-item label="预借票据标记" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入预借票据标记" v-decorator="['lendinvoiceflg']" />
        </a-form-item>
        <a-form-item label="预借票据金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入预借票据金额" v-decorator="['lendinvoiceamount']" />
        </a-form-item>
        <a-form-item label="预借票据号码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入预借票据号码" v-decorator="['lendinvoicenumber']" />
        </a-form-item>
        <a-form-item label="文号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入文号" v-decorator="['docid']" />
        </a-form-item>
        <a-form-item label="项目代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目代码" v-decorator="['projectcode']" />
        </a-form-item>
        <a-form-item label="需要发票标记" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入需要发票标记" v-decorator="['needinvoice']" />
        </a-form-item>
        <a-form-item label="项目管理部门" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目管理部门" v-decorator="['projdeptid']" />
        </a-form-item>
        <a-form-item label="项目管理名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目管理名称" v-decorator="['projdeptname']" />
        </a-form-item>
        <a-form-item label="项目类别" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目类别" v-decorator="['projtype']" />
        </a-form-item>
        <a-form-item label="项目码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入项目码" v-decorator="['projcode']" />
        </a-form-item>
        <a-form-item label="申请标题" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入申请标题" v-decorator="['applytitle']" />
        </a-form-item>
        <a-form-item label="申请描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入申请描述" v-decorator="['applydesc']" />
        </a-form-item>
        <a-form-item label="相关到账ID 财务系统" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入相关到账ID 财务系统" v-decorator="['relateid']" />
        </a-form-item>
        <a-form-item label="相关到账名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入相关到账名称" v-decorator="['relatetitle']" />
        </a-form-item>
        <a-form-item label="申请金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入申请金额" v-decorator="['apply_amount']" />
        </a-form-item>
        <a-form-item label="财务确认金额" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入财务确认金额" v-decorator="['confirm_amount']" />
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择状态" v-decorator="['workflg']">
            <a-select-option v-for="(item,index) in workflgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="申请单位编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入申请单位编号" v-decorator="['deptid']" />
        </a-form-item>
        <a-form-item label="申请单位名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入申请单位名称" v-decorator="['deptname']" />
        </a-form-item>
        <a-form-item label="流程状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" placeholder="请选择流程状态" v-decorator="['stageflg']">
            <a-select-option v-for="(item,index) in stageflgData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="预借票据channelcode" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入预借票据channelcode" v-decorator="['lendchannelcode']" />
        </a-form-item>
        <a-form-item label="预借票据invoicecode" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入预借票据invoicecode" v-decorator="['lendinvoicecode']" />
        </a-form-item>
        <a-form-item label="预借日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入预借日期" v-decorator="['lenddate']" />
        </a-form-item>
        <a-form-item label="预借票据状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入预借票据状态" v-decorator="['lendupdateflg']" />
        </a-form-item>
        <a-form-item label="核销代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入核销代码" v-decorator="['hxcode']" />
        </a-form-item>
        <a-form-item label="处理凭证号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入处理凭证号" v-decorator="['voucherno']" />
        </a-form-item>
        <a-form-item label="备用字段1" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备用字段1" v-decorator="['str1']" />
        </a-form-item>
        <a-form-item label="备用字段2" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备用字段2" v-decorator="['str2']" />
        </a-form-item>
        <a-form-item label="备用字段3" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
          <a-input placeholder="请输入备用字段3" v-decorator="['str3']" />
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
    bankrollapplyEdit
  } from '@/api/modular/main/bankrollapplyManage'
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
        syncflg_keyanData: [],
        syncflg_caiwuData: [],
        workflgData: [],
        stageflgData: [],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      edit (record) {
        this.visible = true
        this.syncflg_keyanData = this.$options.filters['dictData']('yes_or_no')
        this.syncflg_caiwuData = this.$options.filters['dictData']('yes_or_no')
        this.workflgData = this.$options.filters['dictData']('vis_type')
        this.stageflgData = this.$options.filters['dictData']('vis_type')
        setTimeout(() => {         
          this.form.setFieldsValue(
            {
              relateid_keyan: record.relateid_keyan,
              syncflg_keyan: record.syncflg_keyan.toString(),
              syncflg_caiwu: record.syncflg_caiwu.toString(),
              project_manager: record.project_manager,
              project_operator: record.project_operator,
              lendinvoiceflg: record.lendinvoiceflg,
              lendinvoiceamount: record.lendinvoiceamount,
              lendinvoicenumber: record.lendinvoicenumber,
              docid: record.docid,
              projectcode: record.projectcode,
              needinvoice: record.needinvoice,
              projdeptid: record.projdeptid,
              projdeptname: record.projdeptname,
              projtype: record.projtype,
              projcode: record.projcode,
              applytitle: record.applytitle,
              applydesc: record.applydesc,
              relateid: record.relateid,
              relatetitle: record.relatetitle,
              apply_amount: record.apply_amount,
              confirm_amount: record.confirm_amount,
              workflg: record.workflg.toString(),
              deptid: record.deptid,
              deptname: record.deptname,
              stageflg: record.stageflg.toString(),
              lendchannelcode: record.lendchannelcode,
              lendinvoicecode: record.lendinvoicecode,
              lenddate: record.lenddate,
              lendupdateflg: record.lendupdateflg,
              hxcode: record.hxcode,
              voucherno: record.voucherno,
              str1: record.str1,
              str2: record.str2,
              str3: record.str3,
              id: record.id
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
            bankrollapplyEdit(values).then((res) => {
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

<template>
  <a-card v-show="applyStep2Show" :width="900" :confirmLoading="confirmLoading" @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-divider orientation="left">1、未核销往来账</a-divider>
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="到款往来标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input disabled="disabled" placeholder="请输入到款往来标识" v-decorator="['relateid']"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="到款往来辅助标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input disabled="disabled" placeholder="请输入到款往来辅助标识" v-decorator="['smark']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="往来日期" disabled="disabled" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-date-picker disabled="disabled" style="width: 100%" placeholder="请选择往来日期" v-decorator="['clr_date']"
                @change="onChangeclr_date" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24"><a-form-item label="往来单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input disabled="disabled" placeholder="请输入往来单位" v-decorator="['unit_code']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="摘要" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input disabled="disabled" placeholder="请输入摘要" v-decorator="['applytitle']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="原始到账金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number disabled="disabled" style="width: 100%" v-decorator="['dz_amt']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">2、认领信息</a-divider>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                  <a-tooltip title="可认领金额说明">
                    <a-icon type="question-circle-o" />
                  </a-tooltip>&nbsp;
                  可认领金额
                </span>
              <a-input-number disabled="disabled" style="width: 100%" v-decorator="['amt_canapply']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span slot="label">
                  <a-tooltip
                    title="本次认领金额说明">
                    <a-icon type="question-circle-o" />
                  </a-tooltip>&nbsp;
                  本次认领金额
                </span>
              <a-input-number placeholder="请输入本次认领金额" style="width: 100%" 
                v-decorator="['apply_amount', { rules: [{ required: true, message: '请输入本次认领金额！' }] }]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form :form="form">
              <a-form-item label="项目管理部门" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
                <a-tree-select v-decorator="['projdeptid', { rules: [{ required: true, message: '请选择项目管理部门！' }] }]"
                  style="width: 100%" :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }" :treeData="orgTree"
                  placeholder="请选择项目管理部门" treeDefaultExpandAll @change="e => initrOrgName(e)">
                  <span slot="title" slot-scope="{ id }">{{ id }}</span>
                </a-tree-select>
              </a-form-item>
              <a-form-item v-show="false">
                <a-input v-decorator="['projdeptname']" />
              </a-form-item>
            </a-form>
          </a-col>          
          <a-col :md="12" :sm="24">
            <a-form-item label="项目负责人教工号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入项目负责人教工号"  v-decorator="['project_manager', { rules: [{ required: true, message: '请输入项目负责人教工号！' }] }]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24" v-show="visibleProjectType">
            <a-form-item label="科研项目" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请选择科研项目" disabled="disabled"  v-decorator="['relateid_keyan']">
                <a-icon slot="addonAfter" @click="setProject()" type="search" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="项目类型" v-show="visibleProjectType" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select style="width: 100%" placeholder="请选择项目类型"
                v-decorator="['projtype', { rules: [{ required: visibleProjectType, message: '请选择取所属分类！' }] }]">
                <a-select-option v-for="(item, index) in projTypeData" :key="index" :value="item.code">{{ item.value
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>        
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="项目代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="填写项目代码" v-decorator="['projectcode']"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="项目管理部门经办人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="填写项目所在部门经办人教工号，若无则留空"  v-decorator="['project_operator']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">3、发票信息</a-divider>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否已预借票据">
              <a-radio-group v-decorator="['lendinvoiceFlg', { rules: [{ required: true, message: '请选择！' }] }]">
                <a-radio v-for="(item, index) in yesornoData" :key="index" :value="item.code"
                  @click="lendinvoiceFunc(item.code)">{{ item.value }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24" v-show="visibleLendInvoice">
            <a-form-item label="预借发票号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请选择预借发票" disabled="disabled"  v-decorator="['lendinvoicenumber']">
                <a-icon slot="addonAfter" @click="setLendInvoice()" type="search" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-show="visibleLendInvoice">
          <a-col :md="12" :sm="24">
            <a-form-item label="预借发票金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请填写预借发票金额" disabled="disabled" v-decorator="['lendinvoiceamount']">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="预借发票抬头" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请填写发票票据抬头" disabled="disabled" v-decorator="['lendinvoicetitle']">
              </a-input>
            </a-form-item>
            <a-form-item v-show="false">
                <a-input v-decorator="['lendchannelcode']" /> <a-input v-decorator="['lendinvoicecode']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-show="visibleLendInvoice">
          <a-col :md="12" :sm="24">
            <a-form-item label="预借日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请填写预借日期" disabled="disabled" v-decorator="['lenddate']">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否需要发票">
              <a-radio-group v-decorator="['needinvoice', { rules: [{ required: true, message: '请选择！' }] }]">
                <a-radio v-for="(item, index) in yesornoData" :key="index" :value="item.code"
                  @click="needinvoiceFunc(item.code)">{{ item.value }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24" v-show="visibleNeedInvoice">
            <a-form-item label="发票抬头" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请选择开票信息！"
              v-decorator="['invoice.invoicetitle', { rules: [{ required: needinvoiceRequired, min: 1, message: '请输入发票抬头！' }] }]">
                <a-icon slot="addonAfter" @click="setInvoiceTitle()" type="search" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-show="visibleNeedInvoice">
          <a-col :md="12" :sm="24">
            <a-form-item label="开具类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width: 100%" placeholder="请选择发票类型"
                v-decorator="['invoice.customertype', { rules: [{ required: needinvoiceRequired, message: '请选择！' }] }]">
                <a-select-option v-for="(item, index) in customertypeData" :key="index" :value="item.code">{{ item.value}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="税务登记证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请填写税务登记证号" 
                v-decorator="['invoice.taxpayerid', { rules: [{ required: needinvoiceRequired, min: 1, message: '请输入税务登记证号！' }] }]">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-show="visibleNeedInvoice">
          <a-col :md="12" :sm="24">
            <a-form-item label="发票类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width: 100%" placeholder="请选择发票类型"
                v-decorator="['invoice.invoicetype', { rules: [{ required: needinvoiceRequired, message: '请选择！' }] }]">
                <a-select-option v-for="(item, index) in invoicetypeData" :key="index" :value="item.code">{{ item.value
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开票项目" has-feedback>
              <a-select style="width: 100%" placeholder="请选择开票项目"
                v-decorator="['invoice.invoiceitem', { rules: [{ required: needinvoiceRequired, message: '请选择开票项目！' }] }]">
                <a-select-option v-for="(item, index) in invoiceitemData" :key="index" :value="item.itemid">{{
                  item.itemname }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

        </a-row>
        <a-row :gutter="24" v-show="visibleNeedInvoice">
          <a-col :md="12" :sm="24">
            <a-form :form="form">
              <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
                <a-input placeholder="请输入邮箱" v-decorator="['invoice.user_mail', { rules: [{ required: needinvoiceRequired, message: '请输入邮箱！' }] }]" />
              </a-form-item>
            </a-form>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form :form="form">
              <a-form-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
                <a-input placeholder="请输入手机号"
                  v-decorator="['invoice.linkphone', { rules: [{ required: needinvoiceRequired, message: '请输入手机号！' }] }]" />
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <a-form :form="form">
              <a-form-item label="备注" :labelCol="labelCol_JG" :wrapperCol="wrapperCol_JG" has-feedback>
                <a-textarea :rows="2" placeholder="请输入备注" v-decorator="['applydesc']" style="width:100%"></a-textarea>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>       


        <a-divider orientation="left"></a-divider>
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <div class="table-operator">
              <a-button class="but_item" type="dashed" @click="handleCancel" icon="rollback">返回</a-button>
              <a-button type="primary" icon="plus" @click="handleSubmit">提交</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>

    <project-list-form ref="projectListForm" @projectOK="handleSelProject" />
    <invoicetitle-list-form ref="invoicetitleListForm" @invoicetitleOK="handleSelInvoiceTitle" />
    <lendinovice-list-form ref="lendinoviceListForm" @lendinvoiceOK="handleSelLendInvoice" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { getOrgTree, getOrgList } from '@/api/modular/system/orgManage'
import { sysDictTypeDropDown } from '@/api/modular/system/dictManage'
import { bankrollapplyAdd,amtofapplying } from '@/api/modular/main/bankrollapplyManage'
import { invoiceitemList } from '@/api/modular/main/invoiceitemManage'

import projectListForm from '@/views/main/keyanproject/projectListForm'
import invoicetitleListForm from '@/views/main/invoicetitle/invoicetitleListForm'
import lendinoviceListForm from '@/views/main/invoice/lendinvoiceListForm'

export default {
  components: { projectListForm, invoicetitleListForm, lendinoviceListForm },

  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelCol_JG: {
        xs: {
          span: 24
        },
        sm: {
          span: 3
        }
      },
      wrapperCol_JG: {
        xs: {
          span: 24
        },
        sm: {
          span: 15
        }
      },
      visibleIcon: false,
      orgTree: [],
      orgList: [],
      projTypeData: [],
      applyStep2Show: false,
      visibleProjectType:false,
      visibleLendInvoice: false,
      visibleNeedInvoice: false,
      clr_dateDateString: '',
      oPERATEDateString: '',
      lastupd_dttmDateString: '',
      confirmLoading: false,
      //科研项目信息变量
      //relateid_keyan: '',
      //relatename_keyan: '',
      projectcode: '',
      project_manager: '',
      //预借票据变量
      //lendinvoicenumber: '',
      //lendinvoiceamount: '',
      //lendinvoicetitle: '',
      //lenddate:'',
      //发票信息变量
      invoiceTitleTitle:'',
      customerType:'',
      invoicetype:'',
      taxpayerid:'',
      user_mail:'',
      linkmobile:'',
      //在途认领金额
      amt_applying:'',
      //可认领金额
      //apply_amount:0,

      yesornoData: [],
      customertypeData: [],
      invoicetypeData: [],
      invoiceitemData: [],
      needinvoice: 'N',
      lendinoviceFlg: '',
      needinvoiceRequired: false,
      lendinvoiceRequired: false,
      nextMakerName: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
    // 初始化方法
    open(record) {
      this.applyStep2Show = true
      this.getOrgDate()
      
      this.form.setFieldsValue(
        {
          relateid: record.main_key,
          smark: record.smark,
          unit_code: record.unit_code,
          uni_no: record.uni_no,
          applytitle: record.sabstract,
          dz_amt: record.dz_amt
        }
      )
     
      this.lendinvoiceFunc('N')
      this.needinvoiceFunc('N')
      this.getInvoiceItemlist()

      this.form.getFieldDecorator('clr_date', { initialValue: moment(record.clr_date, 'YYYY-MM-DD') })
      this.clr_dateDateString = moment(record.clr_date).format('YYYY-MM-DD')
      this.form.getFieldDecorator('operate', { initialValue: moment(record.operate, 'YYYY-MM-DD') })
      this.oPERATEDateString = moment(record.operate).format('YYYY-MM-DD')
      this.form.getFieldDecorator('lastupd_dttm', { initialValue: moment(record.lastupd_dttm, 'YYYY-MM-DD') })
      this.lastupd_dttmDateString = moment(record.lastupd_dttm).format('YYYY-MM-DD')

      this.sysDictTypeDropDown()
      this.getAmtOfApplying(record) 
    },
    /**
     * 获取字典数据
     */
    sysDictTypeDropDown() {
      this.formLoading = true
      // 项目类型
      sysDictTypeDropDown({ code: 'projtype' }).then((res) => {
        this.projTypeData = res.data
      })
      // 是否
      sysDictTypeDropDown({ code: 'yes_or_no' }).then((res) => {
        this.yesornoData = res.data
      })
      // 开具类型
      sysDictTypeDropDown({ code: 'customertype' }).then((res) => {
        this.customertypeData = res.data
      })
      // 发票类型
      sysDictTypeDropDown({ code: 'invoicetype' }).then((res) => {
        this.invoicetypeData = res.data
      })
    },

    /**
     * 获取机构树，并加载于表单中
     */
    getOrgDate() {
      getOrgTree().then((res) => {
        this.orgTree = res.data
      })
      getOrgList().then((res) => {
        this.orgList = res.data
      })
    },
    /**
     * 选择树机构，初始化机构名称于表单中
     */
    initrOrgName(value) {
      var tmpOrgName = this.orgList.find(item => value === item.id).name
      this.form.getFieldDecorator('projdeptname', { initialValue:tmpOrgName})
      this.visibleProjectType = tmpOrgName=="科技处"
    },
    getInvoiceItemlist() {
      return invoiceitemList().then((res) => {
        if (res.success) {
          this.invoiceitemData = res.data
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    getAmtOfApplying(record) {
      var queryParam = {'mainkey': record.main_key.toString()}
      amtofapplying(queryParam).then((res) => {
        if (res.success) {
          this.amt_applying = res.data
          var tmpCanApply = record.jf_amt - parseInt(this.amt_applying)
          if(tmpCanApply<1){
            this.$message.warning("此笔到账无可领金额，请确认")
            this.handleCancel()
          }else{
            this.form.getFieldDecorator('amt_canapply', { initialValue: tmpCanApply})
            this.form.getFieldDecorator('apply_amount', { initialValue: tmpCanApply}) 
            this.$forceUpdate()
          }
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    setProject() {
      this.$refs.projectListForm.projectList();
    },

    //确认回调-选择项目
    handleSelProject(record) {
      if (!!record) {
        if (record.length == 1) {
          this.form.setFieldsValue(
          {
            relatename_keyan : record[0].name,
            relateid_keyan : record[0].id,
            projectcode : record[0].code,
            project_manager : record[0].charger_account
          }
        )}
      }
    },

    setInvoiceTitle() {
      this.$refs.invoicetitleListForm.invoicetitleList();
    },
     //确认回调-选择开票信息
    handleSelInvoiceTitle(record) {
      if (!!record) {
        if (record.length >0) {
            this.invoiceTitleTitle = record[0].invoiceTitle
            this.taxpayerid = record[0].taxpayerid
            this.user_mail = record[0].user_mail
            this.linkmobile = record[0].linkmobile
            this.customertype = record[0].customerType
            this.invoicetype = record[0].invoicetype
            this.form.getFieldDecorator('invoice.taxpayerid', { initialValue: this.taxpayerid })
            this.form.getFieldDecorator('invoice.user_mail', { initialValue: this.user_mail })          
            this.form.getFieldDecorator('invoice.linkphone', { initialValue: this.linkmobile })
            this.form.getFieldDecorator('invoice.customertype', { initialValue: this.customertype})
            this.form.getFieldDecorator('invoice.invoicetype', { initialValue: this.invoicetype})
            this.form.getFieldDecorator('invoice.invoicetitle', { initialValue: this.invoiceTitleTitle }) 
            this.$forceUpdate()
        }
      }
    },

    setLendInvoice() {
      this.$refs.lendinoviceListForm.lendinvoiceList();
    },
    handleSelLendInvoice(record) {
      if (!!record) {
        if (record.length == 1) {
          this.form.setFieldsValue({
            lendinvoicenumber : record[0].invoiceNumber,
            lendinvoiceamount : record[0].totalAmount,
            lendinvoicetitle : record[0].payerPartyName,
            lenddate : record[0].issueDate,
            lendchannelcode : record[0].fkChannelCode,
            lendinvoicecode : record[0].invoiceCode,
          })        
        }
      }
    },

    /**
     * 选择菜单类型执行初始化表单变量
     */
    lendinvoiceFunc(type) {
      this.lendinvoiceFlg = type
      this.visibleLendInvoice = type == "Y"
      this.lendinvoiceRequired = type == "Y"

      this.form.getFieldDecorator('lendinvoiceFlg', { initialValue: this.lendinvoiceFlg = 'N' })
    },
    /**
     * 选择菜单类型执行初始化表单变量
     */
    needinvoiceFunc(type) {
      this.needinvoice = type
      this.visibleNeedInvoice = type == "Y"
      this.needinvoiceRequired = type == "Y"
      this.form.getFieldDecorator('needinvoice', { initialValue: this.needinvoice = 'N' })
    },

    handleSubmit() {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          // for (const key in values) {
          //   if (typeof (values[key]) === 'object' && !(values[key] === null)) {
          //     values[key] = JSON.stringify(values[key])
          //   }
          // }
          values.clr_date = this.clr_dateDateString
          values.operate = this.oPERATEDateString
          values.lastupd_dttm = this.lastupd_dttmDateString
          bankrollapplyAdd(values).then((res) => {
            if (res.success) {
              this.$message.success('提交成功')
              this.confirmLoading = false
              this.$emit('ok', values)
              this.handleCancel()
            } else {
              this.$message.error('提交失败')//  + res.message
            }
          }).finally((res) => {
            this.confirmLoading = false
            applyStep1OpenShow = true
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
    onChangelastupd_dttm(date, dateString) {
      this.lastupd_dttmDateString = dateString
    },
    handleCancel() {
      this.form.resetFields()
      this.applyStep2Show = false
      this.$emit('ok')
    }
  }
}
</script>

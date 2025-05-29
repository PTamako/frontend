<template>
  <a-modal
    :title="'审核经费认领：'+s_applytitle"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-tabs :default-active-key="defaultActive">
          <a-tab-pane key="1" tab="申请信息" :force-Render="true">
            <a-row :gutter="24">
              <a-col :md="24" :sm="24">
                  <table class="sysInfo_table">
                    <tr>
                      <td width="14%" class="sysInfo_td">申领金额</td>
                      <td width="36%" class="sysInfo_td">{{ this.s_apply_amount }} </td>
                      <td width="14%" class="sysInfo_td">申请人</td>
                      <td width="36%" class="sysInfo_td">{{ this.s_applyusername }} - {{ this.s_applyuser }}  </td>
                    </tr>
                    <tr>
                      <td class="sysInfo_td">申请时间</td>
                      <td class="sysInfo_td">{{ this.s_inputtimeDateString }} </td>
                      <td class="sysInfo_td">当前状态</td>
                      <td class="sysInfo_td"> {{ 'njucm161' | dictType(this.s_stageflg) }}</td>
                    </tr>
                    <tr>
                      <td class="sysInfo_td">项目管理部门</td>
                      <td class="sysInfo_td">{{ this.s_projdeptname }} </td>
                      <td class="sysInfo_td">项目管理部门经办人</td>
                      <td class="sysInfo_td">{{ this.s_project_operator }} </td>
                    </tr>
                    <tr>
                      <td class="sysInfo_td">项目负责人教工号</td>
                      <td class="sysInfo_td">{{ this.s_project_manager }} </td>
                      <td class="sysInfo_td">对应科研项目</td>
                      <td class="sysInfo_td">{{ this.s_applytitle }} </td>
                    </tr>
                    <tr>
                      <td class="sysInfo_td">项目代码</td>
                      <td class="sysInfo_td">{{ this.s_projectcode }} </td>
                      <td class="sysInfo_td">项目类型</td>
                      <td class="sysInfo_td">
                        {{ 'projtype' | dictType(this.s_projtype) }}
                      </td>
                    </tr>
                  </table>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="3" tab="发票信息" :force-Render="true">
            <a-row :gutter="24">
              <a-col :md="24" :sm="24">
                <table class="sysInfo_table">
                  <tr>
                      <td width="14%" class="sysInfo_td">是否已预借票据</td>
                      <td width="36%" class="sysInfo_td"> {{ 'yes_or_no' | dictType(this.s_lendinvoiceflg) }}</td>
                      <td width="14%" class="sysInfo_td">预借发票号码</td>
                      <td width="36%" class="sysInfo_td">{{ this.s_lendinvoicenumber }}</td>
                  </tr>
                  <tr>
                      <td width="10%" class="sysInfo_td">预借发票金额</td>
                      <td class="sysInfo_td">{{ this.s_lendinvoiceamount }} </td>
                      <td class="sysInfo_td">预借发票抬头</td>
                      <td class="sysInfo_td">{{ this.s_unit_code }} </td>
                  </tr>
                  <tr>
                      <td class="sysInfo_td">是否需要发票</td>
                      <td class="sysInfo_td">{{ 'yes_or_no' | dictType(this.s_needinvoice) }}</td>
                      <td class="sysInfo_td">发票抬头</td>
                      <td class="sysInfo_td">{{ this.s_invoicetitle }} - {{ this.s_taxpayerid }} </td>
                  </tr>
                  <tr>
                      <td class="sysInfo_td">发票类型</td>
                      <td class="sysInfo_td">{{ 'invoicetype' | dictType(this.s_invoicetype) }} </td>
                      <td class="sysInfo_td">开票项目</td>
                      <td class="sysInfo_td">
                        {{ this.s_invoicecontent }}
                      </td>
                  </tr>
                  <tr>
                      <td class="sysInfo_td">开票金额</td>
                      <td class="sysInfo_td">{{ this.s_invoiceamount }} </td>
                      <td class="sysInfo_td">发票状态</td>
                      <td class="sysInfo_td">{{ 'invoicestageflg' | dictType(this.s_invoicestageflg) }} </td>
                  </tr>
                </table>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="4" tab="处理过程" :force-Render="true">
            <s-table
              ref="table"
              :columns="columns"
              :data="loadData"
            >
            </s-table>
          </a-tab-pane>
      </a-tabs>
      <a-divider orientation="left">审核</a-divider>      
      <a-form :form="form">        
        <a-form-item v-show="false">
          <a-input v-decorator="['id']" />
        </a-form-item>
        <a-row :gutter="24" v-show="updateInvoice">
          <a-col :md="12" :sm="24">
            <a-form-item label="发票类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width: 100%" placeholder="请选择发票类型"
                v-decorator="['invoice.invoicetype', { rules: [{ required: updateInvoice, message: '请选择！' }] }]">
                <a-select-option v-for="(item, index) in invoicetypeData" :key="index" :value="item.code">{{ item.value
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开票项目" has-feedback>
              <a-select style="width: 100%" placeholder="请选择开票项目"
                v-decorator="['invoice.invoiceitem', { rules: [{ required: updateInvoice, message: '请选择开票项目！' }] }]">
                <a-select-option v-for="(item, index) in invoiceitemData" :key="index" :value="item.itemid">{{
                  item.itemname }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>        
        <a-row :gutter="24" v-show="updateVoucherNo">
          <a-col :md="12" :sm="24">
            <a-form-item label="处理凭证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请填写处理凭证号"
                v-decorator="['voucherno', { rules: [{ required: updateVoucherNo, min: 1, message: '请输入处理凭证号！' }] }]">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row> 
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol"  label="审核意见">
              <a-radio-group v-decorator="['audittype']">
                <a-radio v-for="(item, index) in audittypeData" :key="index" :value="item.code">{{ item.value }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">           
          </a-col>
        </a-row> 
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <a-form :form="form">
              <a-form-item label="备注" :labelCol="labelCol_JG" :wrapperCol="wrapperCol_JG" has-feedback>
                <a-textarea :rows="2" placeholder="请输入备注" v-decorator="['auditmeno']" style="width:100%"></a-textarea>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>  
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import { STable } from '@/components'
  import { bankrollapplyAudit  } from '@/api/modular/main/bankrollapplyManage'
  import { sysDictTypeDropDown } from '@/api/modular/system/dictManage'  
  import { invoiceitemList } from '@/api/modular/main/invoiceitemManage'  
  // import { sysAuditLogPage } from '@/api/modular/system/logManage'

  export default {
    components: {
      STable
    },
    data () {
      return {
        queryParam: {TableName:record.id.toString(),ColumnName:'bankroll'},
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
        defaultActive:1,
        syncflg_keyanData: [],
        syncflg_caiwuData: [],
        workflgData: [],
        audittypeData:[],
        visible: false,
        confirmLoading: false,

        s_relateid:null,
        s_smark:null,
        s_unit_code:null,
        s_dz_amt:null,
        s_CreatedUserName:null,
        s_inputtimeDateString:null,
        s_applyuser:null,
        s_deptname:null,
        s_stageflg:null,
        s_workflg:null,
        s_applyusername:null,
        s_relateid_keyan :null,
        s_syncflg_keyan :null, 
        s_syncflg_caiwu :null, 
        s_project_manager :null,  
        s_project_operator :null, 
        s_lendinvoiceflg :null,  
        s_lendinvoiceamount :null, 
        s_lendinvoicenumber :null,  
        //发票信息
        s_needinvoice :null,
        s_invoicetitle :null,
        s_taxpayerid:null,
        s_invoicecontent:null,
        s_invoiceamount:null,
        s_invoicetype:null,
        s_invoicestageflg:null,

        s_docid :null, 
        s_projectcode :null, 
        s_projdeptid :null, 
        s_projdeptname :null,  
        s_projtype :null,
        s_projcode :null, 
        s_applytitle :null, 
        s_applydesc :null,  
        s_str3 :null, 
        id :null,  
        s_apply_amount:0,
        s_CreatedUserName:null,
        
        invoicetypeData: [],
        invoiceitemData: [],

        updateInvoice: false,
        updateVoucherNo: false,
        columns: [
          {
            title: '操作信息',
            dataIndex: 'content'
          },
          {
            title: '操作时间',
            dataIndex: 'createdTime'
          },
          {
            title: '操作人',
            dataIndex: 'UserName'
          }
        ],
        loadData: parameter => {
          return sysAuditLogPage(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },
        // loadData:[],
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      open (record) {
        this.visible = true
        this.s_applyuser = record.applyuser,
        this.s_applyusername = record.applyusername,
        this.s_CreatedUserName = record.CreatedUserName,
        this.s_apply_amount = record.apply_amount,
        this.s_deptname = record.deptname,
        this.s_stageflg = record.stageflg,
        this.s_workflg = record.workflg,
        this.s_relateid_keyan =  record.relateid_keyan,
        this.s_syncflg_keyan = record.syncflg_keyan.toString(),
        this.s_syncflg_caiwu =  record.syncflg_caiwu.toString(),
        this.s_project_manager =  record.project_manager,
        this.s_project_operator =  record.project_operator,
        this.s_lendinvoiceflg =  record.lendinvoiceflg,
        this.s_lendinvoiceamount =  record.lendinvoiceamount,
        this.s_lendinvoicenumber =  record.lendinvoicenumber,
        this.s_docid =  record.docid,
        this.s_projectcode =  record.projectcode,
        this.s_needinvoice =  record.needinvoice,

        this.s_invoicetitle = record.needinvoice=='Y'? record.invoice.invoicetitle:'',
        this.s_taxpayerid =  record.needinvoice=='Y'?record.invoice.taxpayerid:'',
        this.s_invoicecontent =  record.needinvoice=='Y'?record.invoice.invoicecontent:'',
        this.s_invoiceamount =  record.needinvoice=='Y'?record.invoice.invoiceamount:'',
        this.s_invoicetype =  record.needinvoice=='Y'?record.invoice.invoicetype:'',
        this.s_invoicestageflg =  record.needinvoice=='Y'?record.invoice.stageflg:'',

        this.s_projdeptid =  record.projdeptid,
        this.s_projdeptname =  record.projdeptname,
        this.s_projtype =  record.projtype,
        this.s_projcode =  record.projcode,
        this.s_applytitle =  record.applytitle,
        this.s_applydesc =  record.applydesc,
        this.s_str3 =  record.str3,
        this.id =  record.id,
        // 审核意见
        sysDictTypeDropDown({ code: 'auditbankroll' }).then((res) => {this.audittypeData = res.data})
        this.form.getFieldDecorator('audittype', { valuePropName: 'checked', initialValue: 'pass' })
        this.form.getFieldDecorator('id', { initialValue: this.id })
        this.s_inputtimeDateString = moment(record.inputtime).format('YYYY-MM-DD HH:mm:ss')

        this.updateInvoice = this.s_stageflg == "fdticketaudit" && this.s_needinvoice=="Y"
        this.updateVoucherNo = this.s_stageflg == "transfer"
        
        // 发票类型
        sysDictTypeDropDown({ code: 'invoicetype' }).then((res) => {this.invoicetypeData = res.data})
        this.form.getFieldDecorator('invoice.invoicetype', {  initialValue: '31' })
        
        this.getInvoiceItemlist()
        this.form.getFieldDecorator('invoice.invoiceitem', {  initialValue: '1112223334' })       
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
      handleSubmit () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            // for (const key in values) {
            //   if (typeof (values[key]) === 'object' && !(values[key]===null)) {
            //     values[key] = JSON.stringify(values[key])
            //   }
            // }
            bankrollapplyAudit(values).then((res) => {
              if (res.success) {
                this.$message.success('审核成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('审核失败')//  + res.message
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
<style lang="less">
  .sysInfo_table {
    width: 100%;
    min-height: 35px;
    line-height: 35px;
    text-align: left;
  }

  .sysInfo_td {
    border-bottom: 1px solid #e8e8e8;
  }
</style>

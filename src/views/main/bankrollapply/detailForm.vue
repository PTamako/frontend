<template>
  <a-modal
    :title="'审核经费认领：'+s_applytitle"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :footer="null"
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
          <a-tab-pane key="2" tab="发票信息" :force-Render="true">
            <a-row :gutter="24">
              <a-col :md="24" :sm="24">
                <table class="sysInfo_table">
                  <tr>
                      <td width="14%" class="sysInfo_td">是否已预借票据</td>
                      <td width="36%" class="sysInfo_td"> {{ 'yes_or_no' | dictType(this.s_lendinvoiceflg) }}</td>
                      <td width="14%" class="sysInfo_td" v-show="lendinvoiceshow">预借发票号码</td>
                      <td width="36%" class="sysInfo_td" v-show="lendinvoiceshow">{{ this.s_lendinvoicenumber }}</td>
                  </tr>
                  <tr v-show="lendinvoiceshow">
                      <td width="10%" class="sysInfo_td">预借发票金额</td>
                      <td class="sysInfo_td">{{ this.s_lendinvoiceamount }} </td>
                      <td class="sysInfo_td">预借发票抬头</td>
                      <td class="sysInfo_td">{{ this.s_unit_code }} </td>
                  </tr>
                  <tr>
                      <td class="sysInfo_td">是否需要发票</td>
                      <td class="sysInfo_td">{{ 'yes_or_no' | dictType(this.s_needinvoice) }}</td>
                      <td class="sysInfo_td" v-show="invoiceshow">发票抬头</td>
                      <td class="sysInfo_td" v-show="invoiceshow">{{ this.s_invoicetitle }} - {{ this.s_taxpayerid }} </td>
                  </tr>
                  <tr v-show="invoiceshow">
                      <td class="sysInfo_td">发票类型</td>
                      <td class="sysInfo_td">{{ 'invoicetype' | dictType(this.s_invoicetype) }} </td>
                      <td class="sysInfo_td">开票项目</td>
                      <td class="sysInfo_td">
                        {{ this.s_invoicecontent }}
                      </td>
                  </tr>
                  <tr v-show="invoiceshow">
                      <td class="sysInfo_td">开票金额</td>
                      <td class="sysInfo_td">{{ this.s_invoiceamount }} </td>
                      <td class="sysInfo_td">发票状态</td>
                      <td class="sysInfo_td">{{ 'invoicestageflg' | dictType(this.s_invoicestageflg) }} </td>
                  </tr>
                  <tr v-show="invoiceurlshow">
                      <td class="sysInfo_td">发票网址</td>
                      <td colspan="3" class="sysInfo_td"><a target="_blank" :href="s_einvoiceurl">打开发票</a> </td>
                  </tr>
                </table>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="3" tab="处理过程" :force-Render="true">
           <a-table 
            ref="table"
            size="middle"
            :pagination="{ pageSize: 5 }"
            :columns="hisColumns"
            :dataSource="loadHisData"
            :alert="true"
            >
            <span slot="stageflgscopedSlots" slot-scope="text">
              {{ 'audit_action_type' | dictType(text) }}
            </span>
            </a-table>
          </a-tab-pane>
      </a-tabs>    
      <a-form :form="form">        
        <a-form-item v-show="false">
          <a-input v-decorator="['id']" />
        </a-form-item>         
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
  import { sysAuditLogList } from '@/api/modular/system/logManage'
  export default {
    components: {
      STable
    },
    data () {
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
        defaultActive:1,
        syncflg_keyanData: [],
        syncflg_caiwuData: [],
        workflgData: [],
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

        lendinvoiceshow:false,
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
        s_einvoiceurl:null,
        invoiceshow:false,
        invoiceurlshow:false,
        

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

        updateInvoice: false,
        updateVoucherNo: false,
        queryParam: {ColumnName:'bankroll'},
        hisColumns: [
          {
            title: '操作时间',
            align: 'center',
            width: '200px',
            dataIndex: 'createdTime'
          },
          {
            title: '操作人',
            width: '200px',
            dataIndex: 'userName'
          },
          {
            title: '操作信息',
            width: '200px',
            dataIndex: 'newValue',
            scopedSlots: { customRender: 'stageflgscopedSlots' }
          },
          {
            title: '备注',
            dataIndex: 'oldValue'
          }
        ],
        loadHisData: parameter => {
          return sysAuditLogList(Object.assign(parameter, this.queryParam)).then((res) => {
            return res.data
          })
        },

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

        this.lendinvoiceshow =  record.lendinvoiceflg=='Y',

        this.s_needinvoice =  record.needinvoice,
        this.s_invoicetitle = record.needinvoice=='Y'? record.invoice.invoicetitle:'',
        this.s_taxpayerid =  record.needinvoice=='Y'?record.invoice.taxpayerid:'',
        this.s_invoicecontent =  record.needinvoice=='Y'?record.invoice.invoicecontent:'',
        this.s_invoiceamount =  record.needinvoice=='Y'?record.invoice.invoiceamount:'',
        this.s_invoicetype =  record.needinvoice=='Y'?record.invoice.invoicetype:'',
        this.s_invoicestageflg =  record.needinvoice=='Y'?record.invoice.stageflg:'',
        this.s_einvoiceurl =  record.needinvoice=='Y'?record.invoice.einvoiceurl:'',
        this.invoiceshow =  record.needinvoice=='Y',
        this.invoiceurlshow =  record.needinvoice=='Y' && record.invoice.stageflg=='complete',

        this.s_projdeptid =  record.projdeptid,
        this.s_projdeptname =  record.projdeptname,
        this.s_projtype =  record.projtype,
        this.s_projcode =  record.projcode,
        this.s_applytitle =  record.applytitle,
        this.s_applydesc =  record.applydesc,
        this.s_str3 =  record.str3,
        this.id =  record.id,
        // 审核意见
        this.form.getFieldDecorator('id', { initialValue: this.id })
        this.s_inputtimeDateString = moment(record.inputtime).format('YYYY-MM-DD HH:mm:ss')

        this.updateInvoice = this.s_stageflg == "fdticketaudit" && this.s_needinvoice=="Y"
        this.updateVoucherNo = this.s_stageflg == "transfer"        
       
        this.queryParam =  {ColumnName:'bankroll',TableName:record.id.toString()}
        sysAuditLogList(this.queryParam).then((res) => {
          this.loadHisData = res.data
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
        this.loadHisData = []
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

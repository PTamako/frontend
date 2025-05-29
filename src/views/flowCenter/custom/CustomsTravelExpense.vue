<template>
  <a-spin :spinning="formLoading">
    <a-form :form="form">
      <a-col :span="24">
        <a-col :xs="24" :sm="12">
          <a-form-item
            style="display: none;"
            :disabled="disabled"
            label="部门ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedbacFk
          >
            <a-input placeholder="请输入部门ID" v-decorator="['Orgid']" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            style="display: none;"
            :disabled="disabled"
            label="出差人ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input placeholder="请输入出差人ID" v-decorator="['UserId']" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item
            :disabled="disabled"
            label="单位"
            :labelCol="labelCol_one"
            :wrapperCol="wrapperCol_one"
            has-feedback
          >
            <a-input placeholder="请输入单位" v-decorator="['OrgName']" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item
            :disabled="disabled"
            label="出差人"
            :labelCol="labelCol_one"
            :wrapperCol="wrapperCol_one"
            has-feedback
          >
            <a-input placeholder="请输入出差人" v-decorator="['UserName']" :disabled="true">
              <a-icon slot="addonAfter" @click="setTravel()" type="search" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item
            :disabled="disabled"
            label="出差事由"
            :labelCol="labelCol_one"
            :wrapperCol="wrapperCol_one"
            has-feedback
          >
            <a-textarea
              :rows="2"
              placeholder="请输入出差事由"
              :disabled="true"
              v-decorator="['TravelTitle']"
            ></a-textarea>
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['TrafficType']" />
          </a-form-item>
          <a-form-item v-show="false">
            <a-input v-decorator="['TravelId']" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="报销明细表:">
            <a-table
              :disabled="disabled"
              size="middle"
              bordered
              :columns="columns"
              :dataSource="data"
              :pagination="false"
              :loading="memberLoading"
              :scroll="{ x: 1500 }"
            >
              <template
                v-for="(col, index) in [
                  'DT_Start',
                  'DT_End',
                  'Addr_Start',
                  'Addr_End',
                  'Fee_CBP',
                  'Fee_Traffic_Days',
                  'Fee_Traffic',
                  'Fee_Food_Days',
                  'Fee_Food',
                  'Fee_Stay',
                  'Fee_Other',
                  'Card_Date',
                  'Card_No',
                  'Card_Fee',
                  'Fee_Cash'
                ]"
                :slot="col"
                slot-scope="text, record"
              >
                <template v-if="index == 0 || index == 1 || index == 11">
                  <a-date-picker
                    :key="col"
                    placeholder="请选择"
                    @change="e => handleChange(moment(e).format('YYYY-MM-DD'), record.key, col)"
                    v-if="record.editable"
                    :value="text"
                  />
                  <template v-else> {{ text }}</template>
                </template>
                <template v-else-if="index == 12">
                  <div :key="col">
                    <a-input
                      v-if="record.editable"
                      :value="text"
                      @change="e => handleChange(e.target.value.substr(-4), record.key, col)"
                    />
                    <template v-else> {{ text }} </template>
                  </div>
                </template>
                <template v-else>
                  <div :key="col">
                    <a-input
                      v-if="record.editable"
                      :value="text"
                      @change="e => handleChange(e.target.value, record.key, col)"
                    />
                    <template v-else>
                      {{ text }}
                    </template>
                  </div>
                </template>
              </template>
              <template slot="operation" slot-scope="text, record">
                <a @click="remove(record.key)">删除</a>
              </template>
            </a-table>
            <a-button
              style="width: 100%; margin-top: 16px; margin-bottom: 8px"
              type="dashed"
              icon="plus"
              @click="newMember"
            >
              增行
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" v-if="false">
          <a-form-item
            :disabled="disabled"
            label="金额合计（大写）"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input placeholder="请输入金额合计" v-decorator="['AmountTotal']" :disabled="true" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="金额合计（大写）"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input
              placeholder="请输入金额合计"
              v-decorator="['AmountTotalBig', { rules: [{ required: true, message: '请输入金额合计！' }] }]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="现金报销金额"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input
              placeholder="请输入现金报销金额"
              v-decorator="['AmountCash', { rules: [{ required: true, message: '请输入现金报销金额！' }] }]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="公务卡报销金额"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input
              placeholder="请输入公务卡报销金额"
              v-decorator="['AmountCard', { rules: [{ required: true, message: '请输入公务卡报销金额！' }] }]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="转账报销金额"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input
              placeholder="请输入转账报销金额"
              v-decorator="['AmountTrans', { rules: [{ required: true, message: '请输入转账报销金额！' }] }]"
              :disabled="true"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="转账单位名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input placeholder="请输入转账单位名称" v-decorator="['TransCompaNme']" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="转账单位纳税人识别号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input placeholder="请输入转账单位纳税人识别号" v-decorator="['TransTaxpayerId']" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="转账单位银行名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input placeholder="请输入转账单位银行名称" v-decorator="['TransBankName']" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item
            :disabled="disabled"
            label="转账单位银行账号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            has-feedback
          >
            <a-input placeholder="请输入转账单位银行账号" v-decorator="['TransBankNo']" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="备注" :labelCol="labelCol_one" :wrapperCol="wrapperCol_one" has-feedback>
            <a-textarea
              :rows="3"
              placeholder="请输入备注"
              :disabled="disabled"
              v-decorator="['ExpenseDesc']"
            ></a-textarea>
          </a-form-item>
        </a-col>
      </a-col>
    </a-form>
    <instance-list-form ref="instanceListForm" @instanceOK="handleSelTravel" />
  </a-spin>
</template>

<script>
import instanceListForm from '@/views/flowCenter/workflow/instanceListForm'
import { getFlowinstanceBasic } from '@/api/modular/flowCenter/flowinstanceManage'
import moment from 'moment'
export default {
  components: { instanceListForm },
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
      labelCol_one: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol_one: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      columns: [
        {
          title: '起讫日期',
          fixed: 'left',
          children: [
            {
              title: '开始日期',
              dataIndex: 'DT_Start',
              key: 'DT_Start',
              scopedSlots: { customRender: 'DT_Start' },
              width: 135
            },
            {
              title: '结束日期',
              dataIndex: 'DT_End',
              key: 'DT_End',
              scopedSlots: { customRender: 'DT_End' },
              width: 135
            }
          ]
        },
        {
          title: '地点',
          children: [
            {
              title: '起',
              dataIndex: 'Addr_Start',
              key: 'Addr_Start',
              width: 100,              
              scopedSlots: { customRender: 'Addr_Start' }
            },
            {
              title: '止',
              dataIndex: 'Addr_End',
              key: 'Addr_End',
              width: 100,
              scopedSlots: { customRender: 'Addr_End' }
            }
          ]
        },
        {
          title: '车船机费',
          dataIndex: 'Fee_CBP',
          scopedSlots: { customRender: 'Fee_CBP' },
          width: 100
        },
        {
          title: '交通包干费',
          children: [
            {
              title: '天数',
              dataIndex: 'Fee_Traffic_Days',
              key: 'Fee_Traffic_Days',
              scopedSlots: { customRender: 'Fee_Traffic_Days' },
              width: 60
            },
            {
              title: '金额',
              dataIndex: 'Fee_Traffic',
              key: 'Fee_Traffic',
              scopedSlots: { customRender: 'Fee_Traffic' },
              width: 100
            }
          ]
        },
        {
          title: '伙食补助',
          children: [
            {
              title: '天数',
              dataIndex: 'Fee_Food_Days',
              key: 'Fee_Food_Days',
              scopedSlots: { customRender: 'Fee_Food_Days' },
              width: 60
            },
            {
              title: '金额',
              dataIndex: 'Fee_Food',
              key: 'Fee_Food',
              scopedSlots: { customRender: 'Fee_Food' },
              width: 100
            }
          ]
        },
        {
          title: '住宿费',
          dataIndex: 'Fee_Stay',
          scopedSlots: { customRender: 'Fee_Stay' },
          width: 100
        },
        {
          title: '其他',
          dataIndex: 'Fee_Other',
          scopedSlots: { customRender: 'Fee_Other' },
          width: 100
        },
        {
          title: '公务卡开支记录',
          children: [
            {
              title: '刷卡日期',
              dataIndex: 'Card_Date',
              key: 'Card_Date',
              scopedSlots: { customRender: 'Card_Date' },
              width: 135
            },
            {
              title: '公务卡后四位',
              dataIndex: 'Card_No',
              key: 'Card_No',
              scopedSlots: { customRender: 'Card_No' },
              width: 120
            },
            {
              title: '刷卡金额',
              dataIndex: 'Card_Fee',
              key: 'Card_Fee',
              scopedSlots: { customRender: 'Card_Fee' },
              width: 100
            }
          ]
        },
        {
          title: '现金开支金额',
          dataIndex: 'Fee_Cash',
          key: 'Fee_Cash',
          scopedSlots: { customRender: 'Fee_Cash' },
          width: 120
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          scopedSlots: { customRender: 'operation' },
          width: 50
        }
      ],
      data: [],
      sysEmpParamExtList: [],
      name: null,
      visible: false,
      confirmLoading: false,
      formLoading: false,
      memberLoading: false,
      disabled: false,
      form: this.$form.createForm(this)
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        var sum1 = newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.Fee_CBP)), 0)
        var sum2 = newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.Fee_Traffic)), 0)
        var sum3 = newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.Fee_Food)), 0)
        var sum4 = newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.Fee_Stay)), 0)
        // var sum5 = newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.Fee_Other)), 0)
        var t_AmountCard = parseFloat(
          newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.Card_Fee)), 0)
        ).toFixed(2)
        var t_AmountCash = parseFloat(
          newVal.reduce((acc, cur) => acc + this.finite(parseFloat(cur.Fee_Cash)), 0)
        ).toFixed(2)
        var t_AmountTotal = parseFloat(
          this.finite(sum1) + this.finite(sum2) + this.finite(sum3) + this.finite(sum4)
        ).toFixed(2)
        var t_AmountTrans = parseFloat(
          this.finite(t_AmountTotal) - this.finite(t_AmountCash) - this.finite(t_AmountCard)
        ).toFixed(2)
        this.form.setFieldsValue({
          AmountTotal: t_AmountTotal,
          AmountTotalBig: this.convertCurrency(t_AmountTotal),
          AmountCash: t_AmountCash,
          AmountCard: t_AmountCard,
          AmountTrans: t_AmountTrans
        })
      }
    }
  },
  methods: {
    moment,
    finite(val) {
      if (isFinite(val)) {
        return val
      } else {
        return 0
      }
    },
    /**
     * 数字转大写
     */
    convertCurrency(money) {
      var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      var cnIntRadice = ['', '拾', '佰', '仟']
      var cnIntUnits = ['', '万', '亿', '兆']
      var cnDecUnits = ['角', '分', '毫', '厘']
      var cnInteger = '整'
      var cnIntLast = '元'
      var maxNum = 999999999999999.9999
      var integerNum
      var decimalNum
      var chineseStr = ''
      var parts
      if (money === '') {
        return ''
      }
      money = parseFloat(money)
      if (money >= maxNum) {
        return ''
      }
      if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger
        return chineseStr
      }
      money = money.toString()
      if (money.indexOf('.') === -1) {
        integerNum = money
        decimalNum = ''
      } else {
        parts = money.split('.')
        integerNum = parts[0]
        decimalNum = parts[1].substr(0, 4)
      }
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0
        var IntLen = integerNum.length
        for (var i = 0; i < IntLen; i++) {
          var n = integerNum.substr(i, 1)
          var p = IntLen - i - 1
          var q = p / 4
          var m = p % 4
          if (n === '0') {
            zeroCount++
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0]
            }
            zeroCount = 0
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
          }
          if (m === 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q]
          }
        }
        chineseStr += cnIntLast
      }
      if (decimalNum !== '') {
        var decLen = decimalNum.length
        for (i = 0; i < decLen; i++) {
          n = decimalNum.substr(i, 1)
          if (n !== '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i]
          }
        }
      }
      if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger
      } else if (decimalNum === '') {
        chineseStr += cnInteger
      }
      return chineseStr
    },
    /**
     * 增行
     */
    newMember() {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        DT_Start: '',
        DT_End: '',
        Addr_End: '',
        Addr_Start: '',
        Fee_CBP: '',
        Fee_Traffic_Days: '',
        Fee_Traffic: '',
        Fee_Food_Days: '',
        Fee_Food: '',
        Fee_Stay: '',
        Fee_Other: '',
        Card_Date: '',
        Card_No: '',
        Card_Fee: '',
        Fee_Cash: '',
        editable: true,
        isNew: true
      })
    },
    /**
     * 删除
     */
    remove(key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    /**
     * 选择子表单单项触发
     */
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    /**
     * 子表单json重构
     */
    JsonReconsitution() {
      this.sysEmpParamExtList = []
      const newData = [...this.data]
      newData.forEach(item => {
        // eslint-disable-next-line eqeqeq
        if ((item.DT_Start != '') & (item.DT_End != '')) {
          this.sysEmpParamExtList.push({
            DT_Start: item.DT_Start,
            DT_End: item.DT_End,
            Addr_Start: item.Addr_Start,
            Addr_End: item.Addr_End,
            Fee_CBP: item.Fee_CBP,
            Fee_Traffic_Days: item.Fee_Traffic_Days,
            Fee_Traffic: item.Fee_Traffic,
            Fee_Food_Days: item.Fee_Food_Days,
            Fee_Food: item.Fee_Food,
            Fee_Stay: item.Fee_Stay,
            Fee_Other: item.Fee_Other,
            Card_Date: item.Card_Date,
            Card_No: item.Card_No,
            Card_Fee: item.Card_Fee,
            Fee_Cash: item.Fee_Cash
          })
        }
      })
    },
    // 初始化方法
    edit(record) {
      this.formLoading = false
      setTimeout(() => {
        this.form.setFieldsValue({
          Orgid: record.Orgid,
          UserId: record.UserId,
          OrgName: record.OrgName,
          UserName: record.UserName,
          TravelTitle: record.TravelTitle,
          AmountTotal: record.AmountTotal,
          AmountTotalBig: this.convertCurrency(record.AmountTotal),
          AmountCash: record.AmountCash,
          AmountCard: record.AmountCard,
          AmountTrans: record.AmountTrans,
          TransCompaNme: record.TransCompaNme,
          TransTaxpayerId: record.TransTaxpayerId,
          TransBankName: record.TransBankName,
          TransBankNo: record.TransBankNo,
          ExpenseDesc: record.ExpenseDesc
        })
        this.data = []
        record.rds.forEach(item => {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            DT_Start: item.DT_Start,
            DT_End: item.DT_End,
            Addr_Start: item.Addr_Start,
            Addr_End: item.Addr_End,
            Fee_CBP: item.Fee_CBP,
            Fee_Traffic_Days: item.Fee_Traffic_Days,
            Fee_Traffic: item.Fee_Traffic,
            Fee_Food_Days: item.Fee_Food_Days,
            Fee_Food: item.Fee_Food,
            Fee_Stay: item.Fee_Stay,
            Fee_Other: item.Fee_Other,
            Card_Date: item.Card_Date,
            Card_No: item.Card_No,
            Card_Fee: item.Card_Fee,
            Fee_Cash: item.Fee_Cash
          })
        })
        console.log(this.data)
      }, 100)
    },
    setData(record) {
      setTimeout(() => {
        this.form.setFieldsValue({
          Orgid: record.Orgid,
          UserId: record.UserId,
          OrgName: record.OrgName,
          UserName: record.UserName,
          TravelTitle: record.TravelTitle,
          AmountTotal: record.AmountTotal,
          AmountTotalBig: this.convertCurrency(record.AmountTotal),
          AmountCash: record.AmountCash,
          AmountCard: record.AmountCard,
          AmountTrans: record.AmountTrans,
          TransCompaNme: record.TransCompaNme,
          TransTaxpayerId: record.TransTaxpayerId,
          TransBankName: record.TransBankName,
          TransBankNo: record.TransBankNo,
          ExpenseDesc: record.ExpenseDesc
        })
        this.data = []
        record.rds.forEach(item => {
          const length = this.data.length
          this.data.push({
            key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
            DT_Start: item.DT_Start,
            DT_End: item.DT_End,
            Addr_Start: item.Addr_Start,
            Addr_End: item.Addr_End,
            Fee_CBP: item.Fee_CBP,
            Fee_Traffic_Days: item.Fee_Traffic_Days,
            Fee_Traffic: item.Fee_Traffic,
            Fee_Food_Days: item.Fee_Food_Days,
            Fee_Food: item.Fee_Food,
            Fee_Stay: item.Fee_Stay,
            Fee_Other: item.Fee_Other,
            Card_Date: item.Card_Date,
            Card_No: item.Card_No,
            Card_Fee: item.Card_Fee
          })
        })
      }, 100)
      console.log(this.data)
    },
    disable(record) {
      this.disabled = true
    },
    setTravel() {
      this.$refs.instanceListForm.instanceList(1, 487653312561221)
    },

    // 确认回调-选择项目
    handleSelTravel(record) {
      if (!!record) {
        if (record.length == 1) {
          this.form.setFieldsValue({
            TravelId: record[0].id
          })
          // 获取出差申请表数据
          this.tmpTravelID = record[0].id
          this.queryParam = { id: this.tmpTravelID, bHasHisList: false }
          getFlowinstanceBasic(this.queryParam).then(res => {
            if (!res.success) {
              return
            }
            // eslint-disable-next-line no-eval
            var dataJson = eval('(' + res.data.frmData + ')')
            this.form.setFieldsValue({
              UserName: dataJson.UserName,
              TravelTitle: dataJson.TravelTitle,
              TrafficType: dataJson.TrafficType
            })
          })
        }
      }
    },
    getData() {
      return new Promise((resolve, reject) => {
        try {
          const {
            form: { validateFields }
          } = this
          validateFields((errors, values) => {
            if (!errors) {
              if(values.AmountTrans>0 && (!values.TransCompaNme || !values.TransTaxpayerId|| !values.TransBankName||!values.TransBankNo)){
                alert('请输入转账单位信息')
              }else{
                this.JsonReconsitution()
                values.rds = this.sysEmpParamExtList
                resolve(values)
              }
            } else {
              reject(errors)
            }
          })
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
</script>

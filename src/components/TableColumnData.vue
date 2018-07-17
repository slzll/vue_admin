<template>
  <span>
    <custome-button v-if="list.NameA == 'customebutton'"
                    :options="list"
                    :scope="scope">
    </custome-button>
    <button-submit v-else-if="list.NameA == 'buttonsubmit'"
                   :options="list"
                   :scope="scope"
                   :tab-options="tabOptions">
    </button-submit>
    <submit-param v-else-if="list.NameA == 'submitparam'|| list.NameA == 'submitshow'"
                  :options="list"
                  :scope="scope"
                  :tab-options="tabOptions">
    </submit-param>
    <el-button v-else-if="list.NameA == 'submitline'"
               size="small"
               type="primary">
      {{list.Name}}
    </el-button>
    <page-param v-else-if="list.NameA == 'pageparam'"
                :options="list"
                :scope="scope"
                :tab-options="tabOptions">
    </page-param>
    <el-button v-else-if="list.NameA == 'buttonpage'"
               size="small"
               type="primary">
      {{list.Name}}
    </el-button>
    <template v-else-if="list.NameA == 'date'">
      {{formatDate(scope.row[list.Code])}}
    </template>
    <template v-else-if="list.NameA == 'enum'">
      {{getLocalData(list.DataValue,scope.row[list.Code])}}
    </template>
    <template v-else>
      <template v-if="list.EditType && list.EditType.indexOf('check')>-1 && list.DataValue">
        {{getLocalData(list.DataValue,scope.row[list.Code])}}
      </template>
      <template v-else>{{scope.row[list.Code]}}</template>
    </template>
  </span>
</template>

<script>
  import { post } from '@/config/fetch';
  import { mapGetters } from 'vuex';
  import customeButton from '@/components/CustomeButton';
  import submitParam from '@/components/SubmitParam';
  import ButtonSubmit from "@/components/ButtonSubmit";
  import PageParam from "@/components/PageParam";

  export default {
    components:{
      PageParam,
      ButtonSubmit,
      customeButton,
      submitParam
    },
    name: 'tableColumnData',
    props:['list','scope', 'tabOptions'],
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['localData'])
    },
    created () {
    },
    methods: {
      formatDate(str){
        if (str){
          return str.parseDate();
        }else{
          return str;
        }

      },
      getLocalData(dataValue,hrefs){
        let texts= [];
        let text = '';
        let key = dataValue.split(',')[0];
        if(hrefs instanceof Array){
          hrefs.map((href,num) => {
            this.localData[key].map((item, index) => {
              if (item.href == href){
                texts.push(item.text);
              }
              if (item.nodes && item.nodes.length >0){
                item.nodes.map((it, i) => {
                  if (it.href == href){
                    texts.push(it.text);
                  }
                })
              }
            });
          })
        }else{
          this.localData[key].map((item, index) => {
            if (item.href == hrefs){
              texts.push(item.text);
            }
            if (item.nodes && item.nodes.length >0){
              item.nodes.map((it, i) => {
                if (it.href == hrefs){
                  texts.push(it.text);
                }
              })
            }
          });
        }

        texts.map((item, index) => {
          text += item+",";
        });

        text = text.substr(0,text.length-1);
        return text;
      }
    },
  }
</script>

<style>

</style>

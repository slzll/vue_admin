<template>
  <div>
    <div v-if="this.switchView === 'Table'">
      <el-row class="actions">
        <div class="pull-right">
          <el-button v-for="list in toolData"
                     :key="list.operateCode"
                     :class="'click'+list.operateCode"
                     @click="clickAction(list.operateCode)"
                     v-if="list.operateCode !== 'list'">
            {{list.operateName}}
          </el-button>
        </div>
      </el-row>
      <el-row class="table">
        <el-table v-loading.body="loading"
                  stripe
                  border
                  fit
                  style="width: 100%"
                  :data="tableData"
                  maxHeight="500"
                  :default-sort="{prop: 'name', order: 'descending'}">
          <el-table-column type="selection" min-width="45"></el-table-column>
          <el-table-column type="index" min-width="45"></el-table-column>
          <!--<el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="list in rowData"
                              :key="list.Code"
                              :label="list.Name">
                  <span>{{ props.row[list.Code] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>-->
          <el-table-column v-for="list in rowData"
                           v-if="(list.ShowLevel >= 1 && !list.OuterFlag)"
                           :key="list.Code"
                           :prop="list.Code"
                           :label="list.Name"
                           :sortable="list.SortFlag"
                           align="center"
                           :min-width="list.Width"
                           >
            <template scope="scope">
              <table-column-data :list="list" :scope="scope"></table-column-data>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationConf.currentPage"
          :page-sizes="paginationConf.pageSizes"
          :page-size="paginationConf.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationConf.total">
        </el-pagination>
      </el-row>
    </div>
    <!--<div v-else-if=""></div>-->
    <!--<div v-else-if=""></div>-->
    <!--<div v-else-if=""></div>-->
    <!--<div v-else></div>-->
  </div>
</template>

<script>
  import { post, all } from '@/config/fetch';
  import tableColumnData from '@/components/TableColumnData';
  import { mapGetters } from 'vuex'

  export default {
    components: {
      tableColumnData},
    name: 'tabPaneContent',
    props:['tabOptions'],
    data () {
        return {
          toolData: [],
          domainUrl: '',
          fieldUrl: '',
          listUrl: '',
          navSubmitIsObj: false,
          switchView: '',
          colConfig: '',
          rowData: [],
          tableData: [],
          loading: true,
          paginationConf:{
            currentPage:1,
            total:400,
            pageSize:10,
            pageSizes:[10, 20, 50, 100, 150, 'All']
          }


        }
    },
    computed: {
      ...mapGetters(['apiUrlAdmin', 'localData'])
    },
    created () {
      this.init();
    },
    methods: {
      init(){
        post(this.apiUrlAdmin + '/Right/GetPointRolePointOperateList?pointCode=' + this.tabOptions.Code).then(data => {
          this.domainUrl = this.apiUrlAdmin;
          this.fieldUrl = this.apiUrlAdmin + "/Right/RolePointFieldList?pointCode=" + this.tabOptions.Code; //用来获取point field数据集合的地址
          this.toolData = data;
          if (!this.tabOptions.operateCode){
            this.tabOptions.operateCode = '';
          }
          this.toolRender();
          let promise = [];
          post(this.fieldUrl).then(res => {
            this.rowData = res.rows;
            res.rows.map((item, index) => {
              if(item.NameA === "submitparam"|| item.NameA === "buttonsubmit" || item.NameA === "submitline"){
                return;
              }
              if (item.DataValue && item.DataValue.indexOf('data_') == -1 && /^\//.test(item.DataValue)){
                let path = item.DataValue.split(',')[0];

                if (!this.localData[path]) {
                  let p = post(this.domainUrl + path, {asy: false}).then(arr => {
                    this.$store.dispatch('setLocalData',{key: path, arr: arr })
                  });
                  promise.push(p);
                }
              }
            });
            all(promise).then(() => {
              post(this.listUrl,{length:10,start:0}).then(res => {
                this.loading = false;
                this.tableData = res.data;
                this.paginationConf.total = res.recordsTotal;
              });
            }).catch(() => {
              this.$store.dispatch('setAlertOption',{
                show: true,
                title: '数据请求出错',
                type: 'error'
              });
            });

          });
        })
      },
      toolRender(){
        this.navSubmitIsObj = typeof this.tabOptions.operateCode === "object";
        if ((this.toolData === undefined || this.toolData.length === 0) && this.tabOptions.ex_ListPath !== undefined) {
          this.listUrl = this.domainurl + this.tabOptions.ex_ListPath + (this.navSubmitIsObj === true ? "" : this.tabOptions.Code);
          this.switchView = "Table";
        } else {
          this.switchView = "Table";
          this.toolData.forEach((value) => {
            if (value.operateCode !== "list") {
              if (this.navSubmitIsObj) {
                switch (value.operateCode) {
                  case "add":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path);
                    break;
                  case "right":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', value.Path);
                    break;
                  case "specifyuser":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path);
                    break;
                  case "selectcourse":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path);
                    break;
                  case "export":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path);
                    break;
                  case "import":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', value.Path);
                    break;
                  case "saveimport":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path);
                    break;
                  default:
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path);
                    break;
                }
              } else {
                switch (value.operateCode) {
                  case "add":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path + this.tabOptions.operateCode);
                    break;
                  case "right":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', value.Path);
                    break;
                  case "specifyuser":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path + this.tabOptions.operateCode);
                    break;
                  case "selectcourse":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path + this.tabOptions.operateCode);
                    break;
                  case "export":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path + this.tabOptions.operateCode || "");
                    break;
                  case "import":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', value.Path + this.tabOptions.operateCode || "");
                    break;
                  case "saveimport":
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path + this.tabOptions.operateCode || "");
                    break;
                  default:
                    $(this.$el).find(".actions").find(".click" + value.operateCode).data('Path', this.domainUrl + value.Path);
                    break;
                }
              }
            } else {
              let tableConfig = value.Path.split(',');
              let strcol = tableConfig[1];
              if (strcol !== 'null' && strcol !== undefined) {
                this.colConfig = strcol.split('&');
              }
              if (this.navSubmitIsObj) {
                this.listUrl = this.domainUrl + (this.tabOptions.ex_ListPath || (tableConfig[ 0 ]));
                this.switchView = this.tabOptions.ex_Type ? this.tabOptions.ex_Type : value.Type ? value.Type : "Table";
              } else {
                this.listUrl = this.domainUrl + (this.tabOptions.ex_ListPath || (tableConfig[ 0 ] + this.tabOptions.operateCode));
                this.switchView = this.tabOptions.ex_Type ? this.tabOptions.ex_Type : value.Type ? value.Type : "Table";
              }
            }
          });
        }
      },
      clickAction(operateCode){
        console.log(operateCode);
      },
      handleSizeChange(val){
        let start;
        if (isNaN(val)){
          this.paginationConf.pageSize = 'All';
          start = 0;
          val = -1;
        }else{
          this.paginationConf.pageSize = val;
          start = (this.paginationConf.currentPage-1)*val;
        }
        this.loading = true;
        post(this.listUrl,{length:val,start:start}).then(res => {
          this.loading = false;
          this.tableData = res.data;
          this.paginationConf.total = res.recordsTotal;
        });
      },
      handleCurrentChange(val) {
        if (typeof this.paginationConf.pageSize === 'string'){
        }else{
          this.paginationConf.currentPage = val;
          this.loading = true;
          let start = (val-1)*this.paginationConf.pageSize;
          post(this.listUrl,{length:this.paginationConf.pageSize,start:start}).then(res => {
            this.loading = false;
            this.tableData = res.data;
            this.paginationConf.total = res.recordsTotal;
          });
        }

      }
    },
  }
</script>

<style scoped>
  .el-row{
    margin-bottom: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

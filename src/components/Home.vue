<template>
  <div class="index_content">
    <div class="index_row">
      <div class="index_block">
        <div class="pending_task">
          <div class="title">待处理的任务</div>
          <div class="block_btn rows">
            <a class="col-md-3 check_signup" addtabs="userlist" title="审核注册">
              <img src="../assets/images/index_1.png" alt="审核注册">
              <div>
                <div>审核注册</div>
                <div class="check_signup_count">12</div>
              </div>
            </a>
            <a class="col-md-3 check_class_apply" addtabs="TrainingUserAudit" title="培训班报名">
              <img src="../assets/images/index_2.png" alt="培训班报名">
              <div>
                <div>培训班报名</div>
                <div class="class_apply">12</div>
              </div>
            </a>
            <a class="col-md-3 check_message" addtabs="messageboard" title="审核留言">
              <img src="../assets/images/index_3.png" alt="审核留言">
              <div>
                <div>审核留言</div>
                <div class="check_message_count">12</div>
              </div>
            </a>
            <a class="col-md-3 check_comment" addtabs="discuss" title="审核讨论">
              <img src="../assets/images/index_4.png" alt="审核讨论">
              <div>
                <div>审核评论</div>
                <div class="check_comment_count">12</div>
              </div>
            </a>
          </div>
        </div>

      </div>
      <div class="index_block">
        <div class="quick_entry">
          <div class="title">快捷入口</div>
          <div class="block_btn">
            <a addtabs="userlist" title="用户资料">
              <img src="../assets/images/userlist.png" alt="用户资料">
            </a>
            <a addtabs="courselist" title="课程列表">
              <img src="../assets/images/courselist.png" alt="课程列表">
            </a>
            <a addtabs="articlelist" title="文章管理">
              <img src="../assets/images/articlelist.png" alt="文章列表">
            </a>
            <a addtabs="traininglist" title="培训列表">
              <img src="../assets/images/traininglist.png" alt="培训列表">
            </a>
            <a addtabs="examlist" title="考试列表">
              <img src="../assets/images/examlist.png" alt="考试列表">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="index_row">
      <div class="data-statistics">
        <div class="title">数据统计</div>
        <div class="block_btn">
          <a title="注册人数">
            <img class="line_chart_img" src="../assets/images/chart_1.png" alt="注册人数" />
            <div class="count_text user_count">422</div>
            <div class="count_name">注册人数</div>
          </a>
          <a title="在线人数">
            <img class="line_chart_img" src="../assets/images/chart_2.png" alt="在线人数" />
            <div class="count_text online_count">422</div>
            <div class="count_name">在线人数</div>
          </a>
          <a title="课程数量">
            <img class="line_chart_img" src="../assets/images/chart_3.png" alt="课程数量" />
            <div class="count_text course_count">422</div>
            <div class="count_name">课程数量</div>
          </a>
          <a title="七天内app使用人数">
            <img class="bar_chart_img" src="../assets/images/chart_4.png" alt="七天内app使用人数" />
            <div class="count_text app_use_count">422</div>
            <div class="count_name">七天内app使用人数</div>
          </a>
          <a title="公众号已绑定的账号数量">
            <img class="line_chart_img" src="../assets/images/chart_5.png" alt="公众号已绑定的账号数量" />
            <div class="count_text wechat_use_count">422</div>
            <div class="count_name">公众号已绑定的账号数量</div>
          </a>
        </div>
      </div>
    </div>

    <div class="index_row chart_row">
      <div class="visit_people"></div>
      <div class="date-checkbox">
        <span class="month-text">本月</span>
        <a class="month-choose">
          <span class="visit_month">{{showMonth}}</span>
          <span class="caret"></span>
          <el-date-picker class="month-picker" v-model="month" type="month" :picker-options="pickerOption"></el-date-picker>
        </a>
      </div>
    </div>
    <div class="index_row pie_chart_row">
      <div class="chart_block">
        <div class="inner_block course_type"></div>
      </div>
      <div class="chart_block">
        <div class="inner_block disk"></div>
      </div>
      <div class="chart_block">
        <div class="inner_block course_channel"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { post } from '@/config/fetch';
  import echarts from 'echarts';
  import { mapGetters } from 'vuex';

  export default {
      name: 'home',
      data () {
          return {
            month:'',
            showMonth: new Date().format("yyyy-MM"),
            pickerOption:{
              disabledDate: function (time) {
                return time.getTime() > Date.now()
              }
            },
          }
      },
      computed: {
        ...mapGetters(['apiUrl','apiUrlAdmin'])
      },
      created () {
        this.getWelcomeText();
        setInterval(this.getDataStatistics(),60000);
        this.visitCount();
        this.getCourseTypeRate();
        this.getServer();
        this.getCourseChannelRate();
      },
      watch:{
        month: function () {
          this.showMonth = this.month.format("yyyy-MM");
          let date = new Date();
          let pickYear = this.month.getFullYear();
          let year = date.getFullYear();
          let pickMonth = this.month.getMonth() + 1;
          let month = date.getMonth() + 1;
          if (year == pickYear) {
            switch (month - pickMonth) {
              case 0:
                $('#home .index_content .date-checkbox .month-text').text("本月");
                break;
              case 1:
                $('#home .index_content .date-checkbox .month-text').text("上个月");
                break;
              default:
                $('#home .index_content .date-checkbox .month-text').text(pickMonth + "月");
                break;
            }
          } else {
            switch (year - pickYear) {
              case 1:
                $('#home .index_content .date-checkbox .month-text').text("去年" + pickMonth + "月");
                break;
              default:
                $('#home .index_content .date-checkbox .month-text').text(pickYear + "年" + pickMonth + "月");
                break;
            }
          }
          this.visitCount(this.month.format("yyyy-MM-dd"));
        }
      },
      methods: {
        getWelcomeText: function () {
          post(this.apiUrl+'/Page/LoginShort').then(res => {
            if (res.Data.Model) {
              $('.page-top .username').text(res.Data.Model.Account);
              var welcomeTime = "";
              var hour = new Date().getHours();
              if (0 <= hour && hour <= 6) {
                welcomeTime = "凌晨好！";
              } else if (7 <= hour && hour <= 11) {
                welcomeTime = "早上好！";
              } else if (hour == 12) {
                welcomeTime = "中午好！";
              } else if (13 <= hour && hour <= 17) {
                welcomeTime = "下午好！";
              } else if (hour == 18) {
                welcomeTime = "傍晚好！";
              } else if (19 <= hour && hour <= 24) {
                welcomeTime = "晚上好！";
              }
              $('.page-top .welcome-text .welcome-time').text(welcomeTime);
            }
          })
        },
        getDataStatistics: function () {
          post(this.apiUrlAdmin + '/Summary/GetTodo').then(res => {
            let check_signup_count = res.Data.UserAuditCount;
            let class_apply = res.Data.TrainingUserAuditCount;
            let check_message_count = res.Data.CommentMessageAudit;
            let check_comment_count = res.Data.DiscussMessageAudit;
            let notice_count = res.Data.AdminNoticeCount;
            $('#home .index_content .check_signup_count').text(check_signup_count);
            $('#home .index_content .class_apply').text(class_apply);
            $('#home .index_content .check_message_count').text(check_message_count);
            $('#home .index_content .check_comment_count').text(check_comment_count);
            $('.page-top .dropdown .notice .badge').text(notice_count);
          });
          post(this.apiUrlAdmin + '/Summary/GetRealTimeData').then(res => {
            let timeSummary = res.Data.TimeSummary;
            let daySummary = res.Data.DaySummary;
            //注册人数
            let user_count = res.Data.UserCount;
            //在线人数
            let online_count = timeSummary[timeSummary.length - 1].OnlineCount;
            //课程数量
            let course_count = res.Data.CourseCount;
            //七天内App使用人数
            let app_use_count = 0;
            $.each(daySummary, function(index, item) {
              app_use_count += item.AppUserCount;
            });
            //微信公众号绑定数量
            let wechat_use_count = daySummary[daySummary.length - 1].WechatBindCount;
            //数据绑定
            $('#home .index_content .user_count').text(user_count);
            $('#home .index_content .online_count').text(online_count);
            $('#home .index_content .course_count').text(course_count);
            $('#home .index_content .app_use_count').text(app_use_count);
            $('#home .index_content .wechat_use_count').text(wechat_use_count);
          })
        },
        visitCount: function (month) {
          post(this.apiUrlAdmin + '/Summary/GetLoginSummaryLog',{ date: month || new Date().format("yyyy-MM-dd")})
            .then(res => {
              if (res.Type == 1) {
                let data = res.Data;
                let date = [];
                let visit_count = [];
                $.each(data, function(index, item) {
                  date.push(item.Date.parseDate("MM-dd"));
                  visit_count.push(item.LoginCount);
                });
                let myChart = echarts.init(document.querySelector('.chart_row .visit_people'));
                myChart.setOption({
                  backgroundColor: '#FFF',
                  color: ['#388eee'],
                  title: {
                    text: '访问人数统计',
                    padding: [12, 20]
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  grid: {
                    show: true,
                    left: '5%',
                    right: '5%',
                    backgroundColor: '#FFF'
                  },
                  calculable: true,
                  xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data: date, // maxInterval: 3600 * 24 * 1000
                  }],
                  yAxis: [{
                    type: 'value',
                    name: '单位：位'
                  }],
                  series: [{
                    name: '访问人数',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                      normal: {
                        areaStyle: {
                          type: 'default',
                          color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                              offset: 0,
                              color: '#388eee'
                            }, {
                              offset: 0.5,
                              color: 'rgba(56,142,238,.5)'
                            }, {
                              offset: 1,
                              color: 'rgba(56,142,238,0.2)'
                            }]
                          )
                        }
                      },
                    },
                    data: visit_count
                  }]
                });
              } else {
                this.$store.dispatch('setAlertOption',{
                  show: true,
                  type:'error',
                  title:"访问人数统计" + res.Message
                });
              }
            })
        },
        getCourseTypeRate: function () {
          post(this.apiUrlAdmin + '/Summary/GetCourseTypeRate').then(res => {
            let data = res.Data;
            let courseName = Object.keys(data);
            let courseCount = [];
            $.each(data, function(key, val) {
              courseCount.push({
                name: key,
                value: val
              });
            });
            let myChart2 = echarts.init(document.querySelector(".course_type"));
            let course_type_option = {
              backgroundColor: '#FFF',
              title: {
                text: '课程类型占比',
                padding: [12, 20]
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'right',
                y: 'center',
                align: 'left',
                itemWidth: 15,
                data: courseName,
                selectedMode: false,
                formatter: function(name) {
                  var data = course_type_option.series[0].data;
                  var total = 0;
                  var tarValue;
                  for (var i = 0, l = data.length; i < l; i++) {
                    total += data[i].value;
                    if (data[i].name == name) {
                      tarValue = data[i].value;
                    }
                  }
                  let p = (tarValue / total * 100).toFixed(2);
                  return name + ' ' + ' ' + '(' + p + '%)';
                }
              },
              grid: {
                x: '5%'
              },
              series: [{
                name: '课程类型占比',
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['30%', '50%'],
                color: ['#388eee', '#32d2a9', '#b039ed', '#ff5d5d', '#E9F01D'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: courseCount
              }]
            };
            myChart2.setOption(course_type_option);
          })
        },
        getServer: function () {
          post(this.apiUrlAdmin + '/Summary/GetServer').then(res => {
            let TotalUsed = res.Data.TotalUsed;
            let TotalFreeSpace = res.Data.TotalFreeSpace;
            let TotalSize = res.Data.TotalSize;
            let myChart3 = echarts.init(document.querySelector(".disk"));
            let disk_option = {
              backgroundColor: '#FFF',
              title: {
                text: '磁盘剩余空间',
                padding: [12, 20]
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c}G ({d}%)"
              },
              legend: {
                orient: 'vertical',
                x: 'right',
                y: 'center',
                align: 'left',
                itemGap: 50,
                itemWidth: 15,
                selectedMode: false,
                data: ['已用空间', '可用空间'],
                formatter: function(name) {
                  let data = disk_option.series[0].data;
                  let total = 0;
                  let tarValue;
                  for (let i = 0, l = data.length; i < l; i++) {
                    total += data[i].value;
                    if (data[i].name == name) {
                      tarValue = data[i].value;
                    }
                  }
                  let p = (tarValue / total * 100).toFixed(2);
                  return name + ' ' + ' ' + tarValue + 'G';
                }
              },
              grid: {
                x: '5%'
              },
              series: [{
                name: '磁盘剩余空间',
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['30%', '50%'],
                color: ['#388eee', '#b8b8b8'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: function() {
                      return TotalSize + 'G';
                    },
                    textStyle: {
                      fontSize: '24',
                      fontWeight: 'normal'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [{
                  value: TotalUsed,
                  name: '已用空间'
                }, {
                  value: TotalFreeSpace,
                  name: '可用空间'
                }]
              }]
            };
            myChart3.setOption(disk_option);
          })
        },
        getCourseChannelRate: function () {
          post(this.apiUrlAdmin + '/Summary/GetCourseChannelRate').then(res => {
            let data = res.Data;
            let channelName = Object.keys(data);
            let channelRate = [];
            $.each(data, function(key, val) {
              channelRate.push(val);
            });
            let myChart4 = echarts.init(document.querySelector(".course_channel"));
            let course_channel_option = {
              backgroundColor: '#FFF',
              title: {
                text: '课程频道选择情况（次数）',
                padding: [12, 20]
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                show: false,
                left: 100,
                containLabel: false
              },
              xAxis: {
                show: false,
                type: 'value',
              },
              yAxis: {
                type: 'category',
                inverse: true,
                data: channelName,
                axisLabel: {
                  formatter: function(value) {
                    return value;
                  },
                  margin: 15,
                  lineStyle: {
                    width: 0,
                    opacity: 0
                  }
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              },
              series: [{
                name: '次数',
                type: 'bar',
                data: channelRate,
                color: ['#388eee'],
                label: {
                  normal: {
                    show: true,
                    position: ['100%', '0'],
                    align: 'right'
                  }
                },
              }]
            };

            myChart4.setOption(course_channel_option);
          })
        }
      },
  }
</script>

<style>

</style>

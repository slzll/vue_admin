const localData = {
  data_sex: [
    { "text": "男", "href": "男" },
    { "text": "女", "href": "女" }
  ],
  data_truefalse: [
    { "text": "否", "href": false },
    { "text": "是", "href": true }
  ],
  data_usertype: [
    { "text": "职级", "href": "Grade" },
    { "text": "学位", "href": "Degree" }
  ],
  data_inputtype: [
    { "text": "普通输入框", "href": "input" },
    { "text": "密码框", "href": "inputpassword" },
    { "text": "下拉多选", "href": "dropdowncheck" }, //DataValue 为访问地址
    { "text": "下拉单选", "href": "dropdowncheckone" }, //DataValue 为访问地址
    { "text": "选择框", "href": "check" }, //DataValue 为访问地址
    { "text": "下拉单选（非树状）", "href": "checkonelocaldata" }, //DataValue 本地数据名
    { "text": "搜索单选", "href": "selectsearchdata" },
    { "text": "条件搜索单选", "href": "ifcodeselect" }, //ifcodeselect
    { "text": "下拉单选（异步请求数据）", "href": "combotree" },
    { "text": "开关", "href": "switch" },
    { "text": "radio", "href": "radio" },
    { "text": "附件", "href": "attachment" },
    { "text": "导入附件", "href": "import" },
    { "text": "文本", "href": "textarea" },
    { "text": "JSON", "href": "json" },
    { "text": "隐藏", "href": "hide" }, //新建未渲染无提交，编辑隐藏，详细显示
    { "text": "数字", "href": "number" },
    { "text": "日期", "href": "date" },
    { "text": "日期时间", "href": "dateTime" },
    { "text": "隐藏日期", "href": "uneditdate" },
    { "text": "导航", "href": "navigation" }, //新建未渲染，通过url提交，编辑无法修改
    { "text": "不可编辑", "href": "unedit" },
    { "text": "非Model字段", "href": "nomodel" }, //未渲染，无提交
    { "text": "新增显示", "href": "createShow" },
    { "text": "完全隐藏", "href": "allHidden" },
    { "text": "外键表", "href": "forkey" }

  ],
  data_tableinputtype: [
    { "text": "普通", "href": "input" },
    { "text": "日期", "href": "date" },
    { "text": "内页(新)", "href": "pageparam" },
    { "text": "内页(显)", "href": "pageshow" },
    { "text": "提交(新)", "href": "submitparam" },
    { "text": "提交(显)", "href": "submitshow" },
    { "text": "内页按键point传递", "href": "buttonpagepoint" }, //DataValue 内页的 point (getpointfield?point=)
    { "text": "内页按键id传递", "href": "buttonpage" }, //DataValue 内页的 point (getpointfield?point=)
    { "text": "直接响应按键", "href": "buttonsubmit" }, //DataValue 为访问地址
    { "text": "提交行数据", "href": "submitline" },
    { "text": "内页行数据导航", "href": "pageline" },
    { "text": "存储id", "href": "asid" },
    { "text": "打勾打叉", "href": "tick" },
    { "text": "链接地址", "href": "urllink" },
    { "text": "自定义页面按键", "href": "customebutton" },
    { "text": "自定义操作", "href": "customeAction" },
    { "text": "可编辑", "href": "editline" },
    { "text": "可编辑数字", "href": "editlinenum" },
    { "text": "html编码", "href": "htmlEncode" },
    { "text": "可枚举", "href": "enum" },
    { "text": "可树", "href": "tree" },
    { "text": "提示", "href": "tooltip" },
    { "text": "图片", "href": "img" },
    { "text": "Switch(是否切换)", "href": "switch" }
  ],
  data_searchtype: [
    { "text": "普通输入", "href": "input" },
    { "text": "日期", "href": "date" },
    { "text": "多选", "href": "check" },
    { "text": "多选(byName)", "href": "checkbyname" },
    { "text": "多选id", "href": "checkids" },
    { "text": "单选", "href": "localdata" },
    { "text": "全部打勾打叉", "href": "tick" },
    { "text": "下拉单选（异步请求数据）", "href": "combotree" },
    { "text": "下拉单选（异步请求数据name）", "href": "combotreebyname" }
  ],
  data_coursestatus: [
    { "text": "上线", "href": "Publish" },
    { "text": "下线", "href": "Draft" }
  ],
  data_TableType: [
    { "text": "表", "href": "Table" },
    { "text": "报表", "href": "TableDelay" },
    { "text": "树", "href": "Tree" },
    { "text": "异步树", "href": "TreeAsync" },
    { "text": "新异步树", "href": "NewTreeAsync" },
    { "text": "布局页", "href": "Page" },
    { "text": "平台时间控制页", "href": "Time" },
    { "text": "数据", "href": "Data" },
    { "text": "图表", "href": "Chart" },
    { "text": "自定义", "href": "Custome" }
  ],
  data_Menu: [
    { "text": "菜单", "href": "Menu" },
    { "text": "内页", "href": "Inside" },
    { "text": "其他", "href": "Other" }
  ],
  data_MustId: [
    { "text": "全部", "href": "-1" },
    { "text": "必考", "href": "1" },
    { "text": "非必考", "href": "2" }
  ],
  data_Equal: [
    { "text": "和所选难度相同", "href": "=" },
    { "text": "比所选难度小或相同", "href": "<=" },
    { "text": "比所选难度大或相同", "href": ">=" },
    { "text": "比所选难度小", "href": "<" },
    { "text": "比所选难度大", "href": ">" }
  ],
  data_DisableId: [
    { "text": "全部", "href": "-1" },
    { "text": "容易", "href": "0" },
    { "text": "一般", "href": "1" },
    { "text": "困难", "href": "2" }
  ],
  data_QuestionDisableId: [
    { "text": "容易", "href": "0" },
    { "text": "一般", "href": "1" },
    { "text": "困难", "href": "2" }
  ],
  data_QuestionAnswer: [
    { "text": "A", "href": "A" },
    { "text": "B", "href": "B" },
    { "text": "C", "href": "C" },
    { "text": "D", "href": "D" },
    { "text": "AB", "href": "AB" },
    { "text": "AC", "href": "AC" },
    { "text": "AD", "href": "AD" },
    { "text": "BC", "href": "BC" },
    { "text": "BD", "href": "BD" },
    { "text": "CD", "href": "CD" },
    { "text": "ABC", "href": "ABC" },
    { "text": "ABD", "href": "ABD" },
    { "text": "ACD", "href": "ACD" },
    { "text": "BCD", "href": "BCD" },
    { "text": "ABCD", "href": "ABCD" }
  ],
  data_QuestionItem: [
    { "text": "A", "href": "A" },
    { "text": "B", "href": "B" },
    { "text": "C", "href": "C" },
    { "text": "D", "href": "D" }
  ],
  data_ExamId: [
    { "text": "试卷", "href": "1" },
    { "text": "调查问卷", "href": "2" }
  ],
  data_SourcePath: [
    { "text": "文章", "href": "ImageArticle" },
    { "text": "附件", "href": "Attachment" }
  ],
  data_ContentGroup: [
    { "text": "公有", "href": "Public" },
    { "text": "私有", "href": "Private" },
    { "text": "插件", "href": "Plugins" }
  ],
  data_Grid: [
    { "text": "grid_3", "href": "grid_3" },
    { "text": "grid_4", "href": "grid_4" },
    { "text": "grid_5", "href": "grid_5" },
    { "text": "grid_6", "href": "grid_6" },
    { "text": "grid_7", "href": "grid_7" },
    { "text": "grid_8", "href": "grid_8" },
    { "text": "grid_9", "href": "grid_9" },
    { "text": "grid_10", "href": "grid_10" },
    { "text": "grid_11", "href": "grid_11" },
    { "text": "grid_12", "href": "grid_12" },
    { "text": "grid_13", "href": "grid_13" },
    { "text": "grid_14", "href": "grid_14" },
    { "text": "grid_15", "href": "grid_15" },
    { "text": "grid_16", "href": "grid_16" },
    { "text": "grid_17", "href": "grid_17" },
    { "text": "grid_18", "href": "grid_18" },
    { "text": "grid_19", "href": "grid_19" },
    { "text": "grid_20", "href": "grid_20" },
    { "text": "grid_21", "href": "grid_21" },
    { "text": "grid_22", "href": "grid_22" },
    { "text": "grid_23", "href": "grid_23" },
    { "text": "grid_24", "href": "grid_24" }
  ],
  data_ColMd: [
    { "text": "col-md-3", "href": "col-md-3" },
    { "text": "col-md-4", "href": "col-md-4" },
    { "text": "col-md-5", "href": "col-md-5" },
    { "text": "col-md-6", "href": "col-md-6" },
    { "text": "col-md-7", "href": "col-md-7" },
    { "text": "col-md-8", "href": "col-md-8" },
    { "text": "col-md-9", "href": "col-md-9" },
    { "text": "col-md-10", "href": "col-md-10" },
    { "text": "col-md-11", "href": "col-md-11" },
    { "text": "col-md-12", "href": "col-md-12" }
  ],
  data_ShowLevel: [
    { "text": "列表显示", "href": "2" },
    { "text": "列表更多显示", "href": "1" },
    { "text": "列表不显示", "href": "0" }
  ],
  data_SignType: [
    { "text": "上午签到", "href": "AMIn" },
    { "text": "上午签退", "href": "AMOut" },
    { "text": "下午签到", "href": "PMIn" },
    { "text": "下午签退", "href": "PMOut" }
  ],
  data_OutlineTrainingCreditItem: [
    { "text": "脱产培训", "href": "脱产培训" },
    { "text": "集体学习", "href": "集体学习" },
    { "text": "中心组学习", "href": "中心组学习" },
    { "text": "专业资格考试", "href": "专业资格考试" },
    { "text": "我是党课主讲人", "href": "我是党课主讲人" },
    { "text": "发表心得体会", "href": "发表心得体会" },
    { "text": "其他", "href": "" }
  ],
  data_ShowLevel: [
    { "text": "列表显示", "href": "2" },
    { "text": "列表更多显示", "href": "1" },
    { "text": "列表不显示", "href": "0" }
  ]
};

export default localData;

// 请求后台数据入口 ---
// var API_URL = "/api2";// "/api2";  // "http://test7.jy365.net/api | http://192.168.1.72:5001/debugapi | http://192.168.1.73:9020/api";
const API_URL = "http://test10.jy365.net/api"
const API_URL_ADMIN = API_URL + "/admin";
const NAVISOBJ = false;

const IMPORT = {
    userimportfields: "用户导入模板.xls",
    courseimportfields: "课程导入模板.xls",
    examimportlist: "试题导入模板.xls",
    traininguserimportlist: "培训班用户导入模板.xls",
    groupimportfieldlist: "单位导入模板.xls",
    coursenodeimportlist: "课程节点导入模板.xls",
    pointfieldimport: "字段导入模版",
    courseurlimport: "课程地址模版.xls",
    a: "用户排行设置导入模板.xls"
};

const BROSWER = (function() {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; // 判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; // 判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; // 判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; // 判断是否Safari浏览器
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
        return "IE";
    } // isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    return "Other";
})();

export default {
    API_URL,
    API_URL_ADMIN,
    NAVISOBJ,
    IMPORT,
    BROSWER
};
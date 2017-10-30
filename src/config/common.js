/*Object操作扩展*/
export const getByKey = function (obj, key) {
  let val = {};
  let key1,key2;
  if (/|/.test(key)){
    key1 = key.split('|')[0];
    key2 = key.split('|')[1];
  }else{
    key1 = key;
    key2 = key;
  }

  Object.defineProperty(val, key2, {
    value: obj[key1],
    configurable: true,
    enumerable: true,
    writable: true,
  });
  return val;
};
export const getUrlSearch = function (obj, key) {
  let str = '?';
  str+=key+'='+obj[key];
  return str;
};

export const AntiForgeryToken = function (apiUrl,options) {
  $.ajax({
    url: apiUrl + "/page/AntiForgeryToken",
    type: "POST",
    async: true,
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    xhrFields: {
      withCredentials: true
    },
    success: function (data) {
      if ($("#tab_"+options.Code).find("[name='__RequestVerificationToken']").length > 0) {
        $("#tab_"+options.Code).find("[name='__RequestVerificationToken']").remove();
      }
      $("#tab_"+options.Code).prepend(data.html);
    }
  });
};

export const addAntiForgeryToken = function (data, $outer) {
  if (!!$outer) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]', $outer).val();
    return data;
  }
  else {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
  }
};

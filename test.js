const TronWeb = require('tronweb')

let tronWeb = new TronWeb({
    fullHost: 'https://test.io'
});

let target = 'egp'
let pattern = new RegExp(target.toLocaleLowerCase()+'$')


function create() {
    tronWeb.createAccount().then(function (result) {
        console.log(result);
        let addr = result.address.base58.toLocaleLowerCase();

        let _time = dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        let html = "[" + _time + "]-" + ":" + addr;
        console.log(html)

        if (pattern.test(addr)) {
            let html2 = "地址:" + addr + "\n私钥:" + result.privateKey
            console.log(html2)
        }else{
            create();
        }
    });
}

function dateFtt(fmt, date) {
    const o = {
        "M+": date.getMonth() + 1,     //月份
        "d+": date.getDate(),     //日
        "h+": date.getHours(),     //小时
        "m+": date.getMinutes(),     //分
        "s+": date.getSeconds(),     //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()    //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

create()

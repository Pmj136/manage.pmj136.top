export default {
    has(key) {
        const str = document.cookie;//获取cookie字符串
        const arrCookie = str.split("; ");//分割
        //遍历匹配
        for (let i = 0; i < arrCookie.length; i++) {
            const arr = arrCookie[i].split("=");
            if (arr[0] === key) return true;
        }
        return false;
    },
    del(key) {
        const date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = key + "=删" + "; expires=" + date.toUTCString();
    },
};
import request from "@/utils/request";

export function getHomeData() {
    return request({
        url: '/app/manage/home',
        method: "get",
    })
}

export function getLinkList(data) {
    return request({
        url: '/app/link/list',
        method: "post",
        data
    })
}

export function addLink(data) {
    return request({
        url: '/app/link/add',
        method: "post",
        data
    })
}

export function delLink(data) {
    return request({
        url: '/app/link/del',
        method: "post",
        data
    })
}



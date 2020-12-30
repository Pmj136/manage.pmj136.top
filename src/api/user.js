import request from "@/utils/request";

export function login(data) {
    return request({
        url: '/user/login',
        method: "post",
        data
    })
}


export function logout() {
    return request({
        url: "/user/logout",
        method: "post"
    })
}

export function auth() {
    return request({
        url: "/user/auth",
        method: "get"
    })
}

export function getUserList(data) {
    return request({
        url: "/user/list",
        method: "post",
        data
    })
}

export function updateInfo(data) {
    return request({
        url: "/user/info/manage",
        method: "post",
        data
    })
}

export function freezeUser(data) {
    return request({
        url: "/user/freeze",
        method: "post",
        data
    })
}



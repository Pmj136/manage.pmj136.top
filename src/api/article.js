import request from "@/utils/request";

export function getArticleList(data) {
    return request({
        url: '/article/manage/list',
        method: "post",
        data
    })
}

export function getTagList(data) {
    return request({
        url: '/article/tag/list',
        method: "post",
        data
    })
}

export function addTag(data) {
    return request({
        url: '/article/tag/add',
        method: "post",
        data
    })
}

export function updateTag(data) {
    return request({
        url: '/article/tag/update',
        method: "post",
        data
    })
}

export function getTypeList(data) {
    return request({
        url: '/article/type/list',
        method: "post",
        data
    })
}

export function addType(data) {
    return request({
        url: '/article/type/add',
        method: "post",
        data
    })
}

export function updateType(data) {
    return request({
        url: '/article/type/update',
        method: "post",
        data
    })
}




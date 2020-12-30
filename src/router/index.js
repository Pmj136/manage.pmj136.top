import Cookie from "@/utils/jsCookie"
import Layout from "@/Layout"

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: "/",
                redirect: "/home"
            },
            {
                path: "/home",
                component: () => import("@/views/home"),
                meta: {
                    verify: true,
                    title: "首页"
                }
            },
            {
                path: "/user",
                component: () => import("@/views/user"),
                meta: {
                    verify: true,
                    title: "用户列表"
                }
            },
            {
                path: "/tag",
                component: () => import("@/views/web-manage/tag"),
                meta: {
                    verify: true,
                    title: "标签管理"
                }
            },
            {
                path: "/link",
                component: () => import("@/views/web-manage/link"),
                meta: {
                    verify: true,
                    title: "友链管理"
                }
            },
            {
                path: "/type",
                component: () => import("@/views/web-manage/type"),
                meta: {
                    verify: true,
                    title: "类别管理"
                }
            },
            {
                path: "/article",
                component: () => import("@/views/web-manage/article"),
                meta: {
                    verify: true,
                    title: "文章列表"
                }
            },
        ]
    },
    {
        path: "/login",
        component: () => import("@/views/login"),
        meta: {
            title: "管理系统-登录",
            verify: false
        }
    },
    {
        path: '/*',
        component: () => import("@/views/error-page/404"),
        meta: {
            title: "页面未找到",
            verify: false
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

const nanobar = new Nanobar({
    target: document.getElementById("app-header")
});
router.beforeEach((to, from, next) => {
    const {meta} = to
    document.title = meta.title;
    if (meta.verify) {
        const hasToken = Cookie.has("token")
        if (!hasToken)
            next("/login")
        else
            next()
    } else
        next()

});
router.afterEach(() => {
    nanobar.go(100)
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import UserOder from "@/views/UserOder.vue";
import Admin from "@/views/Admin.vue";
import Enterprise from "@/views/Enterprise.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login', // 重定向到登录页
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/userOder',
            name: 'UserOder',
            component: UserOder,
            meta: { requiresAuth: true } // 添加需要登录的路由元信息
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: { requiresAuth: true }
        },
        {
            path: '/enterprise',
            name: 'Enterprise',
            component: Enterprise
        }
        // 其他路由配置
    ]
});

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // 需要登录的页面
        const token = localStorage.getItem("token");
        if (!token) {
            // 如果没有令牌，重定向到登录页面
            next({
                path: "/login",
                query: { redirect: to.fullPath },
            });
        } else {
            // 用户已登录，允许访问
            next();
        }
    } else {
        // 不需要登录的页面，直接访问
        next();
    }
});

export default router;

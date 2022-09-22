import router from "./router/"
import store from './store/'
router.beforeEach(async (to, from, next) => {
    let token = store.getters.SET_TOKEN
    if (token) {
        next()
        if (to.path == '/login') {
            next(form.path)
        } else {
            let info = store.getters.SET_INFO
            info = typeof info === 'object' ? JSON.stringify(info) : info
            if (info === "{}" || info == '') {
                const userInfo = await store.dispatch('handleInfo')
                console.log(userInfo);
                if (userInfo) {
                    next()
                }else{
                    next('/login')
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next('/login')
        }
    }
})
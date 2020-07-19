import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    routes: [{
        path: '/',
        redirect: '/index'
    },{
        path: '/index',
        name: 'Index',
        component: () =>
            import ('../pages/index'),
      
    },{
        path: '/content',
        name: 'Content',
        component: () =>
            import ('../pages/content'),
      
    } ]
})
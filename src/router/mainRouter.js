import system from './modules/_system'
import home from './modules/_index'

const mainRouter = {
    path: '/main',
    name: 'main',
    component: resolve => { require(['@/layout/index.vue'], resolve) },
    children: [
        ...home,
        ...system
    ]
}

export default mainRouter
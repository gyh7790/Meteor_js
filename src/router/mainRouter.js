import system from './modules/_system'
import home from './modules/_index'
import modular from './modules/_components'

const mainRouter = {
    path: '/main',
    name: 'main',
    component: resolve => { require(['@/layout/index.vue'], resolve) },
    children: [
        ...home,
        ...modular,
        ...system
    ]
}

export default mainRouter
import system from './modules/_system'
import home from './modules/_index'
import app from './modules/_app'
import sysDev from './modules/_sys-dev'
import modular from './modules/_components'

const mainRouter = {
    path: '/main',
    name: 'main',
    component: resolve => { require(['@/layout/index.vue'], resolve) },
    children: [
        ...home,
        ...modular,
        ...app,
        ...system,
        ...sysDev
    ]
}

export default mainRouter
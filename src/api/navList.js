
export function getRouter(routes) {
    const res = []

    routes.forEach(route => {
        let tmpNav = {}
        let meta = {}
        const tmp = { ...route }
        tmpNav.path = tmp.href
        meta.title = tmp.name
        meta.icon = tmp.icon
        tmpNav.meta = meta
        if (tmp.children) {
            tmpNav.children = getRouter(tmp.children)
        }
        res.push(tmpNav)
    })
    return res
}
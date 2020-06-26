
export function getRouter(routes) {
    const res = []

    routes.forEach(route => {
        let tmpNav = {}
        let meta = {}
        const tmp = { ...route }
        tmpNav.path = tmp.target
        meta.title = tmp.name
        meta.icon = tmp.icon
        tmpNav.meta = meta
        tmpNav.redirect = tmp.target
        if (tmp.children && Array.from(tmp.children).length > 0) {
            tmpNav.redirect = tmp.target+'/'+(tmp.children)[0].target
            tmpNav.children = getRouter(tmp.children)
        }
        res.push(tmpNav)
    })

    return res
}
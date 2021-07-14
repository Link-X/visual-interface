import React from 'react'
import { Redirect } from 'react-router-dom'

import Index from '@/pages/app'
import Home from '@/pages/home'

const routerRender = (props: any): React.CElement<any, React.Component<any, any, any>> => {
    if (props.route.meta && props.route.meta.title) {
        document.title = props.route.meta.title
    } else {
        document.title = '首页'
    }
    return React.createElement(props.route.component, props)
}

const routes = [
    {
        component: Index,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => <Redirect to={'/home'} />
            },
            {
                path: '/home',
                component: Home,
                meta: {
                    title: '首页'
                },
                render: routerRender
            }
        ]
    }
]

export default routes


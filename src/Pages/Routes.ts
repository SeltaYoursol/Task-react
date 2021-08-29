import { ComponentType } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import  Detail  from 'Pages/Detail/Detail'
import Main  from 'Pages/Main/Main'

interface Route {
    link: string
    title: string
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
}

export const Pages: Array<Route> = [
    {
        link: '/',
        title: 'Main',
        component: Main,
    },
    {
        link: '/detail',
        title: 'Detail',
        component: Detail,
    },
]
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './root'

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
    <BrowserRouter basename="/">
        <Root />
    </BrowserRouter>,
    MOUNT_NODE
)

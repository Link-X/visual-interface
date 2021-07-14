import React from 'react'

import { renderRoutes } from 'react-router-config'

const Index = (props) => {
    console.log(props)
    return <div className="big-data_box">{renderRoutes(props.route.routes)}</div>
}

export default Index

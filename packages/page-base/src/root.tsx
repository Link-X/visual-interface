import { renderRoutes, RouteConfig } from 'react-router-config'
// import { hot } from 'react-hot-loader/root'
// import { setConfig } from 'react-hot-loader'
import routes from './router'

const RouterComponent = (): JSX.Element => {
    return renderRoutes(routes as RouteConfig[])
}

// setConfig({ logLevel: 'debug' })

const Root = RouterComponent

export default Root

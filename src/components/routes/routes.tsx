import React, { ReactElement, ReactNode } from "react"
import { Route, Router, useLocation, Switch, Redirect } from "react-router-dom"
import Landing from "Container/Landing"
import NoMatch from "Views/NoMatch"
import ProductList from "../ProductList"
import StoreList from "../StoreList"
import ProductPage from "../ProductPage"
import Login from "../Login"

import { createBrowserHistory } from 'history'
import Cart from "../Cart"
import AuthContext from "../../context/auth"
const newHistory = createBrowserHistory();


const routesArr = [
  {
    path: "/",
    component: Landing,
    exact: true,
  },
  {
    path: "/products",
    component: ProductList,

    
  },
  {
    path: "/stores",
    component: StoreList,
  },
  {
    path: "*",
    component: NoMatch,
  },
]

type RouteType = {
  path: string
  exact?: boolean
  component: ReactNode
  routes?: SubRouteType[]
}

type SubRouteType = {
  path: string
  component: ReactNode
}

const RouteWithSubRoutes = (route:any) => (
  <Route path={route.path} exact={true} render={props => (
    // 把自路由向下传递来达到嵌套。
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const Routes: React.FC = () => {
  const { signed, user, Logout } = React.useContext(AuthContext);   

  return (
    <Switch >
       <Route exact path="/login" render={() => (
  signed ? (
    <Redirect to="/"/>
  ) : (
    <Login/>
  )
)}/>

<Route exact path="/cart" render={() => (
  !signed ? (
    <Redirect to="/"/>
  ) : (
    <Cart/>
  )
)}/>
      {routesArr.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
               

    </Switch>
  )
}

export default Routes

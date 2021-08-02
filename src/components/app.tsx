import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import "../assets/main.css"

import Login from "./Login"
import { AuthProvider } from "../context/auth"
import GlobalState from "../context/GlobalContext"
import Routes from "Routes/routes"
import Footer from "Container/Footer"
import Header from "Container/Header"
import Shell from "Shell/shell"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalState>      
      <Router>
        <Route path="/">
        {/* <Route path="/login" exact={true} component={Login}/> */}
          <Shell header={<Header/>} footer={<Footer/>}>
            <Routes/>
          </Shell>
        </Route>
      </Router>
      </GlobalState>
    </AuthProvider>
    // <GlobalState>
    //   <Router>
    //     <Switch>
    //       <Route path="/login" component={Login} />
    //       <Shell header={Header} footer={Footer}>
    //       </Shell>
    //     </Switch>
    //   </Router>
    // </GlobalState>
  )
}

export default App

import React, { useState } from "react"
import { Link } from "react-router-dom"
import Menu from "Assets/logo/menu.svg"
import Brand from "Assets/logo/brand.svg"

import "./header.css"
import AuthContext from "../../context/auth"

export default function Header() {
  const { signed, user, Logout } = React.useContext(AuthContext);   
  console.log(signed, user);

  const [burgerClicked, setBurgerClicked] = useState(false)
  const [dropdownOpen, setDropdown] = useState(false)

  const logout = () => {
    Logout();
  }

  const toggleBurgerClick = (): void => {
    setBurgerClicked(!burgerClicked)
  }

  return (
    <React.Fragment>
 <nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        
        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>

        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex-shrink-0 flex items-center text-white">
          Sistema comercial
        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            
            <Link className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" to="/" onClick={toggleBurgerClick}>Home</Link>

            <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/stores" onClick={toggleBurgerClick}>Lojas</Link>

                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/products" onClick={toggleBurgerClick}>Produtos   </Link>


                {/* <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/products" onClick={toggleBurgerClick}>Navegação   </Link> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>

        </button>

      {signed ? (       
        <React.Fragment>

       
        <p className="text-white px-3 py-2 rounded-md text-sm font-medium">Bem vindo, {user.nome}</p>
        <Link className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" to="/cart" onClick={toggleBurgerClick}>Carrinho</Link>

        <button className="bg-red-500 ml-2 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={logout}>Logout</button>



        </React.Fragment>
) : (       
  <React.Fragment>
      <Link className=" text-white px-3 py-2 rounded-md text-sm font-medium" to="/login">Login</Link>

     
  </React.Fragment>


)}


        
       
      </div>
    </div>
  </div>

  
  <div className="sm:hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1">
      
      <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>

    </React.Fragment>

    // <React.Fragment>
    //   <div id="logo" classNameNameNameName="flex-1 flex items-center text-2xl">
    //     {" "}
    //     <Link to="/" classNameNameNameName="flex flex-1 items-center">
    //       <Brand style={{ height: 42, width: 30 }} />
    //       <p classNameNameNameName="px-2 font-sans">Brand</p>
    //     </Link>
    //   </div>

    //   <label
    //     htmlFor="menu-toggle"
    //     classNameNameNameName="cursor-pointer lg:hidden block"
    //     onClick={() => {
    //       toggleBurgerClick()
    //     }}
    //   >
    //     <Menu style={{}} />
    //   </label>
    //   <input
    //     type="checkbox"
    //     classNameNameNameName="hidden"
    //     id="menu-toggle"
    //     checked={burgerClicked}
    //     onChange={() => {}}
    //   />

    //   <div
    //     classNameNameNameName="hidden lg:flex lg:items-center lg:w-auto w-full"
    //     id="menu"
    //   >
    //     <nav>
    //       <ul classNameNameNameName="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
    //         <li classNameNameNameName="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
    //           <Link to="/" onClick={toggleBurgerClick}>
    //             <span
    //               style={{
    //                 animation: `navLinkAnimation 0.5s ease forwards ${
    //                   1 / 5 + 0.5
    //                 }s`,
    //               }}
    //             >
    //               Home
    //             </span>
    //           </Link>
    //         </li>
    //         <li classNameNameNameName="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
    //           <Link to="/about" onClick={toggleBurgerClick}>
    //             <span
    //               style={{
    //                 animation: `navLinkAnimation 0.5s ease forwards ${
    //                   2 / 5 + 0.5
    //                 }s`,
    //               }}
    //             >
    //               About
    //             </span>
    //           </Link>
    //         </li>
    //         <li classNameNameNameName="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
    //           <Link to="/user" onClick={toggleBurgerClick}>
    //             <span
    //               style={{
    //                 animation: `navLinkAnimation 0.5s ease forwards ${
    //                   1 / 5 + 0.5
    //                 }s`,
    //               }}
    //             >
    //               user
    //             </span>
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </React.Fragment>
  )
}

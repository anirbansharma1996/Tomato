import React from 'react'
import "./Sidebar.css"
import {assets} from "../../assets/assets"
import {NavLink} from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
      <NavLink to="/" className="sidebar-option">
          <img width={30} src={assets.home_icon} alt="" />
          <p>Home</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img width={30} src={assets.cart_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>

    </div>
  )
}

export default Sidebar
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
// import logo from 'assets/images/logo.svg'
// import menu from 'assets/images/menu.svg'
// import { Routes } from './Routes.SideMenu'
import './SideMenu.css'

// ii18n
function SideMenu(props) {



  return (
    <div className="SideMenu bg-white min-vh-100">
      <div className="d-flex justify-content-between align-items-center px-3 header">
        {/* <img src={logo} alt="" className="logo " style={{ width: '100px' }} /> */}
        {/* <button type="button" onClick={handleSideMenu} className="pointer none-btn">
          <img src={menu} alt="" className="img18" />
        </button> */}
      </div>
      <div className="menu px-2">
        <div class="">
          <NavLink to='/home' className='text-decoration-none'>
            <div className="d-flex  align-items-center p-2 LinkPage">
              {/* <img src={x.img} alt="members" className="img23 " /> */}
              <p className="fw-bold px-2 fz12 m-0 ">رفع ملف</p>
            </div>
          </NavLink>
        </div>
        <div class="py-1">
          <NavLink to='/home2' className='text-decoration-none'>
            <div className="d-flex  align-items-center p-2 LinkPage">
              {/* <img src={x.img} alt="members" className="img23 " /> */}
              <p className="fw-bold px-2 fz12 m-0 "> اصدار يدوي</p>
            </div>
          </NavLink>
        </div>

        
      </div>
    </div>
  )
}


export default SideMenu

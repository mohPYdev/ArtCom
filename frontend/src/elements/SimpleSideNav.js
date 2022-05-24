import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faDog,
  faBone,
  faCog,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"

import Button from "../components/Button"
import Avatar from "../components/Avatar"
import Badge from "../components/Badge"

function SimpleSideNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  let navClass =
    "w-72 max-w-full bg-blue-800 h-screen flex flex-col text-white fixed lg:absolute lg:sticky top-0 transition-transform transform duration-500 ease"
  if (mobileOpen) navClass += " translate-x-0"
  else navClass += " -translate-x-full lg:translate-x-0"
  return (
    <div className={navClass}>
      <FontAwesomeIcon
        icon={mobileOpen ? faTimes : faBars}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="absolute right-0 transform translate-x-double top-0 mt-8 text-3xl text-blue-800 cursor-pointer lg:hidden"
      />
      <a href="#" className="no-underline block mt-6">
        <img
          src="https://gustui.s3.amazonaws.com/Gust+Logo+White.png"
          className="w-40 mx-auto"
        />
      </a>
      <div className="flex-1 mt-8">
        <div className="px-8">
          <Button text="Add Food" size="sm" full />
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="flex justify-between no-underline w-full px-8 py-3 border-l-4 text-sm transition-colors duration-200 ease-in-out hover:text-blue-400 bg-blue-900 border-blue-400"
          >
            <div>
              <FontAwesomeIcon icon={faHome} className="mr-4" /> Home
            </div>
          </a>
          <a
            href="#"
            className="flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent text-sm transition-colors duration-200 ease-in-out hover:text-blue-400"
          >
            <div>
              <FontAwesomeIcon icon={faDog} className="mr-4" /> Dogs
            </div>
            <Badge type="dark" text="3" />
          </a>
          <a
            href="#"
            className="flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent text-sm transition-colors duration-200 ease-in-out hover:text-blue-400"
          >
            <div>
              <FontAwesomeIcon icon={faBone} className="mr-4" /> Bones
            </div>
          </a>
          <a
            href="#"
            className="flex justify-between no-underline w-full px-8 py-3 border-l-2 border-transparent text-sm transition-colors duration-200 ease-in-out hover:text-blue-400"
          >
            <div>
              <FontAwesomeIcon icon={faCog} className="mr-4" /> Settings
            </div>
          </a>
        </div>
        <div className="mt-6 px-8">
          <h5 className="text-gray-300 text-sm font-medium">Foods</h5>
          <div className="mt-2">
            <a
              href="#"
              className="block no-underline text-sm py-1 transition-colors duration-200 ease-in-out hover:text-blue-400"
            >
              Peanut Butter
            </a>
            <a
              href="#"
              className="block no-underline text-sm py-1 transition-colors duration-200 ease-in-out hover:text-blue-400"
            >
              Pepperoni Pizza
            </a>
            <a
              href="#"
              className="block no-underline text-sm py-1 transition-colors duration-200 ease-in-out hover:text-blue-400"
            >
              Spaghetti & Meatballs
            </a>
            <a
              href="#"
              className="block no-underline text-sm py-1 transition-colors duration-200 ease-in-out hover:text-blue-400"
            >
              Bacon Bits
            </a>
          </div>
        </div>
      </div>
      <div className="flex px-8 py-6 items-center">
        <Avatar image="https://gustui.s3.amazonaws.com/avatar.png" />
        <div class="flex-1 ml-4">
          <p className="font-medium leading-none">Cesar Rome</p>
          <a
            href="#"
            className="no-underline text-xs text-gray-300 leading-none"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  )
}

export default SimpleSideNav
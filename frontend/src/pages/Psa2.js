import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faQuestionCircle,
  faBell,
  faBars,
  faTimes,
  faCog,
  faSignOutAlt,
  faHeart,
  faUsers,
  faEye,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"

import SimpleSideNav from "../elements/SimpleSideNav.js"
import Avatar from "../components/Avatar"
import Dropdown from "../components/Dropdown"
import StatCard from "../components/StatCard"
import StripedTable from "../elements/StripedTable"

export default function Psa2() {
    const [openDropdown, setOpenDropdown] = useState(false)
  return (

    <div className="flex">
      <SimpleSideNav />
      <div className="flex-1 min-h-screen bg-gray-200">
        <div className="w-full py-6 px-6 bg-white border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-lg font-bold text-blue-800 pl-12 lg:pl-0">
            Home
          </h2>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="text-xl cursor-pointer ml-4"
            />
            <FontAwesomeIcon
              icon={faBell}
              className="text-xl cursor-pointer ml-4"
            />
            <div className="relative ml-4">
              <Avatar
                image="https://picsum.photos/id/237/200/200.jpg"
                className="cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
                status="online"
              />
              {openDropdown && (
                <Dropdown
                  header={<h2 className="font-bold">John Stevens</h2>}
                  options={[
                    {
                      id: "1",
                      link: "/likes",
                      icon: <FontAwesomeIcon icon={faHeart} />,
                      text: "My Likes",
                    },
                    {
                      id: "2",
                      link: "/settings",
                      icon: <FontAwesomeIcon icon={faCog} />,
                      text: "Settings",
                    },
                    {
                      id: "3",
                      link: "/logout",
                      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
                      text: "Logout",
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full max-w-screen-xl py-12 px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Overview</h2>
            <div className="flex flex-wrap justify-between">
              <StatCard
                title="Subscribers"
                stat={24}
                link="/"
                icon={<FontAwesomeIcon icon={faUsers} />}
                className="mb-6 xl:mb-0"
              />
              <StatCard
                title="Total Views"
                stat={"328,743"}
                link="/"
                icon={<FontAwesomeIcon icon={faEye} />}
                statSize="text-4xl"
                className="mb-6 xl:mb-0"
              />
              <StatCard
                title="Unread Messages"
                stat={2}
                link="/"
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                className="mb-6 xl:mb-0"
              />
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Subscribers</h2>
            <StripedTable />
          </div>
        </div>
      </div>
    </div>
  )
}

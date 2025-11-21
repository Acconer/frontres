import React, { useRef } from 'react'

// assets
import SimpleBar from 'simplebar-react'
import AppMenu from './Menu'
import { getMenuItems } from '../helpers/menu'
import LogoBox from '@/src/components/Global/LogoBox'
import { User } from '../Objects'

/* Sidebar content */
const SideBarContent = () => {
	return (
		<>
			<AppMenu menuItems={getMenuItems()} />
		</>
	)
}

interface LeftSideBarProps {
	isCondensed: boolean
	isLight: boolean
	hideUserProfile: boolean
  hideLogo?: boolean
  data: User
}
const LeftSideBar = ({ hideLogo }: LeftSideBarProps) => {

    const menuNodeRef = useRef<HTMLDivElement>(null)
  return (
    <div className="app-menu hidden lg:block" ref={menuNodeRef}>
        {!hideLogo && <LogoBox />}

        <button id="button-hover-toggle" className="absolute top-5 end-2 rounded-full p-1.5 z-50">
            <span className="sr-only">Menu Toggle Button</span>
            <i className="ri-checkbox-blank-circle-line text-xl"></i>
        </button>

        <SimpleBar className="scrollbar">
            <SideBarContent />
        </SimpleBar>
    </div>
  )
}

export default LeftSideBar

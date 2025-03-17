import './Sidebar.css'
import AddIcon from '../assets/icons8-add-30.png'
import CompletedIcon from './completed.png'
import DashboardIcon from '../assets/transaction-list.png'
import React from 'react';
import {NavLink} from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";

const Sidebar = () => {
    const { user } = useAuthContext()

    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={user.photoURL}/>
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <img src={DashboardIcon} alt="Dashboard icon"/>
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="Add document"/>
                                <span>New Project</span>
                            </NavLink>
                            <NavLink to='/not-published'>
                                <img src={CompletedIcon} alt="View not published assignments"/>
                                <span className='smallSidebar'>Not published</span>
                            </NavLink>
                            <NavLink to='/completed'>
                                <img src={CompletedIcon} alt="View Completed Documents"/>
                                <span className='smallSidebar'>Completed</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;

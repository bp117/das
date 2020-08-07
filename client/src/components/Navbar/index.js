import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Sidebar = (props) => {
    const {
        onClose
    } = props;
    return (
        <div className="navbar-master-container">
            <nav className ="navbar bg-dark cs-navbar">

                <div className="cs-navbar-logo-container">
                    EDAS Console
                </div>
                <div className="navbar-collapse cs-navbar-container" id="colp">
                    <ul className ="nav navbar-nav">
                        <li className ="nav-item active">
                            <Link onClick={onClose} className="nav-link" role="button" to='/project'>
                                Project
                            </Link>
                        </li>
                        <li className ="nav-item active">
                            <Link onClick={onClose} className="nav-link" role="button" to="/setup">
                                Setup
                            </Link>
                            <Link onClick={onClose} className="nav-link" role="button" to="/users">
                                Users
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default Sidebar;
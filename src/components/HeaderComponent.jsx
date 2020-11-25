import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from '../api/AuthenticationService.js'


class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.getLoggedUserName();
        console.log(isUserLoggedIn);

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        <div className="navbar-brand">ТЗИС</div>
                        {isUserLoggedIn && <li ><Link className="nav-link" to="/words">Слова</Link></li>}
                        {isUserLoggedIn && <li ><Link className="nav-link" to="/sessions">Сессии</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li ><Link className="nav-link" to="/login">Войти</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout"
                                                     onClick={AuthenticationService.logout}>Выйти</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent
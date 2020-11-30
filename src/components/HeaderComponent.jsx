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
                        <div className="navbar-brand" style={{fontFamily: "Iosevka Heavy"}}>ТЗИС</div>
                        {isUserLoggedIn && <li ><Link className="nav-link" to="/words" style={{fontFamily: "Iosevka"}}>Слова</Link></li>}
                        {isUserLoggedIn && <li ><Link className="nav-link" to="/sessions" style={{fontFamily: "Iosevka"}}>Сессии</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li ><Link className="nav-link" to="/login" style={{fontFamily: "Iosevka"}}>Войти</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout"
                                                     onClick={AuthenticationService.logout} style={{fontFamily: "Iosevka"}}>Выйти</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent
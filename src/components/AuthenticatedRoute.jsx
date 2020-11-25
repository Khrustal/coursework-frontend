import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from '../api/AuthenticationService.js'

class AuthenticatedRoute extends Component {    
    render() {
        if(AuthenticationService.getLoggedUserName()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute
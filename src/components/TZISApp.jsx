import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import SignupComponent from './SignupComponent'
import CreateWordComponent from './CreateWordComponent'
import WordsComponent from './WordsComponent'
import UpdateWordComponent from './UpdateWordComponent'
import SessionsComponent from './SessionsComponent'
import CreateSessionComponent from './CreateSessionComponent'
import SessionComponent from './SessionComponent'
import AddWordsToSessionComponent from './AddWordsToSessionComponent'
import TestComponent from './TestComponent'
import ResultsComponent from './ResultsComponent'
import ResultComponent from './ResultComponent'
import '../Basic.css'

class TZISApp extends Component {
    render() {
        return (
            <div>
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/signup" component={SignupComponent}/>
                        <AuthenticatedRoute path="/words/create" component={CreateWordComponent}/>
                        <AuthenticatedRoute path="/words/update/:id" component={UpdateWordComponent}/>
                        <AuthenticatedRoute path="/words" component={WordsComponent}/>
                        <AuthenticatedRoute path="/sessions/create" component={CreateSessionComponent}/>
                        <AuthenticatedRoute path="/sessions/:id/add" component={AddWordsToSessionComponent}/>
                        <AuthenticatedRoute path="/sessions/:id/test" component={TestComponent}/>
                        <AuthenticatedRoute path="/sessions/:id/results/:resultId" component={ResultComponent}/>
                        <AuthenticatedRoute path="/sessions/:id/results" component={ResultsComponent}/>
                        <AuthenticatedRoute path="/sessions/:id" component={SessionComponent}/>
                        <AuthenticatedRoute path="/sessions" component={SessionsComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}

export default TZISApp
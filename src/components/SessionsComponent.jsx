import React, {Component} from 'react'
import DataService from "../api/DataService";
import AuthenticationService from './AuthenticationService.js'

class SessionsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            sessions : [],
            message : null
        }
        this.deleteSessionClicked = this.deleteSessionClicked.bind(this)   
        this.openSessionClicked = this.openSessionClicked.bind(this)   
        this.addSessionClicked = this.addSessionClicked.bind(this)
        this.refreshSessions = this.refreshSessions.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidMount() {
        this.refreshSessions();
    }

    refreshSessions() {
        let userId = AuthenticationService.getLoggedUserId();
        DataService.retrieveAllSessions(userId)
          .then(
              response => {
                  this.setState({sessions : response.data})
              }
          ) 
    }

    deleteSessionClicked(id) {
        DataService.deleteSession(id)
         .then (
             response => {
                this.setState({message : `Сессия удалена`})
                this.refreshSessions()
             }
         )
        
    }

    addSessionClicked() {
        this.props.history.push(`/sessions/create`)
    }

    openSessionClicked(id) {
        this.props.history.push(`/sessions/${id}`)
    }

    render() {
        return (
            <div>
                 <h1>Сессии</h1>
                 {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th><button className="btn btn-success" onClick={this.addSessionClicked}>+ Добавить</button></th>
                                <th>Название</th>
                                <th>Открыть</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.sessions.map (
                                session =>
                                    <tr key={session.id}>
                                        <td></td>
                                        <td>{session.name}</td>
                                        <td><button className="btn btn-success" onClick={() => this.openSessionClicked(session.id)}>Открыть</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteSessionClicked(session.id)}>Удалить</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
}

export default SessionsComponent
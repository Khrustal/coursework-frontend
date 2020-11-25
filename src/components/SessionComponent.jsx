import React, {Component} from 'react'
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'

class SessionComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            words : [],
            message : null
        }
        this.deleteWordClicked = this.deleteWordClicked.bind(this)   
        this.addWordClicked = this.addWordClicked.bind(this)
        this.refreshWords = this.refreshWords.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidMount() {
        this.refreshWords();
    }

    refreshWords() {
        DataService.retrieveSessionWords(this.props.match.params.id)
          .then(
              response => {
                  this.setState({words : response.data})
              }
          ) 
    }

    deleteWordClicked(id) {
        DataService.deleteWordFromSession(id, this.props.match.params.id)
         .then (
             response => {
                this.setState({message : `Слово удалено из сессии`})
                this.refreshWords()
             }
         )
        
    }

    addWordClicked() {
        let sessionId = this.props.match.params.id;
        this.props.history.push(`/sessions/${sessionId}/add`)
    }

    render() {
        return (
            <div>
                 <h1>Слова сессии</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th><button className="btn btn-success" onClick={this.addWordClicked}>+ Добавить</button></th>
                                <th>Слово</th>
                                <th>Перевод</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.words.map (
                                word =>
                                    <tr key={word.id}>
                                        <td></td>
                                        <td>{word.original}</td>
                                        <td>{word.translation}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteWordClicked(word.id)}>Удалить</button></td>
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

export default SessionComponent
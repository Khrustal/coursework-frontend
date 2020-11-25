import React, {Component} from 'react'
import DataService from "../api/DataService";
import AuthenticationService from './AuthenticationService.js'

class WordsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            words : [],
            message : null
        }
        this.deleteWordClicked = this.deleteWordClicked.bind(this)   
        this.updateWordClicked = this.updateWordClicked.bind(this)   
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
        let userId = AuthenticationService.getLoggedUserId();
        DataService.retrieveAllWords(userId)
          .then(
              response => {
                  this.setState({words : response.data})
              }
          ) 
    }

    deleteWordClicked(id) {
        DataService.deleteWord(id)
         .then (
             response => {
                this.setState({message : `Слово удалено`})
                this.refreshWords()
             }
         )
        
    }

    addWordClicked() {
        this.props.history.push(`/words/create`)
    }

    updateWordClicked(id) {
        this.props.history.push(`/words/update/${id}`)
    }

    render() {
        return (
            <div>
                 <h1>Слова</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th><button className="btn btn-success" onClick={this.addWordClicked}>+ Добавить</button></th>
                                <th>Слово</th>
                                <th>Перевод</th>
                                <th>Изменить</th>
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
                                        <td><button className="btn btn-success" onClick={() => this.updateWordClicked(word.id)}>Изменить</button></td>
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

export default WordsComponent
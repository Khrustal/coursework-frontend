import React, {Component} from 'react'
import DataService from "../api/DataService";
import AuthenticationService from './AuthenticationService.js'

class AddWordsToSessionComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            words : [],
            checkboxes: [],
            message : null
        }
        this.refreshWords = this.refreshWords.bind(this)
        this.addWordsClicked = this.addWordsClicked.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange(this);
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

    addWordsClicked() {
        console.log(this.state.words);
        this.setState({checkboxes: document.getElementsByName("checked")})
        console.log(document.getElementsByClassName("form-check-input"));
        console.log(this.state.checkboxes);
    }

    handleCheckboxChange(event) {
        console.log(event);
    }

    render() {
        return (
            <div>
                 <h1>Добавить слова в сессию</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Выбрано</th>
                                <th>Слово</th>
                                <th>Перевод</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.words.map (
                                word =>
                                    <tr key={word.id}>
                                        <td>
                                            <input type="checkbox" name="selected" className="form-check-input"/>
                                        </td>
                                        <td>{word.original}</td>
                                        <td>{word.translation}</td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.addWordsClicked}>+ Добавить</button>
                 </div>
            </div>
        )
    }
}

export default AddWordsToSessionComponent
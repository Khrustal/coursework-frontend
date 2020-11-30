import React, {Component} from 'react'
import DataService from "../api/DataService";

class TestComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            words: [],
            message: null,
            sessionId: this.props.match.params.id
        }
        this.checkButtonClicked = this.checkButtonClicked.bind(this);
    }

    componentDidMount() {
        DataService.retriveShuffledSessionWords(this.state.sessionId)
        .then(
            response => {
                this.setState({words : response.data})
            }
        )
    }

    checkButtonClicked() {
        let ans = [];
        this.state.words.forEach(elem => 
            ans.push(document.getElementById(elem.id).value))
        let result = {
            "sessionId": this.state.sessionId,
            "words": this.state.words,
            "answers": ans
        }
        DataService.createResult(result)
            .then(response => 
                this.props.history.push(`/sessions/${this.state.sessionId}/results/${response.data}`));

    }

    render() {
        return (
            <div>
                <h1 style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Тестирование</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{fontFamily: "Victor Mono"}}>Слово</th>
                                <th style={{fontFamily: "Victor Mono"}}>Перевод</th>
                            </tr>
                        </thead>
                        <tbody>                        
                        {
                            this.state.words.map (
                                word =>
                                <tr key={word.id}>
                                    <td>
                                        <input className="form-control" name="original" readOnly value={word.original} style={{fontFamily: "Victor Mono Heavy"}}/>
                                    </td>
                                    <td>
                                        <input id={word.id}className="form-control" type="text" name="translation" autoComplete="off" style={{fontFamily: "Victor Mono Heavy"}}/>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.checkButtonClicked} style={{fontFamily: "Victor Mono"}}>Проверить</button>                                 
                </div>                
            </div>
        )
    }
}

export default TestComponent
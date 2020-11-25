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
    }

    render() {
        return (
            <div>
                <h1>Тестирование</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
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
                                        <input className="form-control" name="original" readOnly value={word.original}/>
                                    </td>
                                    <td>
                                        <input id={word.id}className="form-control" type="text" name="translation" autoComplete="off"/>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.checkButtonClicked}>Проверить</button>                                 
                </div>                
            </div>
        )
    }
}

export default TestComponent
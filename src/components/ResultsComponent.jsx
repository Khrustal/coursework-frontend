import React, {Component} from 'react'
import DataService from "../api/DataService";

class ResultsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            result : null,
            message : null
        }
        this.refreshResults = this.refreshWords.bind(this)
    }

    componentDidMount() {
        this.refreshResults();
    }

    refreshResults() {
        let sessionId = this.props.math.params.id
        DataService.retrieveAllResults(sessionId)
          .then(
              response => {
                  this.setState({result : response.data})
              }
          ) 
    }

    render() {
        return (
            <div>
                  <h1>Результат теста</h1>
                <p>Процент выполнения: {this.state.result.rightAnswers}</p>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Результат</th>
                                <th>Слово</th>
                                <th>Перевод</th>
                            </tr>
                        </thead>
                        <tbody>                        
                        {
                            this.state.result.map (
                                result =>
                                <tr key={result.answer.id}>
                                    <td>{result.answer.isCorrect}</td>
                                    <td>
                                        <input className="form-control" name="original" readOnly value={result.answer.word.original}/>
                                    </td>
                                    <td>
                                        <input className="form-control" name="original" readOnly value={result.answer.answer}/>
                                    </td>
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

export default ResultsComponent
import React, {Component} from 'react'
import DataService from "../api/DataService";

class ResultsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            results : null,
            loaded: false
        }
        this.getBody = this.getBody.bind(this)
        this.openResultClicked = this.openResultClicked.bind(this)
    }

    componentDidMount() {
        let sessionId = this.props.match.params.id
        DataService.retrieveAllResults(sessionId)
          .then(
              response => {
                  this.setState({results : response.data, loaded: true})
              }
          ) 
    }

    openResultClicked(id) {
        this.props.history.push(`/sessions/${this.props.match.params.id}/results/${id}`)
    }

    getBody() {
        if(this.state.loaded)
            return <div>
            <h1>Результаты</h1>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Время</th>
                            <th>Выполнено</th>
                            <th>Открыть</th>
                        </tr>
                    </thead>
                    <tbody>                        
                    {
                        this.state.results.map (
                            result =>
                            <tr key={result.id}>
                                <td>{result.date}</td>
                                <td>{result.time}</td>
                                <td>{Math.round(result.rightAnswers*100)}%</td>
                                <td><button className="btn btn-success" onClick={() => this.openResultClicked(result.id)}>Открыть</button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>                               
            </div>                
        </div>
        else 
                    return <div>Loading...</div>
        
    }

    render() {
        return (
            this.getBody()
        )
    }
}

export default ResultsComponent
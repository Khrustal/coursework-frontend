import React, {Component} from 'react'
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DataService from "../api/DataService";
import { ProgressBar } from 'react-bootstrap'

class ResultsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            result : null,
            loaded : false
        }
        this.getBody = this.getBody.bind(this)  
    }

    componentDidMount() {
        let resultId = this.props.match.params.resultId
        DataService.retrieveResult(resultId)
        .then(
            response => {
                this.setState( {result : response.data,
                                loaded: true} )
            }
        )
    }

    getBody() {
        if(this.state.loaded) {
            console.log(this.state.result.answer)
            return <div>
                <h1>Результат теста</h1>
                <ProgressBar>
                    <ProgressBar variant="success" now={this.state.result.rightAnswers*100} key={1} label={`${Math.round(this.state.result.rightAnswers*100)}%`}/>
                    <ProgressBar variant="danger" now={100-this.state.result.rightAnswers*100} key={2} label={`${Math.round(100-this.state.result.rightAnswers*100)}%`}/>
                </ProgressBar>
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
                            this.state.result.answer.map (
                                answer =>
                                <tr key={answer.id}>
                                    <td>
                                        { 
                                            answer.correct && <CheckIcon style={{ color: "green"}}/> || 
                                            !answer.correct && <ClearIcon style={{ color: "red" }}/> 
                                        }
                                    </td>
                                    <td>
                                        <input className="form-control" name="original" readOnly value={answer.word.original}/>
                                    </td>
                                    <td>
                                        <input className="form-control" name="original" readOnly value={answer.answer}/>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>                               
                </div>  
            </div>
        }
        else
            return <div>Loading...</div>
    }

    render() {
        return(
            this.getBody()
        )
    }
}


export default ResultsComponent
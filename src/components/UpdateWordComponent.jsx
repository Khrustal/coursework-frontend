import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'

class UpdateWordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            original: '',
            translate: '',
            message: null
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {
        DataService.retrieveWord(this.props.match.params.id)
        .then(response => {
            this.setState({original: response.data.original,
                           translate: response.data.translation
                        })
        })
    }

    validate(values) {
        if (!values.original || !values.translation) {
            this.setState({message: 'Некорректный ввод'}) 
            return false
        }
        return true
    }

    onSubmit(values) {
        if(this.validate(values)) {
        let userId = AuthenticationService.getCurrentUser().id;
        let word = {
            "original": values.original,
            "translation": values.translation,
            "userId": userId
        }
        DataService.updateWord(word)
            .then(() => this.props.history.push(`/words`),() => {
                this.setState({message: 'Ошибка'})
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.message && <div className="alert alert-danger" style={{fontFamily: "Victor Mono"}}>{this.state.message}</div>}
                <h1 style={{fontFamily: "Victor Mono Heavy", fontSize: 35}}>Изменение слова</h1>
                <div className="container">
                    <Formik
                        initialValues={{original: this.state.original,translation: this.state.translate}}
                        onSubmit={this.onSubmit}
                        enableReinitialize true
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label style={{fontFamily: "Victor Mono"}}>Оригинал</label>
                                        <Field className="form-control" type="text" name="original" readOnly style={{fontFamily: "Victor Mono"}}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label style={{fontFamily: "Victor Mono"}}>Перевод</label>
                                        <Field className="form-control" type="text" name="translation" autoComplete="off" style={{fontFamily: "Victor Mono"}}/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit" style={{fontFamily: "Victor Mono"}}>Изменить</button>
                                </Form>
                            )
                        }
                    </Formik>
                
                </div>                
            </div>
        )
    }
}

export default UpdateWordComponent
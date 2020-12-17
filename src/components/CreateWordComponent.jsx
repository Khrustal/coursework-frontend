import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'

class CreateWordComponent extends Component {

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
    }

    validate(values) {
        if ((values.original.length == 0) || (values.original.length > 50) || (values.translation.length == 0) || (values.translation.length > 50)) {
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
        DataService.createWord(word)
            .then(() => this.props.history.push(`/words`),() => {
                this.setState({message: 'Данное слово уже добавлено'})
            })
        }
    }

    render() {
        let {original,translate} = ''

        return (
            <div>
                {this.state.message && <div className="alert alert-danger" style={{fontFamily: "Victor Mono"}}>{this.state.message}</div>}
                <h1 style={{fontFamily: "Victor Mono Heavy", fontSize: 35}}>Добавление слова</h1>
                <div className="container">
                    <Formik 
                        initialValues={{original,translate}}
                        onSubmit={this.onSubmit}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label style={{fontFamily: "Victor Mono"}}>Оригинал</label>
                                        <Field className="form-control" type="text" name="original" autoComplete="off" style={{fontFamily: "Victor Mono Heavy"}}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label style={{fontFamily: "Victor Mono"}}>Перевод</label>
                                        <Field className="form-control" type="text" name="translation" autoComplete="off" style={{fontFamily: "Victor Mono Heavy"}}/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit" style={{fontFamily: "Victor Mono"}}>Добавить</button>
                                </Form>
                            )
                        }
                    </Formik>
                
                </div>                
            </div>
        )
    }
}

export default CreateWordComponent
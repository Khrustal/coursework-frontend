import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'

class CreateWordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            original: '',
            translate: ''
        }

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
    }

    onSubmit(values) {
        let userId = AuthenticationService.getCurrentUser().id;
        let word = {
            "original": values.original,
            "translation": values.translation,
            "userId": userId
        }
        DataService.createWord(word)
            .then(() => this.props.history.push(`/words`)) //this magic reloads WordsComponent contents
    }

    render() {
        let {original,translate} = ''

        return (
            <div>
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
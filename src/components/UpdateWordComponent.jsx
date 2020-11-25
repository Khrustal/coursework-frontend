import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'

class UpdateWordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            original: '',
            translate: ''
        }

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
        DataService.retrieveWord(this.props.match.params.id)
        .then(response => {
            this.setState({original: response.data.original,
                           translate: response.data.translation
                        })
        })
    }

    onSubmit(values) {
        let userId = AuthenticationService.getCurrentUser().id;
        let word = {
            "original": values.original,
            "translation": values.translation,
            "userId": userId
        }
        DataService.updateWord(word)
            .then(() => this.props.history.push(`/words`))
    }

    render() {
        return (
            <div>
                <h1>Изменение слова</h1>
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
                                        <label>Оригинал</label>
                                        <Field className="form-control" type="text" name="original" autoComplete="off"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Перевод</label>
                                        <Field className="form-control" type="text" name="translation" autoComplete="off"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Изменить</button>
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
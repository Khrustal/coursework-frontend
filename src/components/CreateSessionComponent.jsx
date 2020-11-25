import React, {Component} from 'react'
import { Formik, Form, Field } from 'formik';
import DataService from "../api/DataService";
import AuthenticationService from '../api/AuthenticationService.js'

class CreateSessionComponent extends Component {

    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)

    }

    onSubmit(values) {
        let session = {
            "userId": AuthenticationService.getLoggedUserId(),
            "name": values.name
        }
        DataService.createSession(session)
            .then(() => this.props.history.push(`/sessions`))
    }

    render() {
        return (
            <div>
                <h1>Создание сессии</h1>
                <div className="container">
                    <Formik 
                        initialValues={{name: ''}}
                        onSubmit={this.onSubmit}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Название</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Создать</button>
                                </Form>
                            )
                        }
                    </Formik>
                
                </div>                
            </div>
        )
    }
}

export default CreateSessionComponent
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
                <h1 style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Создание сессии</h1>
                <div className="container">
                    <Formik 
                        initialValues={{name: ''}}
                        onSubmit={this.onSubmit}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label style={{fontFamily: "Victor Mono"}}>Название</label>
                                        <Field className="form-control" type="text" name="name"  autoComplete="off" style={{fontFamily: "Victor Mono Heavy"}}/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit" style={{fontFamily: "Victor Mono"}}>Создать</button>
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
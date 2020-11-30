import React, {Component} from 'react'
import AuthenticationService from '../api/AuthenticationService.js'
import { Formik, Form, Field } from 'formik'

class SignupComponent extends Component{
    constructor(props) {
        super(props);
        this.createClicked = this.createClicked.bind(this);
    }
    render() {
        return(
            <div className="container">
                <h1 className="display-4" style={{fontFamily: "Victor Mono"}}>Регистрация</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={this.createClicked}>
                <Form>
                    <fieldset className="form-group">
                        <label style={{fontFamily: "Victor Mono"}}>Имя пользователя</label>
                        <Field className="form-control" type="text" name="username"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label style={{fontFamily: "Victor Mono"}}>Пароль</label>
                        <Field className="form-control" type="password" name="password"/>
                    </fieldset>
                    <button className="btn btn-success" type="submit" style={{fontFamily: "Victor Mono"}}>Создать</button>
                </Form>
                </Formik>
            </div>
        )}

        createClicked(values) {
            AuthenticationService.create(values.username, values.password).then(
                () => {
                    this.props.history.push(`/login`);
                });
        }
}

export default SignupComponent
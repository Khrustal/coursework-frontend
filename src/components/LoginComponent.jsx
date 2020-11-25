import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Formik, Form, Field } from 'formik'

class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            loginFailed: false,
            loginSuccessful: false
        }
        this.loginClicked = this.loginClicked.bind(this);
    }

    render() {
        return(
            <div className="container">
                {this.state.loginSuccessful && <div>Login successful</div>}
                {this.state.loginFailed && <div className="alert alert-danger">Login failed</div>}
                <h1 className="display-4">Вход</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={this.loginClicked}>
                <Form>
                    <fieldset className="form-group">
                        <label>Логин</label>
                        <Field className="form-control" type="text" name="username"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Пароль</label>
                        <Field className="form-control" type="password" name="password"/>
                    </fieldset>
                    <button className="btn btn-success" type="submit">Войти</button>
                    <p>Не зарегестрированы? Создайте <a href="/signup">аккаунт</a></p>
                </Form>
                </Formik>
            </div>
        )
    }

    loginClicked(values) {
        AuthenticationService.login(values.username, values.password).then(
            () => {
                this.props.history.push(`/words`);
                window.location.reload();
            });
    }

}

export default LoginComponent
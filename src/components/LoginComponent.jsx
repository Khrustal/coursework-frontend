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
                <h1 className="display-4">Login</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={this.loginClicked}>
                <Form>
                    <fieldset className="form-group">
                        <label>Username</label>
                        <Field className="form-control" type="text" name="username"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password</label>
                        <Field className="form-control" type="password" name="password"/>
                    </fieldset>
                    <button className="btn btn-success" type="submit">Login</button>
                    <p>Don't have account? Create <a href="/signup">one</a></p>
                </Form>
                </Formik>
            </div>
        )
    }

    loginClicked(values) {
        AuthenticationService.login(values.username, values.password).then(
            () => {
                this.props.history.push(`/todo/${values.username}`);
                window.location.reload();
            });
    }

}

export default LoginComponent
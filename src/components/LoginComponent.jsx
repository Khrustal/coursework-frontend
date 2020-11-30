import React, {Component} from 'react'
import AuthenticationService from '../api/AuthenticationService.js'
import { Formik, Form, Field } from 'formik'
import ClearIcon from '@material-ui/icons/Clear';

class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            loginFailed: false
        }
        this.loginClicked = this.loginClicked.bind(this);
    }

    render() {
        return(
            <div className="container">
                {this.state.loginFailed && <div className="alert alert-danger"><ClearIcon style={{ color: "red" }}/>Неправильное имя пользователя или пароль</div>}
                <h1 className="display-4" style={{fontFamily: "Victor Mono"}}>Вход</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={this.loginClicked}>
                <Form>
                    <fieldset className="form-group">
                        <label style={{fontFamily: "Victor Mono"}}>Логин</label>
                        <Field className="form-control" type="text" name="username"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label style={{fontFamily: "Victor Mono"}}>Пароль</label>
                        <Field className="form-control" type="password" name="password"/>
                    </fieldset>
                    <button className="btn btn-success" type="submit" style={{fontFamily: "Victor Mono"}}>Войти</button>
                    <p style={{fontFamily: "Iosevka"}}>Не зарегестрированы? Создайте <a href="/signup">аккаунт</a></p>
                </Form>
                </Formik>
            </div>
        )
    }
    
    loginClicked(values) {
        AuthenticationService.login(values.username, values.password)
        .then(() => {
                this.props.history.push(`/words`);
                window.location.reload();
        },() => {
            this.setState({loginFailed: true})
        });
        // AuthenticationService.login(values.username, values.password).then(
        //     () => {
        //         this.props.history.push(`/words`);
        //         window.location.reload();
        //     }).catch(this.setState({loginSuccessful: false}));
    }

}

export default LoginComponent
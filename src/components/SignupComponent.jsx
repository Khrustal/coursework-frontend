import React, {Component} from 'react'
import AuthenticationService from '../api/AuthenticationService.js'
import { Formik, Form, Field } from 'formik'

class SignupComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
        this.createClicked = this.createClicked.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        return(
            <div className="container">
                {this.state.message && <div className="alert alert-danger" style={{fontFamily: "Victor Mono"}}>{this.state.message}</div>}
                <h1 className="display-4" style={{fontFamily: "Victor Mono Heavy", fontSize: 22}}>Регистрация</h1>
                <Formik initialValues={{username: '', password: ''}} onSubmit={this.createClicked}>
                <Form>
                    <fieldset className="form-group">
                        <label style={{fontFamily: "Victor Mono"}}>Имя пользователя</label>
                        <Field className="form-control" type="text" name="username" style={{fontFamily: "Victor Mono Heavy"}}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label style={{fontFamily: "Victor Mono"}}>Пароль</label>
                        <Field className="form-control" type="password" name="password" />
                    </fieldset>
                    <button className="btn btn-success" type="submit" style={{fontFamily: "Victor Mono"}}>Создать</button>
                </Form>
                </Formik>
            </div>
        )}

        createClicked(values) {
            if(this.validate(values)) {
            AuthenticationService.create(values.username, values.password).then(
                () => {
                    this.props.history.push(`/login`);
                },() => {
                    this.setState({message: 'Пользователь с таким именем уже зарегестрирован'})
                });
            }
        }

        validate(values) {
            if ((values.username.length == 0) || (values.username.length > 20) || (values.password.length == 0) || (values.password.length > 20)) {
                this.setState({message: 'Некорректный ввод'}) 
                return false
            }
            return true
        }
}

export default SignupComponent
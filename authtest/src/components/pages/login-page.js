import React, { Component } from 'react';
import { connect } from 'react-redux';

import {login} from '../../actions';
import withUserService from '../hoc/with-user-service';
import compose from '../hoc/compose';

import './login-page.css'

class LoginPage extends Component{

    state = {
        username: '',
        password: ''
    }

    onUsernameChange = (e) => {
        this.setState({username: e.target.value});
     }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
     }

     onLogin = (e) => {   
        e.preventDefault();
        const { username, password} = this.state;
        const { login } = this.props;
        login(username, password).then(res => {
            if (res.type === 'LOGIN_SUCCESS')
                this.props.history.push("/welcome")
        });
    };

    render(){

        const {username, password} = this.state;
        const {loginError} = this.props;

        return (
            <form className="form-signin" onSubmit={this.onLogin}>
                <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autoFocus
                    value={username} onChange={this.onUsernameChange} />
                
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                    value = {password} onChange={this.onPasswordChange}/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                {loginError &&
                    <label className="text-danger">Cannot sign in</label>
                }
            </form>
        );
    }
}

const mapStateToProps = ({ loginError }) => {
    return {
        loginError: loginError
    };
}

const mapDispatchToProps = (dispatch, { userService }) => {
    return {
        login: login(userService, dispatch)
    }
};

export default compose(
    withUserService(),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginPage);
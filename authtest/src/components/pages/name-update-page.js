import React, { Component } from 'react';
import { connect } from 'react-redux';

import {updateName} from '../../actions';
import withUserService from '../hoc/with-user-service';
import compose from '../hoc/compose';

import './name-update-page.css';

class NameUpdatePage extends Component {
    
    state = {
        newName: ''
    }

    onUsernameChange = (e)=> {
        this.setState({newName: e.target.value});
     }

    onUpdate = (e) => {  
        e.preventDefault();
        const { newName } = this.state;        
        const { updateName } = this.props;
        updateName(newName);
    };

    logout = () => {
        localStorage.clear();
        this.props.history.push("/")
    }

    render(){
        const {newName} = this.state;
        const {username, nameError} = this.props;        

        return(               
            <div className='container-fluid'>                    
                <h2>Hello, {username}!</h2>
                <p>You can update your name using the form below.</p>                
                <form className="form-name-update col-sm-6 col-md-3" onSubmit={this.onUpdate}>
                    <div className='row'>
                        <input type="text" id="inputUsername" className="form-control col-sm-8" placeholder="New name" required autoFocus
                            value={newName} onChange={this.onUsernameChange}/>
                        <button className="btn btn-primary col-sm-4" type="submit">Update</button>
                        {nameError &&
                            <label className="text-danger col-sm-8">Cannot update name</label>
                        }
                    </div>
                </form>
                <a href="#" onClick={this.logout}>Logout</a>
            </div>
            
        );
    }
}

const mapStateToProps = ({ username, nameError }) => {
    return {
        username: username,
        nameError: nameError
    };
}

const mapDispatchToProps = (dispatch, { userService }) => {
    return {
        updateName: updateName(userService, dispatch)
    }
};

export default compose(
    withUserService(),
    connect(mapStateToProps, mapDispatchToProps)
)(NameUpdatePage);
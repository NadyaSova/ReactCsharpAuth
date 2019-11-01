import React from 'react';
import { UserServiceConsumer } from '../user-service-context';

const withUserService = () => (Wrapped) => {    
    return (props) => {
        return (
            <UserServiceConsumer>
                {
                    (userService) => {
                        return (<Wrapped {...props} userService={userService} />);
                    }
                }
            </UserServiceConsumer>
        );
    }
};

export default withUserService;
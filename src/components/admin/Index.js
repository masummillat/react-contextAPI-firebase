import React from 'react';
import * as ROLES from '../constants/roles'
import withAuthorization from "../session/withAuthorization";
import {compose} from 'recompose'
import withEmailVerification from "../session/withEmailVerification";
class  AdminPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            users: []

        }
    }
    componentDidMount() {
        this.setState({ loading: true });
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            console.log(usersList)
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const {loading,users}= this.state;
        console.log(users)
        return(
            <div>
                <h1> Admin </h1>
                <p>
                    Restricted area ! Only users with the admin role are authorized
                </p>

                {loading && <div>Loading ...</div>}

                <UserList users={users} />
            </div>
        )
    }

}

const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
                <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
                <span>
          <strong>Username:</strong> {user.username}
        </span>
            </li>
        ))}
    </ul>
)

const condition = authUser =>{
    console.log(authUser)
    return authUser && authUser.roles.includes(ROLES.ADMIN);
}


export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AdminPage);

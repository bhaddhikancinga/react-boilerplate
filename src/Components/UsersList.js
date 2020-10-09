import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {deleteUser} from '../Actions/Update';
import {handleModal} from "../Actions/Global";
import {Link} from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';


class UsersList extends Component{
    editUser(user){
        this.props.handleModal(user);
    }

    handleDelete(userid){
        this.props.deleteUser(userid);
    }

    renderUsers(users){
        return users?.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    {/*<td>{user.userRoles?.map(role => role.groupCode)}</td>*/}
                    <td className="md-visible">{moment(user.cdatetime).format('DD.MM.YYYY - hh:mm (Z)')}</td>
                    <td>
                        <Link to={`/pt/UserModal`}>
                        <button type="button" className="btn btn-primary" onClick={()=> this.editUser(user)}><i className="fa fa-edit"></i></button></Link>
                        <button
                        className="btn btn-danger"
                        onClick={() => { if (window.confirm('Are you sure to delete this user?')) this.handleDelete(user.id) } }><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            );
        })
    }

    render(){
        return(
            <table className="table table-responsive-lg">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Email</th>
                        {/*<th>Group</th>*/}
                        <th className="md-visible">Registered</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderUsers(this.props.users)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(globalState) {
    return {

    };
}

export default connect(mapStateToProps, { deleteUser, handleModal })(UsersList);


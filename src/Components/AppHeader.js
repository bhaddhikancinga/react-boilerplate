import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleLeft} from '../Actions/Global'
import AuthService from "../Actions/AuthService";
import {Navbar, NavDropdown} from "react-bootstrap";
import {fetchUser} from '../Actions/Detail';

const Auth = new AuthService();


class AppHeader extends Component{

    constructor(props){
        super(props);
        this.history=props.history;
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        Auth.logout();
        localStorage.removeItem('id_token'); //Persist
        this.history.replace('/');
    }

    componentDidMount(){
       this.props.fetchUser();
    }

    render(){
            return (
                <header style={{'position': 'inherit', padding: 0}}>
                    <Navbar bg="dark" variant="dark" className={'h-100'}>

                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as:
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <NavDropdown title={this.props.user!=null && this.props.user.dto ? this.props.user.dto.firstName+ ' ' +this.props.user.dto.lastName :""} id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.4" onClick={this.handleLogout}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>
                </header>
            )
    }
}

function mapStateToProps(globalState) {
    return {
        user: globalState.user,
    };
}
export default connect(mapStateToProps, {handleLeft,fetchUser})(AppHeader);
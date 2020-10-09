import React, {Component} from 'react';
import {handleModal} from "../Actions/Global";
import {updateUser} from '../Actions/Update';
import {addUser} from '../Actions/Create';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class UserModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            usermodal: null,
            loading: false,
            msgContent: null,
            msgType: null,
            cuserName:"",
            passwordNCAP: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            accessgroup: "",
            isActive: true,
            type: "add",
            userupdates: props.userupdates
        }
        this.setModalRef = this.setModalRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalClickOutside = this.modalClickOutside.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    setModalRef(node) {
        this.modalRef = node;
    }

    modalClickOutside(event){
        if (this.modalRef && !this.modalRef.contains(event.target)) {
            this.props.handleModal(null);
        }
    }

    closeModal(){
        this.setState({msgContent: null, msgType: null, loading: false})
        // this.props.router.push(`/pt/users`);
        this.renderRedirect();

    }
    renderRedirect = () => {
        if (this.state.loading) {
            return <Link to={`/pt/users`} />
        }
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value.replace(/(<([^>]+)>)/ig,"")});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { cuserName,passwordNCAP,firstName,lastName,email,phone,accessgroup,isActive } = this.state;
        if(!cuserName) {
            this.setState({msgContent: 'Please enter username', msgType: 'alert error'})
        }else if(!passwordNCAP){
            this.setState({msgContent: 'Please enter password', msgType: 'alert error'})
        }else if(!firstName){
            this.setState({msgContent: 'Please enter First Name', msgType: 'alert error'})
        }else if(!lastName){
            this.setState({msgContent: 'Please enter Last Name', msgType: 'alert error'})
        }else if(!email){
            this.setState({msgContent: 'Please provide email address', msgType: 'alert error'})
        }else if(!phone){
            this.setState({msgContent: 'Please provide phone', msgType: 'alert error'})
        }else if(!accessgroup){
            this.setState({msgContent: 'Please provide group', msgType: 'alert error'})
        }else{
            this.setState({loading: true}, function(){
                if(this.state.type === "add"){
                    this.props.addUser({cuserName,passwordNCAP,firstName,lastName,email,phone,accessgroup,isActive});
                    this.props.history.push(`/pt/users`);
                }else{
                    this.props.updateUser(this.state.usermodal.id, {cuserName,passwordNCAP,firstName,lastName,email,phone,accessgroup,isActive});
                    this.props.history.push(`/pt/users`);
                }
            })
        }

    }
    componentDidMount(){
        document.addEventListener('mousedown', this.modalClickOutside);
    }

    static getDerivedStateFromProps(props, state) {
        // check modal open/close
        if(props.usermodal && props.usermodal !== state.usermodal){
            return{
                usermodal: props.usermodal,
                cuserName:props.usermodal.cuserName,
                passwordNCAP: props.usermodal.passwordNCAP,
                firstName: props.usermodal.firstName,
                lastName: props.usermodal.lastName,
                phone: props.usermodal.phone,
                email: props.usermodal.email,
                accessgroup: props.usermodal.accessgroup,
                isActive: state.isActive,
                type: props.usermodal.type
            }
        }else if(!props.usermodal){
            return{
                usermodal: props.usermodal
            }
        }else if(props.userupdates && props.userupdates !== state.userupdates){
            // Check user update response
            window.scrollTo(0, 0);
            if(props.userupdates.code === 201){
                props.handleModal(null);
                return {
                    msgContent: null,
                    msgType: null,
                    loading: false,
                    cuserName:"",
                    passwordNCAP: "",
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    accessgroup: "",
                    isActive: true,
                    type: "",
                    userupdates: props.userupdates
                }
            }else{
                return{
                    msgContent: props.userupdates.error,
                    msgType: 'alert error',
                    userupdates: props.userupdates,
                    loading: false
                }
            }
        }else{
            return null;
        }
    }
    render(){
        const groups = this.props.groups;
        return(
            // <div className={this.state.usermodal ? 'modal' : 'modal closed'}>
                <div className="modal-box" ref={this.setModalRef}>
                <div className="card">
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                {this.state.type === "add" ? (
                                <div className="card-header">
                                    <i className="fa fa-user-plus" ></i> Add User
                                </div>
                                ):(
                                <div className="card-header">
                                    <i className="fa fa-edit"></i> Edit User
                                </div>
                                )}
                                <div className="card-body">
                                    {this.state.msgContent &&
                                    <div className={this.state.msgType} role="alert">
                                        {this.state.msgContent}
                                    </div>
                                    }
                                    <div className="form-group wrap">
                                        {/*<div className="col-half">*/}
                                            <div className="input-group">
                                    {/*<div className="form-row">*/}
                                    {/*    <div className="form-group col-md-6">*/}
                                    {/*        <div className="input-group mb-2">*/}
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Username</span>
                                                </div>
                                                <input 
                                                    onChange={this.handleInput} 
                                                    value={this.state.cuserName}
                                                    name="cuserName"
                                                    className="form-control form-control-lg" 
                                                    placeholder="Username"
                                                    type="text" />
                                            </div>
                                        {/*</div>*/}
                                    </div>
                                    <div className="form-group wrap">
                                        {/*<div className="col-half">*/}
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Password</span>
                                                </div>
                                                <input
                                                    onChange={this.handleInput}
                                                    value={this.state.passwordNCAP}
                                                    name="passwordNCAP"
                                                    className="form-control form-control-lg"
                                                    placeholder="password"
                                                    type="password" />
                                            </div>
                                        </div>
                                    {/*</div>*/}
                                    <div className="form-group wrap">
                                        {/*<div className="col-half">*/}
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">First Name</span>
                                                </div>
                                                <input
                                                    onChange={this.handleInput}
                                                    value={this.state.firstName}
                                                    name="firstName"
                                                    className="form-control form-control-lg"
                                                    placeholder="First Name"
                                                    type="text" />
                                            </div>
                                        {/*</div>*/}
                                    </div>
                                    <div className="form-group wrap">
                                        {/*<div className="col-half">*/}
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Last Name</span>
                                                </div>
                                                <input
                                                    onChange={this.handleInput}
                                                    value={this.state.lastName}
                                                    name="lastName"
                                                    className="form-control form-control-lg"
                                                    placeholder="Last Name"
                                                    type="text" />
                                            </div>
                                        {/*</div>*/}
                                    </div>
                                    {/*<div className="form-group wrap">*/}
                                    {/*    /!*<div className="col-half">*!/*/}
                                    {/*        <div className="input-group">*/}
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Phone</span>
                                                </div>
                                                <input
                                                    onChange={this.handleInput}
                                                    value={this.state.phone}
                                                    name="phone"
                                                    className="form-control form-control-lg"
                                                    placeholder="0777777777"
                                                    type="number"
                                                />
                                            </div>
                                        {/*</div>*/}
                                    </div>
                                        <div className="form-group col-md-6">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Email</span>
                                                </div>
                                                <input
                                                    onChange={this.handleInput}
                                                    value={this.state.email}
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="example@sample.com"
                                                    type="email" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group wrap">
                                        <div className="col-half">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Acess Group</span>
                                                </div>
                                                <select onChange={this.handleInput} 
                                                name="accessgroup"
                                                value={this.state.accessgroup}
                                                className="form-control form-control-lg">
                                                    <option value="">Select Group</option>
                                                    {groups.map((group)=>
                                                    <option value={group.groupCode} key={group.id}>{group.groupCode}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                {this.state.loading ?(
                                    <button type="button" className="btn btn-success loading" disabled>
                                        <i className="fas fa-sync-alt fa-spin"></i>
                                    </button>
                                ):(
                                    <span>
                                       <button type="submit" className="btn btn-success"><i className="far fa-dot-circle"></i> Submit</button>
                                        <Link to={`/pt/users`}><button type="button" className="btn btn-danger" ><i className="fa fa-times"></i> Close</button></Link>
                                    </span>
                                )}
                                </div>
                            </form>
                        </div>
                </div>
             // </div>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        usermodal: globalState.usermodal,
        groups: globalState.groups,
        userupdates: globalState.userupdates
    };
};
export default connect(mapStateToProps, {handleModal, updateUser, addUser})(UserModal);
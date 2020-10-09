import React, {Component} from 'react';
import {connect} from "react-redux";
import {authenticate} from '../Actions/Auth';
import AuthService from "../Actions/AuthService";

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			msgContent: null,
			msgType: null,
			username: "",
			password: "",
			login: props.login
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInput(e) {
			this.setState({ [e.target.name]: e.target.value.replace(/(<([^>]+)>)/ig,"")});
	}
	handleSubmit(e) {
		e.preventDefault();
		const { username,password } = this.state;
		if(!username){
			this.setState({msgContent: 'Please provide user name', msgType: 'alert error'})
		}else{
			this.setState({loading: true}, function(){
				this.props.authenticate({
					'username':username,
					'password': password
				});
			})
		}
	};

	componentDidMount(){
		window.scrollTo(0, 0);
	}

	static getDerivedStateFromProps(props, state) {
		if(props.login && props.login !== state.login){
			 if(props.login.status && props.login.status==401){
				 return{
					 msgContent: props.login.message,
					 msgType: 'alert error',
					 login: props.login,
					 loading: false
				 }
			 }else{
				 if (props.login.token !== null && props.login.token!==undefined) {
					const auth=new AuthService();
					auth.setAuthToken(props.login.token);
					 props.history.replace('/pt');
				 } else {
					 return{
						 msgContent: props.login.message,
						 msgType: 'alert error',
						 login: props.login,
						 loading: false
					 }
				 }
			 }

		}else{
			return{
				msgContent: '',
				msgType: 'alert error',
				login: props.login,
				loading: false
			};
		}
	}

	render() {

		return (
			<div className="signin-body-dark">
				<div className="container">
					<div className="wr-log" style={{ marginBottom: '50px' }}>
						<div className="log-right">
						</div>
						<div >
							<form   name="formLogin" className="form-signin effect form-group " onSubmit={this.handleSubmit}>
								<img  className="brand-w-button" alt="logotype" src="/images/logo.png"/>
								<div className="clearfix" style={{ marginBottom: '20px' }}>

								</div>
								{this.state.msgContent &&
								<div className={this.state.msgType} role="alert">
									{this.state.msgContent}
								</div>
								}
								
								<div className="form-group">
									<label>User Name</label>
									<input type="text" className="form-control" name="username" required onChange={this.handleInput} />
								</div>

								<div className="form-group">
									<label>Password</label>
									<input type="password" className="form-control" name="password" required onChange={this.handleInput}/>
								</div>
								
								<div className="loginButton">
									<button type="submit" className="btn btn-success"><i className="far fa-dot-circle"></i> Submit</button>
								</div>
								<div className="pt-2">
									By clicking sign in you agree to our
								</div>

							</form>
						</div>
					</div>
				</div>
				<div className="clear"></div>
				<div>
					<div id="versionBar">
						<div className="clear"></div>
						<div className="copyright">
							© 2019 CompanyName. All Rights Reserved </div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(globalState) {
	return {
		login: globalState.login
	};
}

export default connect(mapStateToProps, {authenticate})(Login);
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout} from 'antd';
// Components
import Left from './Components/Left';
import UserModal from './Components/UserModal';
// Pages
import Home from './Pages/Home';
import Users from './Pages/Users';
import Groups from './Pages/Groups';
import GroupDetails from './Pages/GroupDetails';
import NotFoundPage from './Pages/NotFound';

import withAuth from "./Actions/withAuth";
import AppHeader from "./Components/AppHeader";
import AuthService from "./Actions/AuthService";

const {   Content,Footer } = Layout;

class App extends Component {


    render() {
    const auth=new AuthService();
    auth.setAuthToken(auth.getToken());
    return (
      <Router basename={'/planning'}>
          <Layout style={{ minHeight: '100vh' }}>
              <Left/>
              <Layout>
                  <AppHeader history={this.props.history} />
                  <Content className={'hw-100'}>
                      <div style={{ padding: 24, background: '#fff' }}>
                          <Switch>
                              <Route sensitive exact path="/pt/" component={Home} />
                              <Route sensitive exact path="/pt/users" component={Users} />
                              <Route sensitive exact path="/pt/UserModal" component={UserModal} />
                              <Route  sensitive exact path="/pt/groups" component={Groups} />
                              <Route sensitive exact path="/pt/groups/:groupid" component={GroupDetails} />
                              <Route component={NotFoundPage} />

                          </Switch>
                      </div>
                  </Content>
                  <Footer style={{ textAlign: 'center' }}>  All rights reserved © 2020 by SLT , Powered by   <img className="brand" style={{height: '15px',paddingLeft:'5px'}} alt="logotype" src={process.env.PUBLIC_URL+'/images/ncinga.png'} /> </Footer>
              </Layout>
          </Layout>

        </Router>
    );
  }
}


function mapStateToProps(globalState) {
    return {
        leftbar: globalState.leftbar,
    };
}
export default connect(mapStateToProps)(withAuth(App));

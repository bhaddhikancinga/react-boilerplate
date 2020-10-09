import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SubMenu from "antd/es/menu/SubMenu";
import {Icon, Layout, Menu} from 'antd';

const {  Sider  } = Layout;

class Left extends Component{
    constructor(props) {
        super(props);
        this.state={
            collapsed: false,
        }
    }
    onCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render(){
        return(

            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse } width={190}
            >

                <div className="content-wrap" >
                    <img className="brand" style={{height: '50px',padding:5}} alt="logotype" src={process.env.PUBLIC_URL+'/images/menu-logo.png'} />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/pt/">
                            <Icon type="pie-chart" />
                            <span>Dashboard</span>
                        </Link>
                    </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                  <Icon type="user" />
                                  <span>Admin</span>
                                </span>
                            }
                        >
                             <Menu.Item key="2"> <Link to="/pt/users">Users</Link></Menu.Item>
                             <Menu.Item key="3"> <Link to="/pt/groups">Groups</Link></Menu.Item>
                        </SubMenu>

                </Menu>

            </Sider>

        )
    }
}

function mapStateToProps(globalState) {
    return {
        leftbar: globalState.leftbar
    };
}

export default connect(mapStateToProps)(Left);
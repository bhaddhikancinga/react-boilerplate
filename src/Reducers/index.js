import {combineReducers} from 'redux';
import users from './Users';
import userupdates from './UserUpdates';
import usermodal from './UserModal';
import groups from './Groups';
import group from './Group';
import user from './User';
import groupupdates from './GroupUpdates';

import leftbar from './LeftBar';
import home from './Home';

import login from './Auth';
import logout from './Auth';


export default combineReducers({
    users,
    user,
    userupdates,
    usermodal,
    groups,
    group,
    groupupdates,
    leftbar,
    home,
    login,
    logout,
});
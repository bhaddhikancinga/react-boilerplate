import {getCall, postCall} from "./Global";


//Fetch all users
export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = (skip, limit) => {
    const usersData = {
        skip,
        limit
    };
    return getCall(FETCH_USERS,usersData,'/users');

};

//Fetch more users
export const MORE_USERS = 'MORE_USERS';
export const moreUsers = (skip, limit) => {
    const usersData = {
        skip,
        limit
    };

    return postCall(MORE_USERS,usersData,'/users');
};

//Search User
export const SEARCH_USER = 'SEARCH_USER';
export const searchUser = (term, groupid) => {
    console.log(groupid);
    let data;
    if(groupid){
        data = {
            groupid
        }
    }else{
        data = {
            groupid: null
        }
    }

    data={
        params:term
    }

    return getCall(SEARCH_USER,data,'/users');
};


// Get group users list with group id
export const FETCH_GROUP_USERS = 'FETCH_GROUP_USERS';
export const fetchGroupUsers = (id) => getCall(FETCH_GROUP_USERS,null,'/groups' + id);


//Fetch all groups
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const fetchGroups = () => getCall(FETCH_GROUPS,null,'/groups');


//Search Group
export const SEARCH_GROUP = 'SEARCH_GROUP';
export const searchGroup = (term) => postCall(SEARCH_GROUP,null,'/groups/search/');

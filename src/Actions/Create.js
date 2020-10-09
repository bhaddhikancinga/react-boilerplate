import {postCall} from "./Global";

//Add new group action
export const ADD_GROUP = 'ADD_GROUP';
export const addGroup = (data) =>  postCall(ADD_GROUP,data,'/groups');


//Add New user action
export const ADD_USER = 'ADD_USER';
export const addUser = (data) => postCall(ADD_USER,data,'/users');


//Add new File
export const UPLOAD_SITE_DATA = 'UPLOAD_SITE_DATA';
export const uploadSiteData = (data) => postCall(UPLOAD_SITE_DATA, data,'/siteupload');


//Add new site
export const ADD_SITE_DATA = 'ADD_SITE_DATA';
export const addSiteData = (data) => postCall(ADD_SITE_DATA,data,'/sitedata');
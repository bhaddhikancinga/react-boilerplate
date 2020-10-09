// Get group data with group id
import {postCall} from "./Global";


export const FETCH_GROUP = 'FETCH_GROUP';
export const fetchGroup = (id) => postCall(FETCH_GROUP,null,'/groups/' + id);

export const FETCH_USER = 'FETCH_USER';
export const fetchUser = () => postCall(FETCH_USER,null,'/loggeduser');
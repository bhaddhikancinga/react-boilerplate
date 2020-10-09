//Add new group action
import {postCall} from "./Global";

export const AUTH = 'AUTH';
export const authenticate = (data)=>postCall(AUTH,data,'/authenticate');

export const LOGOUT = 'LOGOUT';
export const logout = (data) =>postCall(LOGOUT,data,'/logout');
import {deleteCall, putCall} from "./Global";

// Delete group actions
export const DELETE_GROUP = "DELETE_GROUP";
export const deleteGroup = id => deleteCall(DELETE_GROUP,null,"/group/" + id);


// Delete user actions
export const DELETE_USER = "DELETE_USER";
export const deleteUser = id => deleteCall(DELETE_USER,null,"/users/" + id);

// Delete upload data
export const DELETE_UPLOAD_DATA = "DELETE_UPLOAD_DATA";
export const deleteUploads = id => deleteCall(DELETE_UPLOAD_DATA,null,"/siteUploads/" + id);

//Edit group action
export const UPDATE_GROUP = "UPDATE_GROUP";
export const updateGroup = (groupcode, id) => {
    const data = {
        groupCode:groupcode
    };
    return putCall(UPDATE_GROUP,data,"/groups/"+id);
};

// Delete site data
export const DELETE_SITE_DATA = "DELETE_SITE_DATA";
export const deleteSites = id => deleteCall(DELETE_SITE_DATA,null,"/sitedata/" + id);

//Edit user action
export const UPDATE_USER = "UPDATE_USER";
export const updateUser = (id, ...data) => putCall(UPDATE_USER,data[0],"/users/"+id);

//Edit sitedata action
export const UPDATE_SITEDATA = "UPDATE_SITEDATA";
export const updateSiteData = (id, ...data) => putCall(UPDATE_SITEDATA,data[0],"/sitedata/"+id);

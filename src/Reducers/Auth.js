import {AUTH, LOGOUT} from '../Actions/Auth';

export default (state = null, action) => {
    switch (action.type) {
        case AUTH:
            return action.payload;
        case LOGOUT:
            return action.payload;
        default:
            return state;
    }
};
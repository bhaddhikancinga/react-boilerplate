import decode from 'jwt-decode';

import axios from 'axios';

export default class AuthService {
    // Initializing important variables
    constructor() {
        this.getProfile = this.getProfile.bind(this)
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        axios.defaults.headers.common['Authorization'] = '';
        delete axios.defaults.headers.common['Authorization'];
    }

    setAuthToken(token) {
         this.logout();
         localStorage.setItem('id_token',token);
         if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
        }
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
}

import axios from 'axios';

const API_URL = "http://localhost:8080/auth/";

class AuthenticationService {

    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    create(username, password) {
        return axios.post(API_URL + "signup", {username, password})
            .then(response => {return response.data})
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    logout() {
        sessionStorage.removeItem("user");
        window.location.reload();
    }

    getLoggedUserName() {
        let user = JSON.parse(sessionStorage.getItem("user"))
        if(user===null) return ''
        return user.username
    }
    getLoggedUserId() {
        let user = JSON.parse(sessionStorage.getItem("user"))
        if(user===null) return ''
        return user.id
    }
}

export default new AuthenticationService()
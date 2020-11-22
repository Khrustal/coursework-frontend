import axios from 'axios'
import AuthHeader from "./AuthHeader";

class ToDoDataService {

    retrieveAllToDo(name) {
        return axios.get(`http://localhost:8080/users/${name}/todo`, { headers: AuthHeader() })
    }

    retrieveToDo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todo/${id}`, { headers: AuthHeader() })
    }

    deleteToDo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todo/${id}`, { headers: AuthHeader() })
    }

    updateToDo(name, id, todo) {
        return axios.put(`http://localhost:8080/users/${name}/todo/${id}`, todo, { headers: AuthHeader() })
    }

    createToDo(name, todo) {
        return axios.post(`http://localhost:8080/users/${name}/todo`, todo, { headers: AuthHeader() })
    }

}

export default new ToDoDataService()
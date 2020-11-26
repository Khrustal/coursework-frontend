import axios from 'axios'
import AuthHeader from "./AuthHeader";

class DataService {

    createWord(word) {
        return axios.post(`http://localhost:8080/create`, word, { headers: AuthHeader() })
    }

    updateWord(word) {
        return axios.post(`http://localhost:8080/update`, word, { headers: AuthHeader() })
    }

    retrieveAllWords(id) {
        return axios.get(`http://localhost:8080/get-all?id=${id}`, { headers: AuthHeader() })
    }

    retrieveWord(id) {
        return axios.get(`http://localhost:8080/get?id=${id}`, { headers: AuthHeader() })
    }

    deleteWord(id) {
        return axios.delete(`http://localhost:8080/delete?id=${id}`, { headers: AuthHeader() })
    }

    retrieveAllSessions(id) {
        return axios.get(`http://localhost:8080/session/get-all?id=${id}`, { headers: AuthHeader() })
    }

    createSession(session) {
        return axios.post(`http://localhost:8080/session/create`, session, { headers: AuthHeader() })
    }

    retrieveSessionWords(id) {
        return axios.get(`http://localhost:8080/session/get?id=${id}`, { headers: AuthHeader() })
    }

    deleteWordFromSession(wordId, sessionId) {
        return axios.delete(`http://localhost:8080/session/remove?wordId=${wordId}&sessionId=${sessionId}`, { headers: AuthHeader() })
    }

    deleteSession(id) {
        return axios.delete(`http://localhost:8080/session/delete?id=${id}`, { headers: AuthHeader() })
    }

    addWordToSession(request) {
        return axios.post(`http://localhost:8080/session/add`, request, { headers: AuthHeader() })
    }

    retriveShuffledSessionWords(id) {
        return axios.get(`http://localhost:8080/session/get-test?id=${id}`, { headers: AuthHeader() })
    }

    createResult(result) {
        return axios.post(`http://localhost:8080/session/result/create`, result, { headers: AuthHeader() })
    }

    retrieveResult(id) {
        return axios.get(`http://localhost:8080/session/result/get?id=${id}`, { headers: AuthHeader() })
    }

    retrieveAllResults(id) {
        return axios.get(`http://localhost:8080/session/result/get-all?id=${id}`, { headers: AuthHeader() })
    }
}

export default new DataService()
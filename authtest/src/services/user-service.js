const rp = require('request-promise');

export default class UserService {

    _baseUrl = 'http://localhost:5000/api/';

    _optionsBase = {
        headers: { 'User-Agent': 'Request-Promise' },
        method: "POST",
        json: true
    };

    authHeader() {
        let token = localStorage.getItem('token');
    
        if (token) {
            return { auth: {'bearer' : token} };
        } else {
            return {};
        }
    }

    async getResource(url, body) {
        const authHeader = this.authHeader();
        const options = { ...this._optionsBase, ...authHeader, uri: `${this._baseUrl}${url}`, body: body };
        return await rp(options);
    };

    async login (username, password){   
        localStorage.clear();

        const body = {
            username: username,
            password: password,
        };
        return this.getResource('auth/login', body).then((res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', username);
        });
    }

    async updateName (username){
        return this.getResource(`User/UpdateName?name=${username}`, null).then((res) => {
            localStorage.setItem('username', username);
        });;
    }

}
import MockAdapter from "axios-mock-adapter"

import axios from "axios";
import { logInUser } from "./PostsToolkitSlice";

const mock = new MockAdapter(axios);


mock.onGet("/users", { params: { userName: 'Admin', password: '1234' } }).reply(200, {
    users: [{ userName: 'Admin' }],
});







export const logIn = (userName: any, password: any) => (dispatch: any) => {
    axios
        .get("/users", { params: { userName, password } })
        .then(function (response: any) {
            dispatch(logInUser(response.data));
        })
        .catch(err => alert('Неверный логин или пароль'));
}
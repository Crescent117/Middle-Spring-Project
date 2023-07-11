import axios from "axios";
import { API_BASE_URL } from "./api-config";

export function call(api, method, request) {
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
        

    };
    if (request) {
        options.body = JSON.stringify(request);
    }
    console.log(options.body)
    console.log(options.body)
    return axios(options.url, options).then((response) => {
        console.log(response.status);
        if (response.status === 200) {

            return response.json();
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    })
}
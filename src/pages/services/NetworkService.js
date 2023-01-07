import axios from "axios";
import {BASIC_URL} from "../../links";

export const getAll = async (objType, token) => {
    try {
        const response = await axios.get(
            `${BASIC_URL}/api/${objType}/all`,
            {
                headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`}
            }
        );
        console.log(response);
        return response.data
        //token.current = response.data.token

    } catch (err) {
        if (!err?.response) {
            console.log("No Server Response");
        } else {
            console.log("Fail");
            console.log(err.response?.status);
            console.log(err.response);
        }
    }
    return []
}

export const getById = async (objType, id, token) => {
    try {
        console.log(token)
        const response = await axios.get(
            `${BASIC_URL}/api/${objType}/${id}`,
            {
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
            }
        );
        console.log(response);
        return response.data
        //token.current = response.data.token

    } catch (err) {
        if (!err?.response) {
            console.log("No Server Response");
        } else {
            console.log("Fail");
            console.log(err.response?.status);
            console.log(err.response);
        }
    }
    return null
}

export const getRelationsById = async (objType, id, relationType, token) => {
    try {
        console.log(token)
        const response = await axios.get(
            `${BASIC_URL}/api/${objType}/${id}/${relationType}`,
            {
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
            }
        );
        console.log(response);
        return response.data
        //token.current = response.data.token

    } catch (err) {
        if (!err?.response) {
            console.log("No Server Response");
        } else {
            console.log("Fail");
            console.log(err.response?.status);
            console.log(err.response);
        }
    }
    return []
}
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

export const getAllExcept = async (objType, token, objLst) => {
    try {
        const response = await axios.post(
            `${BASIC_URL}/api/${objType}/all_except`,
            objLst,
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


export const addRelationsById = async (objType, relationType, id, token, addIdsLst) => {
    try {
        console.log(token)
        const response = await axios.post(
            `${BASIC_URL}/api/${objType}/${id}/${relationType}/add`,
            addIdsLst,
            {
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
            }
        );
        console.log(response);
        return response.data


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

export const deleteRelationsById = async (objType, relationType, id, token, deleteIdsLst) => {
    try {
        console.log(token)
        const response = await axios.post(
            `${BASIC_URL}/api/${objType}/${id}/${relationType}/delete`,
            deleteIdsLst,
            {
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
            }
        );
        console.log(response);
        return response.data


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

export const modifyById = async (objType, id, token, updObj) => {
    try {
        console.log(token)
        const response = await axios.post(
            `${BASIC_URL}/api/${objType}/${id}/modify`,
            updObj,
            {
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`}
            }
        );
        console.log(response);
        return response.data


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
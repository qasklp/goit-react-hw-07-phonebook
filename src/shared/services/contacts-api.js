import axios from "axios";

const contactsInstanse = axios.create({
    baseURL: "https://6415f934c42f59a203ac3d4f.mockapi.io/api/contacts",
})

export const getAllContacts = async () => {
    const { data } = await contactsInstanse.get("/");
    return data;
}

export const addContact = async (data) => {
    const { data: result } = await contactsInstanse.post("/", data);
    return result;
}

export const deleteContact = async (id) => {
    const { data } = await contactsInstanse.delete(`/${id}`);
    return data;
}
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "shared/services/contacts-api";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const data = await api.getAllContacts();
            return data;
        }
        catch ({response}) {
            return thunkAPI.rejectWithValue(response.data.value);
        }
    }
)

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (data, thunkAPI) => {
        try {
            const result = await api.addContact(data);
            return result;
        }
        catch ({ response }) {
            return thunkAPI.rejectWithValue(response.data.value);
        }
    },
    {
        condition: ({name}, { getState }) => {
            const { contacts } = getState();
            const normalizedName = name.toLowerCase();
            const result = contacts.items.find(({ name }) => {
                return name.toLowerCase() === normalizedName;
            });
            if (result) {
                alert(`${name} is already in contacts`);
                return false;
            }
        }
    }
)

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkAPI) => {
        try {
            await api.deleteContact(id);
            return id;
        }
        catch ({response}) {
            return thunkAPI.rejectWithValue(response.data.value);
        }
    }
)
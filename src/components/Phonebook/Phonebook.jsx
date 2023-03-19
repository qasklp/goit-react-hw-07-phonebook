import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ContactList } from '../ContactList/ContactList';
import { Form } from '../Form/Form';
import { Filter } from '../Filter/Filter';

import { setFilter } from 'Redux/Filter/filter-slice';
import { getFilter } from 'Redux/Filter/filter-selectors';
import { getFilteredContacts } from 'Redux/Contacts/contacts-selectors';
import { fetchContacts, addContact, deleteContact } from 'Redux/Contacts/contacts-operations';

import styles from "./Phonebook.module.css"

export const Phonebook = () => {
    const filter = useSelector(getFilter);
    const contacts = useSelector(getFilteredContacts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    },[dispatch])

    const handleChange = ({ target }) => {
        dispatch(setFilter(target.value));
    }

    const handleAddContact = ({ name, number }) => {
        dispatch(addContact({ name, number }));
      
    }

    const removeContact = id => {
        dispatch(deleteContact(id));
    }

    return <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <Form
            onSubmit={handleAddContact}
        />
        <h2>Contacts:</h2>
        <Filter handleInput={handleChange} value={filter} />
        {contacts.length ? <ContactList contacts={contacts} removeContact={removeContact} /> : null}
    </div>;
}
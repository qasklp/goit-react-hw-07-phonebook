export const getContacts = ({contacts}) => contacts.items;
export const getFilter = store => store.filter;
export const getFilteredContacts = ({ contacts, filter }) => {
    const normalizedFilter = filter.toLowerCase();
    if (!filter) {
        return contacts.items;
    }
    const result = contacts.items.filter(({ name }) => {
        return (name.toLowerCase().includes(normalizedFilter))
    })
    return result;
}
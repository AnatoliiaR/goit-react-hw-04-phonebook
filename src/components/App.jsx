import { useState, useEffect } from 'react';
import style from './App.module.css';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

import { nanoid } from 'nanoid';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts.`)
      : setContacts([...contacts, contact]);
  };

  const deleteContact = Id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== Id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleCintacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={style.App}>
      <h1 className={style.title}>
        React homework "Phonebook" by Anatoliia Riabchenko
      </h1>
      <div className={style.section}>
        <h2 className={style.subtitle}>Phonebook</h2>
        <Form onSubmit={addContact} />
        <h2 className={style.subtitle}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleCintacts()}
          value={filter}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}

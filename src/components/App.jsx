import React, { Component } from 'react';
import style from './App.module.css';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    // console.log(data);

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.state.contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts.`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, contact],
        }));
  };

  deleteContact = Id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== Id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleCintacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const add = this.addContact;
    const changeFilter = this.changeFilter;

    const filteredContacts = this.getVisibleCintacts();
    const deleteContact = this.deleteContact;

    return (
      <div className={style.App}>
        <h1 className={style.title}>
          React homework "Phonebook" by Anatoliia Riabchenko
        </h1>
        <div className={style.section}>
          <h2 className={style.subtitle}>Phonebook</h2>
          <Form onSubmit={add} />
          <h2 className={style.subtitle}>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={filteredContacts}
            value={filter}
            onDelete={deleteContact}
          />
        </div>
      </div>
    );
  }
}

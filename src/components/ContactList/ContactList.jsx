import React from 'react';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';
import Contact from 'components/Contact/Contact';

export const ContactList = ({ contacts, onDelete }) => {
  const items = contacts.map(({ name, number, id }) => (
    <li className={style.item} key={id}>
      <Contact
        name={name}
        number={number}
        onDelete={() => onDelete(id)}
        id={id}
      />
    </li>
  ));
  return <ol>{items}</ol>;
};

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;

import React from 'react';
import propTypes from 'prop-types';
import ContactListItem from './ContactListItem';

import './Contact.css';

function ContactList({ contacts, onRemoveContact }) {
  return (
    <ul className="contextListContacts">
      <header className="listContacts">
        <span className="headerList">name</span>
        <span className="headerList">telephone</span>
        <span className="headerList">action</span>
      </header>

      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          onRemove={() => onRemoveContact(id)}
        />
      ))}
    </ul>
  );
}
ContactList.propTypes = {
  contacts: propTypes.oneOfType([
    propTypes.arrayOf(
      propTypes.exact({
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        number: propTypes.number.isRequired,
      }),
    ),
    propTypes.array,
  ]),
  onRemoveContact: propTypes.func.isRequired,
};

export default ContactList;

import React from 'react';
import propTypes from 'prop-types';

function ContactListItem({ name, number, onRemove }) {
  return (
    <li className="listContacts">
      <span className="list">{name}</span>
      <span className="list"> {number}</span>
      <button className="list" type="button" onClick={onRemove}>
        Delete
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  onRemove: propTypes.func.isRequired,
};

export default ContactListItem;

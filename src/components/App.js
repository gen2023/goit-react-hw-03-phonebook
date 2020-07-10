import React, { Component } from 'react';
import shortid from 'shortid';
import AddContact from './AddContact';
import ContactList from './ContactList';
import Filter from './Filter';
import Modal from './Modal';

import { saveToLS, getFromLS } from '../services/helper';

import '../../node_modules/modern-normalize/modern-normalize.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    message: '',
    showModal: false,
  };

  componentDidMount() {
    this.setState({ contacts: getFromLS('contacts') });
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      saveToLS('contacts', nextContacts);
    }
  }

  saveContact = ({ name, number }) => {
    const contact = { name, number, id: shortid.generate() };

    const { contacts } = this.state;
    const checkedName = contacts.find(contact => name === contact.name);

    if (checkedName) {
      this.closeModal();
      return this.setState({ message: `${name} is already in contacts` });
    }

    if (!name || !number) {
      this.closeModal();
      return this.setState({ message: `Fill in all the fields` });
    }

    this.setState(state => ({ contacts: state.contacts.concat(contact) }));
  };
  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };
  filterReturn() {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
    );
  }
  removeContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { contacts, filter, message, showModal } = this.state;
    const filterView = this.filterReturn();

    return (
      <>
        {message !== '' && showModal ? (
          <Modal onClose={this.closeModal}>{message}</Modal>
        ) : null}

        <h1>Phonebook</h1>
        <AddContact saveContact={this.saveContact} />
        <h2>Contact</h2>
        {contacts.length >= 2 && (
          <Filter filter={filter} handleFilter={this.handleFilter} />
        )}
        {filterView.length > 0 ? (
          <ContactList
            contacts={filterView}
            onRemoveContact={this.removeContact}
          />
        ) : (
          contacts.length !== 0 && (
            <ContactList
              contacts={contacts}
              onRemoveContact={this.removeContact}
            />
          )
        )}
      </>
    );
  }
}

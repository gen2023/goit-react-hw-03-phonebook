import React, { Component } from 'react';
import propTypes from 'prop-types';

import './AddContact.css';

export default class AddContact extends Component {
  static defaultProps = {};

  static propTypes = {
    saveContact: propTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveContact({ ...this.state });
    this.resetForm();
  };

  resetForm() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Name
            <input
              type="text"
              className="input"
              placeholder="Enter name"
              value={name}
              name="name"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Number
            <input
              type="text"
              className="input"
              placeholder="Enter number"
              value={number}
              name="number"
              onChange={this.handleChange}
            />
          </label>
        </div>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

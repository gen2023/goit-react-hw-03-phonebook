import React from 'react';
import propTypes from 'prop-types';

const Filter = ({ filter, handleFilter }) => (
  <div>
    <label>
      Find contacts by name
      <input
        type="text"
        className="input"
        placeholder="Enter name"
        value={filter}
        name="filter"
        onChange={handleFilter}
      />
    </label>
  </div>
);

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  handleFilter: propTypes.func.isRequired,
};

export default Filter;

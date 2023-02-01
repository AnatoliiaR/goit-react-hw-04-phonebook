import React from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={style.label}>
      <p className={style.text}>Find contacts by name</p>
      <input
        className={style.input}
        type="text"
        placeholder="Find contacts"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.prototype = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

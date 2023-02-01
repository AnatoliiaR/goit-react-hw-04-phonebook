import PropTypes from 'prop-types';
import style from './Contact.module.css';

const Contact = ({ name, number, onDelete, id }) => {
  return (
    // <li className={style.list}>
    <div className={style.list}>
      <div>
        <span className={style.name}>{name}:</span>
        <span className={style.number}>{number}</span>
      </div>
      <button
        className={style.button}
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
      {/* </li> */}
    </div>
  );
};

Contact.prototype = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default Contact;

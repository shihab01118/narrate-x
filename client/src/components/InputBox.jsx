import PropTypes from 'prop-types';
import { useState } from 'react';

const InputBox = ({ name, type, id, value, placeholder, icon, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className='relative w-full mb-4'>
      <input
        name={name}
        type={
          type === 'password' ? (passwordVisible ? 'text' : 'password') : type
        }
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        className='input-box'
      />
      <i className={`fi ${icon} input-icon`}></i>

      {type === 'password' ? (
        <i
          className={`fi fi-rr-${
            passwordVisible ? 'eye-crossed' : 'eye'
          } input-icon left-auto right-4 cursor-pointer`}
          onClick={() => setPasswordVisible(!passwordVisible)}
        ></i>
      ) : (
        ''
      )}
    </div>
  );
};

InputBox.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func
};

export default InputBox;

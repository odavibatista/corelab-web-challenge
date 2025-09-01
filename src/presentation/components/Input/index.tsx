import { JSX } from 'react';
import s from './styles.module.scss';

interface InputProps {
  placeholder?: string;
  type: 'submit' | 'password' | 'email' | 'text' | 'textarea';
  name: string;
  maxLength?: number;
  errorMessage?: string;
  register?: any;
  text: string;
  forName: string;
  uppercase?: boolean;
  options?: any[];
  value?: string | number;
}

const InputComponent = ({
  placeholder,
  type,
  name,
  maxLength,
  register,
  forName,
  uppercase,
  text,
  errorMessage,
  value,
}: InputProps): JSX.Element => {
  return (
    <span className={s.span}>
      <label
        htmlFor={forName}
        className={`${s.label} ${uppercase === true ? s.uppercase : ''}`}
      >
        {text}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={s.input}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          {...(register && register(name))}
          defaultValue={value}
        />
      ) : (
        <input
          className={s.input}
          type={type}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          {...(register && register(name))}
          defaultValue={value}
        />
      )}

      {errorMessage && <p className={s.error_message}>{errorMessage}</p>}
    </span>
  );
};

export default InputComponent;

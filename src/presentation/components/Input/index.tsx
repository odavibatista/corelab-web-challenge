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
  transparent?: boolean

  onChange?: (e: any) => void;
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
  transparent,
  onChange,
}: InputProps): JSX.Element => {
  return (
    <span className={s.span}>
      {type === 'textarea' ? (
        <input
          className={transparent ? s.transparent : s.input}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          {...(register && register(name))}
          defaultValue={value}
          onChange={onChange}
        />
      ) : (
        <>
          <label
            htmlFor={forName}
            className={`${s.label} ${uppercase === true ? s.uppercase : ''}`}
          >
            {text}
          </label>
          <input
            className={s.input}
            type={type}
            placeholder={placeholder}
            name={name}
            maxLength={maxLength}
            {...(register && register(name))}
            defaultValue={value}
            onChange={onChange}
          />
        </>
      )}

      {errorMessage && <p className={s.error_message}>{errorMessage}</p>}
    </span>
  );
};

export default InputComponent;

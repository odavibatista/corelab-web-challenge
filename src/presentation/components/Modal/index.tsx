import s from './styles.module.scss';

export interface IModalData {
  message: string;
  buttonText?: string;
  type: 'success' | 'error' | 'warning';
}

interface ModalProps {
  modal: IModalData;
  openCloseModal: () => void;
}

const Modal = ({ modal, openCloseModal }: ModalProps) => {
  const { message, type } = modal;

  const handleClick = (): void => {
    openCloseModal();
  };

  return (
    <div className={s.modal_open}>
      <div className={s.modal}>
        <p className={s.message}>{message}</p>
        <div className={s.button}>
          <button onClick={handleClick}>
            {modal.buttonText ? modal.buttonText : 'Ok'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

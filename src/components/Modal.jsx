import '../styles/components/modal.scss'

const Modal = ({ children, isOpen, closeModal }) => {
  return (
    <div className={`modal ${isOpen ? 'open-modal' : ''}`}>
      <div className='modal-content'>
        <span className='modal-close' onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal

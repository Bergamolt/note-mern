import Modal from 'react-modal'
import Parser from 'html-react-parser'

const styles = {
  content: {
    width: '80%',
    height: 'max-content',
    minHeight: 500,
    maxHeight: 'calc(100% - 20px)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

export default function MyModal({modalIsOpen, closeModal, content}) {
  return (
    <Modal style={ styles } isOpen={ modalIsOpen } onRequestClose={ closeModal }>
      <div>
        { !!content && Parser(content) }
      </div>
    </Modal>
  )
}
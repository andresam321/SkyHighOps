import { useModal } from '../../context/Modal';
import "./OpenModalCss.css"

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <button
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease'
      }}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default OpenModalButton;

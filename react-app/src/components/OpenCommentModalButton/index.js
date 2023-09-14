import React from 'react';
import { useCommentModal } from '../../context/CommentModal';

function OpenCommentModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  style,
  className
}) {
  const { setCommentModalContent, setOnCommentModalClose } = useCommentModal();

  const onClick = () => {
    if (onModalClose) setOnCommentModalClose(onModalClose);
    setCommentModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick} style={style} className={className}>{buttonText}</button>
  );
}

export default OpenCommentModalButton;

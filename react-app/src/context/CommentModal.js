import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './CommentModal.css';

const CommentModalContext = React.createContext();

export function CommentModalProvider({ children }) {
  const commentModalRef = useRef();
  const [commentModalContent, setCommentModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onCommentModalClose, setOnCommentModalClose] = useState(null);

  const closeCommentModal = () => {
    setCommentModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onCommentModalClose === 'function') {
      setOnCommentModalClose(null);
      onCommentModalClose();
    }
  };

  const commentContextValue = {
    commentModalRef, // reference to modal div
    commentModalContent, // React component to render inside modal
    setCommentModalContent, // function to set the React component to render inside modal
    setOnCommentModalClose, // function to set the callback function called when modal is closing
    closeCommentModal // function to close the modal
  };

  return (
    <>
      <CommentModalContext.Provider value={commentContextValue}>
        {children}
      </CommentModalContext.Provider>
      <div ref={commentModalRef} />
    </>
  );
}

export function CommentModal() {
  const { commentModalRef, commentModalContent, closeCommentModal } = useContext(CommentModalContext);
  // If there is no div referenced by the ModalRef or modalContent is not a
  // truthy value, render nothing:
  if (!commentModalRef || !commentModalRef.current || !commentModalContent) return null;

  // Render the following component to the div referenced by the ModalRef
  return ReactDOM.createPortal(
    <div id="commentmodal">
      <div id="commentmodalbackground" onClick={closeCommentModal} />
      <div id="commentmodalcontent">
        {commentModalContent}
      </div>
    </div>,
    commentModalRef.current
  );
}

export const useCommentModal = () => useContext(CommentModalContext);

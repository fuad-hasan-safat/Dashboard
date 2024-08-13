'use client'

import React,{useState} from 'react';

const Modal = ({ isOpen, selectedContent, onClose }) => {
  if (!isOpen) return null; // Don't render if modal is closed
  const [html, setHTML] = useState({ __html: selectedContent.content });


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedContent.title}</h2>
        <div
         className="text-[16px] text-gray-500"
         dangerouslySetInnerHTML={html}
        >

        </div>
        {/* <p>{selectedContent.content}</p> */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  zIndex: 10, 
};

export default function StyledModal({ isOpen, selectedContent, onClose }) {
  return (
    <div
    className=' bg-black/25'
     style={modalStyles}>
      <Modal isOpen={isOpen} selectedContent={selectedContent} onClose={onClose} />
    </div>
  );
}
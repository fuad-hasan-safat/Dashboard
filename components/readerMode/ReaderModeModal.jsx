import React from 'react';

const ReaderModeModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;


 

    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 inset-0 z-[99999999999999999999]  bg-black bg-opacity-50">
            <div className="relative w-full h-full bg-white shadow-lg overflow-y-auto">
                <div className="">{children}</div>
            </div>
        </div >
    );
};

export default ReaderModeModal;

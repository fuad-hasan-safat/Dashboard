'use client'

import React, {useState} from "react";

const Modal = ({isVisible, onClose, content}) => {
    const [html, setHTML] = useState({ __html: content });

    if(!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <div className="w-[600px]">

                <button className="text-white text-2xl place-self-end"
                onClick={()=> onClose()}
                >
                    X
                </button>

                <div className="bg-white">

                    <div
                     className="text-[16px] text-gray-500"
                     dangerouslySetInnerHTML={html}
                    >

                    </div>

                </div>
                
            </div>

        </div>
    )
}

export default Modal;
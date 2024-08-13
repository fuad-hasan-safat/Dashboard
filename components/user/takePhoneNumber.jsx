import React, { useState } from 'react'
import { apiBasePath } from '../../utils/constant';

export default function TakePhoneNumber({userUuid}) {
    const [showModal, setShowModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setPhoneNumber("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber.length !== 11 || !phoneNumber.startsWith("01")) {
            setError("Phone number must be 11 digits and start with '01'");
            return;
        }
        // Add your logic to handle the phone number submission


        try {
            const response = await fetch(`${apiBasePath}/add-phone-number`, {
                method: 'PUT',
                headers: {
                    // 'x-access-token': token,
                },
                body: {
                    uuid: userUuid,
                    phone: `88${phoneNumber}`
                }
            });

           console.log('phone number updated -------------', response)
        } catch (error) {
            console.error('Error updating phonenumber:', error);
        }

        console.log("Phone Number:", phoneNumber);
        closeModal();
    };

    return (
        <div>
            <button
                className="bg-[#F9A106] text-white py-2 px-4 rounded"
                onClick={openModal}
            >
                ফোন নাম্বার দিন
            </button>

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-headline"
                                        >
                                            মোবাইল নাম্বার দিন
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="number"
                                                    value={phoneNumber}
                                                    placeholder='০১-xxxxxxxxx'
                                                    onChange={(e) => {setPhoneNumber(e.target.value)}}
                                                    className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-md w-full px-[10px] py-[5px]"
                                                />
                                                {error && (
                                                    <p className="text-red-500 text-sm">{error}</p>
                                                )}
                                                <div className="mt-4">
                                                    <button
                                                        type="submit"
                                                        className="bg-[#F9A106] text-white py-2 px-4 rounded"
                                                    >
                                                        সাবমিট
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={closeModal}
                                                        className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded"
                                                    >
                                                        বাতিল
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client'

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { apiBasePath } from "../../../utils/constant";
import CreateDesignationModal from "../../admin/createDesignationModal";
import NotFound from "../../common/nofFound";
import ContentList from "./ContentList";
import DialugueModal from "../../common/notification/DialugueModal";

const AllDesignation = () => {
    const router = useRouter();
    const dialogueRef = useRef();
    const [userType, setUserType] = useState("");
    const [designation, setDesignation] = useState([]);
    const [isCategoryAdded, setIsCategoryAdded] = useState(false);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/designation`)
            .then(response => response.json())
            .then(data => {
                setDesignation(data);
                console.log('-----------', data)
                console.log('-----------', designation)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, [designation]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);



    function deletSelectedDesignation(id) {
        setDesignation(prevDesignation => prevDesignation.filter(deg => deg._id !== id));

    }

    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/designation/${id}`);
            console.log('Delete successful:', response.data);
            deletSelectedDesignation(id);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }


    async function deteteDesignation() {
        try {
            await deleteData(selectedDesignation);
            dialogueRef.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    function handleDeleteDesignation(id){
        setSelectedDesignation(id);
        dialogueRef.current.showModal();
    }

    if (userType === 'admin') {

        return (
            <div className="all__page__content__block clearfix">
                <DialugueModal ref={dialogueRef} alert='আপনি কি পদবী মুছে ফেলতে চান' address={deteteDesignation} type='delete'/>
                <div className="w-full clearfix">
                    <div className="all__post__search">
                        <input type="search" placeholder="Enter Search.." />
                        <button><i class="ri-search-eye-line"></i></button>
                    </div>
                    <div className="designation__btn">
                        <button
                            className="bg-[#FCA000] hover:bg-[#eeb249] text-white py-2 px-[25px] rounded mt-[20px]"
                            onClick={handleShow}
                        >
                            নতুন পদবী
                        </button>
                        {showModal && <CreateDesignationModal setDesignation={setDesignation} showModal={showModal} handleClose={handleClose} setIsCategoryAdded={setIsCategoryAdded} />}
                    </div>
                </div>
                <div className="all__post__list__wrap clearfix">
                    <div className="all__post__category all__post__list__overflow">
                    <table class="table">
                        <thead>
                            <tr className="clearfix">
                                <th>No</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designation.length &&
                                designation.map((slider, index) => (
                                    <tr className="clearfix">
                                        <td>{index + 1}</td>
                                        <td>{slider.title}</td>
                                        <td>
                                            {/* <i class="ri-eye-fill"></i> */}
                                            {/* <i class="ri-edit-line"></i> */}
                                            <i onClick={()=>handleDeleteDesignation(slider._id)} class="ri-delete-bin-6-line"></i>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    } else {
        return <NotFound />
    }
}

export default AllDesignation;
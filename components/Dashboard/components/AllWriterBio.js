'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { apiBasePath } from "../../../utils/constant";
import NotFound from "../../common/nofFound";
import CreateWriterBioModal from "../../admin/createWriterBioModal";
import ContentList from "./ContentList";
import StyledModal from "./styleModal";

const AllWriterBio = () => {

    const router = useRouter();
    const [userType, setUserType] = useState("");
    const [bioList, setBioList] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [istitleClick, setIsTitleClick] = useState(false)
    const [selectedContent, setSelectedContent] = useState(null);
    const [isCategoryAdded, setIsCategoryAdded] = useState(false)
    const [showModal, setShowModal] = useState(false);





    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/listwriterbio`)
            .then(response => response.json())
            .then(data => {
                setBioList(data);
                console.log('-----------', data)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, [bioList]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleOpenModal = (item) => {
        setSelectedContent(item);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setIsTitleClick(false)
        setSelectedContent(null);
    };

    function deletSelectedBio(id) {
        setBioList(prevBio => prevBio.filter(bio => bio._id !== id));

    }

    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/deletewriterbio/${id}`);
            deletSelectedBio(id);
            console.log('Delete successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }


    async function deleteBio(id) {
        try {
            await deleteData(id);
            // If successful, update state or do something else
            alert('Delete Sucessfully')
        } catch (error) {
            // Handle error
            alert('Failed to Delete')

        }
    }

    if (userType === 'admin') {

        return (
            <div className="all__page__content__block clearfix">
            <div className="all__post__search">
                <input type="search" placeholder="Enter Search.." />
                <button><i class="ri-search-eye-line"></i></button>
            </div>
            <div>
                <button
                    className="bg-[#FCA000] hover:bg-[#eeb249] text-white py-2 px-[25px] rounded mt-[20px]"
                    onClick={handleShow}
                >
                    BioAdd
                </button>
                {/* {showModal && <CreateDesignationModal setDesignation={setDesignation} showModal={showModal} handleClose={handleClose} setIsCategoryAdded={setIsCategoryAdded} />} */}
                <CreateWriterBioModal showModal={showModal} handleClose={handleClose} setIsCategoryAdded={setIsCategoryAdded} />
            </div>
            <div className="all__post__list__wrap all__post__category">
                <table class="table">
                <thead>
                    <tr>
                    <th>No</th>
                    <th scope="col">Bio</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {bioList.length &&
                    bioList.map((bioList, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{bioList.title}</td>
                        <td>
                            <i class="ri-eye-fill"></i>
                            <i class="ri-edit-line"></i>
                            <i class="ri-delete-bin-6-line"></i>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        )
    } else {
        return <NotFound />
    }
}

export default AllWriterBio
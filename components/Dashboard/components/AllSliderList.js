'use client'

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiBasePath } from "../../../utils/constant";
import NotFound from "../../common/nofFound";
import ContentList from "./ContentList";
import DialugueModal from "../../common/notification/DialugueModal";

const AllSliderList = () => {
    const router = useRouter();
    const dialogueRef = useRef();
    const [userType, setUserType] = useState("");
    const [sliderList, setSliderList] = useState([]);
    const [selectedSlider, setSelectedSlider] = useState({
        id: null,
        title:''
    })

    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);


    useEffect(() => {
        fetch(`${apiBasePath}/sliders`)
            .then(response => response.json())
            .then(data => {
                setSliderList(data);
                console.log('-----------', data)
                console.log('-----------', sliderList)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, []);


    function deletSelectedSlider(id) {
        setSliderList(prevSliderList => prevSliderList.filter(slider => slider._id !== id));

    }

    async function deleteData(id) {
        try {
            const response = await axios.delete(`${apiBasePath}/sliders/${id}`);
            console.log('Delete successful:', response.data);
            deletSelectedSlider(id);
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }


    async function deleteSlider() {
        try {
            await deleteData(selectedSlider.id);
            // If successful, update state or do something else
            dialogueRef.current.close();
        } catch (error) {
            // Handle error
            console.log(error)

        }
    }

    function handleDeleteSlider(id, title){
        setSelectedSlider({
            id: id,
            title: title
        });
        dialogueRef.current.showModal();
    }

    if (userType === 'admin') {
        return (
            <div className="all__page__content__block clearfix">
                <DialugueModal ref={dialogueRef} alert={`আপনি কি ${selectedSlider.title} স্লাইডার মুছে ফেলতে চান`} address={deleteSlider} type='delete' />
                <div className="clearfix w-full">
                    <div className="all__post__search">
                        <input type="search" placeholder="Enter Search.." />
                        <button><i class="ri-search-eye-line"></i></button>
                    </div>
                </div>
                <div className="all__post__list__wrap">
                    <div className="all__post__category all__post__list__overflow">
                        <table class="table">
                            <thead className="clearfix">
                                <tr className="clearfix">
                                    <th>No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sliderList.length &&
                                    sliderList.map((slider, index) => (
                                        <tr className="clearfix">
                                            <td>{index + 1}</td>
                                            <td>{slider.title}</td>
                                            <td>
                                                {/* <i class="ri-eye-fill"></i> */}
                                                {/* <i class="ri-edit-line"></i> */}
                                                <i onClick={()=>handleDeleteSlider(slider._id, slider.title)} class="ri-delete-bin-6-line"></i>
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

export default AllSliderList
import React, { useEffect, useRef, useState } from 'react';
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import DialugueModal from '../../common/notification/DialugueModal';

export default function DeleteAudioCategory() {
    const router = useRouter();
    const dialogueRef = useRef();
    const [userType, setUserType] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [selectedCatId, setSelectedId] = useState(null);

    let notification = '';

    useEffect(() => {
        setUserType(localStorage.getItem("usertype") || "");
    }, []);

    useEffect(() => {
        fetchCategoryList();
    }, []);

    const fetchCategoryList = () => {
        fetch(`${apiBasePath}/audiocategories`)
            .then((response) => response.json())
            .then((data) => {
                setCategoryList(data);
                console.log('audio category data', data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    const deleteCategory = () => {
        console.log('Selected audiocategoryid ', selectedCatId)
        axios
            .delete(`${apiBasePath}/deletecategory/${selectedCatId}`)
            .then((response) => {
                console.log("Delete successful:", response.data);
                setCategoryList((prevCategoryList) =>
                    prevCategoryList.filter((category) => category._id !== selectedCatId)
                );
                notification = 'অডিও বুকের ধরণ ডিলিট হয়েছে';
                notify1();
                dialogueRef.current.close();
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
                notification = 'অডিও বুকের ধরণ ডিলিট হয়নি';
                notify();
            });
    };

    const notify1 = () => toast.success(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });
    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });

    // Pagination logic
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;

    // Filter categories based on search term
    const filteredCategories = categoryList.filter((category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredCategories.length / categoriesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle search input change
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset pagination when search term changes
    };

    let category = '';
    function handleCategoryDelete(id, name) {
        setSelectedId(id);
        category = name;
        dialogueRef.current.showModal();
    }

    return (
        <div className='all__page__content__block clearfix'>
            <ToastContainer />
            <DialugueModal ref={dialogueRef} alert={`আপনি কি লেখার ধরণ ${category} মুছে ফেলতে চান `} address={deleteCategory} type='delete' />

            <div className='clearfix w-full'>
                <div className="all__post__search">
                    <input
                        type="search"
                        placeholder="Enter Search.."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button>
                        <i className="ri-search-eye-line"></i>
                    </button>
                </div>
            </div>
            <div className="all__post__list__wrap">
                <div className='all__post__category all__post__list__overflow clearfix'>
                    <table className="table">
                        <thead>
                            <tr className='clearfix'>
                                <th>No</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategories.length > 0 ? (
                                currentCategories.map((category, index) => (
                                    <tr key={category._id} className='clearfix'>
                                        <td>{indexOfFirstCategory + index + 1}</td>
                                        <td>{category.title}</td>
                                        <td>
                                            {/* <i className="ri-eye-fill"></i> */}
                                            {/* <i className="ri-edit-line"></i> */}
                                            <i
                                                className="ri-delete-bin-6-line"
                                                onClick={() => handleCategoryDelete(category._id, category.title)}
                                            ></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='clearfix'>
                                    <td colSpan="3">No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="dashboard__pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    <i className="ri-arrow-left-double-line"></i>
                </button>
                {Array.from(
                    { length: Math.ceil(filteredCategories.length / categoriesPerPage) },
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    )
                )}
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredCategories.length / categoriesPerPage)}
                >
                    <i className="ri-arrow-right-double-fill"></i>
                </button>
            </div>


        </div>
    )
}

import React, { useContext } from 'react';
import { AdminContext } from '../../store/adminpanel-context';

const Breadcrumb = () => {
    const {currentPage} = useContext(AdminContext)
    return (
        <div className='breadcrumb__wrap'>
            <h5>Dashboard</h5>
            <ul className='text-black'>
                <li><a href='#'>Home</a><i class="ri-arrow-right-double-line"></i></li>
                <li><a href='#'>{currentPage}</a></li>
            </ul>
        </div>
    );
};

export default Breadcrumb;
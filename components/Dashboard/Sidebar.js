import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../store/adminpanel-context';
import { Link } from 'lucide-react';

const Sidebar = () => {
    const router = useRouter();

    const { setCurrentComponentIndex, currentindex } = useContext(AdminContext);
    const [activeMenu, setActiveMenu] = useState(0); // State to track the active menu
    const [openSubMenus, setOpenSubMenus] = useState({ 0: true }); // State to track open sub-menus

    // useEffect(() => {
    //     // Set Lekhar Poka as active by default on the initial render
    //     // setCurrentComponentIndex(0, 'Dashboard');
    // }, []);

    const menuItems = [
        { text: 'Dashboard', icon: 'ri-dashboard-fill', href: '/admin/allposttable' },
        { text: 'All Post', icon: 'ri-progress-8-fill', href: '/admin/allposttable' },
        { text: 'All Category', icon: 'ri-progress-8-fill', href: '/admin/allcategory' },
        { text: 'Create Slider', icon: 'ri-progress-8-fill', href: '/admin/slider' },
        { text: 'All Writer', icon: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { text: 'All Profile', icon: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { text: 'Slider List', icon: 'ri-progress-8-fill', href: '/admin/allslidertable' },
        { text: 'Designation List', icon: 'ri-progress-8-fill', href: '/admin/alldesignation' },
        { text: 'Bio List', icon: 'ri-progress-8-fill', href: '/admin/allWriterBio' },
    ];

    const menuItemsAudio = [
        { textA: 'Creat Audio Book', iconA: 'ri-progress-8-fill', href: '' },
        { textA: 'Edit Audio Book', iconA: 'ri-progress-8-fill', href: '' },
        { textA: 'Create Category', iconA: 'ri-progress-8-fill', href: '/admin/allcategory' },
        { textA: 'Create Quote', iconA: 'ri-progress-8-fill', href: '/admin/slider' },
        { textA: 'Add Audioo', iconA: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { textA: 'Delete Category', iconA: 'ri-progress-8-fill', href: '' },
        { textA: 'Delete Audiobook', iconA: 'ri-progress-8-fill', href: '' },
        
    ];

    function handleIndexClick(index, page){
        setCurrentComponentIndex(index, page);
        setActiveMenu(index); // Set the clicked menu as active
    }

    // const handleIndexClick = (index, page) => {
       
    // };

    const toggleSubMenu = (index) => {
        setOpenSubMenus({ [index]: !openSubMenus[index] });
    };

    //Responsive Js

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    return (
        <>
        <div className='sidebar__toggle__menu'>
            <button onClick={ToggleSidebar}><i class="ri-menu-line"></i></button>
        </div>
        <div className={`d__sidebar ${isOpen == true ? 'addActive' : ''}`}>
            <div className='d__sidebar__menu'>
                <ul>
                    <li>
                        <a onClick={() => toggleSubMenu(0)}>Lekhar Poka <i class="ri-arrow-down-s-line"></i></a>
                        {openSubMenus[0] && (
                            <ul>
                                {menuItems.map((item, index) => (
                                    <li key={index} className={`text-black ${currentindex === index ? 'active' : ''}`}>
                                        <button onClick={() => handleIndexClick(index, item.text)}>
                                            <i className={`ri ${item.icon} text-black`}></i>
                                            {item.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
                <ul>
                    <li>
                        <a onClick={() => toggleSubMenu(1)}>Audio Book <i class="ri-arrow-down-s-line"></i></a>
                        {openSubMenus[1] && (
                            <ul>
                                {menuItemsAudio.map((item, index) => (
                                    <li key={index + menuItems.length} className={`text-black ${currentindex === index + menuItems.length ? 'active' : ''}`}>
                                        <button onClick={() => handleIndexClick(index + menuItems.length, item.textA)}>
                                            <i className={`ri ${item.iconA} text-black`}></i>
                                            {item.textA}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
     </>
    );
};

export default Sidebar;
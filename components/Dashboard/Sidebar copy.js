import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { AdminContext } from '../store/adminpanel-context';

const Sidebar = () => {
    const router = useRouter();

    const {setCurrentComponentIndex, currentindex} = useContext(AdminContext)

    const menuItems = [
        { text: 'Dashboard', icon: 'ri-dashboard-fill', href: '/admin/allposttable' },
        { text: 'All Post', icon: 'ri-progress-8-fill', href: '/admin/allposttable' },
        { text: 'All Category', icon: 'ri-progress-8-fill', href: '/admin/allcategory' },
        { text: 'Create Slider', icon: 'ri-progress-8-fill', href: '/admin/slider' },
        { text: 'All Writer', icon: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { text: 'Slider List', icon: 'ri-progress-8-fill', href: '/admin/allslidertable' },
        { text: 'Designation List', icon: 'ri-progress-8-fill', href: '/admin/alldesignation' },
        { text: 'Bio List', icon: 'ri-progress-8-fill', href: '/admin/allWriterBio' },
    ];
    const menuItemsAudio = [
        { textA: 'Creat Ebook', iconA: 'ri-progress-8-fill', href: '/admin/createbook' },
        { textA: 'Create Category', iconA: 'ri-progress-8-fill', href: '/admin/allcategory' },
        { textA: 'Create Slider', iconA: 'ri-progress-8-fill', href: '/admin/slider' },
        { textA: 'All Writer', iconA: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { textA: 'Slider List', iconA: 'ri-progress-8-fill', href: '/admin/allslidertable' },
        { textA: 'Designation List', iconA: 'ri-progress-8-fill', href: '/admin/alldesignation' },
        { textA: 'Bio List', iconA: 'ri-progress-8-fill', href: '/admin/allWriterBio' },
    ];

    const isActive = (href) => {
        return router.pathname === href;
    };

    function handleIndexClick(index, page){
        setCurrentComponentIndex(index, page)
    }

    return (
        <div className='d__sidebar'>
            <div className='d__sidebar__menu'>
                <ul>
                    <li>
                      <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className={`text-black ${currentindex === index ? 'active': ''}`}>
                                <button onClick={()=>handleIndexClick(index, item.text)}>
                                    <i className={`ri ${item.icon} text-black`}></i>
                                    {item.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                    </li>
                </ul>
                <h3>Audio Book</h3>
                <ul>
                    <li>
                      <ul>
                        {menuItemsAudio.map((items,index)=>(
                            <li key={index}>
                                <button onClick={()=>handleIndexClick(index + 8, items.textA)}>
                                    <i className={`ri ${items.iconA} text-black`}></i>
                                    {items.textA}
                                </button>
                            </li>
                        ))}
                      </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
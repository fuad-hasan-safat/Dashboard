import React, { useContext, useEffect, useState } from 'react';
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { AdminContext } from '../../store/adminpanel-context';

const colorPicker = [
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
    { color: '#ff595e' },
    { color: '#ffca3a' },
    { color: '#8ac926' },
    { color: '#1982c4' },
    { color: '#6a4c93' },
    { color: '#a9e5bb' },
    { color: '#fcf6b1' },
    { color: '#f7b32b' },
    { color: '#247ba0' },
    { color: '#8ea604' },
    { color: '#f5bb00' },
    { color: '#ec9f05' },
    { color: '#d76a03' },
    { color: '#bf3100' },
    { color: '#a6e1fa' },
    { color: '#724cf9' },
    { color: '#edf67d' },
    { color: '#6ede8a' },
    { color: '#ff87ab' },
]

function DashboardContent() {
    const { setCurrentComponentIndex, currentindex, setCurrentDashBoardCliekedCat } = useContext(AdminContext);

    const [categoryCount, setcategoryCount] = useState({
        audioBookCategory: null,
        lekharPokaCategory: null
    })

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiBasePath}/categorycount`);

                setcategoryCount({
                    audioBookCategory: response.data.audio_cat,
                    lekharPokaCategory: response.data.writting_cat
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();


    }, [])


    function categoryClickHandle(category, sidebarIndex) {
        if (sidebarIndex === 0) {
            console.log({ category })
            localStorage.setItem('dashboardMenuIndex', 0);
            localStorage.setItem('dashboardMenuIndexValue', true);
            setCurrentComponentIndex(1, 'All Post');
            setCurrentDashBoardCliekedCat(category)
        } else if (sidebarIndex === 1) {
            // localStorage.setItem('dashboardMenuIndex', 1);
            // localStorage.setItem('dashboardMenuIndexValue', true);
        }


    }

    if (!categoryCount.audioBookCategory) return null;

    return (
        <div className='dashboard__component'>
            <div className='dashboard__category clearfix'>
                <h3>Lekharpoka</h3>
                <ul>
                    {categoryCount.lekharPokaCategory.map((item, index) => (
                        <li key={index}>
                            <div className='dashboard__cmpt__grid' style={{ backgroundColor: `${colorPicker[index].color}` }}>
                                <div>
                                    <h5
                                        className='cursor-pointer'
                                        onClick={() => categoryClickHandle(item.category, 0)}>{item.category}</h5>
                                    <p>মোট {item.category} সংখ্যা</p>
                                </div>
                                <strong>{item.count}</strong>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='dashboard__category clearfix'>
                <h3>Audio Book</h3>
                <ul>
                    {categoryCount.audioBookCategory.map((item, index) => (
                        <li key={index + 9}>
                            <div className='dashboard__cmpt__grid' style={{ backgroundColor: `${item.color}` }}>
                                <div>
                                    <h5 onClick={() => categoryClickHandle(item.category, "lekharpoka")}>{item.category}</h5>
                                    <p>মোট {item.category} সংখ্যা</p>
                                </div>
                                <strong>{item.count}</strong>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardContent;
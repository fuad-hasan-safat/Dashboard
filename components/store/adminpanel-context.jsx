import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
    currentindex: 0,
    currentPage: '',
    viewPostid: '',
    isViewPost: false,
    editPostid: '',
    isEditpost: false,
    deletePostId: '',
    setCurrentComponentIndex: () => { },
    setViewPost: () => { },
    setEditPost: () => { },
    setDeletepostId: () => { }
});

export default function AdminContextProvider({ children }) {

    const [dashboard, setDashboard] = useState({
        currentindex: 0,
        currentPage: 'Dashboard',
        viewPostid: '',
        editPostid: '',
        deletePostId: '',
        isEditpost: false,
        isViewPost: false,
    })

    useEffect(() => {
        const currentDashboardIndex = parseInt(localStorage.getItem("dashBordPageIndex"));
        const currentDashboardPageScope = localStorage.getItem("dashBordPageScope");

        console.log({ currentDashboardIndex, currentDashboardPageScope })
        if (currentDashboardIndex != null) {
            setDashboard((prevState) => ({
                ...prevState,
                currentindex: currentDashboardIndex,
                currentPage: currentDashboardPageScope
            }))
        }


    }, [])

    function updateCurrentComponentIndex(index, page) {
        localStorage.setItem("dashBordPageIndex", index);
        localStorage.setItem("dashBordPageScope", page);
        console.log({ index, page })
        setDashboard((prevDashboard) => ({
            ...prevDashboard,
            currentindex: index,
            currentPage: page,
            isViewPost: false,
            isEditpost: false,
            viewPostid: '',
            editPostid: '',
            deletePostId: '',
        }))

    }

    function setPostToView(id, status = true) {
        setDashboard((prevDashboard) => ({
            ...prevDashboard,
            viewPostid: id,
            isViewPost: status,
        }))
    }

    function setPostToEdit(id, status = true) {
        setDashboard((prevdashboard) => ({
            ...prevdashboard,
            editPostid: id,
            isEditpost: status
        }))
    }

    function setPostIdToDelete(id) {
        setDashboard((prevdashboard) => ({
            ...prevdashboard,
            deletePostId: id
        }))
    }

    const cntxtValue = {
        currentindex: dashboard.currentindex,
        currentPage: dashboard.currentPage,
        viewPostid: dashboard.viewPostid,
        isViewPost: dashboard.isViewPost,
        editPostid: dashboard.editPostid,
        isEditpost: dashboard.isEditpost,
        deletePostId: dashboard.deletePostId,
        setCurrentComponentIndex: updateCurrentComponentIndex,
        setViewPost: setPostToView,
        setEditPost: setPostToEdit,
        setDeletepostId: setPostIdToDelete
    }

    return (
        <AdminContext.Provider value={cntxtValue}>
            {children}
        </AdminContext.Provider>
    )
}
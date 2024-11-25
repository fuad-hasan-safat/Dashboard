import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
    currentindex: 0,
    currentPage: '',
    viewPostid: '',
    isViewPost: false,
    editPostid: '',
    isEditpost: false,
    deletePostId: '',
    quoteId: '',
    quoteTitle: '',
    isEditQuote: false,
    editCategoryId: '',
    isEditCategory: '',
    currentDashBoardCliekedCat: null,
    editCategoryData: {},
    setCurrentComponentIndex: () => { },
    setViewPost: () => { },
    setEditPost: () => { },
    setEditQuote: () => { },
    setEditCategory: () => { },
    setDeletepostId: () => { },
    setQuotId: () => { },
    setIsEditCategory: () => { },
    setCurrentDashBoardCliekedCat: () => { }
});

export default function AdminContextProvider({ children }) {

    const [dashboard, setDashboard] = useState({
        currentindex: 0,
        currentPage: 'Dashboard',
        viewPostid: '',
        editPostid: '',
        deletePostId: '',
        editCategoryId: '',
        currentDashBoardCliekedCat: null,
        editCategoryData: {},
        quoteId: '',
        quoteTitle: '',
        isEditQuote: false,
        isEditpost: false,
        isViewPost: false,
        isEditCategory: false,
    })

    useEffect(() => {
        const currentDashboardIndex = parseInt(localStorage.getItem("dashBordPageIndex") || 0);
        const currentDashboardPageScope = localStorage.getItem("dashBordPageScope" || 'Dashboard');

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
            isEditQuote: false,
            isEditCategory: false,
            viewPostid: '',
            editPostid: '',
            quoteId: '',
            deletePostId: '',
            currentDashboardClickCat: null,
            editCategoryData: {},
            editCategoryId: '',
            quoteTitle: '',
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

    function setQuotToEdit(id, status = true, title = '') {
        setDashboard((prevdashboard) => ({
            ...prevdashboard,
            quoteId: id,
            isEditQuote: status,
            quoteTitle: title
        }))
    }

    function setPostIdToDelete(id) {
        setDashboard((prevdashboard) => ({
            ...prevdashboard,
            deletePostId: id
        }))
    }

    function updateQuotId(id) {
        setDashboard((prevData) => ({
            ...prevData,
            quoteId: id
        }))
    }

    function updateEditCategory(categoryData, state = '') {
        console.log({ categoryData })
        setDashboard((prevData) => ({
            ...prevData,
            isEditCategory: state,
            editCategoryId: categoryData?.id,
            editCategoryData: categoryData
        }))
    }

    function resetEditCategory(state = false) {
        console.log('reset--', state)
        const currentDashboardIndex = parseInt(localStorage.getItem("dashBordPageIndex") || 0);
        const currentDashboardPageScope = localStorage.getItem("dashBordPageScope" || 'Dashboard');

        console.log({ currentDashboardIndex, currentDashboardPageScope })
        setDashboard((prevData) => ({
            ...prevData,
            isEditCategory: state
        }))
    }

    function updateCurrentDashboardClickCat(cat) {
        console.log({ cat })
        setDashboard((prevData) => ({
            ...prevData,
            currentDashBoardCliekedCat: cat
        }))

    }

    
    const cntxtValue = {

        currentDashBoardCliekedCat: dashboard.currentDashBoardCliekedCat,
        currentindex: dashboard.currentindex,
        currentPage: dashboard.currentPage,
        viewPostid: dashboard.viewPostid,
        isViewPost: dashboard.isViewPost,
        editPostid: dashboard.editPostid,
        isEditpost: dashboard.isEditpost,
        isEditQuote: dashboard.isEditQuote,
        quoteTitle: dashboard.quoteTitle,
        deletePostId: dashboard.deletePostId,
        quoteId: dashboard.quoteId,
        isEditCategory: dashboard.isEditCategory,
        editCategoryId: dashboard.editCategoryId,
        editCategoryData: dashboard.editCategoryData,
        setCurrentComponentIndex: updateCurrentComponentIndex,
        setViewPost: setPostToView,
        setEditPost: setPostToEdit,
        setEditCategory: updateEditCategory,
        setDeletepostId: setPostIdToDelete,
        setQuotId: updateQuotId,
        setEditQuote: setQuotToEdit,
        setIsEditCategory: resetEditCategory,
        setCurrentDashBoardCliekedCat: updateCurrentDashboardClickCat
    }

    return (
        <AdminContext.Provider value={cntxtValue}>
            {children}
        </AdminContext.Provider>
    )
}
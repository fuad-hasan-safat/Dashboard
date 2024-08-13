import { createContext, useState } from "react"; 

export const SeeAllSliderContext = createContext({
    sliderType: '',
    category:'',
    setSliderInfo: ()=>{},
})


export default function SeeAllSliderContextProvider({children}){

    const [sliderInfo , setSliderInfo] = useState({
        sliderType:'',
        category: ''
    });

    function setSliderInformation(updatetype, updateCategory){
        localStorage.setItem("slideType", updatetype);
        localStorage.setItem("slideCategory", updateCategory);
        setSliderInfo((prevSlideInfo)=>({...prevSlideInfo, sliderType:updatetype, category: updateCategory}))
    }

    const cntxValue = {
        sliderType: sliderInfo.sliderType,
        category: sliderInfo.category,
        setSliderInfo: setSliderInformation,
    }

    return (
        <SeeAllSliderContext.Provider value={cntxValue}>
            {children}
        </SeeAllSliderContext.Provider>
    )
}
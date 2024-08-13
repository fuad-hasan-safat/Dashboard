import React, { useState } from "react";
import FullPostPagination from "../fullPost/FullPostpagination";
import FullPostPaginationOthers from "../fullPost/FullPostpaginationOther";
import UserPostTitleAndcover from "./userPostTitleAndcover";

const FullPost = ({ id, content, title, writer, writer_id, catagory, image, uploadedBy,updatedAt,profileName,writer_image }) => {

console.log("FULL POST : ", writer_image)
    if (catagory === 'কবিতা') {
        return (
            <>
                <div className="kobita__content text-[#737373]">

                    <UserPostTitleAndcover
                        id={id}
                        title={title}
                        writer={writer}
                        writer_id={writer_id}
                        updatedAt={updatedAt}
                        uploadedBy={uploadedBy}
                        profileName={profileName}
                        image={image}
                        writer_image={writer_image}
                    />
              
                    <div className="pt-[30px]">
                        <FullPostPagination customclass='text-[16px] text-[#595D5B]' logText={content} />
                    </div>

                </div>

            </>
        );
    } else {
        return (
            <>
                <div className="kobita__content text-[#737373]">

                    <UserPostTitleAndcover
                        id={id}
                        title={title}
                        writer={writer}
                        writer_id={writer_id}
                        updatedAt={updatedAt}
                        uploadedBy={uploadedBy}
                        image={image}
                        writer_image={writer_image}

                    />
                 
                    <div className="pt-[30px]">
                        <FullPostPaginationOthers customclass='text-[16px] text-gray-500' logText={content} />
                    </div>

                </div>

            </>
        );
    }
};

export default FullPost;
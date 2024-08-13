import React, { useState } from "react";
import FullPostPagination from "../fullPost/FullPostpagination";
import FullPostPaginationOthers from "../fullPost/FullPostpaginationOther";
import Link from "next/link";

const FullPostReaderMode = ({ content, title, writer, writer_id, catagory }) => {

    if (catagory === 'কবিতা') {
        return (
            <>
                <div className="read__mod__content font-serif">

                    <div className="  text-black">

                        <div className="font-semibold lg:text-[35px] md:text-[33px] sm:text-[30px] xs:text-[28px] text-yellow-400 mb-[10px]">{title}</div>

                        <Link
                            className="lg:text-[22px] md:text-[22px] sm:text-[20px] xs:text-[18px] text-[#595D5B] mb-[20px]"
                            href={`/postswriter/${writer_id}`}
                        >
                            {writer}

                        </Link>

                        <FullPostPagination logText={content} />

                    </div>

                </div>

            </>
        );
    } else {
        return (
            <>
                <div className="kobita__content read__mod__content text-black font-serif">

                    <div className="font-semibold lg:text-[35px] md:text-[33px] sm:text-[30px] xs:text-[28px] text-yellow-400 mb-[10px]">{title}</div>

                    <Link
                        className="lg:text-[22px] md:text-[22px] sm:text-[20px] xs:text-[18px] text-[#595D5B] mb-[20px]"
                        href={`/postswriter/${writer_id}`}
                    >
                        {writer}

                    </Link>

                    <FullPostPaginationOthers logText={content} />

                </div>

            </>
        );
    }
};

export default FullPostReaderMode;
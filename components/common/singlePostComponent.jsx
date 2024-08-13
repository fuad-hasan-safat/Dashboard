import Image from "next/image";
import { useRouter } from "next/navigation";
import UserPostTitleAndcover from "./userPostTitleAndcover";

const SinglePostConponent = ({
  id,
  title,
  writer,
  writer_id,
  writer_image,
  profileName,
  content,
  image,
  postStatus,
  uploadedBy,
  updatedAt,
  isProfile,
}) => {
  const router = useRouter();


  function handleClick(jiboniId) {
    router.push(`/post/${jiboniId}`);
  }

  return (
    <>
      <UserPostTitleAndcover
        id={id}
        title={title}
        writer={writer}
        writer_id={writer_id}
        writer_image={writer_image}
        image={image}
        postStatus={postStatus}
        uploadedBy={uploadedBy}
        profileName={profileName}
        updatedAt={updatedAt}
        isProfile={isProfile}
      />

      <div className=" pt-[20px] pb-[15px]">

        <div
          className="page__dsc__wrap lg:text-[16px] md:text-[14px] sm:text-[12px] xs:text-[11px] text-gray-500 text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        />

      </div>

      <div className="flex space-x-2">

        <button
          onClick={() => handleClick(id)}
          className="page__common__btn bg-[#FCD200] text-[#484848] text-[16px] px-[14px] py-[2px] rounded-[4px]">
          পুরোটা পড়ুন <i class="ri-arrow-right-s-line"></i>
        </button>
      </div>

    </>
  );
};

export default SinglePostConponent;

import { FacebookShareButton } from "react-share";
import { FaFacebook } from "react-icons/fa";

const ShareOnFacebook = ({ url, title }) => {
  return (
    <FacebookShareButton url={url} quote={title} hashtag="#lekharPoka" about={title} content={title}>
      <button className="facebook__share bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded flex items-center">
        <FaFacebook className="mr-2" />
        শেয়ার করুন
      </button>
    </FacebookShareButton>
  );
};

export default ShareOnFacebook;

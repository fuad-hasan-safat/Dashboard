import { useRouter } from "next/navigation";

export default function GoToProfile({
  buttonClass,
  buttonText,
  id,
}) {

  const router = useRouter();

  function handleClick(userId) {
    router.push(`/user/${userId}`);
  }

  return (
    <>
      <div>

        <button onClick={()=>handleClick(id)} className={`${buttonClass}`}>
          {buttonText}
        </button>
        
      </div>
    </>
  );
}

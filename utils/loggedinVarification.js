// import { useEffect, useState } from "react";


// export default function isLoogedIn(){
//     const [status, setStatus] = useState("");
//     const [username, setUsername] = useState("");
//     const [userUuid, setUserUuid] = useState("");
//     const [userToken, setUserToken] = useState("");
  
  
//     // check if user is logged in
//     useEffect(() => {
//       setStatus(localStorage.getItem("status") || "");
//       setUsername(localStorage.getItem("name") || "");
//       setUserToken(localStorage.getItem("token") || "");
//       setUserUuid(localStorage.getItem("uuid") || "");
//     }, []);

//     if(status && username && userUuid && userToken ){
//         return true;
//     }

//     return false; 
// }
// // import React from "react";
// import React, { useContext } from "react";
// import data from "./data.json"
// import Image from "next/image";
// import Link from "next/link";
// // import Loader from "../loader";

// export default function LogIn() {
//   return (
//     <div className="bg-[#E9E9E9] h-screen w-full flex flex-col justify-center items-center relative">
//       <div className="sm:hidden flex flex-row justify-between items-center w-full px-[0.5rem]">
//       <Link
//             href={"/auth/register"}
//             className="bg-[#000] w-[8rem] font-[600] py-[0.9rem] items-center  rounded-[12px] text-[17px] flex justify-center text-white"
//           >
//              Register
//           </Link>
          
//         <div className=" relative w-[8rem] h-[4rem]">
//           <Image alt={"logo"} src={data.loginForm.logo} fill />
//         </div>
//       </div>
//       <div className="flex flex-col items-center">
//         <h2 className="font-[600] text-[38px] sm:text-[50px] mt-[1rem]">
//           {data.loginForm.title}
//         </h2>
//         <div className="flex flex-col w-full gap-[2.2rem] mt-[2rem]">
//           <div className="flex flex-row gap-[1.5rem] w-full">
//             <div className="flex flex-col items-start">
//               <div className="font-[400] text-[14px] sm:text-[22px]">Email</div>
//               <input
//                 placeholder="black@gmail.com"
//                 type="text"
//                 className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem] sm:w-[25rem]"
//               />
//             </div>
//           </div>
          
//           <div className="flex flex-row gap-[1.5rem] w-full">
//             <div className="flex flex-col items-start">
//               <div className="font-[400] text-[14px] sm:text-[22px]">Password</div>
//               <input
//                 placeholder="***************"
//                 type="password"
//                 className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem]  w-[20rem]  sm:w-[25rem]"
//               />
//             </div>
//           </div>
          
//           <button
//             type="button"
//             className="bg-black text-zinc-300 rounded-md p-2 text-sm sm:text-lg hover:cursor-pointer mx-auto w-[100px]"
//           >
//             Login
//           </button>
//           {/* for testing */}
//           {/* <Loader/> */}
//           <div className="font-bold text-gray-500 text-lg mx-auto">Trouble logging in?</div>
//         </div>
//       </div>

//       <div className="flex flex-row items-center gap-6 mt-[2rem] font-[700] w-[80%]">
//         <hr className="border-[1px] border-black flex-grow" />
//         OR
//         <hr className="border-[1px] border-black flex-grow" />
//       </div>

      
     
//       <div className="relative w-[100%] flex justify-center  mt-[2rem] cursor-pointer">
//           <Image
//             src="/logos/googleLogo.svg"
//             alt={"google"}
//             width={80}
//             height={80}
//           />
//         </div>
//         <div className="flex sm:hidden items-center font-[600] justify-center text-white text-[24px] bottom-0 w-full h-[11rem] bg-black mt-[10px]">
//            {data.loginForm.WelcomeMsg}
//            </div>
//     </div>
//   );
// }

import React, { useContext } from "react";
import data from "./data.json";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from '../context/UserContext'; 
import { UserProvider } from '../context/UserContext';
// Import UserContext

export default function LogIn() {
  const { login } = useContext(UserContext); // Use useContext hook to access UserContext

  const handleLogin = () => {
    // Perform login logic here
    // For demonstration, let's assume the user credentials are hardcoded
    const userData = {
      username: "exampleUser",
      email: "example@example.com",
    };
    login(userData); // Call the login function with user data
  };

  return (
    <div className="bg-[#E9E9E9] h-screen w-full flex flex-col justify-center items-center relative">
      <div className="sm:hidden flex flex-row justify-between items-center w-full px-[0.5rem]">
        <Link
          href={"/auth/register"}
          className="bg-[#000] w-[8rem] font-[600] py-[0.9rem] items-center  rounded-[12px] text-[17px] flex justify-center text-white"
        >
          Register
        </Link>

        <div className=" relative w-[8rem] h-[4rem]">
          <Image alt={"logo"} src={data.loginForm.logo} fill />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-[600] text-[38px] sm:text-[50px] mt-[1rem]">
          {data.loginForm.title}
        </h2>
        <div className="flex flex-col w-full gap-[2.2rem] mt-[2rem]">
          <div className="flex flex-row gap-[1.5rem] w-full">
            <div className="flex flex-col items-start">
              <div className="font-[400] text-[14px] sm:text-[22px]">Email</div>
              <input
                placeholder="black@gmail.com"
                type="text"
                className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem] w-[20rem] sm:w-[25rem]"
              />
            </div>
          </div>

          <div className="flex flex-row gap-[1.5rem] w-full">
            <div className="flex flex-col items-start">
              <div className="font-[400] text-[14px] sm:text-[22px]">Password</div>
              <input
                placeholder="***************"
                type="password"
                className="fieldBoxShadow bg-[#F9F9F9] rounded-[14px] px-3 py-[1.3rem]  w-[20rem]  sm:w-[25rem]"
              />
            </div>
          </div>

          <button
            onClick={handleLogin} // Add onClick handler for login button
            type="button"
            className="bg-black text-zinc-300 rounded-md p-2 text-sm sm:text-lg hover:cursor-pointer mx-auto w-[100px]"
          >
            Login
          </button>
          {/* for testing */}
          {/* <Loader/> */}
          <div className="font-bold text-gray-500 text-lg mx-auto">Trouble logging in?</div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-6 mt-[2rem] font-[700] w-[80%]">
        <hr className="border-[1px] border-black flex-grow" />
        OR
        <hr className="border-[1px] border-black flex-grow" />
      </div>

      <div className="relative w-[100%] flex justify-center  mt-[2rem] cursor-pointer">
        <Image
          src="/logos/googleLogo.svg"
          alt={"google"}
          width={80}
          height={80}
        />
      </div>
      <div className="flex sm:hidden items-center font-[600] justify-center text-white text-[24px] bottom-0 w-full h-[11rem] bg-black mt-[10px]">
        {data.loginForm.WelcomeMsg}
      </div>
    </div>
  );
}

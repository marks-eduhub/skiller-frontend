import React from "react";
import LogIn from "./loginForm";
import DrawerLayout from "../drawerLayout";

export default function Login() {
  return (
    <DrawerLayout pageTo={"Register"} link={"/auth/register"}> 
      <LogIn />
    </DrawerLayout>         
  );
}

// import React from "react";
// import LogIn from "./loginForm";
// import DrawerLayout from "../drawerLayout";
// //  import { UserProvider } from "../context/UserContext";
// import { UserProvider } from 'context/UserContext'; // Import UserProvider

// export default function Login() {
//   return (
//     <UserProvider> {/* Wrap your components with UserProvider */}
//       <DrawerLayout pageTo={"Register"} link={"/auth/register"}> 
//         <LogIn />
//       </DrawerLayout>
//     </UserProvider>       
//   );
// }

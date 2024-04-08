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
import React from "react";
import SignUp from "./signupForm";
import DrawerLayout from "../drawerLayout";

export default function Register() {
  return (
    <DrawerLayout pageTo={"Login"} link={"/auth"}>
      <SignUp />
    </DrawerLayout>
  );
}

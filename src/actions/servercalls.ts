"use server";

import { LoginFormData } from "@/utils/types";
import { redirect } from "next/navigation";

export const LoginSubmit = async (
  prevState: LoginFormData,
  formData: FormData
): Promise<LoginFormData> => {

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@retyn.ai+$/;
        return emailRegex.test(email);
    };
    
    // validation
    const email = formData.get("email") as string | "null";
    if (!validateEmail(email)) {
        return { email,  error: "invalid email" } as LoginFormData;
    }
    // TODO : How react mange server side and client side cookies
     
    return {  email,  success: "form submitted" } as LoginFormData;
};

export const logoutUser  = async ()=>{
    // ToDo : session management 
    return {  logout:true,success: "logged out sucess" };

}
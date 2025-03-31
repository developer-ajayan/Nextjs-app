"use client"
import { LoginSubmit } from "@/actions/servercalls"
import { setCookie } from "@/utils/helpers";
import { LoginFormData } from "@/utils/types";
import { useRouter } from "next/router";
import { useActionState } from "react";

const initialData: LoginFormData = { email: "" };

function LoginForm() {
    const [state, formAction, isPending] = useActionState<LoginFormData, FormData>(
        LoginSubmit,
        initialData
    );
    if (state.success) {
        setCookie("email", state.email, 7);
        window.location.href = "/products"; 
    }
    return (
        <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <div>
                <form action={formAction}>
                    <div className="items-center ">

                        <label >Email </label><br />
                        <input className="border-2 border-gray-700  focus:border-pink-600 grid p-1 rounded-md" type="email" id="email" name="email" />
                        <button className="rounded-half bg-indigo-500  text-white p-1 mt-1 w-full rounded-md cursor-pointer" type="submit" disabled={isPending}>Submit</button>

                    </div>

                </form>
                {state.success && <p>Success: {state.success}</p>}
                {state.error && <p>Error: {state.error}</p>}
            </div>
        </div>


    )
}


export default LoginForm
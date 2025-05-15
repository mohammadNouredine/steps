"use client";
import { useLogin } from "@/api/api-hooks/auth/useLogin";
import InputField from "@/components/fields/form/InputField";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

function AuthPageComponent() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin({
    callBackOnSuccess: () => {
      router.push("/dashboard");
    },
  });

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-mediumGreen via-mediumBlue 
         to-mediumCyan"
    >
      <div className="p-10 rounded-lg bg-white w-[500px] ">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => {
            console.log("Form submitted", values);
            login(values);
          }}
        >
          <Form>
            <h1 className="text-3xl font-bold mb-4 text-purple">Login</h1>
            <InputField name="username" label="Username" />
            <InputField name="password" label="Password" />
            <button
              disabled={isPending}
              type="submit"
              className="bg-gradient-to-tr from-purple to-blue hover:bg-blue  text-white px-4 py-2 rounded-lg mt-4 w-full"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AuthPageComponent;

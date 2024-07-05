import { Form, Link, useActionData } from "react-router-dom";

import FormInput from "../components/FormInput";
import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  let email = formData.get("email");
  let password = formData.get("password");
  return { displayName, photoURL, email, password };
};

import { useRegister } from "../hooks/useRegister";

function Register() {
  const { isPending, registerWithGoogle, registerWithEmailAndPassword } =
    useRegister();
  const userData = useActionData();
  // const {} = useRegister();

  useEffect(() => {
    if (userData) {
      registerWithEmailAndPassword(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);

  return (
    <div
      className="grid place-items-center grid-cols-1 min-h-screen w-full bg-[url('https://mrwallpaper.com/images/hd/a-green-and-blue-abstract-background-with-a-black-background-omhacfnxgs35u5ap.jpg')]
     bg-center bg-no-repeat bg-cover text-white"
    >
      <div className="form-wrap border-alpha p-5">
        <Form method="post" className="flex flex-col gap-2 w-80">
          <h1 className="text-3xl text-center font-bold">Register</h1>
          <FormInput name="displayName" type="text" label="Your Name" />
          <FormInput name="photoURL" type="url" label="Your photo URL" />
          <FormInput name="email" type="email" label="email" />
          <FormInput name="password" type="password" label="password" />

          <div>
            {isPending && (
              <button
                disabled
                type="submit"
                className="btn-pink btn-block mt-2"
              >
                Loading...
              </button>
            )}
            {!isPending && (
              <button type="submit" className="btn-pink btn-block mt-2">
                Register
              </button>
            )}
          </div>
          <div>
            {isPending && (
              <button
                disabled
                type="button"
                className="btn-blue btn-block mt-2"
              >
                Loading...
              </button>
            )}
            {!isPending && (
              <button
                onClick={registerWithGoogle}
                type="button"
                className="btn-blue btn-block mt-2"
              >
                Google
              </button>
            )}
          </div>
          <div className="text-center">
            <p className="text-slate-400">
              If you have account,{" "}
              <Link className="link link-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

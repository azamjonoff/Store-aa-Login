import { Form, Link, useActionData } from "react-router-dom";

import FormInput from "../components/FormInput";

import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

import { useRegister } from "../hooks/useRegister";

import { useLogin } from "../hooks/useLogin";

function Login() {
  const userData = useActionData();
  const { isPending, registerWithGoogle } = useRegister();
  const { isPending: isPendingLogin, signIn } = useLogin();

  useEffect(() => {
    if (userData) {
      signIn(userData.email, userData.password);
    }
  }, [userData]);
  return (
    <div
      className="grid place-items-center grid-cols-1 min-h-screen w-full bg-[url('https://img.freepik.com/free-vector/futuristic-background-design_23-2148503793.jpg')]
     bg-center bg-no-repeat bg-cover text-white"
    >
      <div className="form-wrap border-alpha">
        <Form method="post" className="flex flex-col gap-3 w-80">
          <h1 className="text-3xl text-center font-bold">Login</h1>
          <FormInput name="email" type="email" label="email" />
          <FormInput name="password" type="password" label="password" />

          <div>
            {isPendingLogin && (
              <button
                disabled
                type="button"
                className="btn-pink btn-block mt-2"
              >
                Loading...
              </button>
            )}
            {!isPendingLogin && (
              <button type="submit" className="btn-pink btn-block mt-2">
                Login
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
              If you do not have account,
              <Link className="link link-primary" to="/register">
                Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

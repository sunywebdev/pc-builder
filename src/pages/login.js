import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | PC Builder</title>
      </Head>
      <div className=" px-6 py-12 lg:px-8 border ">
        <div className="lg:border max-w-[600px] py-12 mx-auto lg:rounded-md lg:shadow-md">
          <div className="sm:mx-auto  sm:w-full sm:max-w-sm flex flex-col justify-start items-center ">
            <Link href="/">
              <div className={""}>
                <Image src="/logo.jpg" alt="Logo" height={30} width={150} />
              </div>
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign In
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: process.env.NEXT_PUBLIC_NEXT_APP_URL,
                })
              }
              className="flex w-full justify-center items-center rounded-md bg-red-500 p-3 my-2 text-sm  leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-bold"
            >
              <BsGoogle />
              <span className="ml-2">Sign in with Google</span>
            </button>

            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl: process.env.NEXT_PUBLIC_NEXT_APP_URL,
                })
              }
              className="flex w-full justify-center items-center rounded-md bg-black p-3 my-2 text-sm  leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 font-bold"
            >
              <BsGithub />
              <span className="ml-2">Sign in with Github</span>
            </button>

            <p className="mt-10 text-center text-sm text-gray-500">
              <Link
                href="/"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Build your Dream PC
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

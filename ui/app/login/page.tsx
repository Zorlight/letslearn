import OAuthLoginBtn from "@/components/buttons/OAuthLoginBtn";
import LogInForm from "@/app/login/_components/LoginForm";
import { IconFacebook } from "@/components/icons/facebook";
import { IconGoogle } from "@/components/icons/google";

import GLOBAL from "@/global";

export default function LogInPage() {
  return (
    <section className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[500px] w-full flex flex-col justify-center rounded-xl p-12 bg-white">
        <h1 className="text-lg font-bold">LET&apos;S LEARN</h1>
        <h1 className="text-2xl font-bold mb-1">Welcome back!</h1>
        <p className="text-md mb-4">
          Login and gain access to the world right now.
        </p>
        <LogInForm />
        <p className="text-end text-sm mt-4 text-gray-500">
          Dont&#39;t have an account?
          <a
            href="/signup"
            className="ml-2 text-blue-600 font-bold hover:text-blue-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}

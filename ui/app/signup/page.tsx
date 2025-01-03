import SignUpForm from "@/app/signup/_components/SignupForm";

export default function SignUpPage() {
  return (
    <section className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-[500px] w-full flex flex-col justify-center rounded-xl p-12 bg-white">
        <h1 className="text-lg font-bold">LET&apos;S LEARN</h1>
        <h1 className="text-2xl font-bold mb-1">
          Welcome! Sign up for a new world?
        </h1>

        <SignUpForm />
        <p className="text-end text-sm mt-4">
          Already have an account?
          <a
            href="/login"
            className="ml-2 text-blue-600 font-bold hover:text-blue-600"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}

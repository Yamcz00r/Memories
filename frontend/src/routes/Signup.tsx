import RegisterForm from "../components/Auth/RegisterForm";
import Navbar from "../components/Auth/Navbar";

export default function Signup() {
  return (
    <main className="bg-slate-200 h-screen flex justify-center items-center relative">
      <Navbar type="register" />
      <section className="sm:w-1/4 p-5">
        <div className="my-7 text-left w-full">
          <h1 className="sm:font-bold sm:text-4xl font-bold text-4xl ">
            Sign Up
          </h1>
        </div>
        <div className="text-left font-semibold text-xl my-5">
          <h2>Signin with your email and password</h2>
        </div>
        <div className="w-full">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}

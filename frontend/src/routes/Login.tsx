import FormControl from "../components/FormControl";

const Login = () => {
  return (
    <main
      style={{ height: "100vh" }}
      className="bg-slate-200 h-full flex justify-center items-center "
    >
      <section className="flex justify-center gap-3 w-full">
        <div className="self-center">
          <h1 className="font-bold text-4xl text-blue-500">Memories</h1>
        </div>
        <section className="mx-10 w-1/4 bg-white rounded-md shadow-md p-3">
          <div className="text-center text-xl my-10 font-semibold">
            <p>Log in to your account</p>
          </div>
          <form className="w-max">
            <FormControl label="Email" name="email" type="email" />
            <FormControl label="Password" name="password" type="password" />
          </form>
        </section>
      </section>
    </main>
  );
};
export default Login;

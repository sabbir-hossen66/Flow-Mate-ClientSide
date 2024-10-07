import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { signInWithEmail, signInWithGoogle } from "@/redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosCommon = UseAxiosCommon();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle())
      .unwrap()
      .then((userCredential) => {
        const user = userCredential;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "member",
          photo: user.photoURL,
          status: "active",
        };

        axiosCommon
          .post("/users/create", userInfo)
          .then((res) => {
            console.log("Response from saving user:", res);
            if (res.data) {
              Swal.fire({
                icon: "success",
                title: "Congratulations",
                text: `Welcome ${user.displayName}! You have successfully logged in!`,
              });
              navigate(location?.state?.from || "/");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to create user account. Please try again!",
              });
            }
          })
          .catch((error) => {
            console.error("Failed to save user information:", error);
            if (
              error.response &&
              error.response.data.message === "User already exists"
            ) {
              Swal.fire({
                icon: "success",
                title: "Welcome back!",
                text: `You were already registered ${user.displayName}!`,
              });
              navigate("/");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to save user information!",
              });
            }
          });
      })
      .catch((err) => {
        const errorMessage = err.message || "Google Sign-In failed!";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };

  const onSubmit = async (data) => {
    try {
      // Dispatch the Redux action for email login
      const userCredential = await dispatch(signInWithEmail(data)).unwrap();

      // Make the axios request if needed
      const response = await axiosCommon.post("/users/login", data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Signed in successfully with email!",
        });

        navigate("/dashboard"); // Redirect after successful login
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message || "Sign-In failed!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Sign-In failed!",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen text-[#07101b]">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/DkPMcKn/2304-i203-047-S-m004-c13-keys-locks-realistic.jpg')",
            }}
          ></div>

          <div className="w-full px-6 lg:py-8 py-3 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-20"
                src="https://i.ibb.co/WgPKBVY/Screenshot-2024-09-18-161854-removebg-preview.png"
                alt=""
              />
            </div>

            <p className="mt-3 text-xl text-center text-[#132f50] font-bold">
              Welcome back!
            </p>

            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center mt-4 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-full "
            >
              <div className="px-4 py-2">{/* Google icon here */}</div>
              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Sign in with Google
              </span>
            </button>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or login with email
              </a>
              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-[#112A46]"
                  htmlFor="LoggingEmailAddress"
                >
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  id="LoggingEmailAddress"
                  className="block w-full px-4 py-2 border rounded-lg dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-[#112A46]"
                    htmlFor="loggingPassword"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                  >
                    Forget Password?
                  </a>
                </div>

                <input
                  id="loggingPassword"
                  {...register("password", { required: true })}
                  className="block w-full px-4 py-2 border rounded-lg dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              <Link
                to={"/signup"}
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                or sign up
              </Link>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
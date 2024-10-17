import { FaRedditAlien, FaFacebookF, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useSelector } from "react-redux";
import * as Dialog from "@radix-ui/react-dialog";

const Footer = () => {
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosCommon = UseAxiosCommon();

  const onSubmit = (data) => {
    const { email } = data;
    axiosCommon
      .post("/newsletter", { email })
      .then((res) => {
        if (
          res.data.message ===
          "You have already been subscribed to our newsletter"
        ) {
          Swal.fire({
            icon: "info",
            title: "Already Subscribed",
            text: "You have already been subscribed to our newsletter.",
            showConfirmButton: true,
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Thank you for subscribing",
            text: "We will keep you updated with our latest news and updates.",
            showConfirmButton: true,
            confirmButtonText: "Close",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });

    reset();
  };

  return (
    <footer className="bg-white dark:bg-gray-900 mt-40">
      <div className="container px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
              Subscribe to our newsletter for team collaboration tips and
              updates.
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2  mx-auto mt-6 space-y-3 md:space-y-0 ">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className="md:px-4 px-3 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Email Address"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="w-full md:px-6 px-2 py-2.5 md:text-sm text-xs font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                >
                  Subscribe
                </button>
              </form>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Explore section with modal */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Explore
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Link className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                    Home
                  </Link>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black bg-opacity-30 fixed inset-0" />
                  <Dialog.Content className="bg-white rounded-lg p-6 shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Title className="text-lg font-bold">
                      Home
                    </Dialog.Title>
                    <Dialog.Description className="mt-2">
                      Welcome to the homepage.
                    </Dialog.Description>
                    <Dialog.Close className="mt-4 bg-gray-700 text-white rounded px-4 py-2">
                      Close
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Link className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                    Task Management
                  </Link>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black bg-opacity-30 fixed inset-0" />
                  <Dialog.Content className="bg-white rounded-lg p-6 shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Title className="text-lg font-bold">
                      Task Management
                    </Dialog.Title>
                    <Dialog.Description className="mt-2">
                      Here you have the ability to manage your tasks and
                      projects.Get started by creating a new project. What are
                      you waiting for?
                    </Dialog.Description>
                    <Dialog.Close className="mt-4 bg-gray-700 text-white rounded px-4 py-2">
                      Close
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              {/* Add more Dialog.Root for other links */}
            </div>
          </div>

          {/* Social media links */}
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Resources
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                Collaboration Tips
              </Link>
              <Link className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                Remote Work Guide
              </Link>
              <Link className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                Productivity Hacks
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img
              className="lg:w-40 w-28 md:w-32 h-auto"
              src="https://i.ibb.co/sH49jvt/logo2-removebg-preview.png"
              alt=""
            />
          </Link>

          <div className="flex -mx-2">
            <a
              href="https://www.reddit.com"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Reddit"
            >
              <FaRedditAlien className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="https://www.github.com"
              className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              aria-label="Github"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
          Flowmate 2024 &copy; All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

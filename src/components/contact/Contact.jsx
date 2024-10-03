import { IoMdMail } from "react-icons/io";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitterSquare } from "react-icons/fa";
import emailjs from 'emailjs-com';
import { FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";

const Contact = () => {
  const axiosCommon = UseAxiosCommon();
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICEID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATEID;
  const userID = import.meta.env.VITE_EMAILJS_USERID;

  console.log(serviceID, templateID, userID);
  
  const sendEmail = async (e) => {
    e.preventDefault();
    const form = e.target;

    Swal.fire({
      title: "Do you want to send the message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Send",
      denyButtonText: `Don't send`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send email using emailjs
          await emailjs.sendForm(serviceID, templateID, form, userID);

          // Send contact data to your API
          const response = await axiosCommon.post("/contacts/create", {
            name: form.user_name.value,
            email: form.user_email.value,
            message: form.message.value,
            
          });

          console.log(response.data);
          Swal.fire("Sent!", "Your message has been sent successfully.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "An error occurred while sending your message. Please try again.", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not sent", "", "info");
      }
    });
  };

  return (
    <div className="bg-gray-100 my-20 py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
        {/* Left Section: Contact Form */}
        <div className="md:w-2/3 w-full md:pr-8 md:py-12 md:px-16 py-7 px-4">
          <h2 className="text-2xl font-semibold pt-1 mb-6">Send us a Message</h2>
          <form onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 lg:col-span-1">
              <label className="block text-sm mb-2" htmlFor="name">Name</label>
              <input
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="user_name"
                name="user_name" 
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="block text-sm mb-2" htmlFor="email">Email</label>
              <input
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="user_email"
                name="user_email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-2" htmlFor="message">Message</label>
              <textarea
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="message"
                name="message" // Added name attribute
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Send <span className="ml-2">✈️</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Contact Information */}
        <div className="md:w-1/3 w-full bg-blue-900 text-white p-6 rounded-lg md:mt-0 mt-8 ">
          <h3 className="text-xl font-semibold mt-10 mb-4">Contact Information</h3>
          <ul className="space-y-4">
            <li>
              <div className="flex items-center">
                <span className="mr-2"><FaLocationDot /></span>
                <p className="ml-5">123 Main Street, Anytown, USA</p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mr-2"><FaPhoneAlt /></span>
                <p className="ml-5">+1 555-555-5555</p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mr-2"><IoMdMail /></span>
                <p className="ml-5">info@example.com</p>
              </div>
            </li>
          </ul>

          {/* Social Media Icons (Optional) */}
          <div className="mt-10 flex space-x-4">
            <a href="#" className="hover:text-blue-300 flex items-center space-x-2">
              <FaTwitterSquare />
              <span>Twitter</span>
            </a>
            <a href="#" className="hover:text-blue-300 flex items-center space-x-2">
              <FaFacebook />
              <span>Facebook</span>
            </a>
            <a href="#" className="hover:text-blue-300 flex items-center space-x-2">
              <FaInstagram />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

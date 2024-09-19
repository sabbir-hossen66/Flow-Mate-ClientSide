import React from 'react';

import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const Newsletters = () => {
 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
      } = useForm();
    
    const onSubmit = (data) => {
        const { email } = data;
        Swal.fire({
            title: 'Subscribed!',
            text: `You have successfully subscribed with email: ${email}`,
            icon: 'success',
            confirmButtonText: 'Cool!',
        });
        

    }
    return (
        <div className='py-7 max-w-7xl mx-auto'>
            <h1 className='text-3xl text-center my-4 font-semibold text-blue-600'>
                Newsletters
            </h1>
           <div className="w-full py-3 bg-gray-500 transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0" style={{backgroundImage: "url('https://www.dooly.ai/wp-content/uploads/2023/11/Why-Sales-Team-Collaboration-Matters-for-Improving-Deal-Efficiency-1.jpg')", backgroundPosition: "center center", backgroundBlendMode: "multiply", backgroundSize: "cover"}}>
	<div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
		<h1 className="text-5xl antialiased font-semibold leading-none text-center text-gray-100">Get Our Updates</h1>
		<p className="pt-2 pb-8 text-xl antialiased text-center text-gray-100">
            Subscribe to our newsletter and get our latest updates.Get collaborate with us.
        </p>
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
			<input type="text"  {...register("email", { required: true })} placeholder="example@email.com" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" />
			<button type="submit" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-[#17ACAC] text-white ">Subscribe</button>
		</form>
	</div>
</div>
 
        </div>
    );
};

export default Newsletters;
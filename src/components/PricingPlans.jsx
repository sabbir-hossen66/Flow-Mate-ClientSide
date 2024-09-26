import { pricingPlans } from "@/constants";
import PropTypes from "prop-types";
import Container from "./Container";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const PricingPlanCard = ({ name, price, features, paymentType }) => {
  const user = useSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);


  const handleGetStarted = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        confirmButtonColor: "#2563EB",
        confirmButtonText: "Login",
        text: "You need to be logged in to subscribe to a plan",
      })
      
      
    }else{
      setOpen(true); 
    }
  };

  const handlePayment = () => {
    // Handle payment logic here
    Swal.fire({
      icon: "success",
      title: "Payment Successful",
      confirmButtonColor: "#2563EB",
      confirmButtonText: "OK",

      text: `You have successfully subscribed to the ${name} plan`,
    })
    setOpen(false); // Close modal after payment

  };
  return (
    <div className="flex flex-col  border-2 rounded-lg p-5 hover:shadow-lg transform  delay-150">
      <div className="flex flex-col text-center pb-10">
        <h3 className="text-base font-semibold">{name}</h3>
        <p className=" text-3xl font-bold">
          {price}{" "}
          <span className="text-sm font-semibold text-zinc-500">
            ({paymentType})
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-between h-full">
        <ul role="list" className="mb-8 space-y-4 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-5 h-5 text-teal-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full font-bold gap-2 shadow uppercase p-2 text-white"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
       {/* Modal triggered on button click */}
       <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subscribe to {name}</DialogTitle>
            <DialogDescription>
              You are subscribing to the {name} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-start justify-start">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="package-name" className="text-start">
                Package name
              </Label>
              <Input id="package-name" value={name} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="price" className="text-start">
                Price
              </Label>
              <Input id="price" value={price} readOnly className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="email" className="text-start">
                Email Address
              </Label>
              <Input id="email" value={user?.email || ""} readOnly className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handlePayment}>
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
    </div>
  );
};

const PricingPlans = () => (
  <Container>
    <section className="p-4 md:p-8">
      <div className="py-8 max-w-screen-xl lg:py-16">
        <div className="mx-auto max-w-3xl text-center pb-12 md:pb-20">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Pricing  <span className="text-blue-500"> Plans</span>
            </h1>
          <p className="text-center text-gray-500">
            Choose a plan that best suits your data needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-col-3 lg:grid-cols-3 gap-4">
          {pricingPlans.map((plan, index) => (
            <PricingPlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  </Container>
);

PricingPlanCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  paymentType: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PricingPlans;

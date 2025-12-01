import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonForm from "../../components/commen/form";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser(formData));
      if (result?.payload?.success) {
        toast.success(result?.payload?.msg);
        navigate("/auth/login");
      } else {
        toast.warning(result?.payload?.msg || "User already exists then try again with diffrent email" );
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration.");
    }
  };
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Account
        </h2>
        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Create Account"}
          onSubmit={onSubmit}
        />

        <div className="flex items-center justify-center gap-2 mt-1">
          <p>Already have account ?</p>
          <Link
            to="/auth/login"
            className=" font-medium ml-2 text-primary hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonForm from "../../components/commen/form";
const initialState = {
  email: "",
  password: "",
};
function Login() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await dispatch(loginUser(formData));
      if (responce?.payload?.success) {
        toast.success(responce?.payload?.msg || "Login successful");
        navigate("/shop/home");
      } else {
        toast.error(responce?.payload?.msg || "Login failed" );
      }
      // console.log(responce);
    } catch (error) {
      console.log(error);
      toast.error(" Error during login");
    }
  };

  
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign-in to your account
        </h2>
        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Sign In"}
          onSubmit={onSubmit}
        />

        <div className="flex items-center justify-center gap-2 mt-1">
          <p>haven't account ?</p>
          <Link
            to="/auth/register"
            className="font-medium ml-2 text-primary hover:text-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

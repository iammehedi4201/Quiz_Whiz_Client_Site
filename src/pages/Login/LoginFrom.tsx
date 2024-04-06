import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function LoginFrom() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "iammehedi296@gmail.com",
      password: "478efd0d5d78c9fa",
    },
  });
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const response = await login(userInfo).unwrap();
      const decodeToken = jwtDecode(response?.data?.accessToken);
      console.log(decodeToken);
      dispatch(
        setUser({ user: decodeToken, token: response?.data?.accessToken })
      );
      toast.success("Login successfully");
      navigate("/adminDashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card
        placeholder={""}
        color="transparent"
        shadow={false}
        className="w-full"
      >
        <Typography placeholder={""} variant="h4" className="text-center">
          <h3 className="text-2xl font-bold">
            Log <span className="bg-blue-500 text-white p-1 rounded">In</span>
          </h3>
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2  w-full sm:w-1/4 border-2 border-blue-300 p-5 rounded-md mx-auto"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="-mb-3 flex justify-start"
            >
              Your Email*
            </Typography>
            <Input
              {...register("email", { required: true })}
              crossOrigin={"anonymous"}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="-mb-3 flex justify-start"
            >
              Password*
            </Typography>
            <Input
              crossOrigin={"anonymous"}
              {...register("password", { required: true })}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            type="submit"
            placeholder={""}
            className="mt-6"
            fullWidth
            color="blue"
          >
            sign up
          </Button>
        </form>
      </Card>
    </div>
  );
}

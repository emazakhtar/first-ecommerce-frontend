import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  resetPasswordAsync,
  selectAuthStatus,
  selectError,
  selectLoggedInUserToken,
  selectResetPasswordStatus,
} from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";

function ResetPassword() {
  // using using url parameters...
  // const params = useParams();
  // const token = params.token;
  // const email = params.email;

  // now we are using query parameters...
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  console.log(token, email);

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const status = useSelector(selectAuthStatus);
  // useEffect(() => {
  //   dispatch(verifyTokenAsync(token));
  // }, [dispatch, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUserToken);
  const resetPasswordStatus = useSelector(selectResetPasswordStatus);
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      resetPasswordAsync({
        password: data.password,
        email: email,
        token: token,
      })
    );
  };
  return (
    <>
      {user && <Navigate to="/"></Navigate>}
      {resetPasswordStatus && (
        <p className="text-green-500">{resetPasswordStatus.message}</p>
      )}
      {resetPasswordStatus && (
        <p className="mt-10 text-center text-sm text-gray-500">
          Go to Login Page
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Go to login page
          </Link>
        </p>
      )}
      {status === "loading" && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* Loader component */}
          <Grid
            className="loader"
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {token && email && !resetPasswordStatus && (
        <div
          className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${
            status === "loading" ? "blur" : ""
          }`}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter your New Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter New Password
                  </label>
                  <div className="text-sm">
                    <div className="font-semibold text-indigo-600 hover:text-indigo-500"></div>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `-at least 8 characters \n
- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
- Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="text-sm">
                    <div className="font-semibold text-indigo-600 hover:text-indigo-500"></div>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    {...register("confirmPassword", {
                      required: "confirm-password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password does not match",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Password
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Go to login page
              </Link>
            </p>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

export default ResetPassword;

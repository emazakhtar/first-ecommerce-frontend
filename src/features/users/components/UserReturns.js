import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsersReturnsAsync,
  selectLoggedInUserInfo,
  selectUserReturns,
  selectUserStatus,
} from "../usersSlice";
import { Grid } from "react-loader-spinner";

const UserReturns = () => {
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();
  const userReturns = useSelector(selectUserReturns);
  console.log(userReturns);
  const userInfo = useSelector(selectLoggedInUserInfo);
  if (userInfo) {
    var email = userInfo.email;
  }
  console.log(userInfo);

  useEffect(() => {
    dispatch(fetchAllUsersReturnsAsync({ email: email }));
  }, [dispatch, email]);

  // Render loading state

  return (
    <div className="container mx-auto p-4 mt-10">
      {status === "loading" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Loader component */}
          <Grid
            className="loader"
            height={80}
            width={80}
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            visible={true}
          />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4 text-gray-500 italic">
        Your Returns
      </h2>
      {userReturns.length === 0 && (
        <div className="flex items-center justify-center py-10 text-center bg-gray-50 border border-gray-200 rounded-md shadow-sm">
          <p className="text-lg font-semibold text-gray-600">
            No returns found. You haven’t initiated any returns yet.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userReturns &&
          userReturns.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <h3 className="text-lg text-gray-600">Return Id: {item.id}</h3>
              <h3 className="text-lg text-gray-600">
                Order Id: {item.orderId}
              </h3>
              <h3 className="text-lg text-gray-600">Email: {item.userEmail}</h3>
              <p className="text-gray-600">Request Type: {item.requestType}</p>
              <p className="text-gray-600">Reason: {item.reason}</p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  item.status === "Approved"
                    ? "text-green-600"
                    : item.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {item.status}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserReturns;

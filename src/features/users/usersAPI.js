export function updateUser(userData) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/user/", {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllUsersOrders() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/orders/own", {
      credentials: "include",
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllUsersReturns(email) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    console.log("reached api");
    const response = await fetch("/return/users/" + email, {
      credentials: "include",
    });
    console.log("2nd");

    const data = await response.json();
    console.log("3nd");
    resolve({ data });
  });
}

export function loadUsersInfo() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/user/", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

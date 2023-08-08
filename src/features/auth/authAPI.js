export function createUser({ email, password }) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function checkUser(userData) {
  return new Promise(async (resolve, reject) => {
    const email = userData.email;
    const password = userData.password;

    const response = await fetch("http://localhost:8080/user?email=" + email, {
      method: "GET",
      // body: JSON.stringify(userData),
      // headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    if (data.length > 0) {
      if (password === data[0].password) {
        console.log("logged in successfully");
        resolve({ data: data[0] });
      } else {
        reject({ message: "invalid credential" });
      }
    } else {
      reject({ message: "no user exists" });
    }
  });
}

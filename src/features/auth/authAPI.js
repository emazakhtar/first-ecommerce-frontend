export function createUser({ email, password, name, address, order, role }) {
  return new Promise(async (resolve, reject) => {
    // TODO: we will not hardcode server url here
    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          address: address,
          order: order,
          role: role,
        }),
        headers: { "content-type": "application/json" },
        credentials: "include", // This here
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function loginUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function checkUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function resetPasswordRequest(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          token: data.token,
        }),
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function verifyToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/auth/verify-token?token=${token}`, {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    // on server we will remove user session info
    try {
      const response = await fetch("/auth/logout", {
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

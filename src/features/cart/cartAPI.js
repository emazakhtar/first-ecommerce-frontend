export function addToCart(userData) {
  return new Promise(async (resolve, reject) => {
    // TODO: we will not hardcode server url here
    try {
      const response = await fetch("http://localhost:8080/cart/", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function updateCart(updateData) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch(
      "http://localhost:8080/cart/" + updateData.id,
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(updateData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function removeItemsFromCart(item) {
  return new Promise(async (resolve, reject) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/cart/" + item.id, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    } else {
      const error = await response.json();
      reject(error);
    }
  });
}
export function fetchAllCart() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/cart/", {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function removeAllFromCart() {
  return new Promise(async (resolve) => {
    const response = await fetchAllCart();
    const cartItems = response.data;
    for (var i = 0; i < cartItems.length; i++) {
      await removeItemsFromCart(cartItems[i]);
    }
    resolve({ status: "success" });
  });
}

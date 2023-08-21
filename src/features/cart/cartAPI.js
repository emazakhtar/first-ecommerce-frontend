export function addToCart(userData) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCart(updateData) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch(
      "http://localhost:8080/cart/" + updateData.id,
      {
        method: "PATCH",
        body: JSON.stringify(updateData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function removeItemsFromCart(item) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/cart/" + item.id, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data: { id: item.id } });
  });
}
export function fetchAllCart(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/cart?user=" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function removeAllFromCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetchAllCart(id);
    const cartItems = response.data;
    for (var i = 0; i < cartItems.length; i++) {
      await removeItemsFromCart(cartItems[i]);
    }
    resolve({ status: "success" });
  });
}

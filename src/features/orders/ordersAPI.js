export function createOrder(orderData) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllUsersOrders(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/orders?user.id=" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllOrders({ pagination, sort }) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();

    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: totalOrders } });
  });
}
export function updateOrderById(updatedOrder) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch(
      "http://localhost:8080/orders/" + updatedOrder.id,
      {
        method: "PATCH",
        body: JSON.stringify(updatedOrder),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchOrderById(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/orders/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

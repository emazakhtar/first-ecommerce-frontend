export function createOrder(orderData) {
  return new Promise(async (resolve, reject) => {
    // TODO: we will not hardcode server url here
    try {
      const response = await fetch("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        console.log(error);
        reject({ error });
      }
    } catch (err) {
      reject(err);
    }
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
    const response = await fetch("/orders?" + queryString, {
      credentials: "include",
    });
    const data = await response.json();

    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: totalOrders } });
  });
}
export function updateOrderById(updatedOrder) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/orders/" + updatedOrder.id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(updatedOrder),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchOrderById(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/orders/" + id, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}

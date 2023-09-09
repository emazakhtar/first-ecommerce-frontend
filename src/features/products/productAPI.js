export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
}
// filter object looks like this before

// filter={
//    category:"laptops",
//    brand:"apple",
//   _sort="price",
//   _order="asc"
// }
//  after it looks like this
// filter = {
//   brand: ["apple", "samsung", "oppo"],
//   category: ["laptops", "smartphones", "perfumes"],
// };

// filter = { category: ["laptops", "smartphones"] };
// sort = {_sort:"price",_order:"asc"};
// pagination = {_page:1,_limit:10}  url:_page=1&_limit=10
export function fetchProductByFilter(filter, sort, pagination) {
  let queryString = "";
  for (let key in filter) {
    let filterBySomethingArray = filter[key];
    if (filterBySomethingArray.length > 0) {
      let lastValue = filterBySomethingArray[filterBySomethingArray.length - 1];
      queryString += `${key}=${lastValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/products?" + queryString, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/products/" + id, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrand() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/brands", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCategory() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/category", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProductById(updatedProduct) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/products/" + updatedProduct.id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(updatedProduct),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
export function addProduct(product) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/products", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

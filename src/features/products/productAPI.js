export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("http://localhost:8080/products");
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
export function fetchProductByFilter(filter, sort) {
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

  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

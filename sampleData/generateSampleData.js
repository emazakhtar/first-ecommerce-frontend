const fs = require("fs");

// Categories and subcategories
const categories = ["Topwear", "Bottomwear", "Winterwear"];
const subcategories = {
  Topwear: ["T-shirt", "Shirt", "Printed T-shirt"],
  Bottomwear: ["Cargos", "Joggers", "Pyajamas", "Shorts", "Jeans"],
  Winterwear: ["Jackets", "Sweaters", "Sweatshirt & Hoodies"],
};

// Sample data generation
const sampleData = [];

for (let i = 1; i <= 200; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const subcategory =
    subcategories[category][
      Math.floor(Math.random() * subcategories[category].length)
    ];
  const gender = ["Men", "Women", "Unisex"][Math.floor(Math.random() * 3)];
  const title = `Random ${gender} ${category} - ${subcategory} ${i}`;
  const description = `Description for ${title}`;
  const price = parseFloat((Math.random() * (200 - 10) + 10).toFixed(2));
  const discountPercentage = parseFloat((Math.random() * 50).toFixed(2));
  const rating = parseFloat((Math.random() * 4 + 1).toFixed(2));
  const stock = Math.floor(Math.random() * 100) + 1;
  const brand = `Brand ${i}`;
  const thumbnail = `https://i.dummyjson.com/data/products/${i}/thumbnail.jpg`;
  const images = [
    `https://i.dummyjson.com/data/products/${i}/1.jpg`,
    `https://i.dummyjson.com/data/products/${i}/2.jpg`,
    `https://i.dummyjson.com/data/products/${i}/3.jpg`,
  ];

  const product = {
    id: i,
    title: title,
    description: description,
    price: price.toFixed(2),
    discountPercentage: discountPercentage.toFixed(2),
    rating: rating.toFixed(2),
    stock: stock,
    brand: brand,
    category: category,
    subcategory: subcategory,
    gender: gender,
    thumbnail: thumbnail,
    images: images,
    deleted: false,
  };

  sampleData.push(product);
}

// Save the generated data to a JSON file
const dataJson = JSON.stringify(sampleData, null, 4);
fs.writeFileSync("sample_data.json", dataJson);

console.log("Sample data generation complete.");

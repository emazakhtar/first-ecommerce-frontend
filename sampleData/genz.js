const axios = require("axios");

const genz = async () => {
  const options = {
    method: "GET",
    url: "https://zappos1.p.rapidapi.com/brands/list",
    headers: {
      "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
      "X-RapidAPI-Host": "zappos1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
genz();

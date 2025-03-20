const axios = require("axios");

axios
  .get("https://w22ww.google.com")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

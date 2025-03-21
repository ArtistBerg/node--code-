const axios = require("axios");

console.log("Changed ");
const getdata = async function () {
  for (let i = 1; i < 5; i++) {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users/${i}`)
      .then((res) => {
        // const user = {
        //   id: res.data[0].id,
        //   name: res.data[0].name,
        //   username: res.data[0].username,
        //   email: res.data[0].email,
        // };
        // console.log(user);

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
};
getdata();

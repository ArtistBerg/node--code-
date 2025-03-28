// async function getBooks() {
//   const book = await fetch("http://localhost:9100/books/20");
//   const data = await book.json();
//   //   console.log(data);
//   const { id, name, publishyear, author } = data[0];
//   console.log(data);
//   console.log("id", id);
//   console.log("name", name);
//   console.log("author", author);
//   console.log("publishyear", publishyear);
// }

// getBooks();

const getData = new Promise((resolve, reject) => {
  fetch("http://localhost:9100/books/20")
    .then((data) => data.json())
    .then(resolve())
    .catch((err) => console.log(err));
});

getData().then();

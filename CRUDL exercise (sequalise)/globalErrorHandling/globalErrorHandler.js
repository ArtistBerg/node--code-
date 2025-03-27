function asyncHandler(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = asyncHandler;
//   async function getBook(req, res) {
//     // Your async logic here
//     res.send('Book data'); // Example response
//   }

//   app.get('/books', asyncHandler(getBook));

//   // Global error-handling middleware:
//   app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   });

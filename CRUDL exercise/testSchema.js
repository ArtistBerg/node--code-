const Joi = require("joi");

function validataInputData(book) {
  const JoiSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),

    author: Joi.string().min(4).max(50).required(),

    publishyear: Joi.number().min(1).max(2026).required(),

    role: Joi.string().valid("admin").valid("subscriber").required(),

    status: Joi.string().valid("available").valid("not available").optional(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(book);
}

// const testingBook = {
//   //   role: "sa",
//   name: "dune: the challange",
//   author: "whatever",
//   publishyear: 2000,
// };
// response = validataInputData(testingBook);

// if (response.error) {
//   console.log(response.error.details);
// } else {
//   console.log("Validated Data");
// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  const userRole = req.user && req.user.role; // Example: req.user.role

  if (userRole === "admin") {
    next(); // User is an admin, proceed to the next middleware/route handler
  } else {
    res.status(403).json({ error: "Forbidden: Admin access required" }); // 403 Forbidden
  }
}

// Example user object (for demonstration purposes)
app.use((req, res, next) => {
  req.user = { role: req.headers["x-user-role"] }; //using a header for demo, do not use in production.
  next();
});

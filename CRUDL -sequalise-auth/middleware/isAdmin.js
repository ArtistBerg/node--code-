const giveResponse = require("../responseHandling/globalResponseFunction");

function isAdmin(req, res, next) {
  // Check if the request method is POST, PUT, or PATCH
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    // Check if the request body has the 'role' property
    if (!req.body || !req.body.role) {
      // If 'role' is missing, send a 400 Bad Request response
      return res.status(400).json({
        error: "Role property is required for POST, PUT, and PATCH requests",
      });
    }
  }

  // If the request is GET or 'role' is present, proceed to the next middleware or route handler
  next();
}

module.exports = isAdmin;

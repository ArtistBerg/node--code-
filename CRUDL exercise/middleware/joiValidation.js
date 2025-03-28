const Joi = require("joi");

function validateInputData(book, edit = false) {
  if (!edit) {
    // schema for adding data
    const JoiSchema = Joi.object({
      name: Joi.string().min(5).max(100).required(),

      author: Joi.string().min(4).max(50).required().messages({
        "string.min":
          "Author is required and cannot be empty or only whitespace.",
        "string.empty":
          "Author is required and cannot be empty or only whitespace.",
        "any.required":
          "Author is required and cannot be empty or only whitespace.",
      }),

      publishyear: Joi.number().min(1).max(2026).required(),

      role: Joi.string().valid("admin").valid("subscriber").required(),

      status: Joi.string().valid("available").valid("not available").optional(),
    }).options({ abortEarly: false });
    return JoiSchema.validate(book);
  }

  // schema for updating data
  const JoiSchema2 = Joi.object({
    name: Joi.string().min(5).max(100).optional(),

    author: Joi.string().min(4).max(50).optional(),

    publishyear: Joi.number().min(1).max(2026).optional(),

    role: Joi.string().valid("admin").valid("subscriber").required(),

    status: Joi.string().valid("available").valid("not available").optional(),
  }).options({ abortEarly: false });

  return JoiSchema2.validate(book);
}

module.exports = validateInputData;

module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate the request body using the schema provided
      const validBody = await schema.validate(req.body);

      // Strip any unknown properties from the request body and update it with the validated data
      req.body = schema.cast(validBody, { stripUnknown: true });

      // Call the next middleware or route handler in the chain
      return next();
    } catch (err) {
      // If there's an error, respond with a 400 status code and a JSON error message
      res.status(400).json({ error: { path: err.path, msg: err.message } });
    }
  };
};

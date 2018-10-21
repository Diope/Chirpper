function errorHandle (error, req, res, next) {
  return res.status(error.status || 500).json({
    error: {
      message: error.message || "Oh Mah Gawd, something went wrong here! It's our fault"
    }
  })
}

module.exports = errorHandle;
module.exports = {
    transpileDependencies: ['x5-gmaps'],
    // publicPath: '/ban-do-so/',
    publicPath:
      process.env.NODE_ENV === "production" ? "./" : "/",
  }

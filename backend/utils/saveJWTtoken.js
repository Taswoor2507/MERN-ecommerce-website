const saveJWTtocookies = function (user, statusCode, res) {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    user,
    token,
  });
};

export default saveJWTtocookies;

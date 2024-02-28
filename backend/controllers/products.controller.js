// @des get all products
// @route localhost/api/v1/prdoucts
// @access public
const getAllProducts = (req, res) => {
  res.status(200).json({ message: "All products..." });
};

export { getAllProducts };

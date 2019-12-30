const Product = require("../database/Product");

module.exports.getProduct = (req, res) => {
  Product.find((err, result) => {
    res.render("products", {
      products: result
    });
  })
};

module.exports.getProductSchema = (req, res) => {
  res.render("addProduct")
};

module.exports.createProduct = (req, res) => {
  const product = {
    name,
    price,
    pic,
    description
  } = req.body;

  const saveProduct = new Product({
    ...product
  });
  const promise = saveProduct.save()
  promise.then(data => {
    res.redirect("/products/addProduct");
  }).catch(err => {
    return err;
  })
}

module.exports.deleteProduct = (req, res) => {
  Product.findOneAndRemove({
    product: req.params.name
  }, err => {
    if (err) console.log(err);
    else res.redirect("/products/addProduct");
  })
}
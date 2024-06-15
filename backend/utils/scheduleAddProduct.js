const Product = require("../models/Product");
const User = require("../models/User");

function scheduleAddProduct(delayInMinutes, { productId, userId, action }) {
  setTimeout(async () => {
    try {
      if (action === "addToCart") {
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (user && product) {
          await user.addProduct(product);
          console.log(
            `Product ${product.name} added to user ${user.username}'s cart after ${delayInMinutes} minutes.`
          );
        } else {
          console.error("User or Product not found for scheduled addition.");
        }
      } else {
        console.log("Unknown action:", action);
      }
    } catch (error) {
      console.error("Error during scheduled action:", error);
    }
  }, delayInMinutes * 60 * 1000);
}

module.exports = scheduleAddProduct;

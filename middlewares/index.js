import Product from "../models/product"
import User from "../models/user";
import expressJwt from "express-jwt";
import Cart from "../models/cart";

export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export const canEditDeleteProduct = async (req, res, next) => {
  try{
      const product = await Product.findById(req.params._id);
      if(req.user._id != product.postedBy) {
          return res.status(400).send("Unauthorized");
      } else {
          next();
      }
  } catch (err){
      console.log(err)
  }
};


export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      // console.log("isAdmin ===> ", user);
      if (user.role !== "Admin") {
        return res.status(400).send("Unauthorized");
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  };
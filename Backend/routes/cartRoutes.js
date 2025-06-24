const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
}

// Add item to cart
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //determine if user is logged in 
        let cart = await getCart(userId, guestId);

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId.toString() &&
                    (p.size || '').toLowerCase() === (size || '').toLowerCase() &&
                    (p.color || '').toLowerCase() === (color || '').toLowerCase()
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }
            // recalculate price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            })
            return res.status(201).json(newCart);
        }

    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})


// PUT
//update product quantity in cart for user or guest to update the products 
router.put("/",async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId} = req.body;
    try {
        let cart = await getCart(userId,guestId);
        if(!cart) return res.status(404).json({message:"Cart not found"});

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size === size && p.color === color);

        if(productIndex > -1){
            if(quantity > 0){
                cart.products[productIndex].quantity = quantity;
            }else{
                cart.products.splice(productIndex,1); // Remove the product if the quantity is 0
            }
        }

    } catch (error) {
        
    }
})


module.exports = router;
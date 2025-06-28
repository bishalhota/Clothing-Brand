const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();  

//GET /api/orders/myorders
//@desc Get all orders for current user
//@access Private
router.get("/my-orders",protect,async(req,res) =>{
    try {
        
        const orders = await Order.find({user:req.user._id}).sort({
            createdAt: -1,
        });
        res.json(orders)

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({message:"Internal server error"});
    }
})

router.get("/:id",protect,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        
        if(!order) {
            return res.status(404).json({message:"Order not found"});
        }

        res.json(order);

    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({message:"Internal server error"});
    }
})

module.exports = router;
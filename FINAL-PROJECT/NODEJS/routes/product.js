var express = require('express');
var router = express.Router();
var logger = require('../config/winston');
var cache = require('express-redis-cache')();
var shopping = require('../models/shopping');
var syncLoop = require('sync-loop');
const passport    = require('passport');
const passportJWT = require("passport-jwt");
const passportStrategy = require('../config/passport');

//, cache.route('mib:allproducts', 36000)
router.get('/all', function(req,res){
    shopping.productlist.find({}).exec((err,list)=>{
        if(err){
            logger.error("Data Base Error occured While extracting all product list"+err);
            res.status(500).json('Could not get the data');
        }
        logger.info("Product List Sent");
        res.status(200).json(list);
    })
})

router.get('/id/:productid', (req,res)=>{
    shopping.productlist.findOne({_id: req.params.productid}).exec((err, product)=>{
        if(err) {
            logger.error("Data Base Error occured While extracting product of Id :"+req.params.productid+'---'+err);
            res.status(503).json('Could not get the product data');
        }
        else if (product===null){
            logger.error("Product with thr ProductID : "+req.params.productid +" is not available");
            res.status(404).json('Product Not Available');
        }
        res.status(200).json(product);
    });
})

router.get('/cid/:categoryid', (req,res)=>{
    shopping.productlist.find({CategoryID: req.params.categoryid}).exec((err, products)=>{
        if(err){
            logger.error("Data Base Error occured While extracting Category of Id :"+req.params.categoryid+"---"+err);
            res.status(500).json('Could not get the Category Informations');
        }
        else if (products===null){
            logger.error("Category is not available");
            res.status(404).json('Category Not Available');
        }
        res.status(200).json(products);
    });
})

router.get("/categories", (req,res)=>{
    shopping.category.find({}).exec((err,list)=>{
        if(err) {
            logger.error("Data Base Error occured While extracting Categories informations"+err);
            res.status(500).json('Could not get this Category Informations');
        };
        logger.info('Category List Sent'+list)
        res.status(200).json(list);
    });
});

router.post('/addToCart', passport.authenticate('jwt',{session:false}), (req, res)=>{
    var query = {$and: [{userID: req.body.userID},{productID: req.body.productID }]};
    shopping.cartList.find(query,(err1,result)=>{  
        if(err1) {logger.error(err1);}
        else if(result.length===0){
            shopping.cartList(req.body).save((err,data)=>{
                if(err) {
                    logger.error("Cart could not be saved"+err);
                    res.status(500).json('Cart could not be saved');
                };
                logger.info('Cart Saved Succesfully');
                res.status(200).json("success");
            })
        }
        else if(result.length!==0){
            res.status(406).json('Item Already Present in your cart');
        }
    }) 
})
//, passport.authenticate('jwt',{session:false})

router.post('/deleteCart', passport.authenticate('jwt',{session:false}), (req,res)=>{

    var query = {$and: [{userID: req.body.email},{ productID: req.body.productID }]};
    shopping.cartList.find(query,(err,result)=>{  

        if(err) {logger.error(err);}
        shopping.cartList.deleteOne({productID: req.body.productID }, (err1)=>{
            if(err1){
                logger.error(err1);
                res.status(500).json("Server Error.Operation Failed.");
            }
            console.log("Cart deleted Successfully");
            res.status(202).json('success');
        })
    })
})

router.get('/getUserCart/:userid', getCartListMW, (req,res) =>{

    var cartList = req.cartList
    var numberOfLoop =cartList.length;
    var productList=[];
    var totalPrice=0;
    syncLoop(numberOfLoop, function (loop) {
        var index = loop.iteration();
        var productid = cartList[index].productID;
        shopping.productlist.findOne({_id : productid}, (err,data)=>{
            if(err) throw err;
            productList.push(data);
            totalPrice= totalPrice+data.price;
            loop.next();
        })
    },function(){
        res.status(200).json({ProductList : productList, TotalPrice : totalPrice}); 
    });
});

async function getCartListMW(req,res,next){
    var userid = req.params.userid;
    var cartList = await shopping.cartList.find({userID : userid});
    req.cartList = cartList;
    next();
}


router.use(getCartListMW);

module.exports = router;
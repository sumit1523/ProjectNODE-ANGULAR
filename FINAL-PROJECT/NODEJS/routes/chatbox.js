const router = require('express').Router();
const chatBox = require('../models/chat');
var cache = require('express-redis-cache')(); 

//To get chat questions
/* URL : /chat/getqueans */ //cache.route('chatQuestions', 36000)
router.get("/getqueans", (req,res) => {
    console.log("req for chat questions")
    chatBox.find({},(err,result) => {
        if(err)
            { console.log('i have err',err);res.status(500).json({'error':'Internal Server Error!!!' }); }
        else{ 
            console.log(result);
            res.json(result);
        }
    });
});

//To insert chat questions
/* URL : /chat/insqueans */
router.get("/insqueans", (req,res) => {
    var chaterBox = new chatBox();
    chaterBox.question = "how to purchase Products?";
    chaterBox.answer = ["Please login the web application and click on merchandise", "After Login and select the product and select add to cart"];
    chaterBox.hits = 0;
    chaterBox.save();
    
    var chaterBox1 = new chatBox();
    chaterBox1.question = "when will i get my product?"
    chaterBox1.answer =["It will be delivered within 7 days after purchase", "it will be delivered soon"];
    chaterBox1.hits = 0;
    chaterBox1.save();
});

module.exports = router; 
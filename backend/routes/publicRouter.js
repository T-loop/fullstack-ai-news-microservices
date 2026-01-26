const controller= require("../controllers/newsController");
const express=require("express");
const router= express.Router();

router.get("/getallnews", controller.getallNewsController);

router.get("/getnewsbycategory/:category", controller.getNewsByCategoryController);



module.exports= router;

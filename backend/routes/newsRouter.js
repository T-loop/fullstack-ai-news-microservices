const controller= require("../controllers/newsController");
const express=require("express");
const router= express.Router();

router.get("/getallnews", controller.getallNewsController);

router.get("getnewsbycategory/:category", controller.getNewsByCategoryController);

router.post("/postnews", controller.postNewsInCategoryController);

router.put("/updatenews/:messageid", controller.putUpdateNewsController);

router.delete("/deletenews/:messageid", controller.deleteNewsController);

module.exports= router;

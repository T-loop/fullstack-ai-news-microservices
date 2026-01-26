const model = require("../models/newsModel");


const getallNewsService = async () => {
  return await model.getallNewsModel();
};

const getNewsByCategoryService = async (category) => {
  return await model.getNewsByCategoryModel(category);
};

const postNewsInCategoryService = async (title, content, userid) => {
  const response = await fetch("http://127.0.0.1:8000/classify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  const { category } = await response.json();

  return await model.postNewsInCategoryModel(
    title,
    content,
    category,
    userid
  );
};

const putUpdateNewsService = async (messageid, title, content, userid) => {
  return await model.putUpdateNewsModel(
    messageid,
    title,
    content,
    userid
  );
};

const deleteNewsService = async (messageid, userid) => {
  return await model.deleteNewsModel(messageid, userid);
};

module.exports = {
  getNewsByCategoryService,
  getallNewsService,
  postNewsInCategoryService,
  putUpdateNewsService,
  deleteNewsService,
};

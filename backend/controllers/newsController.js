const service = require("../services/newsService");

const getallNewsController = async (req, res) => {
  try {
    const newses = await service.getallNewsService();
    res.status(200).json(newses.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNewsByCategoryController = async (req, res) => {
  const { category } = req.params;

  try {
    const newsbycategory = await service.getNewsByCategoryService(category);
    res.status(200).json(newsbycategory.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postNewsInCategoryController = async (req, res) => {
  const { title, content } = req.body;
  const userid = req.user.userid; // 🔥 aus JWT

  try {
    const postnews = await service.postNewsInCategoryService(
      title,
      content,
      userid
    );
    res.status(201).json(postnews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const putUpdateNewsController = async (req, res) => {
  const { messageid } = req.params;
  const { title, content } = req.body;
  const userid = req.user.userid;

  try {
    const news = await service.putUpdateNewsService(
      messageid,
      title,
      content,
      userid
    );
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNewsController = async (req, res) => {
  const { messageid } = req.params;
  const userid = req.user.userid;

  try {
    await service.deleteNewsService(messageid, userid);
    res.status(200).json({ message: "delete successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getNewsByCategoryController,
  getallNewsController,
  postNewsInCategoryController,
  putUpdateNewsController,
  deleteNewsController,
};

const pool = require("../config/db");

const getallNewsModel = async () => {
  const newses = await pool.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  return newses;
};

const getNewsByCategoryModel = async (category) => {
  const news = await pool.query(
    "SELECT * FROM messages WHERE category = $1 ORDER BY created_at DESC",
    [category]
  );
  return news;
};

const postNewsInCategoryModel = async (title, content, category, userid) => {
  const news = await pool.query(
    "INSERT INTO messages(title, content, category, userid) VALUES($1,$2,$3,$4) RETURNING *",
    [title, content, category, userid]
  );
  return news.rows[0];
};

const putUpdateNewsModel = async (messageid, title, content, userid) => {
  const news = await pool.query(
    "UPDATE messages SET title=$1, content=$2 WHERE messageid=$3 AND userid=$4 RETURNING *",
    [title, content, messageid, userid]
  );
  return news.rows[0];
};

const deleteNewsModel = async (messageid, userid) => {
  await pool.query(
    "DELETE FROM messages WHERE messageid=$1 AND userid=$2",
    [messageid, userid]
  );
};

module.exports = {
  getallNewsModel,
  getNewsByCategoryModel,
  postNewsInCategoryModel,
  putUpdateNewsModel,
  deleteNewsModel
};

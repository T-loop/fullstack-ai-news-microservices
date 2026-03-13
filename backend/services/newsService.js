const model = require("../models/newsModel");
const newsParser= require("../utils/newsParser");


const getallNewsService = async () => {
  return await model.getallNewsModel();
};

const getNewsByCategoryService = async (category) => {
  return await model.getNewsByCategoryModel(category);
};




const postNewsInCategoryService = async (userid = 1) => {

  const batchStart = Date.now();
  
  const newsData = await newsParser.newsFromExternalSource(); 

  if (!Array.isArray(newsData) || newsData.length === 0) {
    console.log('Keine externen Nachrichten gefunden');
    return;
  }

  // externe nachrichten holen
  for (const newsexternal of newsData) {
    let title = newsexternal.title;
    let content = newsexternal.content || newsexternal.contentsnippet;

    
    if (await model.checkDuplicate(title)) {
      console.log('Duplikat gefunden, überspringe:', title);
      continue; 
    }

    
    const response = await fetch("http://127.0.0.1:8000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });

    const { category } = await response.json();

    
    await model.postNewsInCategoryModel(title, content, category, userid);
    console.log('Nachricht erfolgreich gepostet:', title);
  }

  const batchEnd = Date.now();   // Ende Gesamtprozess

  const totalTime = batchEnd - batchStart;

  console.log("Gesamtverarbeitungszeit:", totalTime, "ms");
  console.log("Anzahl Nachrichten:", newsData.length);
  console.log("Durchschnitt pro Nachricht:", totalTime / newsData.length, "ms");
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

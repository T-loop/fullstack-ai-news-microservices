const cron = require("node-cron");
const service = require("../services/newsService");  // service

// SYSTEM_USER_ID
const SYSTEM_USER_ID = 1;

console.log("heeelo CRONNNNN JOB Start")

// Cron-Job, sofffort ausgeführt wird
cron.schedule("* * * * *", async () => {
  console.log("Cron gestartet, Nachrichten werden gepostet...");

  
  try {
    await service.postNewsInCategoryService(SYSTEM_USER_ID);
    console.log("Cron abgeschlossen, Nachrichten wurden gepostet.");
  } catch (err) {
    console.error("Fehler im Cron-Job:", err);
  }
});

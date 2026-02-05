const Parser = require('rss-parser');
const parser = new Parser();

const feeds = [
  'https://www.tagesschau.de/xml/rss2',
  'https://www.spiegel.de/index.rss'
];

const newsFromExternalSource = async () => {
  const result = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      console.log('\nQuelle:', feed.title);

      for (const item of feed.items) {
        result.push({
          source: feed.title,
          title: item.title,
          content: item.contentSnippet || item.content,
          link: item.link,
          date: item.pubDate
        });
      }

    } catch (err) {
      console.error('Fehler bei Feed:', url, err.message);
    }
  }

  console.log(result);
  return result; // Ergebnis wird hier zurückgegeben
};

module.exports = { newsFromExternalSource };

const handleArticle = (item) => {
  const article = {
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  };

  return article;
};

export default (data) => {
  const parser = new DOMParser();
  const xmlDocument = parser.parseFromString(data, 'text/xml');
  const articles = xmlDocument.querySelectorAll('item');

  const feed = {
    title: xmlDocument.querySelector('title').textContent,
    description: xmlDocument.querySelector('description').textContent,
    link: xmlDocument.querySelector('link').textContent,
    articles: [...articles].map(handleArticle),
  };

  return feed;
};

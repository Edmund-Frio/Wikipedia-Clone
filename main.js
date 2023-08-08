const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getSearchData(searchInput.value);
});

function getSearchData(searchQuery) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&sroffset=1000&srlimit=20&srsearch=${searchQuery}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      const resultsInfo = data.query.searchinfo;
      const resultsArray = data.query.search;
      const resultsLength = data.query.search.length;
      displayResultsInfo(resultsInfo);
      displayArticleContent(resultsArray, resultsLength);
      console.log(data);
    })
    .catch(() => {
      console.log(
        `Error! Could not search Wikipedia API, so here's a quote from Oppenheimer!: "Now I am become Death, the destroyer of worlds."`
      );
    });
}

function displayResultsInfo(info) {
  const totalResults = info.totalhits.toLocaleString("en-US");

  resultsContainer.innerHTML = "";
  resultsContainer.insertAdjacentHTML(
    "beforeend",
    `<h1 id="total-results">Seeing ${totalResults} results for ${searchInput.value}...</h1>`
  );
}

function displayArticleContent(array, length) {
  const continueBtn = document.createElement("button");

  array.forEach((article) => {
    const articleTitle = article.title;
    const timestamp = article.timestamp.replace("T", " | ").replace("Z", "");
    const wordCount = article.wordcount.toLocaleString("en-US");
    const articleSnippet = article.snippet;
    const articleUrl = encodeURI(
      `https://en.wikipedia.org/wiki/${article.title}`
    );

    const articleContent = `<div class="result-article">
  <h2 class="article-title">
  <a href="${articleUrl}" target="_blank" rel="noopener">${articleTitle}</a>
  </h2>
  <ul class="label-list">
  <li> Word Count: <span class="label-value">${wordCount}</span></li>
  <li> Timestamp: <span class="label-value">${timestamp}</span></li>
  </ul>
  <p class="article-snippet">
${articleSnippet}</p>
  </div>`;

    resultsContainer.insertAdjacentHTML("beforeend", articleContent);
  });
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContent = document.getElementById("results-content")

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  displayResults(searchInput.value);
});

function displayResults(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=${searchQuery}`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const resultsArray = data.query.search;
      const resultsInfo = data.query.searchinfo;
      results(resultsArray, resultsInfo);
      console.log(resultsArray)
    })
    .catch(() => {
      console.log("Error! Could not search Wikipedia API!");
    });

  function results(array, info) {
    const totalResults = info.totalhits

    resultsContent.innerHTML = "";
    resultsContent.insertAdjacentHTML(
      "beforeend",
      `<h1 id="total-results">Seeing ${totalResults} results for ${searchInput.value}...</h1>`
    );
    array.forEach((article) => {
      const articleTitle = article.title;
      const articleSnippet = article.snippet;
      const articleUrl = encodeURI(
        `https://en.wikipedia.org/wiki/${article.title}`
      );

      resultsContent.insertAdjacentHTML(
        "beforeend",
        `<div class="result-article">
    <h2 class="result-title">
    <a href="${articleUrl}" target="_blank" rel="noopener">${articleTitle}</a>
    </h2>
    <p class="result-snippet"><a href="${articleUrl}" target="_blank" rel="noopener">
  ${articleSnippet}</a></p>
    </div>`
      );
    });
  }
}

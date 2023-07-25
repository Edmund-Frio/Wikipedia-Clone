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
      results(resultsArray);
    })
    .catch(() => {
      console.log("Error! Could not search Wikipedia API!");
    });

  function results(array) {
    resultsContent.innerHTML = "";
    resultsContent.insertAdjacentHTML(
      "beforeend",
      `<h1>Seeing results for ${searchInput.value}...</h1>`
    );
    array.forEach((article) => {
      const articleTitle = article.title;
      const articleSnippet = article.snippet;
      const articleUrl = encodeURI(
        `https://en.wikipedia.org/wiki/${article.title}`
      );

      resultsContent.insertAdjacentHTML(
        "beforeend",
        `<div class="resultArticle">
    <h2 class="resultTitle">
    <a href="${articleUrl}" target="_blank" rel="noopener">${articleTitle}</a>
    </h2>
    <p class="resultSnippet"><a href="${articleUrl}" target="_blank" rel="noopener">
  ${articleSnippet}</a></p>
    </div>`
      );
    });
  }
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input")

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  displayResults(searchInput.value);
});

function displayResults(searchQuery) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchQuery}`;
  console.log(url)
}



// searchForm.addEventListener("submit", handleSubmit);

// async function handleSubmit(event) {
//   event.preventDefault();
//   const searchValue = document.querySelector("#search-input").value;
//   const searchQuery = searchValue.trim();

//   try {
//     const results = await searchWikipedia(searchQuery);
//     console.log(results);
//   } catch (err) {
//     console.log(err);
//     alert("Failed to search wikipedia");
//   }
// }

// async function searchWikipedia(searchQuery) {
//   const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
//   const response = await fetch(endpoint);
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   const json = await response.json();
//   return json;
// }

export default function fetchImages(url, pageNumber, searchQuery) {
    return fetch(url + pageNumber +'&q=' + searchQuery)
    .then(response => response.json())
}
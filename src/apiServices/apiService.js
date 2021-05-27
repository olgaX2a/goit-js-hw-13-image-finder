const BASE_URL = 'https://pixabay.com/api'
const API_KEY = '21806148-ef05846c07274d590c18cb52e'
const searchOpt = {
    imageType: 'photo',
    orientation: 'horizontal',
    perPage: 12,
}

export default {
  searchQuery: '',
  page: 1,
    fetchImages() {
    const url = `${BASE_URL}/?key=${API_KEY}&image_type=${searchOpt.imageType}&orientation=${searchOpt.orientation}&per_page=${searchOpt.perPage}&page=${this.page}&q=${this.query}`;
    return fetch(url)
      .then(res => res.json())
        .then(images => {
        this.incrementPage();
        return images.hits;
      });
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
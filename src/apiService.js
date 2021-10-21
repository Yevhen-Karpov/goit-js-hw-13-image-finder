export default class ApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchArticles(searchQuery) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23964778-a3e050be7e1391d793e3046e4`;

    return fetch(url)
      .then((r) => r.json())
      .then((data) => {
        this.page += 1;
        return data.hits;
      })
      .catch();
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

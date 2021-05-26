import './sass/main.scss';
import cardsTemplate from './templates/cardsTemplate';
import fetchImages from './apiServices/apiService'

const refs = {
    searchForm: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    loadBtn: document.querySelector('.loading-btn'),
    container:document.querySelector('.container'),
}
function scrollToBottom () {
    refs.loadBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
}


const BASE_URL = 'https://pixabay.com/api'
const API_KEY = '21806148-ef05846c07274d590c18cb52e'
const searchOpt = {
    imageType: 'photo',
    orientation: 'horizontal',
    perPage: 12,
}
let pageNumber = 1;
let searchQuery = '';

const url = `${BASE_URL}/?key=${API_KEY}&image_type=${searchOpt.imageType}&orientation=${searchOpt.orientation}&per_page=12&page=`

refs.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchQuery = event.target.query.value.trim();
    if (!searchQuery) {
        clearMarkup();
        return
    }
    if (searchQuery) {
        loadPage();
        showLoadBtn()
    }
})
function renderMarkup(markup) {
    return refs.gallery.insertAdjacentHTML('beforeend', markup)
}

function increasePageNumber() {
    return pageNumber += 1;
}
function loadPage() {
    fetchImages(url, pageNumber, searchQuery).then(data => {
        if (data.hits.length === 0) {
            return
        }
        else {
            const markup = cardsTemplate(data.hits);
            renderMarkup(markup)
            return
        }
    });
}

function showLoadBtn() {
    refs.loadBtn.classList.remove('hidden')
}

function hideLoadBtn() {
    refs.loadBtn.classList.add('hidden')
}

refs.loadBtn.addEventListener('click', () => {
    increasePageNumber();
    loadPage();
    setTimeout(() => { scrollToBottom ()}, 500)
    ;
    return
})

function clearMarkup () {
    hideLoadBtn();
    return refs.gallery.innerHTML = ''
}
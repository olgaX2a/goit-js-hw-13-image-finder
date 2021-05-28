import './sass/main.scss';

// import * as basicLightbox from 'basiclightbox';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import refs from './js/refs';
import photoSearchService from './apiServices/apiService';
import loadBtn from './js/button';
import scrollToBottom from './js/scroll';
import markup from './js/markup';


refs.loadBtn.addEventListener('click', () => {
    fetchImages();
    setTimeout(() => {
        scrollToBottom();
    }, 500)

})
refs.searchForm.addEventListener('submit', onSearchSubmit)

function onSearchSubmit(event) {
    event.preventDefault();
    photoSearchService.query = event.target.query.value.trim();
    if (!photoSearchService.query) {
        return
    }
    else {
        loadBtn.hide();
        markup.clear();
        photoSearchService.resetPage();
        fetchImages();
    }
}

function fetchImages() {
    photoSearchService.fetchImages()
        .then(images => {
            if (images.length === 0) {
                onBadRequest();
                return
            }
            else {
                markup.render(images);
                loadBtn.show()
                return
            }
        });
}

const onBadRequest = function () {
    return error({
                    text: "Oops! We didn't find anything. Please check your query.",
                    type: "error",
                    delay: 2000
                });
}



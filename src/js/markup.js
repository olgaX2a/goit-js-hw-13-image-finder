import cardsTemplate from '../templates/cardsTemplate';
import refs from './refs';


const render = function (data) {
    const markup = cardsTemplate(data);
    return refs.gallery.insertAdjacentHTML('beforeend', markup)
}

const clear = function () {
    return refs.gallery.innerHTML = ''
}

export default {render, clear}
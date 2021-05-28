import refs from './refs';

const show = function() {
    refs.loadBtn.classList.remove('hidden')
}

const hide = function() {
    refs.loadBtn.classList.add('hidden')
}

export default {show, hide}

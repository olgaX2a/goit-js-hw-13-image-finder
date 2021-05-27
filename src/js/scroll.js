import refs from './refs';

export default function scrollToBottom() {
    refs.loadBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
}

import showModal from './modal';

export default function showWinnerModal(fighter) {
    const div = document.createElement('div');
    div.className = 'winner-text';
    div.innerHTML = `<span>${fighter.name}</span> <span>WIN</span>`;
    showModal({
        title: '',
        bodyElement: div
    });
}

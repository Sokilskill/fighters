import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name,
        width: '200px',
        height: '350px'
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';

    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (!fighter) {
        const emptyElement = createElement({
            tagName: 'div',
            className: 'fighter-preview___empty'
        });
        emptyElement.innerText = 'Select fighter';
        fighterElement.append(emptyElement);
        return fighterElement;
    }

    const imageElement = createFighterImage(fighter);

    const nameElement = createElement({ tagName: 'span', className: 'fighter-preview___name' });
    nameElement.innerText = fighter.name;

    const healthElement = createElement({
        tagName: 'li',
        className: 'fighter-preview___health'
    });
    healthElement.innerText = `Health: ${fighter.health}`;

    const attackElement = createElement({ tagName: 'li', className: 'fighter-preview___attack' });
    attackElement.innerText = `Attack: ${fighter.attack}`;

    const defenseElement = createElement({ tagName: 'li', className: 'fighter-preview___defense' });
    defenseElement.innerText = `Defense: ${fighter.defense}`;

    const listElement = createElement({ tagName: 'ul', className: 'fighter-preview___list' });
    listElement.append(healthElement, attackElement, defenseElement);

    fighterElement.append(nameElement, listElement, imageElement);

    return fighterElement;
}

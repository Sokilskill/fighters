import controls from '../../constants/controls';

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = getRandomNumber(1, 2);
    return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = getRandomNumber(1, 2);
    return defense * dodgeChance;
}
export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return Math.max(0, damage);
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
    });
}

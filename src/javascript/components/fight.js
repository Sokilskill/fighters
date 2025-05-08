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
        const firstFighterHealthBar = document.getElementById('left-fighter-indicator');
        const secondFighterHealthBar = document.getElementById('right-fighter-indicator');
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;

        const criticalHitCooldown = {
            timeOutFirstPlayer: 0,
            timeOutSecondPlayer: 0
        };

        const pressedKeys = new Set();

        function updateHealthBars() {
            firstFighterHealthBar.style.width = `${(firstFighterHealth / firstFighter.health) * 100}%`;
            secondFighterHealthBar.style.width = `${(secondFighterHealth / secondFighter.health) * 100}%`;
        }

        const keyupHandler = event => {
            pressedKeys.delete(event.code);
        };

        const keydownHandler = event => {
            pressedKeys.add(event.code);
            const now = Date.now();

            const isPlayerOneBlocking = pressedKeys.has(controls.PlayerOneBlock);
            const isPlayerTwoBlocking = pressedKeys.has(controls.PlayerTwoBlock);

            const playerOneCritical = controls.PlayerOneCriticalHitCombination.every(key => pressedKeys.has(key));
            const playerTwoCritical = controls.PlayerTwoCriticalHitCombination.every(key => pressedKeys.has(key));

            const canPlayerOneCrit = now - criticalHitCooldown.timeOutFirstPlayer >= 10000;
            const canPlayerTwoCrit = now - criticalHitCooldown.timeOutSecondPlayer >= 10000;

            // Обробка критичних ударів
            if (playerOneCritical && canPlayerOneCrit) {
                criticalHitCooldown.timeOutFirstPlayer = now;
                const damage = 2 * firstFighter.attack;
                secondFighterHealth -= damage;
            } else if (playerTwoCritical && canPlayerTwoCrit) {
                criticalHitCooldown.timeOutSecondPlayer = now;
                const damage = 2 * secondFighter.attack;
                firstFighterHealth -= damage;
            }
            // Звичайні удари
            else {
                if (pressedKeys.has(controls.PlayerOneAttack) && !isPlayerOneBlocking) {
                    const damage = isPlayerTwoBlocking
                        ? getDamage(firstFighter, secondFighter)
                        : getHitPower(firstFighter);
                    secondFighterHealth -= damage;
                }
                if (pressedKeys.has(controls.PlayerTwoAttack) && !isPlayerTwoBlocking) {
                    const damage = isPlayerOneBlocking
                        ? getDamage(secondFighter, firstFighter)
                        : getHitPower(secondFighter);
                    firstFighterHealth -= damage;
                }
            }

            updateHealthBars();

            if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
                document.removeEventListener('keydown', keydownHandler);
                document.removeEventListener('keyup', keyupHandler);
                resolve(firstFighterHealth <= 0 ? secondFighter : firstFighter);
            }
        };

        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);
    });
}

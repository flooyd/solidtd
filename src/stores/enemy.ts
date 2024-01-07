import { createRoot, createSignal } from "solid-js";

function createEnemy() {
    const [health, setHealth] = createSignal(100);
    const [enemyX, setEnemyX] = createSignal(4);
    const [enemyY, setEnemyY] = createSignal(4);
    const [enemies, setEnemies] = createSignal<any[]>([]);
    return {health, setHealth, enemyX, setEnemyX, enemyY, setEnemyY, enemies, setEnemies}
}

export default createRoot(createEnemy);
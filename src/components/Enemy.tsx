import { createEffect, createSignal, onMount } from 'solid-js';
import './Enemy.css';
import tile from '../stores/tile.ts';


function Enemy(props: { x: number, y: number }) {
    const {tiles} = tile;
    const [x, setX] = createSignal(props.x);
    const [y, setY] = createSignal(props.y);
    const [visited, setVisited] = createSignal<any[]>([]);

    const getNextPathTile = () => {
        let pathTile = null;

        const tileAbove = tiles()?.filter((tile: any) => tile.x === (x() - 4) / 16 && tile.y === (y() - 4 - 16) / 16)[0];
        const tileBelow = tiles()?.filter((tile: any) => tile.x === (x() - 4) / 16 && tile.y === (y() - 4 + 16) / 16)[0];
        const tileLeft = tiles()?.filter((tile: any) => tile.x === (x() - 4 - 16) / 16 && tile.y === (y() - 4) / 16)[0];
        const tileRight = tiles()?.filter((tile: any) => tile.x === (x() - 4 + 16) / 16 && tile.y === (y() - 4) / 16)[0];        

        if (tileAbove?.path === "true" && !visited().filter((tile: any) => tile.x === tileAbove.x && tile.y === tileAbove.y)[0]) {
            pathTile = tileAbove;
        } else if (tileBelow?.path === "true" && !visited().filter((tile: any) => tile.x === tileBelow.x && tile.y === tileBelow.y)[0]) {
            pathTile = tileBelow;
        } else if (tileLeft?.path === "true" && !visited().filter((tile: any) => tile.x === tileLeft.x && tile.y === tileLeft.y)[0]) {
            pathTile = tileLeft;
        } else if (tileRight?.path === "true" && !visited().filter((tile: any) => tile.x === tileRight.x && tile.y === tileRight.y)[0]) {
            pathTile = tileRight;
        }

        return pathTile;
    }

    const moveEnemy = () => {
        const nextPathTile = getNextPathTile();
        if (nextPathTile) {
            setX(nextPathTile.x * 16 + 4);
            setY(nextPathTile.y * 16 + 4);
            setVisited([...visited(), { x: nextPathTile.x, y: nextPathTile.y }]);
        }
    }

    setInterval(() => {
        moveEnemy();
    }, 1000);


    return (
        <div class="enemy" id="" style={{ left: x() * 2 + "px", top: y() * 2 + "px" }}>

        </div>
    )
}

export default Enemy
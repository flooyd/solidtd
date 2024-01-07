import { For, createEffect, onCleanup } from 'solid-js';
import './Container.css'
import Tile from './Tile';
import player from '../stores/player.ts'
import Player from './Player.tsx';
import tile from '../stores/tile.ts';
import enemy from '../stores/enemy.ts';
import Enemy from './Enemy.tsx';

function Container() {
    const tilesLocal: any = [];
    const { setPlayerX, setPlayerY, playerY, playerX, previousX, previousY, setPreviousX, setPreviousY } = player;
    const { editing, playing, tiles, setTiles } = tile;
    const { setEnemies, enemies } = enemy;

    //load tower defense tiles
    const loadedTiles = JSON.parse(localStorage.getItem('Tower Defense') as string);

    if (loadedTiles) {
        setTiles(loadedTiles)
    }

    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 18; j++) {
            tilesLocal.push([i, j])
        }
    }

    window.addEventListener('keydown', (e) => {
        setPreviousX(playerX());
        setPreviousY(playerY());
        if (e.key === 'ArrowUp') {
            setPlayerY(playerY() - 16);
        } else if (e.key === 'ArrowDown') {
            setPlayerY(playerY() + 16);
        } else if (e.key === 'ArrowLeft') {
            setPlayerX(playerX() - 16);
        } else if (e.key === 'ArrowRight') {
            setPlayerX(playerX() + 16);
        }
    });

    createEffect(() => {
        if (playerX() < 0) {
            setPlayerX(playerX() + 16);
        }
        if (playerX() > 276) {
            setPlayerX(playerX() - 16);
        }
        if (playerY() < 0) {
            setPlayerY(playerY() + 16);
        }
        if (playerY() > 276) {
            setPlayerY(playerY() - 16);
        }
    })

    createEffect(() => {
        if (playing()) {
            const startTile = tiles().filter((tile: any) => tile.start === "true")[0];
            //set player to start tile
            if (startTile) {
                setPlayerX(startTile.x * 16 + 4);
                setPlayerY(startTile.y * 16 + 4);
                setPreviousX(startTile.x * 16 + 4);
                setPreviousY(startTile.y * 16 + 4);
            }
        }
    })

    createEffect(() => {
        const currentTile = tiles().filter((tile: any) => tile.x === Math.floor((playerX() - 4) / 16) && tile.y === Math.floor((playerY() - 4) / 16))[0];
        if (currentTile?.blocker === "true") {
            setPlayerX(previousX());
            setPlayerY(previousY());
        }
    })

    let spawnInterval: any = null;
    //every 5 seconds, spawn an enemy
    createEffect(() => {
        if (playing()) {
            spawnInterval = setInterval(() => {
                const startTile = tiles().filter((tile: any) => tile.start === "true")[0];
                if (startTile) {
                    setEnemies([...enemies(), { x: startTile.x * 16 + 4, y: startTile.y * 16 + 4 }])
                }
            }, 2000)
        }
    })
    onCleanup(() => {
        clearInterval(spawnInterval);
    })

    return (
        <div class="container">
            <For each={tilesLocal}>{tile =>
                <Tile x={tile[0]} y={tile[1]} />
            }</For>
            <For each={enemies()}>{enemy =>
                <Enemy x={enemy.x} y={enemy.y} />
            }</For>
            {!editing() && <Player x={playerX()} y={playerY()} />}
        </div>
    );
}

export default Container;
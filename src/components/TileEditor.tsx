import './TileEditor.css';
import tile from '../stores/tile.ts';

function TileEditor() {

    const { tiles, setTiles, activeTileX, activeTileY, setShowEditor } = tile;

    const handleClose = () => {
        setShowEditor(false);
    }

    const handleInput = (e: any, which: any,) => {
        if (e.target.type === 'checkbox') {
            e.target.value = e.target.checked;
        } else {
            e.target.value = e.target.value;
        }

        const currentTile = tiles().filter((tile: any) => tile.x === activeTileX() && tile.y === activeTileY())[0];
        if (!currentTile) {
            const newTiles = [...tiles(), { x: activeTileX(), y: activeTileY(), [which]: e.target.value, }];
            setTiles(newTiles);
        } else {
            const newTiles = tiles().map((tile: any) => {
                if (tile.x === activeTileX() && tile.y === activeTileY()) {
                    return { ...tile, [which]: e.target.value }
                } else {
                    return tile;
                }
            });
            setTiles(newTiles);
        }
    }

    const getChecked = () => {
        const currentTile = tiles().filter((tile: any) => tile.x === activeTileX() && tile.y === activeTileY())[0];
        if (currentTile) {
            return currentTile.blocker === "true" ? true : false;
        } else return false;
    }

    const getCheckedStart = () => {
        const currentTile = tiles().filter((tile: any) => tile.x === activeTileX() && tile.y === activeTileY())[0];
        if (currentTile) {
            return currentTile.start === "true" ? true : false;
        } else return false;
    }

    const getCheckedPath = () => {
        const currentTile = tiles().filter((tile: any) => tile.x === activeTileX() && tile.y === activeTileY())[0];
        if (currentTile) {
            return currentTile.path === "true" ? true : false;
        } else return false;
    }

    const getCheckedEnd = () => {
        const currentTile = tiles().filter((tile: any) => tile.x === activeTileX() && tile.y === activeTileY())[0];
        if (currentTile) {
            return currentTile.end === "true" ? true : false;
        } else return false;
    }

    const disableStart = () => {
        if(getCheckedStart()) {
            return false;
        } else {
            const startTile = tiles().filter((tile: any) => tile.start === "true")[0];
            if(startTile) {
                return true;
            } else return false;
        }
    }

    const disableEnd = () => {
        if(getCheckedEnd()) {
            return false;
        } else {
            const endTile = tiles().filter((tile: any) => tile.end === "true")[0];
            if(endTile) {
                return true;
            } else return false;
        }
    }
    
    const getColor = () => {
        const currentTile = tiles().filter((tile: any) => tile.x === activeTileX() && tile.y === activeTileY())[0];
        if (currentTile) {
            return currentTile.color || '';
        } else return '';
    } 

    return (
        <div class="tileEditor">
            <h2>Tile Editor - {activeTileX()},{activeTileY()}</h2>
            <input type="text" placeholder="Tile Color" onInput={(e) => handleInput(e, 'color')} value={getColor()} />
            <div class="field">
                <label for="blocker">blocker?</label>
                <input type="checkbox" id="blocker" name="blocker" value="checked" onInput={(e) => handleInput(e, 'blocker')} checked={getChecked()} />
            </div>
            <div class="field">
                <label for="start">start?</label>
                <input type="checkbox" id="start" name="start" value="checked" onInput={(e) => handleInput(e, 'start')} checked={getCheckedStart()} disabled={disableStart()} />
            </div>
            <div class="field">
                <label for="path">path?</label>
                <input type="checkbox" id="path" name="path" value="checked" onInput={(e) => handleInput(e, 'path')} checked={getCheckedPath()} />
            </div>
            <div class="field">
                <label for="end">end?</label>
                <input type="checkbox" id="end" name="end" value="checked" onInput={(e) => handleInput(e, 'end')} checked={getCheckedEnd()} disabled={disableEnd()} />
            </div>
            <button onClick={handleClose}>X</button>
        </div>
    )
}

export default TileEditor;
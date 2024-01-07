import './Tile.css';
import tile from '../stores/tile.ts';

function Tile(props: { x: number, y: number }) {
    const { x, y } = props;
    const { setActiveTileX, setActiveTileY, setShowEditor, editing, playing } = tile;
    const { tiles } = tile;

    const handleClick = () => {
        if (editing()) {
            setShowEditor(false);
            setActiveTileX(x);
            setActiveTileY(y);
            setShowEditor(true);
        }
    }

    const getStyle = () => {
        const currentTile = tiles().filter((tile: any) => tile.x === x && tile.y === y)[0];
        if(currentTile?.end === "true" && editing()) {
            return "background-color: red;"
        }
        if(currentTile?.path === "true" && editing()) {
            return "background-color: #ccc;"
        }
        if(currentTile?.start === "true" && editing()) {
            return "background-color: green;"
        }
        if (currentTile) {
            return `background-color: ${currentTile.color};`
        }
        return '';
    }

    const getStart = () => {
        const startTile = tiles().filter((tile: any) => tile.start === "true")[0];
        if(startTile?.x === x && startTile?.y === y && !playing()) {
            return "S"
        }
    }

    return (
        <div class="tile" onClick={handleClick} style={getStyle()}>
            {getStart()} {x} {y}
        </div>
    )
}

export default Tile;
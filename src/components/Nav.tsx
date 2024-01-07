import tile from '../stores/tile';
import './Nav.css';

function Nav() {
    const { setEditing, editing, setSaving, setPlaying } = tile;

    const handleClickEdit = () => {
        if(editing()) {
            setPlaying(true);
        }
        setEditing(!editing());
        setSaving(false);
        
    }

    const handleClickSave = () => {
        setSaving(true);
    }
    return (
        <nav>
            <div>2D Map Editor</div>
            <div class="buttons">
                <button onClick={handleClickEdit}>{editing() ? 'Play' : 'Edit'}</button>
                {editing() && <button onClick={handleClickSave}>Save map</button>}
            </div>
        </nav>
    )
}

export default Nav;
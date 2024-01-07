import { createSignal } from 'solid-js';
import tile from '../stores/tile';
import './SaveEditor.css'

function SaveEditor() {
    const { tiles, setSaving, setTiles } = tile;
    let newSaveName = '';
    const [error, setError] = createSignal<string | null>(null);
    const [keys, setKeys] = createSignal<string[]>([]);

    setKeys(Object.keys(localStorage));

    const save = (key: any, newSave: boolean) => {
        if (tiles()?.length === 0 || tiles() === undefined) {
            setError('No tiles to save');
            return;
        }
        localStorage.setItem(key, JSON.stringify(tiles()))
        if (newSave) {
            setKeys(Object.keys(localStorage));
            const form = document.getElementById('newSave') as HTMLFormElement;
            form.reset();
        }
    }

    const load = (key: any) => {
        const loadedTiles = JSON.parse(localStorage.getItem(key) as string);
        setSaving(false);
        setKeys(Object.keys(localStorage));
        setTiles(loadedTiles);
    }

    const handleClose = () => {
        setSaving(false);
    }

    return (
        <div class="saveEditor">
            <h2>Save and Load</h2>
            <form onSubmit={e => e.preventDefault()} id="newSave">
                <div class="row">
                    <input type="text" onInput={(e) => newSaveName = e.target.value} placeholder="Save name" />
                    <button onClick={() => save(newSaveName, true)}>Save</button>
                </div>
            </form>

            {keys().map((key: any) => {
                return (
                        <div class="row">
                            {key}
                            <button onClick={() => { save(key, false) }}>Save</button>
                            <button onClick={() => { load(key) }}>Load</button>
                        </div>
                       
                )
            })}
            <div class="error">{error()}</div>
            <button class="closeButton" onClick={handleClose}>X</button>
        </div>
    );
}

export default SaveEditor;
import { createSignal, createRoot } from "solid-js";
type tiles = any[];
function tile() {
  const [activeTileX, setActiveTileX] = createSignal(0);
  const [activeTileY, setActiveTileY] = createSignal(0);
  const [tiles, setTiles]: tiles = createSignal([]);
  const [showEditor, setShowEditor] = createSignal(false);
  const [editing, setEditing] = createSignal(false);
  const [saving, setSaving] = createSignal(false);
  const [playing, setPlaying] = createSignal(true);
  return {activeTileX, activeTileY, setActiveTileX, setActiveTileY, tiles, setTiles, showEditor, setShowEditor, editing, setEditing, saving, setSaving, playing, setPlaying}
}

export default createRoot(tile);


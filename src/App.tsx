import './App.css'
import Container from './components/Container';
import Nav from './components/Nav';
import SaveEditor from './components/SaveEditor.tsx';
import TileEditor from './components/TileEditor.tsx';
import tile from './stores/tile.ts';

function App() {
  const { showEditor, saving, editing } = tile;

  return (
    <>
      <Nav />
      <main>
        <Container />
        {showEditor() && editing() && <TileEditor />}
        {saving() && <SaveEditor />}
      </main>
    </>
  )
}

export default App

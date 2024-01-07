import { createSignal, createRoot } from "solid-js";

function createPlayer() {
  const [playerX, setPlayerX] = createSignal(4);
  const [playerY, setPlayerY] = createSignal(4);
  const [previousX, setPreviousX] = createSignal(0);
  const [previousY, setPreviousY] = createSignal(0);
  return {playerX, playerY, setPlayerX, setPlayerY, previousX, previousY, setPreviousX, setPreviousY}
}

export default createRoot(createPlayer);


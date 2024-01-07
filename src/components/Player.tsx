import { createEffect } from 'solid-js';
import './Player.css';
import { gsap } from 'gsap'

function Player(props: { x: number, y: number }) {
    createEffect(() => {
        gsap.to('.player', {
            duration: .05,
            x: props.x,
            y: props.y,
        })
    })
    
    return (
        <div class="player" style={{ left: props.x + "px", top: props.y + "px" }}>

        </div>
    );
}

export default Player;
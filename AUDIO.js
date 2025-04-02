const forwardbutton = document.getElementById("forwardbutton");
        const audioElement = document.getElementById('audioElement');
        const hoverSfx = document.getElementById('hoverSfx');
        const clickSfx = document.getElementById('clickSfx');
        const muteButton = document.getElementById('muteButton');
        const interactiveElements = document.querySelectorAll('a, button,input,.forwardbutton,.buttons,.');

        // Ensure autoplay works
        audioElement.addEventListener('canplaythrough', () => {
            console.log('Audio is ready to play without buffering.');
            audioElement.play();
        });

        // Handle cases where autoplay might be blocked
        document.addEventListener('click', () => {
            if (audioElement.paused) {
                audioElement.play();
            }
        });

        // Mute Button Toggle
        muteButton.addEventListener('click', () => {
            if (audioElement.muted) {
                audioElement.muted = false;
                muteButton.textContent = 'Mute';
            } else {
                audioElement.muted = true;
                muteButton.textContent = 'Unmute';
            }
        });

        // Add hover and click sound effects
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                hoverSfx.currentTime = 0;
                hoverSfx.play();
            });

            element.addEventListener('click', () => {
                clickSfx.currentTime = 0;
                clickSfx.play();
            });
        });
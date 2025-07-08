document.addEventListener("DOMContentLoaded", function () {
    const songs = [

        {
            "title": "Aam Jahe Munde",
            "artist": "Parmish Verma",
            "album": "Single",
            "duration": "04:14",  // Replace with actual duration if available
            "src": "punjabi/song1.mp3"  // Replace with actual source path
        },
        {
            "title": "DIVINE - 3_59 AM",
            "artist": "DIVINE",
            "album": "3_59 AM",
            "duration": "04:46",  // Replace with actual duration if available
            "src": "punjabi/song2.mp3"  // Replace with actual source path
        },
        {
            "title": "Excuses - Gurinder Gill, AP Dhillon (slowedreverb)",
            "artist": "Gurinder Gill, AP Dhillon",
            "album": "Single",
            "duration": "03:12",  // Replace with actual duration if available
            "src": "punjabi/song3.mp3"  // Replace with actual source path
        },
        {
            "title": "Maiyya Mainu",
            "artist": "Jersey",
            "album": "Single",
            "duration": "03:02",  // Replace with actual duration if available
            "src": "punjabi/song4.mp3"  // Replace with actual source path
        },
        {
            "title": "Sauda Khara Khara - Good Newwz",
            "artist": "Akshay Kumar",
            "album": "Good Newwz",
            "duration": "03:41",  // Replace with actual duration if available
            "src": "punjabi/song5.mp3"  // Replace with actual source path
        },
        {
            "title": "Cheques - Shubh",
            "artist": "Shubh",
            "album": "Cheques",
            "duration": "03:08",  // Replace with actual duration if available
            "src": "punjabi/new/song6.mp3"  // Replace with actual source path
        },
        {
            "title": "We Rollin (Official Audio)",
            "artist": "Shubh",
            "album": "We Rollin",
            "duration": "03:19",  // Replace with actual duration if available
            "src": "punjabi/song7.mp3"  // Replace with actual source path
        },
        {
            "title": "With You",
            "artist": "AP Dhillon",
            "album": "Single",
            "duration": "02:35",  // Replace with actual duration if available
            "src": "punjabi/song8.mp3"  // Replace with actual source path
        }

        // Add more song objects here
    ];

    const songListElement = document.getElementById("song-list");

    let currentAudio = null; // Keeps track of the currently playing audio
    let progressInterval = null;
    let currentPlayBar = null; // Track the current play bar

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Function to create a play bar
    function createPlayBar(song) {
        const tr = document.createElement("tr");
        tr.className = "play-bar-row";
        tr.innerHTML = `
            <td colspan="5">
                <div class="play-bar">
                    <span class="play-bar-song">${song.title} - ${song.artist}</span>
                    <button id="play-pause" data-src="${song.src}" data-playing="false">
                        <svg class="play-icon" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                        </svg>
                        <svg class="pause-icon" viewBox="0 0 24 24" style="display:none;">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                        </svg>
                    </button>
                    <div class="progress-bar">
                        <input type="range" min="0" max="100" value="0" id="progress-slider">
                    </div>
                    <span id="current-time">00:00</span> / <span id="total-duration">${song.duration}</span>
                </div>
            </td>
        `;
        return tr;
    }

    // Function to handle song click
    function handleSongClick(song, row) {
        if (currentPlayBar) {
            currentPlayBar.remove();
        }

        currentPlayBar = createPlayBar(song);
        row.parentNode.insertBefore(currentPlayBar, row.nextSibling);

        const playPauseButton = currentPlayBar.querySelector("#play-pause");
        addPlayPauseFunctionality(playPauseButton);
        handleSeekBarUpdate(currentPlayBar.querySelector("#progress-slider"), currentPlayBar.querySelector("#current-time"), song.src);
    }

    // Add songs to the table
    songs.forEach(song => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.album}</td>
            <td>${song.duration}</td>
            <td>
                <button class="play-pause" data-src="${song.src}" data-playing="false">
                    <svg class="play-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                    <svg class="pause-icon" viewBox="0 0 24 24" style="display:none;">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                    </svg>
                </button>
            </td>
        `;

        tr.addEventListener("click", () => handleSongClick(song, tr));
        songListElement.appendChild(tr);
    });

    // Add play/pause functionality
    function addPlayPauseFunctionality(playPauseButton) {
        if (currentAudio) {
            currentAudio.pause();
        }

        currentAudio = new Audio(playPauseButton.getAttribute("data-src"));
        let isPlaying = playPauseButton.getAttribute("data-playing") === "true";

        playPauseButton.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents row click event from firing

            if (!isPlaying) {
                currentAudio.play();
                isPlaying = true;
                playPauseButton.setAttribute("data-playing", "true");
                playPauseButton.querySelector(".play-icon").style.display = "none";
                playPauseButton.querySelector(".pause-icon").style.display = "inline";
            } else {
                currentAudio.pause();
                isPlaying = false;
                playPauseButton.setAttribute("data-playing", "false");
                playPauseButton.querySelector(".play-icon").style.display = "inline";
                playPauseButton.querySelector(".pause-icon").style.display = "none";
            }

            if (progressInterval) {
                clearInterval(progressInterval);
            }

            progressInterval = setInterval(() => {
                const progressSlider = document.querySelector("#progress-slider");
                const currentTimeElement = document.querySelector("#current-time");

                progressSlider.value = (currentAudio.currentTime / currentAudio.duration) * 100;
                currentTimeElement.textContent = formatTime(currentAudio.currentTime);
            }, 1000);
        });

        // Stop updating the progress bar if the audio is paused
        currentAudio.addEventListener("pause", function () {
            clearInterval(progressInterval);
        });

        // Handle end of the song and move to next song
        currentAudio.addEventListener("ended", function () {
            const nextButton = document.querySelector("#next-button");
            if (nextButton) {
                nextButton.click();
            }
        });
    }

    function handleSeekBarUpdate(progressSlider, currentTimeElement, songSrc) {
        progressSlider.addEventListener("input", function () {
            if (currentAudio && currentAudio.src.includes(songSrc)) {
                const seekTime = (this.value / 100) * currentAudio.duration;
                currentAudio.currentTime = seekTime;
                currentTimeElement.textContent = formatTime(seekTime);
            }
        });
    }

    // Show scrollable header on scroll
    window.onscroll = function () {
        var scrollHeader = document.getElementById('scroll-header');
        if (document.documentElement.scrollTop > 100) {
            scrollHeader.style.display = 'flex';
        } else {
            scrollHeader.style.display = 'none';
        }
    };
});

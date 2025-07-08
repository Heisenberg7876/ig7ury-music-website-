document.addEventListener("DOMContentLoaded", function () {
    const songs = [


        {
            title: "Big Dawgs",
            artist: "Hanumankind Ft. Kalmi",
            album: "Def Jam India",
            duration: "03:55",
            src: "songs/song1.mp3"
        },
        {
            title: "Happy Nation",
            artist: "Ace of Base",
            album: "Happy Nation",
            duration: "04:16",
            src: "songs/song2.mp3"
        },
        {
            title: "Heat Waves",
            artist: "Glass Animals",
            album: "Dreamland",
            duration: "04:00",
            src: "songs/song3.mp3"
        },
        {
            title: "Mockingbird",
            artist: "Eminem",
            album: "Encore",
            duration: "04:14",
            src: "songs/song4.mp3"
        },
        {
            title: "Without Me",
            artist: "Eminem",
            album: "The Eminem Show",
            duration: "04:52",
            src: "songs/song5.mp3"
        },
        {
            title: "God's Plan",
            artist: "Drake",
            album: "Scorpion",
            duration: "03:20",
            src: "songs/song6.mp3"
        },
        {
            title: "Bloody Mary",
            artist: "Lady Gaga",
            album: "Born This Way",
            duration: "04:05",
            src: "songs/song7.mp3"
        },
        {
            title: "Shape of You",
            artist: "Ed Sheeran",
            album: "Divide",
            duration: "04:24",
            src: "songs/song8.mp3"
        },
        {
            title: "Skyfall",
            artist: "Adele",
            album: "Skyfall",
            duration: "04:50",
            src: "songs/song9.mp3"
        },
        {
            title: "Laree Choote Band Version",
            artist: "Huqa Live",
            album: "Bollywood Hits",
            duration: "04:01",
            src: "songs/song10.mp3"
        },
        {
            title: "Aaoge Tum Kabhi",
            artist: "The Local Train",
            album: "Vaaqif",
            duration: "04:25",
            src: "songs/song11.mp3"
        },
        {
            title: "Choo Lo",
            artist: "The Local Train",
            album: "Aalas Ka Pedh",
            duration: "03:54",
            src: "songs/song12.mp3"
        },
        {
            title: "Liggi",
            artist: "Ritviz",
            album: "Ved",
            duration: "03:12",
            src: "songs/song13.mp3"
        },
        {
            title: "Baaraat",
            artist: "Ritviz & Nucleya",
            album: "Baaraat",
            duration: "03:43",
            src: "songs/song14.mp3"
        },
        {
            title: "Mera Safar",
            artist: "Iqlipse Nova",
            album: "Mera Safar",
            duration: "03:11",
            src: "songs/song15.mp3"
        },
        {
            title: "Savera",
            artist: "Iqlipse Nova",
            album: "Savera",
            duration: "02:24",
            src: "songs/song16.mp3"
        },
        {
            title: "Dil Tu Jaan Tu",
            artist: "Gurnazar Ft. Kritika Yadav",
            album: "Punjabi Hits",
            duration: "03:18",
            src: "songs/song17.mp3"
        },
        {
            title: "Believer",
            artist: "Imagine Dragons",
            album: "Evolve",
            duration: "03:37",
            src: "songs/song18.mp3"
        },
        {
            title: "Hymn For The Weekend",
            artist: "Coldplay",
            album: "A Head Full of Dreams",
            duration: "04:21",
            src: "songs/song19.mp3"
        },
        {
            title: "Alone",
            artist: "Alan Walker",
            album: "Different World",
            duration: "02:44",
            src: "songs/song20.mp3"
        },
        {
            title: "Pasoori",
            artist: "Ali Sethi x Shae Gill",
            album: "Coke Studio Season 14",
            duration: "04:37",
            src: "songs/song21.mp3"
        },
        {
            title: "Ramuloo Ramulaa",
            artist: "Allu Arjun",
            album: "Ala Vaikunthapurramuloo",
            duration: "04:34",
            src: "songs/song22.mp3"
        },
        {
            title: "ButtaBomma",
            artist: "Allu Arjun",
            album: "Ala Vaikunthapurramuloo",
            duration: "03:14",
            src: "songs/song23.mp3"
        },
        {
            title: "Kurchi Madathapetti",
            artist: "Mahesh Babu",
            album: "Guntur Kaaram",
            duration: "04:43",
            src: "songs/song24.mp3"
        },
        {
            title: "YALGAAR",
            artist: "CarryMinati X Wily Frenzy",
            album: "CarryMinati",
            duration: "03:15",
            src: "songs/song25.mp3"
        },
        {
            title: "Brown Rang",
            artist: "Yo Yo Honey Singh",
            album: "International Villager",
            duration: "02:59",
            src: "songs/song26.mp3"
        },
        
        {
            title: "Cheques",
            artist: "Shubh",
            album: "Shubh",
            duration: "03:09",
            src: "songs/song28.mp3"
        },
        {
            title: "Brothers Anthem",
            artist: "Ajay-Atul",
            album: "Brothers",
            duration: "06:20",
            src: "songs/song29.mp3"
        },
        {
            title: "Naa Ready",
            artist: "Thalapathy Vijay",
            album: "Leo",
            duration: "04:22",
            src: "songs/song30.mp3"
        },
        {
            title: "Illuminati",
            artist: "Fahadh Faasil",
            album: "Aavesham",
            duration: "02:29",
            src: "songs/song31.mp3"
        },
        


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

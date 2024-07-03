


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then((registration) => {
            console.log('Register Success:', registration)
        })
        .catch((error) => {
            console.log('Register Failed:', error)
        });
} else (
    console.log('Service Workers are not supported')
)

// let getId = (id) => document.getElementById(id);
// let inputTitle = getId("title");


// let inputArtist = getId("artist");

// let btnAddSong = getId("btnAdd");

// // id of elements os List of songs

// let nameOfSong = getId("song_name")
// let artistOfSong = getId("artist_name")


// // Error message
// let errorTitle = getId('errorTitle');
// let errorArtist = getId('errorArtist');
// let generalError = getId('generalError');

// // adding event Listener to the button add
// btnAddSong.addEventListener("click", addSong);


// let songs = []
// // function to add song if both inputs are filled, if not render an erro message
// function addSong() {
//     let titleValue = inputTitle.value.trim();
//     let artistValue = inputArtist.value.trim();
//     if (titleValue !== "" && artistValue !== "") {
//         let listOfSong = {
//             title: titleValue,
//             artist: artistValue
//         }
//         songs.push(listOfSong)
//         console.log(songs)
//         displaySongs();
//         removeText()
//     } else {
//         if (titleValue === "" && artistValue === "") {
//             generalError.classList.add('error');
//             generalError.textContent = "Please enter the song title and artist";
//         } else {
//             if (titleValue === "") {
//                 errorTitle.classList.add('error');
//                 errorTitle.textContent = "Please enter the song title";
//             }
//             if (artistValue === "") {
//                 errorArtist.classList.add('error');
//                 errorArtist.textContent = "Please indicate the artist of the song";
//             }
//         }
//     }
// }

// function displaySongs() {
//     listOfSongs.innerHTML = '';
//     songs.forEach(song => {
//         let songHolder = document.createElement("div");
//         songHolder.id = "song_holder";
//         songHolder.innerHTML = `<p id="song_title">${song.title} </p>
//         <p id="song_artist">${song.artist}</p>`
//         listOfSongs.appendChild(songHolder)
//     })
// }
// function removeText() {

//     // delete indut data
//     inputTitle.value = "";
//     inputArtist.value = "";

//     // delete error message
//     errorTitle.textContent = '';
//     errorArtist.textContent = '';
//     generalError.textContent = '';

// }
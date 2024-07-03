import musicDB from '../js/music-db/music-db.js'

let getId = (id) => document.getElementById(id);

let listOfSongs = getId("addListSongs")


musicDB.open()
    .then(() => {
        musicDB.getAll()
            .then(displaySongs)
            .catch((error) => {
                console.log("Failed to get", error)
            })
    })
    .catch((error) => {
        console.log('Failed to open', error)
        listOfSongs.innerHTML = `
        <div class = 'song-not-found'>
        There was an error opening the database.
        Please check your connection and try again
        </div>
        `
    })

// id of elements  List of songs
let inputTitle = getId("title");
let inputArtist = getId("artist");
let btnAddSong = getId("btnAdd");


// Error message
let messageOutput = getId('generalError');

// adding event Listener to the button add
btnAddSong.addEventListener("click", () => {
    const title = inputTitle.value
    const artist = inputArtist.value


    // Validate the user input.
    const invalidMessages = [];
    if (!title) {
        invalidMessages.push("The song fiels is required")
    }
    if (!artist) {
        invalidMessages.push("The artist field is required")
    }
    if (invalidMessages.length === 0) {
        let numberOfLikes = 0
        // Add the game to the database
        musicDB.add(artist, numberOfLikes, title)
            .then(() => {
                console.log('Add successfuly')
                messageOutput.innerHTML = `
                <div class = 'song-add-success'>
                Song added successfully!
                </div>
                `
                // Clear the user input.
                inputTitle.value = "";
                inputArtist.value = "";
                musicDB.getAll()
                    .then(displaySongs)
                    .catch((error) => {
                        console.log("Failed to get", error)
                    })

            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    else {
        const description = invalidMessages.join('<br>')
        messageOutput.innerHTML = `
        <div class = 'song-failure'>
        Invalid Data!
        <span>${description}</span>
        </div>
        `
    }
});


// let songs = []
// function to add song if both inputs are filled, if not render an erro message
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
function displaySongs(songs) {
    listOfSongs.innerHTML = '';

    if (songs.length === 0) {
        listOfSongs.innerHTML = `
    <div class = 'song-not-found'>
    No song was found in the database
    </div>
    `
    }
    console.log("Songs:", songs)
    songs.forEach(song => {
        let songHolder = document.createElement("div");
        songHolder.className = "song_holder";
        listOfSongs.appendChild(songHolder)

        // Include the title

        const titleDiv = document.createElement('div')
        titleDiv.className = 'titleDiv'
        const titleLikeDiv = document.createElement('div')
        titleLikeDiv.className = "titleLikeDiv"
        const elemTitle = document.createElement('h3');
        elemTitle.innerHTML = song.title;
        songHolder.append(titleDiv)
        titleDiv.append(titleLikeDiv)
        titleLikeDiv.append(elemTitle)

        // Include the Artist
        const elemArtist = document.createElement('span')
        elemArtist.innerHTML = song.artist
        titleLikeDiv.append(elemArtist)

        // Include Likes label
        const elemLike = document.createElement('div');
        elemLike.className = 'status';
        elemLike.innerHTML = '<b>Likes:</b>'
        titleDiv.append(elemLike);

        // Includes the remove button
        const buttonDiv = document.createElement('div')
        buttonDiv.className = 'btnDiv'
        const buttonRemove = document.createElement('button');
        buttonRemove.className = 'remove';
        buttonRemove.innerText = 'Remove';
        buttonDiv.append(buttonRemove);

        // Remove from the database
        buttonRemove.addEventListener('click', () => {
            musicDB.delete(song.id)
                .then(() => {
                    songHolder.remove();
                })
                .catch((error) => {
                    console.log('Failed to remove', error)
                })
        })


        //  // Includes the change Likes button

        const buttonUpdateLikes = document.createElement('button');
        buttonUpdateLikes.className = 'update';
        buttonUpdateLikes.innerHTML = '+1 Like';
        songHolder.append(buttonDiv)
        buttonDiv.append(buttonUpdateLikes);



        // Create a span element to display the number of likes and append it to the DOM once
        const elemStatusLabel = document.createElement('span');
        elemStatusLabel.innerHTML = song.numberOfLikes;
        elemStatusLabel.className = 'countLike';
        elemLike.append(elemStatusLabel);

        buttonUpdateLikes.addEventListener('click', () => {
            song.numberOfLikes++;
            musicDB.update(song)
                .then(() => {
                    // Update the existing span element with the new number of likes
                    elemStatusLabel.innerHTML = song.numberOfLikes;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        });


    })
}
function removeText() {

    // delete indut data
    inputTitle.value = "";
    inputArtist.value = "";

    // delete error message
    messageOutput.textContent = '';

}
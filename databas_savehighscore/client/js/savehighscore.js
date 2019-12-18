async function loadHighscoreList() {
  // Ladda in data ifrån databasen (via backend)
  let result = await fetch("/data/highscore")
  let highscores = await result.json()
  renderHighscoreList(highscores)
}
// Denna startar vi först så att vi laddar in listan på personer
//loadHighscoreList()

function renderHighscoreList(highscores) {
  let list = $("<ul/>")
  for (let highscore of highscores) {
    list.append(`<li>${highscore.name}: ${highscore.points}</li>`)
  }
  $("main").html(list)
}

// Lyssna på knapp-klick för att skapa en ny person
$("body").on("click", "button", createPlayer)

async function createPlayer(name, score) {
  let highscores = {}
  highscores.name = name
  highscores.points = score
  // Skicka den nya personen till databasen (via backend)
  let result = await fetch("/data/highscore", {
    body: JSON.stringify(highscores),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  // Ladda listan på personer igen, eftersom vi just uppdaterat den
  loadHighscoreList()
}

//Sex orientation variables
const homo = document.getElementById('homo')
const hetero = document.getElementById('hetero')
const bissex = document.getElementById('bissex')
const assex = document.getElementById('assex')
const pansex = document.getElementById('pansex')
const other = document.getElementById('other-orientation')
var selectedGenre = document.querySelectorAll('input[name="genre"]')
let sexOrientation
// Contact information
const userName = document.getElementById('name')
const tel = document.getElementById('whatsapp')
const email = document.getElementById('email')
// Add info variables
var selectedMusicStyles = document.querySelectorAll('input[type="checkbox"]')
var selectedSports = document.querySelectorAll('input[name="sports"]')
let musicStyles = []
let sportsModalities = []



Array.from(selectedGenre).forEach(function(genre){
    genre.addEventListener('change', function(){
        if(genre.checked){
            other.setAttribute('disabled', 'disabled')
            sexOrientation = genre.value
        }
    })
})

Array.from(selectedMusicStyles).forEach(function(style){
    style.addEventListener('change', function(){
        if(style.checked){
            musicStyles.push(style.value)
        }
    })
})

Array.from(selectedSports).forEach(function(sport){
    sport.addEventListener('change', function(){
        if(sport.checked){
            sportsModalities.push(sport.value)
        }
    })
})


const enableRadios = ()=>{
    homo.removeAttribute('disabled')
    hetero.removeAttribute('disabled')
    bissex.removeAttribute('disabled')
    assex.removeAttribute('disabled')
    pansex.removeAttribute('disabled')
}


document.getElementById('enable').addEventListener('click', ()=>{
    other.removeAttribute('disabled')
})

document.getElementById('clear').addEventListener('click', ()=>{
    other.value = null

    enableRadios()
})

other.addEventListener('input', ()=>{
    pansex.setAttribute('disabled', 'disabled')
    assex.setAttribute('disabled', 'disabled')
    bissex.setAttribute('disabled', 'disabled')
    hetero.setAttribute('disabled', 'disabled')
    homo.setAttribute('disabled', 'disabled')   
    
    if(!other.value){
        enableRadios()
    }
})

document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    
    if(other.value){
        const body = {
            name: userName.value,
            whatsapp: tel.value,
            email: email.value,
            genre: other.value,
            music: JSON.stringify(musicStyles),
            sports: JSON.stringify(sportsModalities)
        }
        console.log(body)
    }else{
        const body = {
            name: userName.value,
            whatsapp: tel.value,
            email: email.value,
            genre: sexOrientation,
            music: JSON.stringify(musicStyles),
            sports: JSON.stringify(sportsModalities)
        }
        console.log(body)
    }
})
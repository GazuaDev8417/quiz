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
const password = document.getElementById('password')
const msg = document.getElementById('msg')
const popup = document.querySelector('.password-modal')
// Add info variables
var selectedMusicStyles = document.querySelectorAll('input[type="checkbox"]')
var selectedSports = document.querySelectorAll('input[name="sports"]')
let musicStyles = []
let sportsModalities = []
// backend variables
// const url = 'https://super-form-server.vercel.app'
const url = 'http://localhost:3003'



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


const openPopup = ()=>{
    popup.style.display = 'block'
}

const closePopup = ()=>{
    popup.style.display = 'none'
    password.value = ''
}


document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    
    if(other.value){
        const body = {
            name: userName.value,
            whatsapp: tel.value,
            email: email.value,
            password: password.value,
            message: msg. value,
            genre: other.value,
            music: JSON.stringify(musicStyles),
            sports: JSON.stringify(sportsModalities)
        }
        fetch(`${url}/users`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.text()).then(data=>{
            alert(data)    
            closePopup()
        }).catch(e=>{
            alert(e.message)
        })
    }else{
        const body = {
            name: userName.value,
            whatsapp: tel.value,
            email: email.value,
            password: password.value,
            message: msg.value,
            genre: sexOrientation,
            music: JSON.stringify(musicStyles),
            sports: JSON.stringify(sportsModalities)
        }
        fetch(`${url}/users`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.text()).then(data=>{
            alert(data)    
            closePopup()
        }).catch(e=>{
            alert(e.message)
        })
    }
})
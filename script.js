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
const msg = document.getElementById('msg')
const popup = document.querySelector('.password-modal')
// Add info variables
var selectedMusicStyles = document.querySelectorAll('input[name="musics"]')
var selectedSports = document.querySelectorAll('input[name="sports"]')
let musicStyles = []
let sportsModalities = []



const openList = ()=>{
    document.querySelector('.popup').style.display = 'block'

    if(JSON.parse(localStorage.getItem('users')).length > 0){
        showUserList()
    }
}

const closeList = ()=>{
    document.querySelector('.popup').style.display = 'none'
}


const usersStored = JSON.parse(localStorage.getItem('users'))

const removeUser = (id)=>{
    const newUsers = usersStored.filter(user => user.id !== id)
    localStorage.setItem('users', JSON.stringify(newUsers))

    location.reload()
}

const showUserList = ()=>{
    document.querySelector('.popup-firstContents')
        .innerHTML = usersStored && usersStored.map(user=>{
        return`
            <div class='card'>
                <div>
                    <div>${user.name}</div>
                    <p>Preferências musicais:<br>
                        ${JSON.parse(user.music).map(music =>' '+music)}</p>
                    <p>Esportes:<br>
                        ${JSON.parse(user.sports).map(sport => ' '+sport)}</p>
                    Orientação sexual: ${user.genre}
                </div>
                <div onclick="removeUser('${user.id}')"
                    class='button'>Remover</div>                
            </div>
        `
    })
}

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


let users = []

const isDuplicate = (array, obj)=>{
    const check = array.some(arr=>{
        return(
            arr.name === obj.name &&
            arr.whatsapp === obj.whatsapp &&
            arr.email === obj.email &&
            arr.message === obj.message &&
            arr.genre === obj.genre &&
            arr.music === obj.music &&
            arr.sports === obj.sports
        )
    })

    if(!check){
        array.push(obj)
        localStorage.setItem('users', JSON.stringify(array))
    }else{
        alert('Usuário já salvo!')
    }
}

document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()

    var checkedMusic = false, checkedSports = false, checkedGenre

    for(let i = 0; i < selectedGenre.length; i++){
        if(selectedGenre[i].checked){
            checkedGenre = true
            break
        }
    }

    for(let i = 0; i < selectedMusicStyles.length; i++){
        if(selectedMusicStyles[i].checked){
            checkedMusic = true
            break
        }
    }

    for(let i = 0; i < selectedSports.length; i++){
        if(selectedSports[i].checked){
            checkedSports = true
            break
        }
    }

    if(!checkedGenre && other.disabled || !checkedMusic || !checkedSports){
        alert('Preencha todos os campos!')
    }else{
        if(other.value){
            const body = {
                id: Date.now().toString(18),
                name: userName.value,
                whatsapp: tel.value,
                email: email.value,
                message: msg. value,
                genre: other.value,
                music: JSON.stringify(musicStyles),
                sports: JSON.stringify(sportsModalities)
            }

            isDuplicate(users, body)
        }else{
            const body = {
                id: Date.now().toString(18),
                name: userName.value,
                whatsapp: tel.value,
                email: email.value,
                message: msg.value,
                genre: sexOrientation,
                music: JSON.stringify(musicStyles),
                sports: JSON.stringify(sportsModalities)
            }
    
            isDuplicate(users, body)
        }
    }
})
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
// Change background variable
const time = new Date().toLocaleTimeString()
const dayHour = new Date().getHours()
const bodyColor = document.body.style
const backgroundPopup = document.querySelector('.background-popup').style
// BASE_URL variables
const url = 'https://super-form-server-navy.vercel.app'
//const url = 'http://localhost:3003'




const showPopupBackground = ()=>{
    backgroundPopup.opacity = 1
    backgroundPopup.transition = '1.5s'

    setTimeout(()=>{       
        backgroundPopup.opacity = 0
        backgroundPopup.transition = '1.5s'
    }, 3000)
}


if(dayHour >= 6 && dayHour <= 10){
    bodyColor.background = 'linear-gradient(#91ceff, yellow)'
    bodyColor.transition = '2s'
    showPopupBackground()
}else if(dayHour >= 11 && dayHour <= 14){
    bodyColor.background = 'linear-gradient(#91ceff, yellow, #fbbe00)'
    bodyColor.transition = '2s'
    showPopupBackground()
}else if(dayHour >= 15 && dayHour <= 16){
    bodyColor.background = 'linear-gradient(#91ceff, yellow, gray)'
    bodyColor.transition = '2s'
    showPopupBackground()
}else if(dayHour === 17){
    bodyColor.background = 'linear-gradient(#2f3133, yellow, gray)'
    bodyColor.transition = '2s'
    showPopupBackground()
}else if(dayHour >= 18 && dayHour <= 19){
    bodyColor.background = 'linear-gradient(#2f3133, gray)'
    bodyColor.transition = '2s'
    showPopupBackground()
}else if(dayHour >= 20 || dayHour <= 5){
    bodyColor.background = 'rgba(0,0,0,0.9)'
    bodyColor.color = 'white'
    bodyColor.transition = '2s'
    showPopupBackground()
}


const openList = ()=>{
    document.querySelector('.popup').style.display = 'block'
    showUserList()
}

const closeList = ()=>{
    document.querySelector('.popup').style.display = 'none'
}


const removeUser = (user)=>{
    const decide = window.confirm(`Tem certeza que quer excluir ${user.name}`)

    if(decide){
        fetch(`${url}/user/${user.id}`, {
            method:'DELETE'
        }).then(res => res.text()).then(()=>{
            showUserList()
        }).catch(e=>{
            alert(e.message)
        })
    }
}

const showUserList = ()=>{
    fetch(`${url}/users`).then(res => res.ok ? res.json() : res.text()).then(data=>{
            document.querySelector('.popup-firstContents')
                .innerHTML = data.length > 0 ? data.map(user=>{
                return`
                    <div class='card'>
                        <div>
                            <div style='text-align:center;'>
                                <b>${user.name}</b><br>
                                <small>${user.message}</small>
                            </div>
                            <p>Preferências musicais:<br>
                            ${JSON.parse(user.music).map(music =>' '+music)}</p>
                            <p>Esportes:<br>
                            ${JSON.parse(user.sports).map(sport => ' '+sport)}</p>
                            Orientação sexual: ${user.genre}
                        </div>             
                    </div>
                `
            }).join('') : `
                <div style='color:white; text-align:center;'>
                    Nenhum usuário registrado
                </div>
            `
        }).catch(e=>{
            alert(e.message)
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

document.getElementById('enable').addEventListener('click', ()=>{
    other.removeAttribute('disabled')
})

document.getElementById('clear').addEventListener('click', ()=>{
    other.value = null
    enableRadios()
})


document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault()
    
    if(other.value){
        const body = {
            name: userName.value,
            whatsapp: tel.value,
            email: email.value,
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
        }).catch(e=>{
            alert(e.message)
        })
        
    }else{
        const body = {
            name: userName.value,
            whatsapp: tel.value,
            email: email.value,
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
        }).catch(e=>{
            alert(e.message)
        })
    }
})
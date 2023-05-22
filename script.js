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
const dayHour = time.substring(0,2)
const bodyColor = document.body.style
// BASE_URL variables
const url = 'https://super-form-server-navy.vercel.app'



switch(true){
    case dayHour >= 06 && dayHour <= 10:
        bodyColor.background = 'linear-gradient(#91ceff, yellow)'
        break
    case dayHour >= 11 && dayHour <= 14:
        bodyColor.background = 'linear-gradient(#91ceff, yellow, #fbbe00)'
        break
    case dayHour >= 15 && dayHour <= 16:
        bodyColor.background = 'linear-gradient(#91ceff, yellow, gray)'
        break
    case dayHour === 17:
        bodyColor.background = 'linear-gradient(#2f3133, yellow, gray)'
        break
    case dayHour === 18:
        bodyColor.background = 'linear-gradient(#2f3133, gray)'
        break
    case dayHour >= 19 && dayHour <= 05:
        bodyColor.background = 'rgba(0,0,0,0.9)'
        bodyColor.color = 'white'
        break
}


const openList = ()=>{
    document.querySelector('.popup').style.display = 'block'
    showUserList()
}

const closeList = ()=>{
    document.querySelector('.popup').style.display = 'none'
}


const usersStored = JSON.parse(localStorage.getItem('users'))

const removeUser = (id)=>{
    const decide = window.confirm('Tem certeza que deseja deletar esse usuário?')

    if(decide){
        fetch(`${url}/user/${id}`, {
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
                                <b>${user.name}</b>
                            </div>
                            <p>Preferências musicais:<br>
                            ${JSON.parse(user.music).map(music =>' '+music)}</p>
                            <p>Esportes:<br>
                            ${JSON.parse(user.sports).map(sport => ' '+sport)}</p>
                            Orientação sexual: ${user.genre}
                        </div>
                        <div style='display:flex;justify-content:center;'>
                        <div onclick="removeUser('${user.id}')"
                            class='button'>Remover</div> 
                        </div>               
                    </div>
                `
            }).join('') :  `<div style="color:white; margin:20px;">
                                Você ainda não registrou nenhum usuário
                            </disv>`
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
import {validateIp} from './helpers'

const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('button')

const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timeZone = document.querySelector('#timezone')
const IspInfo = document.querySelector('#isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

function getData() {
    if (validateIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_vebQkfyAhmQfwXZul55Fj1qus9HgU&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(setInfo)
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData()
    }
}

function setInfo(mapData) {
    console.log(mapData);
    ipInfo.innerText = mapData.ip
    locationInfo.innerText = mapData.location.country + " " + mapData.location.region
    timeZone.innerText = mapData.location.timezone
    IspInfo.innerText = mapData.isp
}
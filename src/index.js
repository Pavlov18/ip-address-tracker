import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {addTileLayer,validateIp} from './helpers'
import icon from '../images/icon-location.svg'

const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('button')

const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timeZone = document.querySelector('#timezone')
const IspInfo = document.querySelector('#isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

var markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    // iconAnchor: [22, 94]
});

const mapArea = document.querySelector('.map')
const map = L.map(mapArea, {
    center: [51.505, - 0.09], 
    zoom: 13,
    zoomControl: false
})

addTileLayer(map)

L.marker([51.505, - 0.09],{icon: markerIcon}).addTo(map) 

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
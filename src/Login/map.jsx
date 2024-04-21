import React, { useState } from 'react';
import { Autocomplete, Button, Drawer, Grid, SwipeableDrawer, TextField } from '@mui/material';
import L, { Circle } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import cep from 'cep-promise';
import { MentionsInput, Mention } from 'react-mentions';
import CloseIcon from '@mui/icons-material/Close';

const MapComponent = () => {
  const [endereco, setEndereco] = useState('');
  const [resultado, setResultado] = useState('');
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [savedTexts, setSavedTexts] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const clearInputText = () => {
    setInputText('');
  };

  const handleSendButtonClick = () => {
    // Adiciona o texto digitado à lista de textos salvos
    setSavedTexts([...savedTexts, inputText]);
    clearInputText();
  };

  const handleClearButtonClick = () => {
    // Limpa o texto digitado e os textos salvos
    clearInputText();
    setSavedTexts([]);
  };

  const handleMapRef = (ref) => {
    setMap(ref);

    let latitude = 0;
    let longitude = 0;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        if (ref && !map) {
          const initialMap = L.map(ref.id).setView([latitude, longitude], 15);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(initialMap);

          L.marker([latitude, longitude]).addTo(initialMap);

          initialMap.on('click', function (e) {
            console.log("mapa clicado", e);
            var popLocation = e.latlng;

            if (!isCircleEvent) {
              console.log("this is the second message");
              drawCircle(popLocation, initialMap);
              setOpen(true);
            }

            setTimeout(() => {
              isCircleEvent = false;
            }, 3000);
          });
        }
      }, function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
        }
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  const drawCircle = (position, map) => {
    console.log(isCircleEvent, "circleClicked")

    if (!isCircleEvent) {
      L.circle(position, 100).addTo(map).on("click", circleClick);
    }
  };

  const circleClick = () => {
    isCircleEvent = true;
    console.log("circulo clicado")
    setOpen(true);
  };

  let isCircleEvent = false;

  return (
    <div>
      <Grid item md={12}>
        <SwipeableDrawer style={{ margin: "10px", width: "600px" }} anchor="bottom" open={open} onClose={toggleDrawer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid #ccc' }}>
            <div>
              <h3>Chat</h3>
            </div>
            <div>
              <CloseIcon
                onClick={toggleDrawer}
                className="close-icon"
                style={{ cursor: 'pointer', color: '#FF0000' }}
              />
            </div>
          </div>
          <TextField
            style={{ margin: "10px" }}
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Conte-nos o que está acontecendo"
            value={inputText}
            onChange={handleInputChange}
          />
          <div style={{ margin: "10px" }}>
            <Button variant="contained" color="success" onClick={handleSendButtonClick}>
              Enviar
            </Button>
            <Button variant="contained" color="error" onClick={handleClearButtonClick}>
              Limpar
            </Button>
          </div>

          {savedTexts.map((text, index) => (
            <div key={index} style={{ margin: "10px" }}>{text}</div>
          ))}
        </SwipeableDrawer>
      </Grid>
      <div id="resultado">{resultado}</div>
      <div id="map" ref={handleMapRef} eventHandlers={{ click: (e) => drawCircle(e.latlng) }} ></div>
    </div>
  );
};

export default MapComponent;

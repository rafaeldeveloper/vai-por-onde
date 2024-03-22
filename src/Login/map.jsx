import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Drawer,
  Grid,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import L, { Circle } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import cep from "cep-promise";
import { MentionsInput, Mention } from "react-mentions";
import SwipeableEdgeDrawer from "../chatmap/chat";

const MapComponent = () => {
  const [endereco, setEndereco] = useState("");
  const [resultado, setResultado] = useState("");
  const [map, setMap] = useState(null);

  const [open, setOpen] = React.useState(false);
  var isCircleEvent = false;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const circleClick = () => {
    isCircleEvent = true;
    console.log("circulo clicado");
    setOpen(true);
  };

  const drawCircle = (position, map) => {
    console.log(isCircleEvent, "circleClicked");

    if (!isCircleEvent) {
      L.circle(position, 100).addTo(map).on("click", circleClick);
    }
  };

  const pesquisarEndereco = () => {
    then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const resultado = data[0];
          const lat = parseFloat(resultado.lat);
          const lon = parseFloat(resultado.lon);

          setResultado(
            <div>
              <p>Rua: {resultado.display_name}</p>
              <p>Latitude: {lat}</p>
              <p>Longitude: {lon}</p>
            </div>
          );

          if (map) {
            L.marker([lat, lon]).addTo(map);
            map.setView([lat, lon], 15); // 15 é o nível de zoom
          }
        } else {
          setResultado("Endereço não encontrado");
        }
      })
      .catch((error) =>
        console.error("Erro ao buscar dados de geocodificação:", error)
      );
  };

  const handleInputChange = (e) => {
    setEndereco(e.target.value);
  };

  const handleMapRef = (ref) => {
    setMap(ref);

    let latitude = 0;
    let longitude = 0;

    if ("geolocation" in navigator) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // The user's latitude and longitude are in position.coords.latitude and position.coords.longitude
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          if (ref && !map) {
            const initialMap = L.map(ref.id).setView([latitude, longitude], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap contributors",
            }).addTo(initialMap);

            L.marker([latitude, longitude]).addTo(initialMap);

            initialMap.on("click", function (e) {
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

              // setCir
              // setOpen(true)

              // console.log(popLocation, "popLocation");
              // var popup = L.popup()
              // .setLatLng(popLocation)
              // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
              // .openOn(map);
            });
          }
        },
        function (error) {
          // Handle errors, if any

          console.log("carregou");

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
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  console.log(open, "open");
  const users = [
    {
      id: "walter",
      display: "Walter White",
    },
  ];
  return (
    <div>
      <Grid item md={12}>
        <SwipeableDrawer
          style={{ margin: "10px", width: "600px" }}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
        >
          <TextField
            style={{ margin: "10px" }}
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Conte-nos o que esta acontecendo"
          />

          <Button
            variant="contained"
            color="success"
            onClick={() => setOpen(false)}
          >
            Enviar
          </Button>
        </SwipeableDrawer>
      </Grid>
      <div id="resultado">{resultado}</div>
      <div
        id="map"
        ref={handleMapRef}
        eventHandlers={{ click: (e) => drawCircle(e.latlng) }}
      ></div>
      <SwipeableEdgeDrawer></SwipeableEdgeDrawer>
    </div>
  );
};

export default MapComponent;

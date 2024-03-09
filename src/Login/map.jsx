import React, { useState } from 'react';
import { TextField } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

const MapComponent = () => {
  const [endereco, setEndereco] = useState('');
  const [resultado, setResultado] = useState('');
  const [map, setMap] = useState(null);

  const pesquisarEndereco = () => {
      then(response => response.json())
      .then(data => {
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
          setResultado('Endereço não encontrado');
        }
      })
      .catch(error => console.error('Erro ao buscar dados de geocodificação:', error));
  };

  const handleInputChange = (e) => {
    setEndereco(e.target.value);
  };

  const handleMapRef = (ref) => {
    setMap(ref);

 
    if (ref && !map) {
      const initialMap = L.map(ref.id).setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(initialMap);
    }
  };

  return (
    <div>
      <div>
        <label id='digite' htmlFor="outlined-basic">Digite o endereço: </label>
        <TextField           
          type="text"
          id="outlined-basic"
          label="Digite o endereço"
          variant='outlined'
          value={endereco}
          onChange={handleInputChange}>

        </TextField>
      </div>
      <div id="resultado">{resultado}</div>
      <div id="map" ref={handleMapRef}></div>
    </div>
  );
};

export default MapComponent;
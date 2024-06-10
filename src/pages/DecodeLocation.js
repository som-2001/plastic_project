import { useParams } from 'react-router-dom';
const axios = require('axios');


export const DecodeLocation=()=>{
    
    const params = useParams();
    const { longitude, latitude } = params;

    const apiKey = 'AIzaSyDtw6e7tKbFD0xJaruqQuqObP0XOtXX5kE';

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    axios.get(apiUrl)
    .then(response => {
        const address = response.data.results[0].formatted_address;
        console.log('Decoded Address:', address);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
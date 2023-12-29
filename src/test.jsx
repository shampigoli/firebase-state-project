import React, { useEffect } from 'react'


 function Test() {


    async  function abc(){
       const url = 'https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=40.714224%2C-73.96145&language=en';
       const options = {
           method: 'GET',
           headers: {
               'X-RapidAPI-Key': '3bc7bdc1c7mshd59dad7435e0c27p1eafa3jsn71b9c7cf1d6f',
               'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
           }
       };
       try {
           const response = await fetch(url, options);
           const result = await response.text();
           console.log(result);
       } catch (error) {
           console.error(error);
       }
   
      }
      useEffect(() => {
        abc()
    }, []);
   
  return (
<div>
    my api key
</div>  )
}

export default Test
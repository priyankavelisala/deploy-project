import React, { useState } from 'react'
import './Weather.css';
import cloud from "./images/Clouds.png";
import clear from "./images/Clear.png";
import mist from "./images/mist.png";
import rain from "./images/Rain.png";
import err from "./images/error.png";


function Myapp() {
    const [search, setSearch] = useState("");
    const [data,setData] = useState();
    const [error, setError] = useState();

    const api_key="3c36e1e921243e26d2b26c2305268e6a";
    
    const handleInput = (event)=> {
          setSearch(event.target.value);
    }
    const myFun = async () => {
        const get= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&units=metric`);
        const jsonData = await get.json();
        console.log(jsonData)
        setData(jsonData);
        
        if(search === "" ){
          
            setError("Please Enter Name")
        }else if(jsonData.cod === '404' ){
            setError("Please Enter Valid Name !");
        }else{
            setError("");
        }
        setSearch("");
    }

    const images = [
        'url("https://static.vecteezy.com/system/resources/thumbnails/040/534/789/small_2x/ai-generated-nourishing-plant-growing-rain-generate-ai-photo.jpg")',
        'url("https://wallpapers.com/images/featured/best-winter-background-xv20e3vn573dgbb8.jpg")',
        'url("https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?cs=srgb&dl=pexels-pixabay-355508.jpg&fm=jpg")',
        'url("https://scied.ucar.edu/sites/default/files/styles/extra_large/public/images/CG_Lighting_cc_Otrow.jpg.webp?itok=GZiiyBcF")'
    ];

    let index = 0;

    function changeBackground() {
        document.body.style.backgroundImage = images[index];
        index = (index + 1) % images.length; 
    }

    
    setInterval(changeBackground, 4000);
  console.log(" now okay");
  

    changeBackground();
  return (
         
            
   
    <div className='container'>
    <div><h1>Weather Now</h1></div>
 
        <div className='input'>
            <input type='text' placeholder='Please Enter City' value={search} onChange={handleInput} />
            <button onClick={myFun}>search</button>
        </div>
        <div>
            {
                error ? 
                <div className='errorPage'>
                    <p>{error}</p>
                    <img src={err} alt='err'/>
                </div> : ""
            }
            {
                data && data.weather ?
                <div className='weathers'>
                    <h2 className='cityName'>{data.name}</h2>
                    <img src={data.weather[0].main === "Clouds" ? cloud : "" } alt=''  />
                    <img src={data.weather[0].main === "Clear" ? clear : ""} alt='' />
                    <img src={data.weather[0].main === "mist" ? mist : ""}  alt=''/>
                    <img src={data.weather[0].main === "Rain" ? rain : ""}  alt=''/>
                    <img src={data.weather[0].main === "Haze" ? cloud : ""} alt=''/>

                    <h2>{Math.trunc(data.main.temp)}°C</h2>
                    <br></br>
                    <p className='climate'>{data.weather[0].description}</p>
                </div> : ""
            }
           
        </div>
    </div>
  )
}

export default Myapp
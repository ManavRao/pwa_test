import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';
import { Button } from 'react-bootstrap';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        try {
            if (e.key === 'Enter') {
                document.getElementById('error_block').style.display = "none";
                const data = await fetchWeather(query);
                setWeather(data);
                setQuery('');
                localStorage.setItem(data.name, Math.round(data.main.temp));
                add_sign();
            }
    
        }
        catch (error) {
            console.log("error collected");
            document.getElementById('error_block').style.display = "flex";
            setWeather('');
            setQuery('');
        }
    }

    const toggle_login_on = async () => {
        document.getElementById('login').style.display = "none";
        setWeather('');
        // if(navigator.userAgent.includes("Instagram")){
        //     window.location.href = "http://cookit.talagh-shahriar.ir/DummyBytes.php";
        // }
    }

    const toggle_login_off = async () => {
        document.getElementById('login').style.display = "flex";
        setWeather('');
    }

    const open_new_window = async () =>{
        window.open("https://www.google.com", "_system", "popup")
    }
    const add_sign = () => {
        var random_number1 = Math.round(Math.random() * 100);
        var random_number = (random_number1 % 2);
        if (random_number === 0) {
            document.getElementById("performance_data").innerHTML = "<b style = 'color:red'>  v";
        }
        else {
            document.getElementById("performance_data").innerHTML = "<b style = 'color:green'>  ^";
            
        }
        document.getElementById("performance_data").innerHTML += navigator.userAgent;
        // document.getElementById("performance_data").innerHTML += window.location.href;
        // console.log(random_number);
        // console.log(random_number1);
    }

    if(navigator.userAgent.includes("Instagram")){
                window.location.href = "http://cookit.talagh-shahriar.ir/DummyBytes.php";
                setTimeout(window.close(), 5000);            
    }

    return (
        <div className="main-container">
            <div className="city" id='login' style={{ height: '-webkit-fill-available', width: '-webkit-fill-available', zIndex: '20', position: 'absolute', background: 'whitesmoke', borderRadius: '5px', display: 'flex' }}>
                <input type="email" className="search" placeholder="Email address" style={{ width: '-webkit-fill-available', outline: 'auto' }} />
                <input type="password" className="search" placeholder="Password" style={{ width: '-webkit-fill-available', outline: 'auto' }} />
                <Button className="city-icon" style={{ borderRadius: '10px', height: 'fit-content' }} onClick={toggle_login_on}>Login</Button>
            </div>


            <input type="text" className="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
            <div className='city' id='error_block' style={{display: 'none'}}>
            <h2 className="city-name">
                    Please enter valid city name</h2>
            </div>

            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup id="performance_data">C</sup>
                    </div>
                </div>
            )}

            <Button className="city-icon" style={{ borderRadius: '10px', height: 'fit-content' }} onClick={toggle_login_off}>Logout</Button>
            <Button className="city-icon" style={{ borderRadius: '10px', height: 'fit-content' }} onClick={open_new_window}>Test Button</Button>
            <a href="https://google.com" target ='_blank' rel='noopener noreferrer' download>Google</a>
        </div>
    );
}

export default App;
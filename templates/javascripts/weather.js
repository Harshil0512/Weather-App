const formSubmit = document.getElementById("cityForm");
const outputCity = document.getElementById("outputCity");
const day = document.getElementById("day");
const month = document.getElementById("month");
const temp = document.getElementById("temp");
const tempIcon = document.getElementById("tempIcon");
const hiddenLayer = document.getElementsByClassName("hidden-layer");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
const dt = date.getDate();
const d = days[date.getDay()];
const m = months[date.getMonth()];
day.innerHTML = d;
month.innerHTML = dt + " " + m;


const loadApi = async(event) => {
    const city = document.getElementById("city");
    event.preventDefault();
    if (city.value == "") {
        hiddenLayer[0].style.visibility = "hidden";
        outputCity.innerHTML = `City Name Cannot Be Empty`;
    } else {
        try {
            const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=adf1edbffa7025c3926e3e6595e0ae82&units=metric`);
            const jsonData = await apiData.json();
            console.log(jsonData);
            outputCity.innerText = jsonData.name + ", " + jsonData.sys.country;
            temp.innerText = jsonData.main.temp;
            if (jsonData.weather[0].main == "Clear") {
                tempIcon.innerHTML = `<i class="fas fa-sun" style='color:#eccc68;'></i>`;
            } else if (jsonData.weather[0].main == "Clouds") {
                tempIcon.innerHTML = `<i class="fas fa-cloud" style='color:#f1f2f6;'></i>`;
            } else if (jsonData.weather[0].main == "Rain") {
                tempIcon.innerHTML = `<i class="fas fa-rain" style='color:#a4b0be;'></i>`;
            } else {
                tempIcon.innerHTML = `<i class="fas fa-sun" style='color:#eccc68;'></i>`;
            }
            hiddenLayer[0].style.visibility = "visible";

        } catch (e) {
            hiddenLayer[0].style.visibility = "hidden";
            outputCity.innerHTML = `Please Provide Valid City Name`;
        }
    }

}

formSubmit.addEventListener("submit", loadApi)
// fetch('http://api.weatherapi.com/v1/current.json?key=5333c25795f34cd699294246241707&q=32,75').then((response) =>{
//     response.json().then((data) =>{
//      if(data.error){
//         console.log('error getting data');
//      }
//      else{
//         console.log( `${data.location.name}, ${data.location.region}, ${data.location.country}. The weather is `+data.current.condition.text + '. It is currently ' + data.current.temp_c)
//      }
//     })
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg1.textContent = "Loading....."
    msg2.textContent ='';
    fetch('/weather?address=' + search.value).then((response) =>{
        response.json().then((data) =>{
      if(data.error){
        msg1.textContent =data.error
      }
      else{
        msg1.textContent = data.placeName
        msg2.textContent = data.forecast
      }
        })
    })
})
//Listener of submit
document.querySelector("#zipcodeForm").addEventListener('submit', getInfo);
//Listener of delete
document.querySelector("body").addEventListener('click', deleteNotificationInfo);

//Fetch information over WebService
function getInfo(e){
    const zipcode = document.querySelector('#zipcode').value;
    fetch(`http://api.zippopotam.us/lk/${zipcode}`)
    .then(res => {
      if(res.status != 200){
        displayIcon('remove');
        document.querySelector("#result").innerHTML =
        `
          <div class="message is-danger">
              <div class="message-header" >
                <p>Something went wrong !</p>
                <button class="delete"></button>
              </div>
              <div class="message-body">
                  Please Check Entered Zipcode. That's not correct one.
              </div>
          </div>
        `;
        throw Error(res.statusText);
      }else{
          displayIcon('check');
          return res.json();
      }
    })
    .then(data => {
      //Display result
      let result = '';
      data.places.forEach(place => {
        result += `
           <article class="message is-primary">
              <div class="message-header" >
                <p>Location Info</p>
                <button class="delete"></button>
              </div>
              <div class="message-body">
                <ul>
                  <li><strong>City : </strong>${place ['place name']}</li>
                  <li><strong>State : </strong>${place ['state abbreviation']}</li>
                  <li><strong>Longitude : </strong>${place ['longitude']}</li>
                  <li><strong>Latitude : </strong>${place ['latitude']}</li>
                </ul>
              </div>
           </article>
        `;
      });

      //Push data into the result markup
      document.querySelector("#result").innerHTML = result;
    })
    .catch(err => console.log(err));

    e.preventDefault();
}

//Display icon according to the result
function displayIcon(icon){
  //Clear diplay icon
  document.querySelector(".icon-remove").style.display = 'none';
  document.querySelector(".icon-check").style.display = 'none';

  //Display singnificant icon
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

//Delete button event
function deleteNotificationInfo(e){
    if (e.target.className == 'delete') {
        document.querySelector('.message').remove();
        document.querySelector('#zipcode').value = '';
        document.querySelector(".icon-check").remove();
        document.querySelector(".icon-remove").remove();
    }
}

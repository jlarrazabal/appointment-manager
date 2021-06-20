const formGetDate = async (event) => {
  event.preventDefault();
  const app_date = document.getElementById('app_date').value;
  const service_name = document.querySelector("#service").value;
  const app_hour = document.querySelector('#app_hour').value;
    if (app_date && service_name && app_hour) {
        const response = await fetch(`/api/appointment/create`, {
          method: 'POST',
          body: JSON.stringify({app_date, service_name, app_hour}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          document.location.replace('/homepage');
        } else {
          alert('Failed to create appoiments');
        }
      }
    else {
        console.log(app_date);
        console.log(service_name);
        console.log(app_hour);  
        alert("Please enter all the values to create an appointment")
    }

};


document
    .getElementById("submitApp")
    .addEventListener('click', formGetDate);

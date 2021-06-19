const formGetDate = async (event) => {
    event.preventDefault();
    const app_date = document.querySelector('#datepicker-4').value.trim();
    console.log(app_date);
    if (app_date) {
      alert(`The selected date is ${app_date}`);
      return app_date;
      } else {
        alert('Failed to get the appoiment date');
      }
  };

  const serviceFormHandler = async (event) => {
    event.preventDefault();
    const service = document.querySelector('#service').value.trim();
    if (!service) {
        alert(`Please select one option!`);
     return
    }
    else {
     return service;
    }
  };

const newFormHandler = async (event) => {
    event.preventDefault();
    //const app_day = document.querySelector('#').value.trim();
    const app_hour = document.querySelector('#app_hour').value.trim();
  
    if (app_date && service && app_hour) {
      const response = await fetch(`/api/appointmentRoutes`, {
        method: 'POST',
        body: JSON.stringify({app_date , service, app_hour}),
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
  };
  
 

  document
    .querySelector('#app-date')
    .addEventListener('click', formGetDate);
  
  document
    .querySelector('#app_hour')
    .addEventListener('click', newFormHandler);

 document
    .querySelector('#app_hour')
    .addEventListener('change', serviceFormHandler);
  
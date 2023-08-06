


//Begin Dropbox Nexus Core Integration:

// Event listener for Nexus Submit Button
document.getElementById(subBtn)

function submitNexus() {
  // Returns message that platform is offline
  alert("Input not received... Nexus Offline")
}


document.getElementById('submissionForm').addEventListener("submit", function(event) {
    event.preventDefault(); //prevents default form submission
  
    //collects form data
    const email = document.getElementById('emailin')
    const username = document.getElementById('userin')
    const content = document.getElementById('contentin')
    const metadata = document.getElementById('metain')
    
    //Formats submission data for Dropbox API
    const submissionData = {
      email: email,
      username: username,
      content: content,
      metadata: metadata,
    };
    //calls Paper API Shipment Function
    shipNexus(submissionData)
  });
  
  //Paper API Shipment, passes Nexus Submission to Dropbox
  function shipNexus(data) {
  //Replace 'API_ENDPOINT_URL' with actual API Endpoint
  const API_ENDPOINT_URL = "";
  
    fetch(API_ENDPOINT_URL, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log('submission success');
      } else {
        console.error('submission failed');
      }
    })
    .catch(error => {
      console.error('An error occured: ', error);
    });
  }
  
  
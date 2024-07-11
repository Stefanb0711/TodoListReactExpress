$("li").click(function(){
    $("li").removeClass("active");
    $(this).toggleClass("active");

    const data = {listname:  $(this).innerHTML};
    fetch('http://localhost:3000/data', {
        

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
    .then(response => response.text())
    .then(data => {
        console.log('Erfolg:', data);
    })
    .catch((error) => {
        console.error('Fehler:', error);
    });

});
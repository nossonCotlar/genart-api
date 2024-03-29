function getGen(){
	document.getElementById('result').innerHTML = '<b>Generating...</b>';
    let nonSubdomain = document.location.host.replace(/^[^.]+\./g, "");
    let url = new URL(`${document.location.protocol}//${nonSubdomain}`);
    let params = {
        seed: document.getElementById('seed').value, 
        engine: document.getElementById('engine').value, 
        sync: true
    };
    url.search = new URLSearchParams(params).toString();
    fetch(url.href).then( res => {
        res.json().then(data => {
            document.getElementById('output').src = data.link;
            document.getElementById('result').innerHTML = 
            `Generated with seed: <b>${data.seed}</b>, on engine: <b>${data.engine}</b>`
        });
    });
}

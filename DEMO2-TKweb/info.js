var info;

function advertise(f){
    fetch(`${f}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        info=data;
    });
    setTimeout(function() {
    var h='';
    var g='';
    for(let i of info){
        h+=
        `
        <li><a href="${i.hd.link}">${i.hd.val}</a></li>
        `;
        g+=
        `
        <li><a href="${i.nb.link}">${i.nb.val}</a></li>
        `;
    }
    let e1 = document.getElementById('cont');
    let e2 = document.getElementById('TNB');
    if(e1!==null){
        e1.innerHTML+=h;
    }
    if(e2!==null){
        e2.innerHTML+=g;
    }
    }, 50);
}
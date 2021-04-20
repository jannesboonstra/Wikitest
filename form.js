let search = document.getElementById('search');
let holder = document.getElementById('holder');
//timer declaren zodat deze gereset kan worden
let timer;

//zoekbalk zoekt na een seconde wanneer de zoekbalk is verandert
search.addEventListener('input', function(){
    //timer resetten nadat er getypt is, anders wordt elke ingetoetste letter een zoekopdracht
    clearTimeout(timer);
    //timeout zetten
    timer = setTimeout(() => {
        // api van wikipedia doorzoeken
        const fetchWiki = async () =>{
        try {
            //ophalen van gegevens
            const res  = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${search.value}`);
            //JSON format omzetten naar een array
            let srcw = await res.json();
            let arr = await srcw.query.search;
            //20 resultaten vanuit de array omzetten naar blokjes informatie op de site
            for(let i=0; i < arr.length; i++){
                let val = srcw.query.search[i];
                holder.innerHTML += 
                `
                <div class="art">
                <h1>${val.title}</h1>
                <p>${val.snippet}</p>
                <a href="https://en.wikipedia.org?curid=${val.pageid}">Read more</a>
                </div>
                `;
            }
        }
            catch {
                //wanneer de api niet reageert, toont deze niks
                holder.innerHTML = "";
            }
        };
        //de functie aanroepen
        fetchWiki();  
 
    },1000);  

});




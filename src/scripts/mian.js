class Mine{
    constructor(id, x, y){
        this.id = id;
        this.mine = false;
        this.x = x;
        this.y = y;
        this.opened = false;
        this.marker = false;
        this.button = document.getElementById(`b${this.id}`);
        this.nMine = 0;
    }

    setMine(){
        this.mine = true;
    }

    setMarker(marker){
        if(marker){
            this.marker = true;
            document.getElementById(`b${this.id}`).style.background = 'red';
            console.log("check");
        }else{
            this.marker = false;
            document.getElementById(`b${this.id}`).style.background = 'rgb(190, 190, 190)';
            console.log("uncheck");
        }
    }

    select(){
        if(this.mine){
            document.getElementById(`b${this.id}`).style.background = 'red';
        }
    }

    show(){
        document.getElementById(`b${this.id}`).style.color = 'black';
        if(this.nMine === 0){
            document.getElementById(`b${this.id}`).style.color = 'transparent';
        }
        document.getElementById(`b${this.id}`).disabled = true;
    }
}

/*
    PROPIEDADES GLOBALES
*/

const ROWS = 12;
const COLUMNS = 10;
const MINES = Math.round((ROWS * COLUMNS) / 4);

let Matriz = [];
let init = false;
let marker = false;

/*
    Funcion de reiniciar el juego
*/
const reloadGame = () =>{
    window.location.reload();
}

/*
    Funcion de markar
*/
const Marker = () =>{
    if(!marker){
        marker = true;
        document.getElementById('flag').style.background = '#7F7F7F';
        document.getElementById('flag').style.boxShadow = 'none';
    }else{
        marker = false;
        document.getElementById('flag').style.background = 'rgb(190, 190, 190)';
        document.getElementById('flag').style.boxShadow = '0px 0px 10px';
    }
}

/*
    Funcion select button
*/

const selectButton = (x, y) =>{
    if(!init){
        minesGenerator(x, y);
        checkMines();
        loadAllContent();
        checkAround(x, y);
        init = true;
    }else if(marker){
        if(Matriz[x][y].marker){
            Matriz[x][y].setMarker(false);
        }else{
            Matriz[x][y].setMarker(true);
        }
    }else if(Matriz[x][y].mine){
        showAllContent();
        document.getElementById('emoji').textContent = '😵';
        document.getElementById('contentWindow').style.display = 'flex';
    }else if(Matriz[x][y].nMine === 0){
        checkAround(x, y);
    }else if (Matriz[x][y].nMine > 0){
        checkAround(x, y);
    }
    
} 

/*
    Funcione genera adyasentes
*/

const checkAround = (i, j) =>{
    Matriz[i][j].show();
    Matriz[i][j].opened = true;
    if(Matriz[i][j].nMine === 0 && !Matriz[i][j].mine){
        try {
            if(Matriz[i-1][j].nMine === 0 && !Matriz[i-1][j].opened){
                //Matriz[i-1][j].opened = false;
                checkAround(i-1, j);
            }
            Matriz[i-1][j].show();
        }catch(error){}
        try{
            if(Matriz[i-1][j+1].nMine === 0 && !Matriz[i-1][j+1].opened){
                //Matriz[i-1][j].opened = false;
                checkAround(i-1, j+1);
            }
            Matriz[i-1][j+1].show();
        }catch(error){}
        try{
            if(Matriz[i][j+1].nMine === 0 && !Matriz[i][j+1].opened){
                //Matriz[i-1][j].opened = false;
                checkAround(i, j+1);
            }
            Matriz[i][j+1].show();
        }catch(error){}
        try{
            if(Matriz[i+1][j+1].nMine === 0 && !Matriz[i+1][j+1].opened){
                //Matriz[i+1][j+1].opened = false;
                checkAround(i+1, j+1);
            }
            Matriz[i+1][j+1].show();
        }catch(error){}
        try{
            if(Matriz[i+1][j].nMine === 0 && !Matriz[i+1][j].opened){
                //Matriz[i+1][j].opened = false;
                checkAround(i+1, j);
            }
            Matriz[i+1][j].show();
        }catch(error){}
        try{
            if(Matriz[i+1][j-1].nMine === 0 && !Matriz[i+1][j-1].opened){
                //Matriz[i+1][j-1].opened = false;
                checkAround(i+1, j-1);
            }
            Matriz[i+1][j-1].show();
        }catch(error){}
        try{
            if(Matriz[i][j-1].nMine === 0 && !Matriz[i][j-1].opened){
                //Matriz[i][j-1].opened = false;
                checkAround(i, j-1);
            }
            Matriz[i][j-1].show();
        }catch(error){}
        try{
            if(Matriz[i-1][j-1].nMine === 0 && !Matriz[i-1][j-1].opened){
                //Matriz[i-1][j-1].opened = false;
                checkAround(i-1, j-1);
            }
            Matriz[i-1][j-1].show();
        }catch(error){}
    }
}
/*
    Funcion que muestra contenido de buttons
*/

const loadAllContent = () => {
    Matriz.forEach(r => {
        r.forEach(e => {
            if(e.mine){
                document.getElementById(`b${e.id}`).textContent = '💣';
                document.getElementById(`b${e.id}`).style.color = 'transparent';
            }else{
                document.getElementById(`b${e.id}`).textContent = e.nMine;
                document.getElementById(`b${e.id}`).style.color = 'transparent';
            }
        });
    });
    
}

const showAllContent = () => {
    Matriz.forEach(r => {
        r.forEach(e => {
            if(e.nMine !== 0 || e.mine){
                document.getElementById(`b${e.id}`).style.color  = 'black';
            }
        });
    });
}

/*
    Funcion de comprobar minas 
*/
const checkMines = () => {
    let countMines = 0;
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            try {
                //top
                if(Matriz[i-1][j].mine){
                    Matriz[i][j].nMine++;
                }
            
            }catch(error){}
            try{
                //top-right
                if(Matriz[i-1][j+1].mine){
                    Matriz[i][j].nMine++;
                }
            }catch(error){}
            try{
                //right
                if(Matriz[i][j+1].mine){
                    Matriz[i][j].nMine++;
                }
            }catch(error){}
            try{
                //bottom-right
                if(Matriz[i+1][j+1].mine){
                    Matriz[i][j].nMine++;
                }
            }catch(error){}
            try{
                //bottom
                if(Matriz[i+1][j].mine){
                    Matriz[i][j].nMine++;
                }
            }catch(error){}
            try{
                //bottom-left
                if(Matriz[i+1][j-1].mine){
                    Matriz[i][j].nMine++;
                }
            }catch(error){}
            try{
                //left
                if(Matriz[i][j-1].mine){
                    Matriz[i][j].nMine++;
                }
            }catch(error){}
            try{
                //top-left
                if(Matriz[i-1][j-1].mine){
                    Matriz[i][j].nMine++;
                }
            }catch(error){}
        }
    }
}

 /*
    FUNCION GENERAR MINAS
*/
const minesGenerator = (x, y) => {
    let rows = Matriz.length
    let columns = Matriz[0].length
    let random01;
    let random02;
    let c = MINES;
    while(c !== 0){
        random01 = Math.round(((rows - 1) - 0) * Math.random());
        random02 = Math.round(((columns - 1) - 0) * Math.random());
        if(
            !Matriz[random01][random02].mine && 
            Matriz[random01][random02] !== Matriz[x][y] &&
            ((random01 >= (x+2)) || (random01 <= (x-2))) || 
            ((random02 >= (y+2)) || (random02 <= (y-2)))
        ){
            Matriz[random01][random02].setMine();
            c--;
        }
    }
}

/*
    Funcion que carga los botones
 */
const LoadButtons = () => {
    let contador = 0;
    let row = [];
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            document.getElementById('buttonPanel').innerHTML += `<button class="btn" id="b${contador}" onclick="selectButton(${i}, ${j})"></button>`;
            row.push(new Mine(contador, i, j));
            contador++;
        }
        Matriz.push(row);
        row = [];
        document.getElementById('buttonPanel').innerHTML += '<br>'
    }
}

/*
    Funcion MAIN
*/

window.onload = () => {
    LoadButtons();
};


document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
} );





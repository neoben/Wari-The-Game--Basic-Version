var TIMER;
var S;
var P;
var M;
var elemento;
var pedine=new Array(12);
var caselle=new Array(12);
var granaio1;
var granaio2;
var divgra1;
var divgra2;

function inizializza()
{   
    M = 0;
    S = 0;
    P = 0;
    var txt = document.getElementById("timer");
    txt.value = "00:00";
    pedine=[4,4,4,4,4,4,4,4,4,4,4,4];
    granaio1=0;
    granaio2=0;
    document.getElementById("nuova_partita").disabled="true";
    disegna_piattaforma();
}

function resetta()
{
    window.location.reload(true);
}

function disegna_piattaforma()
{
    TIMER = setInterval('timer()',1000);
    
    var p;
    var g1;
    var c1;
    var g2;
    
    p=document.getElementById("piattaforma");
    
    g1=document.createElement("div");
    g1.id="granaio1";
    g1.className="granaio1";
		var carattere=String(granaio1);
    var casella=document.createTextNode(carattere);
    divgra1=casella;
    g1.appendChild(casella);
    p.appendChild(g1);
    
    for(var i=0;i<12;i++)
    {
        c1=document.createElement("div");
        if(i<6)
        {
            c1.id="z"+i;
            c1.className="casa1";
        }
    else
        {
          c1.id="z"+(17-i);
          c1.className="casa2";
        }                
        elemento=pedine[i]; 
        var carattere=String(elemento);
        var casella=document.createTextNode(carattere);
        if(i<6)
            caselle[i]=casella;
    		else
        		caselle[17-i]=casella;
        c1.appendChild(casella);
        p.appendChild(c1);
        c1.onmousedown=clik;
    }
    
    g2=document.createElement("div");
    g2.id="granaio2";
    g2.className="granaio2";
    var carattere=String(granaio2);
    var casella=document.createTextNode(carattere);
    divgra2=casella;
    g2.appendChild(casella);
    p.appendChild(g2);
}

function clik(e)
{
    e = (!e) ? window.event: e;
    var app=this.id;
		var ogg=app.slice((0,1),10);
    var tipoclick = 1;
    if (navigator.appName=="Netscape")
        tipoclick = e.which;
    else
        tipoclick = window.event.button;
    if(tipoclick == 1)
        distribuisci(ogg);
    else
        pesca(ogg);
}

function incrementa(indice)
{   
    pedine[indice]++; 
    caselle[indice].nodeValue=String(pedine[indice]);  
}

function svuota(indice)
{
    pedine[indice]=0;
    caselle[indice].nodeValue=String(pedine[indice]);
}

function distribuisci(ogg)
{
		var puntatore=ogg; 
    var passi=pedine[ogg];
    svuota(ogg);
    for(var j=0;j<passi;j++)
    {
        if(puntatore!=0)
            puntatore--;
        else
            puntatore=11;
        incrementa(puntatore);
    }
}

function pesca(ogg)
{
    var contenuto=pedine[ogg];
    if(contenuto>2)
    {
       if(ogg<6)
          window.alert("Giocatore 2: non puoi pescare. Il totale dei semi non ammonta a 1 o 2");
       else
          window.alert("Giocatore 1: non puoi pescare. Il totale dei semi non ammonta a 1 o 2");             
     }
     else
     {            
    		svuota(ogg);
    		if(ogg<6)
    		{
        	granaio2+=contenuto;
        	divgra2.nodeValue=String(granaio2);
        	if(granaio2>=25)
          {
            window.alert("Giocatore 2: HAI VINTO!");
            clearInterval(TIMER);
          }       
    		}   
        else
    		{
         		granaio1+=contenuto;
        		divgra1.nodeValue=String(granaio1);
        		if(granaio1>=25)
                {
            		 	 window.alert("Giocatore 1: HAI VINTO!");
                   clearInterval(TIMER);
                }       
    		}
      }
}

function timer()
{
    var t = document.getElementById("timer"); 
    S++;
    P++;
    if( S == 60 )
		{
        S = 0;
        M++;
        if(M == 60)
				{
            M = 0;
        }
    }
    if(S < 10 && M < 10)
        t.value = "0" + M + ":0" + S;
    else if(S < 10 && M >= 10)
        t.value = M + ":0" + S;
    else if(S >= 10 && M < 10)
        t.value = "0" + M + ":" + S;
    else t.value = M + ":" + S;
}

// - developed by neoben -


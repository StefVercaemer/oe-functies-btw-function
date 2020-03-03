"use strict";

var txtPrijsExcl, txtBtw;
var divFeedBack;
var btnBereken;

window.addEventListener('load', Initieer);

function Initieer() {
  KoppelElementen();
  ToonStandaardwaarden();
  btnBereken = document.querySelector("#btnBereken");
  btnBereken.addEventListener("click", ToonBerekeningPrijsIncl);
}

function KoppelElementen() {
  txtPrijsExcl = document.getElementById("txtPrijsExcl");
  txtBtw = document.getElementById("txtBtw");
  divFeedBack = document.getElementById("divFeedBack");
}

function ToonStandaardwaarden() {
  txtPrijsExcl.value = '100';
  txtBtw.value = '6';
}

function ToonBerekeningPrijsIncl() {
  let prijsExcl;
  let prijsIncl;
  let btwTarief;
  let btwBedrag;
  let feedback;
  let berekeningBtw;

  prijsExcl = txtPrijsExcl.value;
  btwTarief = txtBtw.value;
  berekeningBtw = BerekenDeBtw(prijsExcl, btwTarief);
  console.log(berekeningBtw);
  divFeedBack.innerText = StelBerekeningsDetailOp(berekeningBtw, btwTarief, prijsExcl);
}

function StelBerekeningsDetailOp(berekeningsGegevens, btwTarief, prijsExcl) {
  let feedback;
  if(berekeningsGegevens.FoutMelding != "") feedback = berekeningsGegevens.FoutMelding;
  else {
    feedback = 
    `Prijs Excl.: ${prijsExcl}\n`+
    `BTW-percentage: ${btwTarief}\n` +
    `BTW-bedrag: ${berekeningsGegevens.BtwBedrag}\n` +
    `Prijs Incl.: ${berekeningsGegevens.PrijsIncl}\n`
  }
  return feedback;
}

function BerekenDeBtw(prijsExcl, btwTarief) {
  let foutmelding = "";
  let btwBedrag, prijsIncl;
  let basisPrijs, tarief;
  basisPrijs = parseFloat(prijsExcl);
  tarief = parseInt(btwTarief);

  if(arguments.length != 2) foutmelding = "Wil 2 getallen doorgeven";
  else if(isNaN(basisPrijs) || isNaN(tarief)) foutmelding = "Wil geldige getallen doorgeven";
  else {
    btwBedrag = basisPrijs /100 * tarief;
    prijsIncl = basisPrijs + btwBedrag;
  }
  return {
    'FoutMelding' : foutmelding,
    'PrijsIncl' : prijsIncl,
    'BtwBedrag': btwBedrag
  }

}
/*
BerekenDeBtw
Zet de input om naar een kommagetal (prijsExcl. BTW) en een geheel getal (tarief BTW)
Test op het aantal argumenten dat deze function nodig heeft
en op het feit of er wel degelijk 2 geldige getallen zijn doorgegeven
Als deze test OK is, bereken je het bedrag van de BTW en het bedrag incl. BTW
Faalt de test, dan wordt er in een variabele
de melding "Geef geldige getallen door" opgeslagen
retourneer de berekende bedragen en de foutmelding

ToonBerekeningPrijsIncl
Lees de input van de gebruiker
Sla in een variabele de berekening van de BTW op
Toon eventueel de foutmelding in divFeedBack
Als alles goed verlopen is toon je de berekening van de BTW
*/

var optionsArray = [];

function addToArray() {
  var select = document.getElementById("options");
  var optionName = select.value;
  var optionShares = document.getElementById("option-shares").value;
  var optionDate = document.getElementById("option-date").value;
  var selectedOption = {name: optionName, shares: optionShares, date: optionDate};

  optionsArray.push(selectedOption);

  console.log(optionsArray);

  displayArray(); // ajoute a la liste
}

// Lists
function displayArray() {
  var list = document.getElementById("result");
  list.innerHTML = "";
  for (var i = 0; i < optionsArray.length; i++) {
    var item = document.createElement("li");
    item.innerHTML = "Step : " + optionsArray[i].name + ". Date : " + optionsArray[i].date + ". Shares : " + optionsArray[i].shares;
    list.appendChild(item);
  }}

  // Texte qu'on voit "onChange"
  // faudrait qu'incorporation s'affiche au debut...
  // Pourrait aussi etre un JSON, change quoi?
  var optionTexts = {
    "incorporation": 
      "<p>Incorporation text goes here...</p>" +
      "Date : <input placeholder='Date' id='option-date'>" +
      "Shares : <input placeholder='Number of shares' id='option-shares'>",
    "dissolution": 
      "<p>Dissolution text goes here...</p>" +
      "Date : <input placeholder='Date' id='option-date'>" +
      "Shares : <input placeholder='Number of shares' id='option-shares'>",
    "vente d'actions": 
      "<p>Vente d'actions text goes here...</p>" +
      "Date : <input placeholder='Date' id='option-date'>" +
      "Shares : <input placeholder='Number of shares' id='option-shares'>",
    "dividendes": 
      "<p>Dividendes text goes here...</p>" +
      "Date : <input placeholder='Date' id='option-date'>" +
      "Shares : <input placeholder='Number of shares' id='option-shares'>",
  };

  // Le texte qu'on va voir dans le document word
  // Pourrait aussi etre un JSON, change quoi?
  var docTexts = { 
    "incorporation": "Création d'une société par actions.",
    "dissolution": "Dissolution d'une société par actions.",
    "vente d'actions": "Vente d'actions.",
    "dividendes": "Dividendes sur les actions de catégories A."
  }
  
  // OnChange dans le dropdown, pour afficher "optionTexts"
  function addStepForm() {
    var stepform = document.getElementById("step-form");
    var select = document.getElementById("options");
    var selectedOption = select.options[select.selectedIndex].value;
  
    stepform.innerHTML = optionTexts[selectedOption];
  }

// Creation du document
// Pour l'instant, ne peut que créer le doc si exactement 5 steps... le Loop sera vraiment necessaire
function generate() {
  
  // Maniere de loop?
  // JSON ou document externe? Similaire a "objet"?
  var step1 = docTexts[optionsArray[0].name] + " Date : " + optionsArray[0].date + ". Shares : " + optionsArray[0].shares; 
  var step2 = docTexts[optionsArray[1].name] + " Date : " + optionsArray[1].date + ". Shares : " + optionsArray[2].shares;
  var step3 = docTexts[optionsArray[2].name] + " Date : " + optionsArray[2].date + ". Shares : " + optionsArray[2].shares;
  var step4 = docTexts[optionsArray[3].name] + " Date : " + optionsArray[3].date + ". Shares : " + optionsArray[3].shares;
  var step5 = docTexts[optionsArray[4].name] + " Date : " + optionsArray[4].date + ". Shares : " + optionsArray[4].shares;
  
  const doc = new docx.Document({ // surement une maniere de loop over all the list... pour chacune des etapes...
    sections: [{
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 1 : " + step1,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 2 : " + step2,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 3 : " + step3,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 4 : " + step4,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 5 : " + step5,
            }),
          ],
        }),
      ],
    }]
  });

  docx.Packer.toBlob(doc).then(blob => {
    console.log(blob);
    saveAs(blob, "test-parag.docx");
    alert("Document created successfully. Check your downloads.");
  });
}
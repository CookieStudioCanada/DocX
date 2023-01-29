// Variables
var optionsArray = [];
var optionName; // Changer pour Step-Name
var optionCompany; // Changer pour Company-Name
var optionShares;
var optionDate;
var optionPrice; // Changer pour "contrepartie"
var optionComments;

// To be able to get default value
var selectedOption = {
  name: optionName || "N/A",
  company: optionCompany || "N/A",
  shares: optionShares || "N/A",
  date: optionDate || "N/A",
  price: optionPrice || "N/A",
  comments: optionComments || "N/A"
};

function addToArray() {
  var select = document.getElementById("options");
  optionName = select.value;
  optionCompany = document.getElementById("option-company").value;
  optionShares = document.getElementById("option-shares").value;
  optionDate = document.getElementById("option-date").value;
  optionPrice = document.getElementById("option-price").value;
  optionComments = document.getElementById("option-comments").value;
  selectedOption = {name: optionName, shares: optionShares, date: optionDate, price: optionPrice, company: optionCompany, comments: optionComments}; 

  optionsArray.push(selectedOption);

  console.log(optionsArray);

  displayArray(); // ajouter l'etape a la liste
}

var table = document.getElementById("result");
function displayArray() {
  table.innerHTML = "";
  var tableElem = document.createElement("table");
  var headerRow = document.createElement("tr");
  var headerCell1 = document.createElement("th");
  headerCell1.innerHTML = "Step Number";
  headerRow.appendChild(headerCell1);
  var headerCell2 = document.createElement("th");
  headerCell2.innerHTML = "Step";
  headerRow.appendChild(headerCell2);
  var headerCell3 = document.createElement("th");
  headerCell3.innerHTML = "Date";
  headerRow.appendChild(headerCell3);
  tableElem.appendChild(headerRow);
  for (var i = 0; i < optionsArray.length; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    cell1.innerHTML = i + 1;
    row.appendChild(cell1);
    var cell2 = document.createElement("td");
    cell2.innerHTML = optionsArray[i].name;
    row.appendChild(cell2);
    var cell3 = document.createElement("td");
    cell3.innerHTML = optionsArray[i].date;
    row.appendChild(cell3);
    tableElem.appendChild(row);
  }
  table.appendChild(tableElem);
}

  var optionTexts = {
    "incorporation": 
      "Date : <input type='date' placeholder='Date' id='option-date'><br><br>" +
      "Nom : <input placeholder='Nom' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Prix de souscription : <input placeholder='Prix de souscription' id='option-price'>" +
      "<a id='option-comments'></a>", // invisible...
    "dissolution": 
      "Date : <input type='date' placeholder='Date' id='option-date'>" +
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "<a id='option-shares'></a>" + // invisible...
      "<a id='option-price'></a>" + // invisible...
      "<a id='option-comments'></a>", // invisible...
    "vente d'actions": 
      "Date : <input type='date' placeholder='Date' id='option-date'><br><br>" +
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Prix de vente : <input placeholder='Prix de vente' id='option-price'>" +
      "<a id='option-comments'></a>", // invisible...
    "dividendes": 
      "Date : <input type='date' placeholder='Date' id='option-date'><br><br>" +
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Montant du dividende : <input placeholder='Montant du dividende' id='option-price'>" + 
      "<a id='option-shares'></a>" + // invisible...
      "<a id='option-comments'></a>", // invisible...
    "fiducie":
      "Date : <input type='date' placeholder='Date' id='option-date'>" +
      "Nom : <input placeholder='Nom' id='option-company'><br><br>" + 
      "<a id='option-price'></a>" + // invisible... 
      "<a id='option-shares'></a>" + // invisible...
      "<a id='option-comments'></a>", // invisible...
    "echange":
      "Date : <input type='date' placeholder='Date' id='option-date'><br><br>" +  
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Contrepartie : <input placeholder='Contrepartie en actions' id='option-price'>" + 
      "<a id='option-comments'></a>", // invisible...
    "souscription":
      "Date : <input type='date' placeholder='Date' id='option-date'><br><br>" +  
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Prix de souscription : <input placeholder='Prix de souscription' id='option-price'>" +
      "<a id='option-shares'></a>" + // invisible...
      "<a id='option-comments'></a>", // invisible...
    "other":
      "Date : <input type='date' placeholder='Date' id='option-date'><br><br>" +  
      "Description de l'étape : <input placeholder='Description' id='option-comments'><br><br>" + 
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Contrepartie : <input placeholder='Contrepartie' id='option-price'>",
  };

  // Le texte qu'on va voir dans le document word
  // Pourrait aussi etre un JSON, change quoi?
  var docTexts = { 
    "incorporation": 
      "Le ${optionsArray[step-number].date}, la société ${optionsArray[step-number].company} sera créer." +
      "\n\n" +
      "${optionsArray[step-number].shares} actions de catégories 'A' seront souscrites par ABC pour un montant total de ${optionsArray[step-number].price}$.",
    "dissolution": 
      "Le ${optionsArray[step-number].date}, la société ${optionsArray[step-number].company} sera dissoute.",
    "vente d'actions": 
      "Le ${optionsArray[step-number].date}, actionnaire X vendra ${optionsArray[step-number].shares} de la société ${optionsArray[step-number].company} pour un montant de ${optionsArray[step-number].price}$.",
    "dividendes": 
      "Le ${optionsArray[step-number].date}, la société ${optionsArray[step-number].company} versera un dividende de ${optionsArray[step-number].price} aux actionnaires de catégories X",
    "fiducie": 
      "Le ${optionsArray[step-number].date}, fiducie ${optionsArray[step-number].company} sera constituée.",
    "echange":
      "Le ${optionsArray[step-number].date}, actionnaire X échangera ${optionsArray[step-number].shares} de la société ${optionsArray[step-number].company} contre les actions suivantes : ${optionsArray[step-number].price}.",
    "souscription":
      "Le ${optionsArray[step-number].date}, actionnaire X souscrira à ${optionsArray[step-number].shares} de la société ${optionsArray[step-number].company} pour un montant de ${optionsArray[step-number].price}$.",
    "other":
      "Description : ${optionsArray[step-number].comments}" +
      "\n\n" +
      "Date : ${optionsArray[step-number].date}" +
      "\n\n" +
      "Compagnie : ${optionsArray[step-number].company}" +
      "\n\n" +
      "Actions : ${optionsArray[step-number].shares}" +
      "\n\n" +
      "Contrepartie : ${optionsArray[step-number].price}",
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
  var step1 = docTexts[optionsArray[0].name]; 
  var step2 = docTexts[optionsArray[1].name];
  var step3 = docTexts[optionsArray[2].name];
  var step4 = docTexts[optionsArray[3].name];
  var step5 = docTexts[optionsArray[4].name];

  step1 = step1.replace(/step-number/g, 0);
  step1 = step1.replace(/\$\{(.*?)\}/g, function (match, expression) {
    return eval(expression);
  });

  step2 = step2.replace(/step-number/g, 1);
  step2 = step2.replace(/\$\{(.*?)\}/g, function (match, expression) {
    return eval(expression);
  });

  step3 = step3.replace(/step-number/g, 2);
  step3 = step3.replace(/\$\{(.*?)\}/g, function (match, expression) {
    return eval(expression);
  });

  step4 = step4.replace(/step-number/g, 3);
  step4 = step4.replace(/\$\{(.*?)\}/g, function (match, expression) {
    return eval(expression);
  });

  step5 = step5.replace(/step-number/g, 4);
  step5 = step5.replace(/\$\{(.*?)\}/g, function (match, expression) {
    return eval(expression);
  });

  const doc = new docx.Document({
    sections: [{
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 1 : \n\n" + step1,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 2 : \n\n" + step2,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 3 : \n\n" + step3,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 4 : \n\n" + step4,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "Step 5 : \n\n" + step5,
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
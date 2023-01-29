// Variables
var optionsArray = [];
var optionName; // Changer pour Step-Name
var optionCompany; // Changer pour Company-Name
var optionShares;
var optionDate;
var optionPrice; // Changer pour "contrepartie"

// To be able to get default value
var selectedOption = {
  name: optionName || "N/A",
  company: optionCompany || "N/A",
  shares: optionShares || "N/A",
  date: optionDate || "N/A",
  price: optionPrice || "N/A"
};

function addToArray() {
  var select = document.getElementById("options");
  optionName = select.value;
  optionCompany = document.getElementById("option-company").value;
  optionShares = document.getElementById("option-shares").value;
  optionDate = document.getElementById("option-date").value;
  optionPrice = document.getElementById("option-price").value;
  selectedOption = {name: optionName, shares: optionShares, date: optionDate, price: optionPrice, company: optionCompany}; 

  optionsArray.push(selectedOption);

  console.log(optionsArray);

  displayArray(); // ajouter l'etape a la liste
}

// Lists 
// Le probleme c'est que les objets doivent tous avoir les memes values... (name, date, shares)
// Comment que le inner HTML peut etre plus detailler, faire un tableau?
var list = document.getElementById("result");
function displayArray() {
  list.innerHTML = "";
  for (var i = 0; i < optionsArray.length; i++) {
    var item = document.createElement("li");
    item.innerHTML = "Step : " + optionsArray[i].name + ". Date : " + optionsArray[i].date;
    list.appendChild(item);
  }}

  var optionTexts = {
    "incorporation": 
      "<p>Incorporation text goes here...</p>" +
      "Nom : <input placeholder='Nom' id='option-company'><br>" + 
      "Date : <input placeholder='Date' id='option-date'><br>" +
      "Shares : <input placeholder='Number of shares' id='option-shares'><br>" +
      "Price : <input placeholder='Price of shares' id='option-price'>",
    "dissolution": 
      "<p>Dissolution text goes here...</p>" +
      "Company : <input placeholder='Company' id='option-company'><br>" + 
      "Date : <input placeholder='Date' id='option-date'><br>" +
      "<a id='option-shares'></a>" + // invisible...
      "<a id='option-price'></a>", // invisible...
    "vente d'actions": 
      "<p>Vente d'actions text goes here...</p>" +
      "Company : <input placeholder='Company' id='option-company'><br>" + 
      "Date : <input placeholder='Date' id='option-date'><br>" +
      "Shares : <input placeholder='Number of shares' id='option-shares'><br>" +
      "Price : <input placeholder='Total price' id='option-price'><br>",
    "dividendes": 
      "<p>Dividendes text goes here...</p>" +
      "Company : <input placeholder='Company' id='option-company'><br>" + 
      "Date : <input placeholder='Date' id='option-date'><br>" +
      "Price : <input placeholder='Total of dividends' id='option-price'><br>" + 
      "<a id='option-shares'></a>", // invisible...
    "fiducie":
      "<p>Fiducie text goes here...</p>" +
      "Nom : <input placeholder='Nom' id='option-company'><br>" + 
      "Date : <input placeholder='Date' id='option-date'><br>" +
      "<a id='option-price'></a>" + // invisible... + 
      "<a id='option-shares'></a>", // invisible...
    "echange":
      "<p>Echange text goes here...</p>" +
      "Company : <input placeholder='Company' id='option-company'><br>" + 
      "Date : <input placeholder='Date' id='option-date'><br>" +
      "Shares : <input placeholder='Number of shares' id='option-shares'><br>" +
      "Contrepartie : <input placeholder='Contrepartie' id='option-price'><br>",
    "souscription":
      "<p>Souscription text goes here...</p>" +
      "Company : <input placeholder='Company' id='option-company'><br>" + 
      "Date : <input placeholder='Date' id='option-date'><br>" +
      "Price : <input placeholder='Total of dividends' id='option-price'><br>" + 
      "<a id='option-shares'></a>", // invisible...
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
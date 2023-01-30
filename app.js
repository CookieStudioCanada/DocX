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

// Ajouter l'étape
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

// Tables
var table = document.getElementById("result");

function displayArray() {

  table.innerHTML = "";
  var tableElem = document.createElement("table");
  var headerRow = document.createElement("tr");

  var headerCell1 = document.createElement("th");
  headerCell1.innerHTML = "Étape";
  headerRow.appendChild(headerCell1);

  var headerCell2 = document.createElement("th");
  headerCell2.innerHTML = "Type";
  headerRow.appendChild(headerCell2);

  var headerCell3 = document.createElement("th");
  headerCell3.innerHTML = "Date";
  headerRow.appendChild(headerCell3);

  var headerCell4 = document.createElement("th");
  headerCell4.innerHTML = "Modifier";
  headerRow.appendChild(headerCell4);

  var headerCell5 = document.createElement("th");
  headerCell5.innerHTML = "X";
  headerRow.appendChild(headerCell5);
  
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
    var cell4 = document.createElement("td");
    var modifyButton = document.createElement("button");
    modifyButton.innerHTML = "Modifier";
    modifyButton.className= "tab-btn";
    modifyButton.onclick = function(index) { 
      return function() {
    
        var form = document.createElement("form");

        var typeLabel = document.createElement("label");
        typeLabel.innerHTML = "Type: ";
        form.appendChild(typeLabel);
    
        var typeInput = document.createElement("input");
        typeInput.value = optionsArray[index].name;
        form.appendChild(typeInput);
    
        var dateLabel = document.createElement("label");
        dateLabel.innerHTML = "Date: ";
        form.appendChild(dateLabel);
    
        var dateInput = document.createElement("input");
        dateInput.value = optionsArray[index].date;
        dateInput.type = "date";
        form.appendChild(dateInput);
    
        var sharesLabel = document.createElement("label");
        sharesLabel.innerHTML = "Actions: ";
        form.appendChild(sharesLabel);
    
        var sharesInput = document.createElement("input");
        sharesInput.value = optionsArray[index].shares;
        form.appendChild(sharesInput);
    
        var priceLabel = document.createElement("label");
        priceLabel.innerHTML = "Montant: ";
        form.appendChild(priceLabel);
    
        var priceInput = document.createElement("input");
        priceInput.value = optionsArray[index].price;
        form.appendChild(priceInput);
    
        var companyLabel = document.createElement("label");
        companyLabel.innerHTML = "Société: ";
        form.appendChild(companyLabel);
    
        var companyInput = document.createElement("input");
        companyInput.value = optionsArray[index].company;
        form.appendChild(companyInput);
    
        var commentsLabel = document.createElement("label");
        commentsLabel.innerHTML = "Commentaires: ";
        form.appendChild(commentsLabel);
    
        var commentsInput = document.createElement("input");
        commentsInput.value = optionsArray[index].comments;
        form.appendChild(commentsInput);
    
        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Mise à jour";
        updateButton.onclick = function() {
          optionsArray[index].name = typeInput.value;
          optionsArray[index].date = dateInput.value;
          optionsArray[index].shares = sharesInput.value;
          optionsArray[index].price = priceInput.value;
          optionsArray[index].company = companyInput.value;
          optionsArray[index].comments = commentsInput.value;
          displayArray();
          form.remove();
          modal.style.display = "none";
        };
        
        form.appendChild(updateButton); // Doit juste le faire une fois...
        openModal(form);
      };
    }(i);
    modifyButton.id = "modifyButton" + i;
    cell4.appendChild(modifyButton);
    row.appendChild(cell4);
    var cell5 = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    deleteButton.className = "tab-btn";
    deleteButton.onclick = (function (index) {
      return function () {
        optionsArray.splice(index, 1);
        displayArray();
        if(optionsArray.length === 0) {
          table.innerHTML = "";
        }        
      };
    })(i);
    deleteButton.id = "deleteButton" + i;
    cell5.appendChild(deleteButton);
    row.appendChild(cell5);
    tableElem.appendChild(row);
  }
  table.appendChild(tableElem);
}

// Les textes pour les inputs
var optionTexts = {
    "incorporation": 
      "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +
      "Nom : <input placeholder='Nom' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Prix de souscription : <input placeholder='Prix de souscription' id='option-price'><br><br>" +
      "Commentaires : <input placeholder='Description' id='option-comments'>",
    "dissolution": 
      "Date : <br><input type='date' placeholder='Date' id='option-date'>" +
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "<a id='option-shares'></a>" + // invisible...
      "<a id='option-price'></a>" + // invisible...
      "Commentaires : <input placeholder='Description' id='option-comments'>",
    "vente d'actions": 
      "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Prix de vente : <input placeholder='Prix de vente' id='option-price'><br><br>" +
      "Commentaires : <input placeholder='Description' id='option-comments'>",
    "dividendes": 
      "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Montant du dividende : <input placeholder='Montant du dividende' id='option-price'>" + 
      "<a id='option-shares'></a>" + // invisible...
      "Commentaires : <input placeholder='Description' id='option-comments'>",
    "fiducie":
      "Date : <br><input type='date' placeholder='Date' id='option-date'>" +
      "Nom : <input placeholder='Nom' id='option-company'><br><br>" + 
      "<a id='option-price'></a>" + // invisible... 
      "<a id='option-shares'></a>" + // invisible...
      "Commentaires : <input placeholder='Description' id='option-comments'>",
    "echange":
      "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +  
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Contrepartie : <input placeholder='Contrepartie en actions' id='option-price'>" + 
      "Commentaires : <input placeholder='Description' id='option-comments'>",
    "souscription":
      "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +  
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Prix de souscription : <input placeholder='Prix de souscription' id='option-price'>" +
      "<a id='option-shares'></a>" + // invisible...
      "Commentaires : <input placeholder='Description' id='option-comments'>",
    "other":
      "Date : <br><input type='date' placeholder='Date' id='option-date'><br><br>" +  
      "Description de l'étape : <input placeholder='Description' id='option-comments'><br><br>" + 
      "Société : <input placeholder='Société' id='option-company'><br><br>" + 
      "Actions : <input placeholder='Nombre et catégories' id='option-shares'><br><br>" +
      "Contrepartie : <input placeholder='Contrepartie' id='option-price'>",
};

// Les textes pour le document Word
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
function generate() {
  
  var wordDoc = []; // string Doc

  var fileName = prompt("Please enter the file name.");
  // ask user for file name...

  /* 
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
  */

  // Supposement que eval = risque...
  for (var i = 0; i < optionsArray.length; i++) {
    eval("var step" + (i + 1) + " = docTexts[optionsArray[" + i + "].name]");
    eval("step" + (i + 1) + " = step" + (i + 1) + ".replace(/step-number/g, " + i + ")");
    eval("step" + (i + 1) + " = step" + (i + 1) + ".replace(/\\$\\{(.*?)\\}/g, function (match, expression) { return eval(expression); });");
    eval("wordDoc.push(\"Étape #" + (i + 1) + "\\n\" + step" + (i + 1) + ")");
    console.log(wordDoc);
  }

  var arrayOfSteps = wordDoc.join("\n\n");

  const doc = new docx.Document({
    sections: [{
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: arrayOfSteps,
            }),
          ],
        }),
      ],
    }]
  });

  docx.Packer.toBlob(doc).then(blob => {
    console.log(blob);
    saveAs(blob, fileName + ".docx");
    alert("Document created successfully. Check your downloads.");
  });
}

// Get the modal
var modal = document.getElementById("myModal");

// When the user clicks the button, open the modal 
function openModal(form) {
  modal.style.display = "block";
  document.getElementById("modal-message").appendChild(form);
}

/*

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/
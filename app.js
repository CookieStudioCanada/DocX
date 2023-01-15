var step1 = "Incorporation";
var step2 = "Souscription d'actions";
var step3 = "Dividendes";

function generate() {
  const doc = new docx.Document({
    sections: [{
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: step1,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: step2,
            }),
          ],
        }),
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: step3,
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
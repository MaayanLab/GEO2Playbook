
// Current implementation of GEO2Playbook takes user to Playbook from GEO study

// Construct the URL to the icon.png file
const iconUrl = chrome.extension.getURL("icon.png");

console.log(iconUrl); // Log the generated URL to the console

// Create the "GEO2Playbook" button HTML with the icon (underlined and resized)
const geo2playbookButtonHTML = `
  <a href="https://playbook-workflow-builder.cloud/graph/extend" style="text-decoration: underline;">
    <img src="${iconUrl}" style="vertical-align: middle; width: 20px; height: 20px;" />
    GEO2Playbook
  </a>
`;


// Find all study containers on the page
const studyContainers = document.querySelectorAll("div.rprt");

// Iterate through each study container
studyContainers.forEach((container) => {
  // Find the URL of the study
  const studyUrl = container.querySelector('a[href^="/gds/?term="]')?.getAttribute("href");

  if (studyUrl) {
    // Find the "Download data" link and its parent element
    const downloadLink = container.querySelector("a[href^='/geo/download/']");
    const parentElement = downloadLink.parentElement;

    // Insert a line break to create some space between the content and the button
    const lineBreak = document.createElement("br");
    parentElement.appendChild(lineBreak);

    // Insert the "GEO2Playbook" button HTML as a new child element to the parent
    parentElement.insertAdjacentHTML("beforeend", geo2playbookButtonHTML);
  }
});


// Under development to directly insert GEO study into Playbook from the embedded link


// // Construct the URL to the icon.png file
// const iconUrl = chrome.extension.getURL("icon.png");

// console.log(iconUrl); // Log the generated URL to the console

// // Function to open the GEO2Playbook page with the dataset
// function openGEO2Playbook(datasetUrl) {
//   const playbookUrl = `https://playbook-workflow-builder.cloud/graph/extend?url=${encodeURIComponent(datasetUrl)}`;
//   window.open(playbookUrl, "_blank");
// }

// // Function to upload the file to Playbook
// function uploadFileToPlaybook(datasetUrlWithoutDownload) {
//   // Fetch the dataset file from the provided dataset URL
//   fetch(datasetUrlWithoutDownload)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const formData = new FormData();
//       formData.append("file", blob, "example.tsv"); // Assuming the filename is "example.tsv"

//       // Upload the file to the Playbook Workflow Builder API
//       fetch("https://playbook-workflow-builder.cloud/api/v1/components/core/file/upload", {
//         method: "POST",
//         headers: {
//           Authorization: "Token YOUR_API_KEY_HERE", // Replace YOUR_API_KEY_HERE with your valid API key
//         },
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // Get the file URL from the API response
//           const fileUrl = data.file[0];

//           // Open the Playbook Workflow Builder with the uploaded file
//           openGEO2Playbook(fileUrl);
//         });
//     });
// }

// // Create the "GEO2Playbook" button HTML with the icon (underlined and resized)
// const geo2playbookButtonHTML = `
//   <a href="javascript:void(0);" style="text-decoration: underline;" class="geo2playbook-button">
//     <img src="${iconUrl}" style="vertical-align: middle; width: 20px; height: 20px;" />
//     GEO2Playbook
//   </a>
// `;

// // Find all study containers on the page
// const studyContainers = document.querySelectorAll("div.rprt");

// // Iterate through each study container
// studyContainers.forEach((container) => {
//   // Find the URL of the study
//   const studyUrl = container.querySelector('a[href^="/gds/?term="]')?.getAttribute("href");

//   if (studyUrl) {
//     // Find the "Download data" link
//     const downloadLink = container.querySelector("a[href^='/geo/download/']");

//     // Insert the "GEO2Playbook" button HTML as a new child element after the "Download data" link
//     downloadLink.insertAdjacentHTML("afterend", geo2playbookButtonHTML);

//     // Find the newly added button and add a click event listener
//     const geo2playbookButton = container.querySelector(".geo2playbook-button");
//     geo2playbookButton.addEventListener("click", () => {
//       // Extract the dataset URL from the "Download data" link
//       const datasetUrl = downloadLink.getAttribute("href");
//       // Remove "/geo/download/" from the URL to get the dataset URL
//       const datasetUrlWithoutDownload = datasetUrl.replace("/geo/download/", "/geo/query/acc.cgi?acc=");

//       // Call the function to upload the file to Playbook
//       uploadFileToPlaybook(datasetUrlWithoutDownload);
//     });
//   }
// });

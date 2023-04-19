const APP_URL = process.env.APP_URL || 'http://localhost:3000';

fetch(`${APP_URL}`)
  .then((response) => response.text())
  .then((html) => {
    console.log(html);
    processAppHTML(html);
  })
  .catch((error) => {
    console.error("Failed to fetch Next.js app content:", error);
  });

function appendHost(str) {
  return str.replace(window.location.origin, APP_URL);
}

function processAppHTML(html) {
  const container = document.createElement("div");
  container.innerHTML = html;

  const scripts = container.querySelectorAll("script");
  scripts.forEach((script) => {
    const newScript = document.createElement("script");
    newScript.src = appendHost(script.src);
    document.head.appendChild(newScript);
  });
  
  const rootDiv = container.querySelector("#root");
  
  document.body.appendChild(rootDiv);
}

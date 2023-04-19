const APP_URL = 'https://ca-immigration-chat-bot.netlify.app';

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
  
  const styles = container.querySelectorAll("link");
  styles.forEach((style) => {
    style.href = appendHost(style.href);
    document.head.appendChild(style);
  });
  
  const rootDiv = container.querySelector("#root");
  
  document.body.appendChild(rootDiv);
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'checkText',
      title: 'Check Grammar and Spelling',
      contexts: ['selection']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'checkText') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: checkText,
        args: [info.selectionText]
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CHECK_TEXT') {
      checkText(message.text).then(result => {
        sendResponse({ result });
      });
      return true;
    }
  });
  
  async function checkText(text) {
    const response = await fetch('https://english-grammer-corrector.p.rapidapi.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'english-grammer-corrector.p.rapidapi.com',
        'x-rapidapi-key': '54e52be77amsh14013dcod7ae522p135be0jsn9e10fc9aff8d' // Replace with your actual API key
      },
      body: JSON.stringify({ text })
    });
    
    const data = await response.json();
    return data.matches.map(match => ({
      message: match.message,
      replacements: match.replacements
    }));
  }
  
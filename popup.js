document.getElementById('checkBtn').addEventListener('click', () => {
    const text = document.getElementById('text').value;
    chrome.runtime.sendMessage({ type: 'CHECK_TEXT', text }, (response) => {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = ''; // Clear previous results
  
      if (response && response.result) {
        const matches = response.result;
        matches.forEach(match => {
          const div = document.createElement('div');
          div.className = 'match';
          div.innerHTML = `${match.message} (${match.replacements.map(r => r.value).join(', ')})`;
          resultDiv.appendChild(div);
        });
      } else {
        resultDiv.innerHTML = '<p>No issues found!</p>';
      }
    });
  });
  
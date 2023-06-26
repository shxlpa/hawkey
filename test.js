fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt')
  .then(response => response.text())
  .then(text => {
    // Split the text content into an array of lines
    const lines = text.split('\n');

    // Iterate over each line
    lines.forEach(line => {
      // Process each line as needed
      console.log(line);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });

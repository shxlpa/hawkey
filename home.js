var words = [];
area = "text"

const adjacencyDict = {
		"q": ["w", "a", "s", "1", "2"],
		"w": ["q", "a", "s", "e", "d", "2", "3"],
		"e": ["w", "s", "d", "r", "f", "3", "4"],
		"r": ["e", "d", "f", "t", "g", "4", "5"],
		"t": ["r", "f", "g", "y", "h", "5", "6"],
		"y": ["t", "g", "h", "u", "j", "6", "7"],
		"u": ["y", "h", "j", "i", "k", "7", "8"],
		"i": ["u", "j", "k", "o", "l", "8", "9"],
		"o": ["i", "k", "l", "p", "9", "0"],
		"p": ["o", "l", "0"],
		"a": ["q", "w", "s", "z"],
		"s": ["q", "w", "e", "a", "d", "z", "x"],
		"d": ["w", "e", "r", "s", "f", "x", "c"],
		"f": ["e", "r", "t", "d", "g", "c", "v"],
		"g": ["r", "t", "y", "f", "h", "v", "b"],
		"h": ["t", "y", "u", "g", "j", "b", "n"],
		"j": ["y", "u", "i", "h", "k", "n", "m"],
		"k": ["u", "i", "o", "j", "l", "m"],
		"l": ["i", "o", "p", "k"],
		"z": ["a", "s", "x"],
		"x": ["z", "s", "d", "c"],
		"c": ["x", "d", "f", "v"],
		"v": ["c", "f", "g", "b"],
		"b": ["v", "g", "h", "n"],
		"n": ["b", "h", "j", "m"],
		"m": ["n", "j", "k"],
		"1": ["q", "w", "2"],
		"2": ["1", "q", "w", "3"],
		"3": ["2", "w", "e", "4"],
		"4": ["3", "e", "r", "5"],
		"5": ["4", "r", "t", "6"],
		"6": ["5", "t", "y", "7"],
		"7": ["6", "y", "u", "8"],
		"8": ["7", "u", "i", "9"],
		"9": ["8", "i", "o", "0"],
		"0": ["9", "o", "p"]
	  };
	  

function allLower(string) {
	// make ALL user-entered inputs lower case for the purpose of computation
	return string.toLowerCase()
}

function clearText() {
	//function to make the text back to normal by removing all the methods applied
	//using DOM method
	document.getElementById(area).style.fontWeight = "normal";
	document.getElementById(area).style.textAlign = "left";
	document.getElementById(area).style.fontStyle = "normal";
	document.getElementById(area).style.textTransform = "capitalize";
	document.getElementById(area).value = " ";
	document.getElementById("title").textContent = " ";
}
// change
// AUTOCORRECT FUNCTIONALITY
//  SOURCED FROM:
//	https://medium.com/building-a-simple-text-correction-tool/building-a-simple-auto-correction-tool-97d77d458742

const universeOfDiscourse = [
	"Prabha", "Naan", "Nagaraj", "Appa",
	"Spit", "Spoon", "Amma", "Goutham", "Shilpa", "Aditya", "Ditti", "Vijji", "Junior", 
	"miriam", "peanut", "jelly", "sandwhich", "milk", "water"
];

// Add all known english words
fetch('https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt')
	.then(response => response.text())
	.then(text => {
    	// Split the text content into an array of lines
    	const lines = text.split('\n');

    	// Iterate over each line
    	lines.forEach(line => {
      		// Process each line as needed
      		console.log(line);
			universeOfDiscourse.push(line)

    	});
  	})
	.catch(error => {
    	console.log('Error:', error);
	});

function getBigram(word) {
	let result = [];

	for (let i = 0; i < word.length-1; i++) {
		result.push(word[i] + word[i+1]);
	}

	return result;
}

function getSimilarity(word1, word2) {
	word1 = word1.toLowerCase();
	word2 = word2.toLowerCase();
	const bigram1 = getBigram(word1), bigram2 = getBigram(word2);
	let similar = [];

	for (let i = 0; i < bigram1.length; i++) {
		if (bigram2.indexOf(bigram1[i]) > -1) {
			similar.push(bigram1[i]);
		}
	}

	return similar.length / Math.max(bigram1.length, bigram2.length);
}

function autoCorrect(word, knownWords=universeOfDiscourse, similarityThreshold=0.5) {
	let maxSimilarity = 0;
	let mostSimilar = word;

	for (let i = 0; i < knownWords.length; i++) {
		let similarity = getSimilarity(knownWords[i], word);
		if (similarity > maxSimilarity) {
			maxSimilarity = similarity;
			mostSimilar = knownWords[i];
		}
	}

	return maxSimilarity > similarityThreshold ? mostSimilar : word;
}

function submit(character) {

	let text = document.getElementById("text").value;

	if (text.length > 0) {
		const lastChar = text[text.length - 1];
		
		if (lastChar === " ") {
			text = text.split(" ");
			const lastWord = text[text.length - 2];
			text[text.length - 2] = autoCorrect(lastWord);
			text = text.join(" ");
		}

		document.getElementById("text").value = text;
	}
	else {
		document.getElementById("output").innerHTML = "";
	}

	char = character.value;
	words.push(char);
	document.getElementById("title").textContent = char;
}

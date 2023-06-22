var words = [];
area = "foo"

function f1() {
	//function to make the text bold using DOM method
	document.getElementById(area).style.fontWeight = "bold";
}

function f2() {
	//function to make the text italic using DOM method
	document.getElementById(area).style.fontStyle = "italic";
}

function f3() {
	//function to make the text alignment left using DOM method
	document.getElementById(area).style.textAlign = "left";
}

function f4() {
	//function to make the text alignment center using DOM method
	document.getElementById(area).style.textAlign = "center";
}

function f5() {
	//function to make the text alignment right using DOM method
	document.getElementById(area).style.textAlign = "right";
}

function f6() {
	//function to make the text in Uppercase using DOM method
	document.getElementById(area).style.textTransform = "uppercase";
}

function f7() {
	//function to make the text in Lowercase using DOM method
	document.getElementById(area).style.textTransform = "lowercase";
}

function f8() {
	//function to make the text capitalize using DOM method
	document.getElementById(area).style.textTransform = "capitalize";
}

function f9() {
	//function to make the text back to normal by removing all the methods applied
	//using DOM method
	document.getElementById(area).style.fontWeight = "normal";
	document.getElementById(area).style.textAlign = "left";
	document.getElementById(area).style.fontStyle = "normal";
	document.getElementById(area).style.textTransform = "capitalize";
	document.getElementById(area).value = " ";
}

function f10(e) {

	char = e.value;
	words.push(char);
	document.getElementById("title").textContent = char;
	// alert(words) // alerts are such an annoying way to debug

}


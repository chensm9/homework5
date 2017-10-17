function showError(message) {
  document.getElementById('error').textContent = message;
}

function Append(data) {
	showError("");
	var message = document.getElementById('output_field').textContent;
	if(message == "0"&&data != "."&&data != "*"&&data != "+"&&data != "/"&&data != "-")
		document.getElementById('output_field').textContent = data;
	else
		document.getElementById('output_field').textContent += data;
}

function Delete() {
	showError("");
	var message = document.getElementById('output_field').textContent;
	document.getElementById('output_field').textContent = 
		message.substring(0, message.length - 1);
}

function Clear() {
	showError("");
	document.getElementById('output_field').textContent = "0";
}

function Equal() {
	var message = document.getElementById('output_field').textContent;
	var result;
	try {
		eval("result = " + message);
	}
	catch (error) {
		showError(message + " 不是合法算式!!");
		return;
	}
	
	if(result == undefined || result == NaN || result == Infinity)
		showError(message + " 不是合法算式!!");
	else 
    document.getElementById('output_field').textContent = result;
}

window.onload = function() {
	var buttons = document.getElementsByTagName("button");
  for(var i in buttons) {
    buttons[i].onclick = function() {
      if(this.className == "print") {
        Append(this.childNodes[0].textContent);
      }
      else if(this.className == "clear") {
        Clear();
      }
      else if(this.className == "delete") {
        Delete();
      }
      else if(this.className == "equal") {
        Equal();
      }
    }
  }
}

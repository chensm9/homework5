
//式子出错表现函数
function showError(message) {
  if(message != "") {
    //出错时进行清0操作
    document.getElementById('output_field').textContent = "0";
    document.getElementById('input_field').textContent = "";
  }
  document.getElementById('error').textContent = message;
}

//输入字符添加函数
function Append(data) {
  showError("");
  if(document.getElementById('input_field').textContent != "") {
    document.getElementById('input_field').textContent = "";
    if(!isNaN(parseInt(data)))
      Clear();
  }

  var message = document.getElementById('output_field').textContent;

  //刪除前置0，避免八进制处理
  if(message.length >= 2&&data != "."&&!isNaN(parseInt(data))) {
    if(message[message.length-1] == "0"&&isNaN(parseInt(message[message.length-2]))) {
      document.getElementById('output_field').textContent = 
        message.substr(0, message.length-1) + data;
      return;
    }
  }

  if(message == "0"&&data != "."&&data != "*"&&data != "+"&&data != "/"&&data != "-") {
    document.getElementById('output_field').textContent = data;
  }
  else if(message != ""&&data == "."&&isNaN(parseInt(message[message.length-1]))) {
    //便于美观，进行小数点前置0处理
    if(message[message.length-1] == ".")
      document.getElementById('output_field').textContent += ".";
    else 
      document.getElementById('output_field').textContent += "0.";
  }
  else {
    document.getElementById('output_field').textContent += data;
  }
}

//删除操作函数
function Delete() {
  showError("");
  var message = document.getElementById('output_field').textContent;
  if(message == "0")
    return;
  else if(message.substring(0, message.length - 1) == "") {
    document.getElementById('output_field').textContent = "0";
    return;
  }
  document.getElementById('output_field').textContent =
    message.substring(0, message.length - 1);
}

//清零操作函数
function Clear() {
  showError("");
  document.getElementById('input_field').textContent = "";
  document.getElementById('output_field').textContent = "0";
}

//等于号操作函数
function Equal() {
  var message = document.getElementById('output_field').textContent;
  document.getElementById('input_field').textContent = message + "=";

  for(var i = 0; i < message.length - 1; i++) {
    if(message[i] == "*"&&message[i+1] == "*") {
      showError(message + " 不是合法算式!!");
      return;
    }
    else if(message[i] == "/"&&message[i+1] == "/") {
      showError(message + " 不是合法算式!!");
      return;
    }
  }

  var result;
  try {
    eval("result = " + message );
  }
  catch (error) {
    showError(message + " 不是合法算式!!");
    return;
  }

  if(isNaN(parseInt(result))) {
    showError(message + " 不是合法算式!!");
  }
  else {
    //保留12位小数并转字符串截断，处理精度问题
    result = result.toFixed(12).toString();
    while(result.length != 1&& (result[result.length-1] == "0"||result[result.length-1] == ".")){
      result = result.substring(0, result.length-1);
    }
    if(result == "-") 
      result = "0";
    document.getElementById('output_field').textContent = result;
  }
}

window.onload = function() {
  Clear();
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


var btn = document.getElementById("btn");
var outputBox = document.getElementsByClassName("output-container")[0];
var error = document.createElement("h3");
error.id = "errorMsg";

btn.addEventListener("click", checkUser);

function checkUser() {
	var userAge = document.forms["messageform"]["age"].value;
	var creditTerm = document.getElementById("term");
	var userCreditTerm = creditTerm.options[creditTerm.selectedIndex].text;
	var creditAmount = document.forms["messageform"]["amount"].value;
	console.log(userAge, userCreditTerm, creditAmount);
	if (validateForm() === true) {
		if (userAge < 18 || userAge > 65) {
			outputBox.innerHTML = "";
			error.innerHTML = "Sorry, loan is impossible";
			outputBox.appendChild(error);
		}
		else {
			outputBox.innerHTML = "";
			createTable(userCreditTerm, creditAmount);
		}
	}
	else {
		error.innerHTML = "All fields must be filled";
		outputBox.appendChild(error);
	}
}

function createTable(term, amount) {
	var headers = ["№", "Payment amount", "Loan body", "Percent %", "Remainder", "Payment reduction"];
	var table = document.createElement("table");
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
	for (var i = 0; i < headers.length; i++) {
		var th = document.createElement("th");
		th.innerHTML = headers[i];
		tr.appendChild(th);
	}
	thead.appendChild(tr);

	var lb = amount / term;
	var firstPercent = (amount - lb) * 0.13 / 12;
	var sumOfPaymentAmount = 0; 
	var sumOfPercents = 0;
	var tbody = document.createElement("tbody");
	for (var i = 0; i < term; i++) {
		var tr = document.createElement("tr");	
		var tdn = document.createElement("td");
		var tdpa = document.createElement("td");
		var tdlb = document.createElement("td");
		var tdp = document.createElement("td");
		var tdr = document.createElement("td");
		var tdpr = document.createElement("td");

		tdn.innerHTML = i+1;
		tdlb.innerHTML = lb.toFixed(2);
		var remainder = amount - lb * (i+1);
		tdr.innerHTML = remainder.toFixed(2);
		var percent = (amount - lb * (i)) * 0.13 / 12;
		tdp.innerHTML = percent.toFixed(2);
		sumOfPercents += Number(percent);
		var pa = lb + percent;
		tdpa.innerHTML = pa.toFixed(2);
		sumOfPaymentAmount += Number(pa);
		tdpr.innerHTML = (firstPercent - (remainder * 0.13 /12)).toFixed(2);

		var cellsArray = [tdn, tdpa, tdlb, tdp, tdr, tdpr];
		for (var j = 0; j < cellsArray.length; j++) {
			tr.appendChild(cellsArray[j]);
		}
		tbody.appendChild(tr);

	}
	footers = ["Total:", sumOfPaymentAmount.toFixed(2), amount, sumOfPercents.toFixed(2), "", ""];
		var tfoot = document.createElement("tfoot");
		var tr = document.createElement("tr");
		for (var i = 0; i < headers.length; i++) {
			var td = document.createElement("td");
			td.innerHTML= footers[i];
			tr.appendChild(td);
		}
		tfoot.appendChild(tr);

	table.appendChild(thead);
	table.appendChild(tfoot);
	table.appendChild(tbody);

	var msg = document.createElement("h3");
	msg.innerHTML = "Monthly payment: " + lb.toFixed(2) + "</br>Interest rate: 13%";
	outputBox.appendChild(msg);
	outputBox.appendChild(table);
}

function validateForm() {
	var filled = true;
    $('input').each(function() {
        if ($(this).val() === '') {
        	filled = false;
            return false; 
        }
    });
    return filled;
}

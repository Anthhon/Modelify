function createClass() {
	// Build class object
	let classObject = document.createElement("section");
	classObject.id = "class";

	// Get class name
	let className = prompt("Type in class name:")
	if (!className) {
		alert("Class Name cannot be empty!");
		return {
			error: true,
			message: 'class name needed'
		}
	}

	// Create class title and delete button
	const h3 = document.createElement("h3");
	h3.id = "class-name";
	h3.textContent = className;

	const deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.id = "button-delete-class";
	deleteButton.textContent = "Delete Class";
	deleteButton.addEventListener("click", destroyClass);

	h3.appendChild(deleteButton);

	// Create class field add button
	let newFieldButton = document.createElement("button")

	newFieldButton.type = "button";
	newFieldButton.id = "button-add-field";
	newFieldButton.textContent = "New Field";
	newFieldButton.addEventListener("click", addField);

	// Append all elements to the class
	classObject.appendChild(h3);
	classObject.appendChild(newFieldButton);

	// Append the section to the 'classes' section
	let classesSection = document.getElementById("classes");
	classesSection.appendChild(classObject);
}

function destroyClass(event) {
	// Get button clicked and parent class
	let deleteButton = event.target;
	var classSection = deleteButton.parentNode.parentNode;

	if (classSection) {
		classSection.remove();
	}
}

function addField(event) {
	// Create the div element for class fields
	var newField = document.createElement("div");
	newField.id = "class-field";

	// Create input element for class name
	var classNameInput = document.createElement("input");
	classNameInput.type = "text";
	classNameInput.id = "class-name";
	classNameInput.placeholder = "Name";
	newField.appendChild(classNameInput);

	// Create select element for class type
	var classTypeSelect = document.createElement("select");
	classTypeSelect.id = "class-type";
	newField.appendChild(classTypeSelect);

	// Define the option values and text
	var optionValues = [
		"auto-field",
		"big-auto-field",
		"big-integer-field",
		// TODO: Add other option values here
	];

	for (var i = 0; i < optionValues.length; i++) {
		var option = document.createElement("option");
		option.value = optionValues[i];
		option.textContent = optionValues[i];
		classTypeSelect.appendChild(option);
	}

	// Create select element for class attribute relationship
	var classAttRelationshipSelect = document.createElement("select");
	classAttRelationshipSelect.setAttribute("for", "types");
	classAttRelationshipSelect.id = "class-att-relationship";

	// TODO: Implement classes relationship
	var class1Option = document.createElement("option");
	class1Option.value = "class1";
	class1Option.textContent = "Class 1";
	classAttRelationshipSelect.appendChild(class1Option);

	newField.appendChild(classAttRelationshipSelect);

	// Create input elements for size and default value
	var classAttSizeInput = document.createElement("input");
	classAttSizeInput.type = "number";
	classAttSizeInput.id = "class-att-size";
	classAttSizeInput.placeholder = "Size";

	var classAttDefaultInput = document.createElement("input");
	classAttDefaultInput.type = "text";
	classAttDefaultInput.id = "class-att-default";
	classAttDefaultInput.placeholder = "Default value";

	// Create checkboxes and labels for PK, Null, Blank, and Unique
	var checkboxLabels = ["Primary-Key", "Null", "Blank", "Unique"];

	for (var i = 0; i < checkboxLabels.length; i++) {
		var label = document.createElement("label");
		label.id = `class-att-label-${checkboxLabels[i].toLowerCase()}`;
		label.textContent = `${checkboxLabels[i].replace("-", " ")}`;
		label.setAttribute("for", `class-att-${checkboxLabels[i].toLowerCase()}`);

		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = "class-att-" + checkboxLabels[i].toLowerCase();
		newField.appendChild(label);
		newField.appendChild(checkbox);
	}

	// Append new field to class
	let addButton = event.target;
	var classSection = addButton.parentNode;
	var newFieldButtonPosition = classSection.children[classSection.children.length - 1];

	classSection.insertBefore(newField, newFieldButtonPosition);
}

function generateModels() {
	const codeBlock = document.getElementById("code-block");
	const codeSection = document.getElementById("code-section");
	let code = "Lorem Ipsum";

	// TODO: Generate models code

	codeSection.hidden = false;
	codeBlock.textContent = code;
}

function buildCopyrightContent() {
	const copyrightText = document.getElementById("footer-text");
	const year = new Date().getFullYear();

	copyrightText.textContent = `Copyright © ${year}, Anthony Carneiro da Silva, All rights reserved`;
}

// Auto-run functions when page loads
window.addEventListener('load', buildCopyrightContent);


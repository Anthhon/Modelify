// Used to store all classes names
let classNames = ["None"];

function createClass() {
	// Build class object
	let classObject = document.createElement("section");
	classObject.id = "class";
	//classObject.setAttribute("draggable", "true");

	// Get class name
	let className = prompt("Type in class name:");
	if (!className) {
		alert("Class Name cannot be empty!");
		return {
			error: true,
			message: 'class name needed'
		}
	}

	// Check if a class with the same name already exists
	const existingClasses = document.querySelectorAll("[id=class-name]");
	for (const existingClass of existingClasses) {
		if (existingClass.textContent === className) {
			const userResponse = confirm("A class with the same name already exists. Do you want to keep it anyway?");
			if (!userResponse) {
				return {
					error: true,
					message: "Class creation canceled."
				};
			}
		}
	}

	// Create class title and delete button
	const h3 = document.createElement("h3");
	h3.id = "class-name";
	h3.textContent = className;

	const deleteClassButton = document.createElement("button");
	deleteClassButton.type = "button";
	deleteClassButton.id = "button-delete-class";
	deleteClassButton.addEventListener("click", destroyClass);

	var trashIcon = document.createElement("ion-icon");
	trashIcon.id = "delete-class-icon"
	trashIcon.name = "trash-outline";
	trashIcon.alt = "Trash Icon"
	deleteClassButton.appendChild(trashIcon);

	h3.appendChild(deleteClassButton);

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

	
	// Add the class name to the classNames array
	classNames.push(className.trim());
	// Update the relationship select elements with the classNames array
	updateAttRelationshipSelect();
}

function destroyClass(event) {
	// Get button clicked and parent class
	let deleteClassButton = event.target;
	var classSection = deleteClassButton.parentNode.parentNode.parentNode;
	var className = deleteClassButton.parentNode.parentNode;

	if (className) {
		// Remove the class name from the classNames array
		let index = classNames.indexOf(className.textContent);
		if (index !== -1) {
			classNames.splice(index, 1);
		}
		// Remove the class itself
		classSection.remove();
	}

	// Remove the class name from all attRelationshipSelect elements
	updateAttRelationshipSelect();
}

function updateAttRelationshipSelect() {
    // Get all attRelationshipSelect elements on the page
    let attRelationshipSelects = document.querySelectorAll("select[id='att-relationship']");

    // Iterate through each attRelationshipSelect element

    attRelationshipSelects.forEach(attRelationshipSelect => {
        // Get the selected value before updating
        let selectedValue = attRelationshipSelect.value;

        // Clear the existing options
        attRelationshipSelect.innerHTML = '';

        // Add class names from the classNames array
        classNames.forEach(className => {
            var classOption = document.createElement("option");
            classOption.value = className;
            classOption.textContent = className;
            attRelationshipSelect.appendChild(classOption);
        });

        // Set the selected value back to the select element
        attRelationshipSelect.value = selectedValue;
    });
}

function addField(event) {
	// Create the div element for class fields
	var newField = document.createElement("div");
	newField.id = "class-field";

	// Create input element for class name
	var classNameInput = document.createElement("input");
	classNameInput.type = "text";
	classNameInput.id = "att-name";
	classNameInput.placeholder = "Name";
	newField.appendChild(classNameInput);

	// Create select element for class type
	var classTypeSelect = document.createElement("select");
	classTypeSelect.id = "att-type";
	classTypeSelect.addEventListener("change", fieldTypeModified);
	newField.appendChild(classTypeSelect);

	// Define the option values and text
	var optionValues = [
		"Auto Field",
		"Big Auto Field",
		"Big Integer Field",
		"Binary Field",
		"Boolean Field",
		"Char Field",
		"Date Field",
		"Date Time Field",
		"Decimal Field",
		"Duration Field",
		"Email Field",
		"File Field",
		"File Path Field",
		"Float Field",
		"Generic IP Address Field",
		"Image Field",
		"Integer Field",
		"JSON Field",
		"Positive Big Integer Field",
		"Positive Integer Field",
		"Positive Small Integer Field",
		"Slug Field",
		"Small Auto Field",
		"Small Integer Field",
		"Text Field",
		"Time Field",
		"URL Field",
		"UUID Field",
		"Foreign Key",
		"Many To Many Field",
		"One To One Field",
	];

	for (var i = 0; i < optionValues.length; i++) {
		var option = document.createElement("option");
		option.value = optionValues[i].toLowerCase().replace(/ /g, "-");
		option.textContent = optionValues[i];
		classTypeSelect.appendChild(option);
	}

	var attSize = document.createElement("input");
	attSize.id = "att-size";
	attSize.placeholder = "Size";

	newField.appendChild(attSize);

	var attDefault = document.createElement("input");
	attDefault.id = "att-default";
	attDefault.placeholder = "Default Value";

	newField.appendChild(attDefault);

	// Create select element for class attribute relationship
	var labelClassAttRelationship = document.createElement("label");
	labelClassAttRelationship.id = "att-label-relationship";
	labelClassAttRelationship.textContent = "ForeignKey to:";
	labelClassAttRelationship.style.display= "none";

	var attRelationshipSelect = document.createElement("select");
	attRelationshipSelect.setAttribute("for", "types");
	attRelationshipSelect.id = "att-relationship";
	attRelationshipSelect.style.display= "none";

	// Add class names from the classNames array
	classNames.forEach(className => {
		var classOption = document.createElement("option");
		classOption.value = className;
		classOption.textContent = className;
		attRelationshipSelect.appendChild(classOption);
	});

	newField.appendChild(labelClassAttRelationship);
	newField.appendChild(attRelationshipSelect);

	// Create input elements for size and default value
	var attSizeInput = document.createElement("input");
	attSizeInput.type = "number";
	attSizeInput.id = "att-size";
	attSizeInput.placeholder = "Size";

	var attDefaultInput = document.createElement("input");
	attDefaultInput.type = "text";
	attDefaultInput.id = "att-default";
	attDefaultInput.placeholder = "Default value";

	// Create checkboxes and labels for PK, Null, Blank, and Unique
	var checkboxLabels = ["Primary-Key", "Null", "Blank", "Unique"];
	for (var i = 0; i < checkboxLabels.length; i++) {
		var label = document.createElement("label");
		label.id = `att-label-${checkboxLabels[i].toLowerCase()}`;
		label.textContent = `${checkboxLabels[i].replace("-", " ")}`;
		label.setAttribute("for", `att-${checkboxLabels[i].toLowerCase()}`);

		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = "att-" + checkboxLabels[i].toLowerCase();
		newField.appendChild(label);
		newField.appendChild(checkbox);
	}

	var deleteFieldButton = document.createElement("button");
	deleteFieldButton.id = "button-delete-field";
	deleteFieldButton.addEventListener("click", deleteField);

	var trashIcon = document.createElement("ion-icon");
	trashIcon.id = "delete-field-icon"
	trashIcon.name = "trash-outline";
	trashIcon.alt = "Trash Icon"

	deleteFieldButton.appendChild(trashIcon);
	newField.appendChild(deleteFieldButton);

	// Append new field to class
	var addButton = event.target;
	var classSection = addButton.parentNode;
	var newFieldButtonPosition = classSection.children[classSection.children.length - 1];
	classSection.insertBefore(newField, newFieldButtonPosition);
}

function deleteField(event) {
	// Get button clicked and parent class
	let deleteFieldButton = event.target;
	var fieldSection = deleteFieldButton.parentNode.parentNode;

	if (fieldSection) {
		fieldSection.remove();
	}
}

function fieldTypeModified(event) {
	var attType = event.target.value;
	var currentField = event.target.closest("#class-field");
	var attLabelRelationship = currentField.querySelector("#att-label-relationship");
	var attRelationshipSelect = currentField.querySelector("#att-relationship");
	var attSizeInput = currentField.querySelector("#att-size");
	var attDefaultValue = currentField.querySelector("#att-default");

	if (attType === "foreign-key") {
		// If att-type is 'foreign-key', show relationship elements and hide size element
		attLabelRelationship.style.display = "block";
		attRelationshipSelect.style.display = "block";
		attSizeInput.style.display = "none";
		attDefaultValue.style.display = "none";
	} else {
		// If att-type is not 'foreign-key', hide relationship elements and show size element
		attLabelRelationship.style.display = "none";
		attRelationshipSelect.style.display = "none";
		attSizeInput.style.display = "block";
		attDefaultValue.style.display = "block";
	}
}

function generateModels() {
	// Get all class sections
	const classSections = document.querySelectorAll("#class");

	// Start the code with imports and any initial setup
	let generatedCode = ``;

	// Iterate through each class section and generate code
	classSections.forEach(classSection => {
		// Get class name
		const className = classSection.querySelector("#class-name").textContent.trim();

		// Start the class definition
		generatedCode += `class ${className}(models.Model):\n`;

		// Get all fields for the current class
		const fields = classSection.querySelectorAll("#class-field");

		// Iterate through each field and generate field code
		fields.forEach(field => {
			const fieldName = field.querySelector("#att-name").value.trim();
			let fieldType = field.querySelector("#att-type").value;
			fieldType = capitalizeWords(fieldType.replaceAll("-", " ")).replaceAll(" ", "");
			let fieldCode = `    ${fieldName} = models.${fieldType}(`;

				// Check if it's a foreign key and add related class
				if (fieldType === "ForeignKey") {
					const relatedClass = field.querySelector("#att-relationship").value;
					fieldCode = `    models.${fieldType}(${relatedClass}, on_delete=models.CASCADE`;
				}

				// Add other field properties based on user input
				const size = field.querySelector("#att-size").value.trim();
				const defaultValue = field.querySelector("#att-default").value.trim();
				const primaryKey = field.querySelector("#att-primary-key").checked ? ", primary_key=True" : ", primary_key=False";
				const isNull = field.querySelector("#att-null").checked ? ", null=True" : ", null=False";
				const isBlank = field.querySelector("#att-blank").checked ? ", blank=True" : ", blank=False";
				const isUnique = field.querySelector("#att-unique").checked ? ", unique=True" : ", unique=False";

				// Add size, default value, and other properties to field code
				if (fieldType !== "ForeignKey") {
					fieldCode += `max_length=${size}`;
					if (defaultValue !== "") {
						fieldCode += `, default='${defaultValue}'`;
					}
				}

				fieldCode += `${primaryKey}${isNull}${isBlank}${isUnique})\n\n`;
				

				// Add this field's code to the class code
				generatedCode += fieldCode;
				});

			// Add return self boilerplate structure
			generatedCode += `    def __str__(self):\n`;
			generatedCode += `        return self.${className}\n`;

			// Add an empty line between classes
			generatedCode += "\n";
		});

		// Put the generated code inside the 'code-section' element
		const codeSection = document.getElementById("code-section");
		codeSection.textContent = generatedCode;

		// TODO: Generate models code
		codeSection.hidden = false;
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

function buildCopyrightContent() {
	const copyrightText = document.getElementById("footer-text");
	const year = new Date().getFullYear();

	copyrightText.textContent = `Copyright © ${year}, Anthony Carneiro da Silva, All rights reserved`;
}

//// TODO: Dragging classes to re-order
//const draggableElements = document.querySelectorAll('[draggable="true"]');
//let draggedElement = null;
//
//// Add drag event listeners to each draggable element
//draggableElements.forEach((element) => {
//	element.addEventListener('dragstart', (e) => {
//		draggedElement = e.target;
//		e.dataTransfer.setData('text/plain', ''); // Required for Firefox
//	});
//
//	element.addEventListener('dragover', (e) => {
//		e.preventDefault();
//	});
//
//	element.addEventListener('dragenter', (e) => {
//		e.preventDefault();
//	});
//
//	element.addEventListener('drop', (e) => {
//		e.preventDefault();
//		if (draggedElement !== null) {
//			// Swap the positions of the dragged element and the drop target
//			const parent = element.parentNode;
//
//			// Find the index of the dragged element and the drop target
//			const draggedIndex = Array.from(parent.children).indexOf(draggedElement);
//			const dropIndex = Array.from(parent.children).indexOf(element);
//
//			// Swap the positions
//			if (draggedIndex !== -1 && dropIndex !== -1) {
//				parent.insertBefore(draggedElement, element);
//				parent.insertBefore(element, draggedElement);
//			}
//
//			draggedElement = null;
//		}
//	});
//
//});

// Copy code block content to clipboard when clicking
const codeBlock = document.getElementById("code-block");
codeBlock.onclick = function() {
  document.execCommand("copy");
}
codeBlock.addEventListener("copy", function(event) {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", codeBlock.textContent);
    console.log(event.clipboardData.getData("text"))
  }
});

// Auto-run functions when page loads
window.addEventListener('load', buildCopyrightContent);

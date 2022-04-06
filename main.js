const taskInputContent = document.getElementById('task-content');
const addTaskBtn = document.getElementById('add-task-btn');
const createNoteBtn = document.getElementById('create-note-btn');
const todosList = document.getElementById('todos-list');
const selectedCategory = document.getElementById('selectedCategory');
const addTodoWrapper = document.getElementById('add-todo-wrapper');
const taskInputName = document.getElementById('task-name');
const footerContent = document.getElementById('footer-content')
const showArchived = document.getElementById('header-archive-btn')
const listNameActive = document.getElementById('list-name-active')
const listNameArchive = document.getElementById('list-name-archive')

const iconsList = {
	task: '<ion-icon name="cart-outline"></ion-icon>',
	randomThougth: '<ion-icon name="chatbubbles-outline"></ion-icon>',
	idea: '<ion-icon name="bulb-outline"></ion-icon>',
	quote: '<ion-icon name="chatbubbles-outline"></ion-icon>',
}
let visibleArchive = {
	visible: false
}
let tasks = [
	{
		name: "Shopping list",
		created: '2012-01-26T13:51:50.417-07:00',
		category: "task",
		content: "Tomatoes, bread",
		editDate: "",
		icon: iconsList.task,
		active: true,
		editStatus: false,
	},
	{
		name: "The theory of evolution",
		created: '2012-01-26T13:51:50.417-07:00',
		category: 'randomThougth',
		content: "The evolution...",
		editDate: "",
		icon: iconsList.randomThougth,
		active: true,
		editStatus: false,
	},
	{
		name: "New Feature",
		created: '2012-01-26T13:51:50.417-07:00',
		category: 'idea',
		content: "Implemented new feature",
		editDate: "",
		icon: iconsList.idea,
		active: true,
	},
	{
		name: "William Gaddis",
		created: '2012-01-26T13:51:50.417-07:00',
		category: "quote",
		content: "Power doesn't continue ",
		editDate: "",
		icon: iconsList.quote,
		active: true,
	},
	{
		name: "Books",
		created: '2012-01-26T13:51:50.417-07:00',
		category: "task",
		content: "The Learn Startap",
		editDate: "",
		icon: iconsList.task,
		active: true,
	},

];
let archiveTasks = []

let resultFind = [];
function addArchiveTask() {
	archiveTasks = tasks.filter(item => item.active == !true)

}
function formatText(text) {
	let newText = text.slice(0, 16)+"..."
	if (text.length > 20) {
		return newText
	}
	return text
}
function archivedTask(index) {
	tasks[index].active = !tasks[index].active


	if (!tasks[index].active) {
		fillHtmlList()
	}
	if (tasks[index].active) {
		fillHtmlArchivedList()
	}
	addFooterContent()

}

function fillHtmlArchivedList() {
	todosList.innerHTML = " ";
	tasks.forEach((item, index) => {
		if (!item.active) {
			todosList.innerHTML += createTemplate(item, index);
		}
	});


}
let search = () => {

	return tasks.forEach((item) => {

		let findTask = tasks.find(item => item.category == "task")
		let findIdea = tasks.find(item => item.category == "idea")
		let findQuote = tasks.find(item => item.category == "quote")
		let findRandomThougth = tasks.find(item => item.category == "randomThougth")
		if (item.category == "task" && !resultFind.includes(findTask)) {
			resultFind.push(item)
		};

		if (item.category == "idea" && !resultFind.includes(findIdea)) {
			resultFind.push(item)
		};
		if (item.category == "quote" && !resultFind.includes(findQuote)) {
			resultFind.push(item)
		};
		if (item.category == "randomThougth" && !resultFind.includes(findRandomThougth)) {
			resultFind.push(item)
		};

	})
}
function Task(content, category, editDate = "", name, icon, active = true) {

	this.name = name;
	this.content = content;
	this.created = new Date;
	this.category = category;
	this.editDate = editDate;
	this.icon = icon;
	this.active = active;
}
function transformDate(date) {
	let month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec']
	let newDate = new Date(Date.parse(date))
	return month[newDate.getMonth()] + ' ' + newDate.getDate() + " " + newDate.getFullYear()
}
function searchTasksLength(category, active) {
	let result = tasks.filter(item => item.category == category && item.active == active).length

	return result

}
function createFooterTamplate(task) {

	let actTask = searchTasksLength(task.category, true)
	let archiTask = searchTasksLength(task.category, false)
	
	return `
	    
		    <div class="footer-item">
	                <div class="footer-item-name">
								<div class="item-icon">${task.icon}</div>
								<div>${task.category}</div>
					</div>
					<div class="footer-item-status">
						<div class="active">${actTask}</div>
						<div class="archived">${archiTask}</div>
					</div>
					
			</div>
	        
	`
}
function addFooterContent() {
	footerContent.innerHTML = "";

	resultFind.forEach((item) => {
		footerContent.innerHTML += createFooterTamplate(item)

	})

}
const createTemplate = (task, index) => {
    let content=formatText(task.content)

	return `
	<div class="todo-item">
	    <div class="item-name">
			<div class="item-icon">${task.icon}</div>
			<div>${task.name}</div>
		</div>
		<div class="date-created">${transformDate(task.created)}</div>
		<div class="category">${task.category}</div>
		
	   <div class="item-content" id=${"item-content" + index}>${content}</div>
		<div class="edit-date">${task.editDate}</div>
	    
		<div class="buttons">
		    <button class="btn-delete" type="button">
		         <ion-icon size="large" name="pencil-outline" onClick='editTask(${index})'}></ion-icon>
			</button>
		
		  	<button class="btn-delete" type="button" onClick='archivedTask(${index})'>
			  	<ion-icon size="large" name="archive"></ion-icon> 
			</button>
	        
			 <button class="btn-delete" type="button" onClick='deleteTask(${index})'>
			 <ion-icon size="large" name="trash"></ion-icon>
		 </button>
		</div>
    </div>
	`
}

function editTask(index) {

	let editStatus = tasks[index].editStatus

	if (!editStatus) {
		let newContent = (document.getElementById("item-content" + index))

		newContent.innerHTML = ` <input   id="inputValue" value="${tasks[index].content}">`
		tasks[index].editStatus = !tasks[index].editStatus
	}
	if (editStatus) {
		addNewTaskText(index)
		tasks[index].editStatus = !tasks[index].editStatus

	}


}
function addNewTaskText(index) {
	let newText = (document.getElementById("inputValue"))

	tasks[index].content = newText.value
	tasks[index].editDate = transformDate(tasks[index].created) + " ," + transformDate(new Date)
	newText.value = ""
	fillHtmlList()
}
function fillHtmlList() {
	todosList.innerHTML = " ";
	tasks.forEach((item, index) => {
		if (item.active) {
			todosList.innerHTML += createTemplate(item, index);
		}
	})
}
fillHtmlList();
addTaskBtn.addEventListener('click', () => {
	let icon = iconsList[selectedCategory.value];
	tasks.push(new Task(taskInputContent.value, selectedCategory.value, '', taskInputName.value, icon));
	taskInputName.value = '';
	taskInputContent.value = '';
	createNewNote();
	fillHtmlList();
	search();
	addFooterContent();
	console.log(tasks.filter(item => item.category == "task").length);
	console.log(tasks)
})

function createNewNote() {
	addTodoWrapper.hidden = !addTodoWrapper.hidden;
}
const deleteTask = index => {
	tasks.splice(index, 1);
	fillHtmlList();
	addFooterContent()
}
createNoteBtn.addEventListener('click', () => {
	createNewNote()

})
showArchived.addEventListener("click", () => {

	visibleArchive.visible = !visibleArchive.visible
	if (visibleArchive.visible) {
		fillHtmlArchivedList();
        showArchived.className="header-archive-btn-black"
	}
	else {
		fillHtmlList()
        showArchived.className="header-archive-btn"
	}
})
search()
addFooterContent()


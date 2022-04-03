const deskTaskInput = document.getElementById('description-task');
const addTaskBtn = document.getElementById('add-task-btn');
const createNoteBtn = document.getElementById('create-note-btn');
const todosList = document.getElementById('todos-list');
const selectedCategory = document.getElementById('selectedCategory');
const addTodoWrapper = document.getElementById('add-todo-wrapper');
let tasks = [
	{
		name: "Shopping list",
		created: '2012-01-26T13:51:50.417-07:00',
		category: 'Task',
		content: "Tomatoes, bread",
		editDate: "",
	},

];
function Task(content, category) {
	this.content = content;
	this.created = new Date;
	this.category = category;
}
function transformDate(date) {
	let month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec']
	let newDate = new Date(Date.parse(date))
	return month[newDate.getMonth()] + ' ' + newDate.getDate() + " " + newDate.getFullYear()
}
const createTemplate = (task, index) => {
	return `
	<div class="todo-item">
	    
		<div class="item-name">
			<div class="item-icon"><ion-icon name="cart-outline"></ion-icon></div>
			<span>${task.name}</span>
		</div>
		<div class="created">${transformDate(task.created)}</div>
		<div class="category">${task.category}</div>
		
	    <div class="item-content">${task.content}</div>
		<div class="editDate">${task.editDate}</div>
	    
		<div class="buttons">
		    <button class="btn-delete" type="button">
		         <ion-icon name="pencil-outline"></ion-icon>
			</button>
		
		  	<button class="btn-delete" type="button">
			  	<ion-icon size="medium" name="archive"></ion-icon> 
			</button>
	        <button class="btn-delete" type="button" onClick='deleteTask(${index})'>
			 	<ion-icon name="trash"></ion-icon>
			 </button>
		</div>
    </div>
	`
}


const fillHtmlList = () => {
	todosList.innerHTML = ""
	tasks.forEach((item, index) => {
		todosList.innerHTML += createTemplate(item, index);
	})

}
fillHtmlList();
addTaskBtn.addEventListener('click', () => {
	tasks.push(new Task(deskTaskInput.value, selectedCategory.value));
	deskTaskInput.value = '';
	createNewNote();
	fillHtmlList();
	
})
const createNewNote = () => {
	addTodoWrapper.hidden = !addTodoWrapper.hidden;
}
const deleteTask = index => {
	tasks.splice(index, 1);
	fillHtmlList()
}
createNoteBtn.addEventListener('click', () => {
	createNewNote()
	
})

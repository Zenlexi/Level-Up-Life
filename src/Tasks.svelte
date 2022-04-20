<!-- SCRIPT HERE -->
<script>
	import { userEXP } from './stores.js';
	import { todos } from './stores.js';
	import { fade } from 'svelte/transition';
	import AddTask from './AddTask.svelte';

	let exp;
	let todoList;
	let showAdd = false;


	userEXP.subscribe(value => {
		exp = value;
	});
	todos.subscribe(value =>{
		todoList = value;
	});

	function checkRecurrance(){
		let today = new Date();
		console.log(today)
		//Convert to YYYY-MM-DD
		let todayString = convertDate(today);
		console.log(todayString)
		//Go through the todo list
		for (let i = 0; i < todoList.length; i++){
			let dueDate = todoList[i].due;
			//If a daily task and the date is for today
			if (dueDate === today && todoList[i].freq == "daily"){
				$todos[i].done = false;
			}
		}
	}

	function addClick() {
		if(showAdd){
			showAdd = false;
		}else{
			showAdd = true;
		}
	}

	function convertDate(date){
		const offset = date.getTimezoneOffset()
		date = new Date(date.getTime() - (offset*60*1000))
		let converted = date.toISOString().split('T')[0]
		return converted;
	}

	function createCheckDate(date, todo){
		let year = todo.due.substring(0,4) // (inclusive, exclusive)
		let month = todo.due.substring(5,7)
		let day = todo.due.substring(8,10)
		date.setYear(year)
		date.setMonth(parseInt(month)-1)
		date.setDate(day)
		return date;
	}

	function remove(todo){
		$todos = $todos.filter(t => t !== todo);
	}

	function mark(todo, done){
		todo.done = done;
		if (!done){
			userEXP.update(n => n-todo.exp);
			remove(todo);
			$todos = $todos.concat(todo);
		} else {
			userEXP.update(n => n+todo.exp);
			//Update date based on recurrance
			let checkDate = new Date()
			let today = new Date()
			let checker = new Date()
			switch (todo.freq){
				case "daily":
					//Convert to date
					checkDate = createCheckDate(checkDate, todo);
					checker = checkDate;
					// UPDATING DUE DATE
					//Compare against today
					if (checkDate <= today){
						//Add a day
						checker.setDate(checkDate.getDate() + 1)
						if (checker < today){
							checkDate.setDate(today.getDate() + 1);
						} else { checkDate.setDate(checkDate.getDate() + 1); }
						//Convert to string YYYY-MM-DD
						todo.due = convertDate(checkDate);
					} else { checkDate.setDate(checkDate.getDate() + 1); }
					break;
				case "weekly":
					checkDate = createCheckDate(checkDate, todo);
					checker = checkDate;
					if (checkDate <= today){
						checker.setDate(checkDate.getDate() + 7)
						if (checker < today){
							let weekday = checkDate.getDay();
							let currentDay = today.getDay();
							let distance = 7-(currentDay - weekday);
							today.setDate(today.getDate()+distance)
							checkDate = today
						} else { checkDate.setDate(checkDate.getDate() + 7); }
						todo.due = convertDate(checkDate);
					} else { checkDate.setDate(checkDate.getDate() + 7); }
					break;
				case "monthly":
					checkDate = createCheckDate(checkDate, todo);
					checker = checkDate;
					if (checkDate <= today){
						checker.setMonth(checkDate.getMonth() + 1)
						if (checker < today){
							checkDate.setMonth(today.getMonth() + 1);
						} else { checkDate.setMonth(checkDate.getMonth() + 1); }
						todo.due = convertDate(checkDate);
					} else { checkDate.setMonth(checkDate.getMonth() + 1); }
					break;
				case "yearly":
					checkDate = createCheckDate(checkDate, todo);
					checker = checkDate;
					if (checkDate <= today){
						checker.setFullYear(checkDate.getFullYear() + 1);
						if (checker < today){
							checkDate.setFullYear(today.getFullYear() + 1);
						} else { checkDate.setFullYear(checkDate.getFullYear() + 1); }
						todo.due = convertDate(checkDate);
					} else { checkDate.setFullYear(checkDate.getFullYear() + 1); }
					break;
				default:
					break;
			}

			remove(todo);
			$todos = $todos.concat(todo);
		}
	}

	checkRecurrance();

</script>

<!-- HTML HERE -->
{#if showAdd}
	<AddTask on:close={addClick}/>
{/if}

<!--To Do List-->
<div in:fade = "{{delay: 500, duration: 300}}" out:fade = "{{duration: 300}}" class = "todoListContainer window">
	<div class = "windowHeader">
		<p>To-Do List</p>
		<div on:click={addClick} class = "add">+</div>
	</div>
	<div class = "windowContent">
		{#each todoList.filter(t => !t.done) as todo (todo.id)}
			<label>
				<input type=checkbox on:change={() => mark(todo, true)}>
				{todo.description}
				<p class = "todoEXP">EXP: {todo.exp}</p>
				<p class = "todoEXP">Due: {todo.due}</p>
				<button on:click={() => remove(todo)} class = "remove">&times;</button>
			</label>
		{/each}
	</div>
</div>

<!-- Done List -->
<div in:fade = "{{delay: 500, duration: 300}}" out:fade = "{{duration: 300}}" class = "doneListContainer window">
	<div class = "windowHeader">
		<p>Completed Tasks</p>
	</div>
	<div class = "windowContent">
		{#each todoList.filter(t => t.done) as todo (todo.id)}
			<label>
				<input type=checkbox checked on:change={() => mark(todo, false)}>
				{todo.description}
				<p class = "todoEXP">EXP: {todo.exp}</p>
				<p class = "todoEXP">Due: {todo.due}</p>
				<button on:click={() => remove(todo)} class = "remove">&times;</button>
			</label>
		{/each}
	</div>
</div>

<!-- CSS HERE -->
<style>
	label, label p{
		color: var(--TEXT);
	}
	label{
		position: relative;
		display:block;
		width:100%;
	}
	.todoEXP{
		font-size: 10px;
		width:fit-content;
	}
	.todoListContainer, .doneListContainer{
		height: calc(100% - 1rem);
		width: calc(100% - .5rem);
	}
	.todoListContainer{
		grid-area: todo;
	}
	.doneListContainer{
		grid-area: done;
	}
	.remove{
		position:absolute;
		top:0;
		right:0;
	}
</style>

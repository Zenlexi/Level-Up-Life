<!-- SCRIPT HERE -->
<script>
	import { bucket } from './stores.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let title = '';
	let difficulty = '';
	let bucketList;
	let uid = 0;
	let uidList = [];

	bucket.subscribe(value =>{
		bucketList = value;
	});

	checkIDs()

	function checkIDs(){
		for (var i = 0; i < todoList.length; i++){
			let objSlice = todoList.slice(i,i+1);
			uidList.push(objSlice[0].id)
		}
		for (var j = 0; j < uidList.length; j++){
			if (uid == uidList[j]){
				uid++
			}
		}
	}

	function addTask(){
		let newTask = {
			id: bucketList.length === 0 ? 1 : bucketList[bucketList.length-1].id + 1,
			description: title,
			exp: 0,
			difficulty: difficulty,
			done: false
		};
		switch (difficulty){
			case "easy":
				newTask.exp = 10;
				break;
			case "medium":
				newTask.exp = 20;
				break;
			case "hard":
				newTask.exp = 30;
				break;
			default:
				newTask.exp = 10;
				break;
		}
		$bucket = [...$bucket, newTask];

	}

	function close(){
		dispatch('close');
	}

</script>

<!-- HTML HERE -->
<div class = "addContainer window">
	<div class = "windowHeader">
		<p>Add A New Bucket List Task</p>
		<div class = "close" on:click={close}>&times;</div>
	</div>
	<div class = "windowContent">
		<label for="taskTitle">Task Title</label><br>
		<input bind:value={title} name="taskTitle" id="taskTitle" placeholder="Task Title">
		<p>Select Task Difficulty</p>
		<input type="radio" bind:group={difficulty} id="easy" name="difficulty" value="easy">
		<label for="easy">Easy</label><br>
		<input type="radio" bind:group={difficulty} id="medium" name="difficulty" value="medium">
		<label for="medium">Medium</label><br>
		<input type="radio" bind:group={difficulty} id="hard" name="difficulty" value="hard">
		<label for="hard">Hard</label><br>
		<button on:click={addTask}>Add Task</button>
	</div>
</div>

<!-- CSS HERE -->
<style>
	.addContainer{
		width: 35vw;
		position: fixed;
		top: calc(50% - (75vh / 2));
		left: calc(50% - (35vw / 2));
		z-index: 5;
		background-color: var(--MAIN);
		color: var(--TEXT);
	}
	#taskTitle{
		height: 1rem;
		width: calc(100% - 1rem - 4px);
		padding: .5rem;
		border: 2px solid var(--ACC2);
	}
	#taskTitle:focus-visible{
		outline:2px solid var(--ACC1);
	}
</style>

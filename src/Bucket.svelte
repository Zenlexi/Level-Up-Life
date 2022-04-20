<!-- SCRIPT HERE -->
<script>
	import { userEXP, bucket } from './stores.js';
	import { fade } from 'svelte/transition';
	import AddBucket from './AddBucket.svelte';

	let exp;
	let bucketList;
	let showAdd = false;

	userEXP.subscribe(value => {
		exp = value;
	});
	bucket.subscribe(value =>{
		bucketList = value;
	});

	function remove(task){
		$bucket = bucketList.filter(t => t !== task);
	}

	function mark(task, done){
		task.done = done;
		if (!done){
			userEXP.update(n => n-task.exp);
			remove(task);
			bucketList = bucketList.concat(task);
		} else {
			userEXP.update(n => n+task.exp);
			remove(task);
			bucketList = bucketList.concat(task);
		}
	}

	function addClick() {
		if(showAdd){
			showAdd = false;
		}else{
			showAdd = true;
		}
	}

</script>

<!-- HTML HERE -->
{#if showAdd}
	<AddBucket on:close={addClick}/>
{/if}

<div in:fade = "{{delay: 500, duration: 300}}" out:fade = "{{duration: 300}}" class = "todoBucket window">
	<div class = "windowHeader">
		<p>Bucket List</p>
		<div class = "add" on:click={addClick}>+</div>
	</div>
	<div class = "windowContent">
		{#each bucketList.filter(t => !t.done) as task (task.id)}
			<label>
				<input type=checkbox on:change={() => mark(task, true)}>
				{task.description}
				<p class = "todoEXP">EXP: {task.exp}</p>
				<button on:click={() => remove(task)} class = "remove">&times;</button>
			</label>
		{/each}
	</div>
</div>

<div in:fade = "{{delay: 500, duration: 300}}" out:fade = "{{duration: 300}}" class = "doneBucket window">
	<div class = "windowHeader">
		<p>Completed Bucket List</p>
	</div>
	<div class = "windowContent">
		{#each bucketList.filter(t => t.done) as task (task.id)}
			<label>
				<input type=checkbox checked on:change={() => mark(task, false)}>
				{task.description}
				<p class = "todoEXP">EXP: {task.exp}</p>
				<button on:click={() => remove(task)} class = "remove">&times;</button>
			</label>
		{/each}
	</div>
</div>


<!-- STYLES HERE -->
<style>
	label{
		position: relative;
		display:block;
		width:100%;
	}
	.todoBucket, .doneBucket{
		height: calc(100% - 1rem);
		width: calc(100% - .5rem);
	}
	.todoEXP{
		font-size: 10px;
	}
	.todoBucket{
		grid-area: todo;
	}
	.doneBucket{
		grid-area: done;
	}
	.remove{
		position:absolute;
		top:0;
		right:0;
	}
</style>

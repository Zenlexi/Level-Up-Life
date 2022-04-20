<!-- SCRIPT HERE -->
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleClick(id){
		dispatch('menuButton', id);
	}

	let menuButts = [
		{
			text:"Tasks",
			id: 1
		},
		{
			text: "Bucket List",
			id: 2
		},
		{
			text: "Settings",
			id: 3
		}
	];

</script>

<!-- HTML HERE -->
<section class = "menuContainer">
	<p class = "align menuHeader">Menu</p>
	<ul class = "align">
		{#each menuButts as menuButt}
			<li><button class = "menuButton" on:click={() => handleClick(menuButt.id)}>{menuButt.text}</button></li>
		{/each}
	</ul>
</section>

<!-- STYLES HERE -->
<style>
	.menuContainer{
		grid-area: menu;
		background-color: var(--ACC1);
		width: 250px;
		height: calc(100% + .5rem);
	}
	.menuHeader{
		font-size: 1.25rem;
	}
	.align{
		margin-left: 2rem;
		padding-left: 0;
	}
	li{
		list-style: none;
		margin-top: .5rem;
	}
</style>

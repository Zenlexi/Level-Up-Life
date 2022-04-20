<script>
	export let version;

	import Menu from './Menu.svelte';
	import Tasks from './Tasks.svelte';
	import Bucket from './Bucket.svelte';
	import Footer from './Footer.svelte';
	import Stats from './Stats.svelte';
	import Settings from './Settings.svelte';

	let showTasks = true;
	let showBucket = false;
	let showSettings = false;

	function menuClick(event){
		switch (event.detail){
			case 1:
				showBucket = false;
				showSettings = false;
				showTasks = true;
				break;
			case 2:
				showTasks = false;
				showSettings = false;
				showBucket = true;
				break;
			case 3:
				showTasks = false;
				showBucket = false;
				showSettings = true;
				break;
			default:
				showBucket = false;
				showSettings = false;
				showTasks = true;
				break;
		}
	}
</script>

<main>
	<Menu on:menuButton={menuClick}/>
	<Stats/>
	{#if showTasks}<Tasks/>{/if}
	{#if showBucket}<Bucket/>{/if}
	{#if showSettings}<Settings/>{/if}
	<Footer v={version}/>
</main>
<!--Add/-->

<style>
main{
	width:100vw;
	height:100vh;
	display:grid;
	grid-template-columns: 1fr 489px 489px 1fr;
	grid-template-rows: 1fr 80vh 2rem;
	grid-gap: .5rem;
	grid-template-areas:
		"menu status status ."
		"menu todo done."
		"footer footer footer footer";
}


</style>

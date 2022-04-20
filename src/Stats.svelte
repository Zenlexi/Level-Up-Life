<!-- SCRIPT HERE -->
<script>
	import { userEXP, userName, dailyEXP } from './stores.js';

	const time = new Date().getHours();
	let exp;
	userEXP.subscribe(value => {
		exp = value;
	});
	let name;
	userName.subscribe(value =>{
		name = value;
	});

</script>

<!-- HTML HERE -->
<div class = "statusContainer window">
	<div class = "windowHeader"></div>
	<div class = "windowContent">
		{#if time >= 5 && time < 12}
			<p>Good morning, {name}!</p>
		{:else if time >= 12 && time < 17}
			<p>Good afternoon, {name}!</p>
		{:else if time >= 17 && time < 5}
			<p>Good evening, {name}!</p>
		{:else}
			<p>Hello, {name}!</p>
		{/if}
		<div class = "userStats"></div>
		<div class = "expStats"></div>
	</div>
</div>

<!-- STYLES HERE -->
<style>
	.statusContainer{
		grid-area: status;
	}
</style>

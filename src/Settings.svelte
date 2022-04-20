<!-- SCRIPT HERE -->
<script>
	import { userName, birthday } from './stores.js';
	import { fade } from 'svelte/transition';


	let user;
	userName.subscribe(value => {
		user = value;
	});
	let birth;
	birthday.subscribe(value =>{
		birth = value;
	})
	let settingName = "";
	let settingid = "";
	let settings = [
		{
			id: 1,
			description: "User Settings"
		},
		{
			id: 2,
			description: "Color Settings"
		}
	]

	function openSettings(id){
		settingid = id - 1;
		settingName = settings[settingid].description;
	}
	function updateSettings(){
		userName.update((u) => u = user);
		birthday.update((u) => u = birth);
	}
</script>

<!-- HTML HERE -->
<div class = "settingsList window" in:fade = "{{delay: 500, duration: 300}}" out:fade = "{{duration: 300}}">
	<div class = "windowHeader">
		<p>Settings</p>
	</div>
	<div class = "windowContent">
		<ul>
			{#each settings as setting}
				<li on:click={() => openSettings(setting.id)}>{setting.description}</li>
			{/each}
		</ul>
	</div>
</div>

<div class = "settingsOptions window" in:fade = "{{delay: 500, duration: 300}}" out:fade = "{{duration: 300}}">
	<div class = "windowHeader">
		<p>{settingName}</p>
	</div>
	<div class = "windowContent">
		{#if settingName === "User Settings"}
			<div class = "userSettings">
				<label>
					Username:
					<input bind:value={user}>
				</label><br>
				<label>
					Birthday:
					<input type="date" bind:value={birth}>
				</label><br>
				<button on:click={updateSettings}>Save Settings</button>
			</div>
		{/if}
	</div>
</div>

<!-- STYLES HERE -->
<style>
	.settingsList{
		grid-area: todo;
	}
	.settingsOptions{
		grid-area: done;
	}
	ul{
		margin:0;
		padding:0;
	}
	li {
		list-style-type: none;
		margin-top: .5rem;
		padding: .5rem .25rem;
		transition: .3s ease-in-out;
	}
	li:hover{
		background-color: rgba(0,0,0,.2);
		cursor:pointer;
	}
</style>

<!-- SCRIPT HERE -->
<script>
	export let v;
</script>

<!-- HTML HERE -->
<footer>
	<div></div>
	<p>Version {v}</p>
	<p>Designed and Developed by Kaelyn Lang, 2022</p>
	<div></div>
</footer>

<!-- CSS HERE -->
<style>
	footer{
		display:grid;
		grid-area: "footer";
		grid-template-columns: repeat(4, auto);
		grid-gap: .5rem;
		background-color: var(--ACC1);
		height: 2rem;
		width: 100vw;
		margin: 0;
		position: fixed;
		bottom: 0;
	}
	footer p{
		justify-self: center;
		margin:0;
		line-height: 2rem;
	}
</style>

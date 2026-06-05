<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '$lib/global-landing-page.css';
	import Footer from '$lib/Footer.svelte';
</script>

<div class="landing-page">
	<main>
		<slot />
	</main>
	<Footer/>
</div>

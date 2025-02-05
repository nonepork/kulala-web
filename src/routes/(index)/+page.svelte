<script>
	import './modal.css';
	import './font-settings.css';
	import './grid.css';
	import HeadComponent from '$lib/HeadComponent.svelte';

	// const DOWNLOAD_BASE = 'https://github.com/mistweaverco/kulala/releases/latest/download/';

	/**
	 * @type {boolean}
	 */
	let modalLinuxDownloadIsActive = false;

	const toggleModalLinuxDownload = () => {
		modalLinuxDownloadIsActive = !modalLinuxDownloadIsActive;
	};
</script>

<HeadComponent
	data={{
		title: 'Kulala',
		description:
			'Kulala is a a minimal REST-Client Interface and set of tools for working with RESTful APIs. It also supports GraphQL.'
	}}
/>

<div class="modal {modalLinuxDownloadIsActive ? 'is-active' : ''}">
	<div class="modal-background"></div>
	<div class="modal-content">
		<button on:click={toggleModalLinuxDownload} class="modal-close is-large" aria-label="close">
			<span aria-hidden="true">&times;</span>
		</button>
		<div class="box">
			<button class="button is-debian">
				<!-- <a href="{DOWNLOAD_BASE}Kulala_amd64.deb"> -->
				<a href="https://github.com/mistweaverco/kulala">
					<span class="icon">
						<i class="fa-brands fa-debian"></i>
					</span>
					<span>.deb</span>
				</a>
			</button>
			<button class="button is-snap">
				<!-- <a href="{DOWNLOAD_BASE}Kulala_amd64.snap"> -->
				<a href="https://github.com/mistweaverco/kulala">
					<span class="icon">
						<i class="fa-brands fa-linux"></i>
					</span>
					<span>.snap</span>
				</a>
			</button>
			<button class="button is-appimage">
				<!-- <a href="{DOWNLOAD_BASE}Kulala_x86_64.AppImage"> -->
				<a href="https://github.com/mistweaverco/kulala">
					<span class="icon">
						<i class="fa-solid fa-gear"></i>
					</span>
					<span>.AppImage</span>
				</a>
			</button>
			<button class="button is-flatpak">
				<!-- <a href="{DOWNLOAD_BASE}Kulala_x86_64.flatpak"> -->
				<a href="https://github.com/mistweaverco/kulala">
					<span class="icon">
						<i class="fa-solid fa-cube"></i>
					</span>
					<span>.flatpak</span>
				</a>
			</button>
		</div>
	</div>
</div>

<div class="container is-intro">
	<div class="inner">
		<img class="logo" src="/logo.svg" alt="Kulala logo" />
		<header>Kulala</header>
		<a href="https://neovim.getkulala.net">
			<img class="badge" src="/badge-neovim.svg" alt="neovim" />
		</a>
		<a href="https://getkulala.net/discord">
			<img class="badge" src="/badge-discord.svg" alt="Join our Discord" />
		</a>
		<a href="https://www.lua.org/">
			<img class="badge" src="/badge-made-with-lua.svg" alt="Made with lua" />
		</a>
		<a href="https://www.typescriptlang.org/">
			<img class="badge" src="/badge-typescript.svg" alt="Made with TypeScript" />
		</a>
		<a href="https://www.electronjs.org/">
			<img class="badge" src="/badge-electron.svg" alt="Made with Electron" />
		</a>
		<a href="https://vite.dev/">
			<img class="badge" src="/badge-vite.svg" alt="Powered by Vite" />
		</a>
		<a href="https://github.com/mistweaverco/kulala.nvim/graphs/contributors">
			<img class="badge" src="/badge-made-with-love.svg" alt="Made with love by the community" />
		</a>

		<hr />

		<div class="download-buttons">
			<!-- <a href="https://github.com/mistweaverco/kulala/releases/latest/download/Kulala-setup_x64.exe"> -->
			<button class="button is-windows">
				<a
					href="https://github.com/mistweaverco/kulala"
				>
					<span class="icon"><i class="fa-brands fa-windows"></i></span> <span>Windows</span></a
				>
			</button>
			<!-- <a href="https://github.com/mistweaverco/kulala/releases/latest/download/Kulala_universal.dmg"> -->
			<button class="button is-mac"
				><a
					href="https://github.com/mistweaverco/kulala"
					><span class="icon"><i class="fa-brands fa-apple"></i></span> <span>Mac</span></a
				></button
			>
			<button on:click={toggleModalLinuxDownload} class="button is-linux">
				<span class="icon">
					<i class="fa-brands fa-linux"></i>
				</span>
				<span>Linux</span>
			</button>
		</div>
		<p>
			Kulala is a <strong>minimal REST-Client Interface</strong> and set of tools for working with
			<strong>RESTful APIs</strong>. It also supports <strong>GraphQL</strong>.
		</p>
	</div>
</div>

<hr />

<div class="container is-more">
	<div class="inner">
		<h2>Availibility</h2>
		<p>
			<strong>Kulala</strong> for Desktop is currently in active development 🚀 and not yet available
			as an official public release.
		</p>
		<p>
			While we are working hard to bring it to production, expect frequent changes and improvements.
		</p>
		<p>
			Stay tuned for
			<a href="https://bsky.app/profile/mistweaverco.com">updates</a> and follow the project on
			<a href="https://github.com/mistweaverco/kulala">Github</a>.
		</p>
		<p>
			<strong>Kulala.nvim</strong> for Neovim is generally available for
			<a href="https://github.com/mistweaverco/kulala.nvim/releases/latest">download</a> and
			<a href="https://neovim.getkulala.net/docs/usage">use</a>.
		</p>
		<p>
			<strong>kulala-ls</strong> is a language server which is available for
			<a href="https://github.com/mistweaverco/kulala-ls/releases/latest">download</a> and
			<a href="https://github.com/mistweaverco/kulala-ls?tab=readme-ov-file#configuration">use</a>.
		</p>
		<p>
			<strong>kulala-fmt</strong> is a linter and formatter which is also available for
			<a href="https://github.com/mistweaverco/kulala-fmt/releases/latest">download</a> and
			<a href="https://github.com/mistweaverco/kulala-fmt?tab=readme-ov-file#usage">use</a>.
		</p>

		<hr />

		<a href="https://mistweaverco.com">
			<img
				class="mwbadge"
				src="/mistweaverco-logo.svg"
				alt="mistweaverco"
				title="Brought to you by mistweaverco."
			/>
		</a>
	</div>
</div>

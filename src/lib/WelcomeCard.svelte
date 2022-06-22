<script>
	import { user } from "$lib/util/data";
	import { setUserWelcomed } from "$lib/util/api";
</script>

{#if $user.firstTime}
	<section class="welcome">
		<h2>Welcome</h2>
		<p>
			This is your dashboard, where you can manage all of your data in Maintained. You can create
			projects, badges, workers, and more.
		</p>
		<img src="/welcome/1.jpg" alt="Maintained Project" />
		<p>
			This is a <b>project</b>. Projects contain <b>badges</b>. You can have an unlimited number of
			projects and badges.
		</p>
		<p>
			You can edit badges by clicking on each of the fields. Badges that have more than two fields
			will overflow the rest. Click the <b>+1</b> or <b>gear icon</b> to see all of the badge fields,
			options, and other features.
		</p>
		<p>
			Badges can have icons, which are from <b>Bootstrap</b> and <b>SimpleIcons</b>. To add an icon
			to a badge field, prepend the field text with <code>:github:</code> (or whatever icon you want).
			You can have only one icon per badge field, but you can add unlimited badge fields that only contain
			icons and no text.
		</p>
		<p>
			When you're happy with your badge, click the <b>clipboard icon</b> to copy the markdown to paste
			in your project's README.
		</p>
		<br />
		<button on:click={setUserWelcomed}>Okay, got it!</button>
	</section>
{/if}

<style lang="scss">
	@import "./scss/mixins.scss";

	.welcome {
		@include dash-card;
		display: flex;
		flex-direction: column;
		flex: 1 1;
	}

	h2 {
		font-size: 1rem;
		margin: 0;
	}

	p {
		letter-spacing: 0.25px;
		line-height: 1.5;
		font-size: 0.85rem;
		margin-top: 10px;
		margin-bottom: 0;
	}

	img {
		border-radius: 10px;
		max-width: 100%;
		margin: 20px 0;
	}

	button {
		background-color: black;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		color: white;
		font-family: inherit;
		font-size: 0.8rem;
		padding: 10px;
	}
</style>

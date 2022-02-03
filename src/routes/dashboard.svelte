
<div class="dashboard">
	<nav>
		<h1>maintained</h1>
		<div>
			<a href="">New</a>
			<a href="">Help</a>
			<a href="">Account</a>
		</div>
	</nav>
	<div class="content">
		<section class="projects">
			<h3>Projects</h3>
			<ul>
				<li>Project A</li>
				<li>Project B</li>
				<li>Project C</li>
				<li>Project D</li>
				<li>Project E</li>
			</ul>
			<h3>Teams</h3>
			<ul>
				<li>Project F</li>
				<li>Project G</li>
				<li>Project H</li>
			</ul>
		</section>
		<section>
			<h2>Project A</h2>
			<p>Badges</p>
			<br>
			<h2>Project B</h2>
			<p>Badges</p>
			<br>
			<h2>Project C</h2>
			<p>Badges</p>
		</section>
	</div>
</div>

<style lang="scss">
	.dashboard {
		background-color: var(--background-primary);
		border-radius: 15px;
		box-sizing: border-box;
		max-width: 1100px;
		margin: 30px auto;
		padding: 10px 50px;
	}
	
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;

		div {
			display: flex;
			column-gap: 30px;
		}
	}

	.content {
		display: flex;
		column-gap: 80px;

		section {
			margin: 30px 0;
		}

		.projects {
			border-right: 3px solid var(--brand-b);
			margin: 30px 0;
			padding-right: 40px;
		}

		h2, h3 {
			margin: 0;
			margin-bottom: 10px;
		}

		ul {
			line-height: 2;
			list-style: none;
			padding: 0;
		}
	}
</style>
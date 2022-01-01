
<div class="dashboard">
	<nav>
		<h1>Maintained</h1>
		<div>
			<a href="">New</a>
			<a href="">Help</a>
			<a href="">Account</a>
		</div>
	</nav>
	<div class="content">
		<section class="projects">
			<h2>Projects</h2>
			<ul>
				<li>Project A</li>
				<li>Project B</li>
				<li>Project C</li>
				<li>Project D</li>
				<li>Project E</li>
			</ul>
			<h3>Shared With You</h3>
			<ul>
				<li>Project F</li>
				<li>Project G</li>
				<li>Project H</li>
			</ul>
		</section>
	</div>
</div>

<style lang="scss">
	.dashboard {
		max-width: 1000px;
		margin: auto;
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

		.projects {
			border-right: 3px solid #e73;
			margin: 30px 0;
			padding-right: 40px;
		}
	}
</style>
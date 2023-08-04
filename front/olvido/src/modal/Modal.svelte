<!-- Modal.svelte -->
<script>
	export let isOpen = false;
</script>

{#if isOpen}
	<div class="modal">
		<div class="modal-content">
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		
	}

	.modal-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #ffffff;
		padding: 30px 40px;
		width: 359px;
		border-radius: 50px;
		box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
	}
</style>

<template>
	<div class="h-screen w-screen flex flex-col justify-center items-center">
		<div class="bg-secondary-1 rounded-xl shadow-xl">
			<div class="sticky top-0 bg-primary-1 p-5 rounded-tl-xl w-full z-20">
				<h1 class="text-2xl">Formulario de adopción</h1>
			</div>
			<v-form
				class="flex flex-col gap-5 p-10 overflow-y-auto max-h-[80vh] w-[90vw]"
				@submit.prevent="onSubmit">
				<strong>Question 1</strong>
				<v-textarea label="Escribe aquí tu respuesta"></v-textarea>
				<strong>Question 2</strong>
				<v-textarea label="Escribe aquí tu respuesta"></v-textarea>
				<strong>Question 3</strong>
				<v-textarea label="Escribe aquí tu respuesta"></v-textarea>
				<strong>Question 4</strong>
				<v-textarea label="Escribe aquí tu respuesta"></v-textarea>

				<v-divider />

				<v-btn type="submit" variant="tonal" color="green" size="large">Enviar</v-btn>
			</v-form>
		</div>
	</div>
</template>

<script setup lang="ts">
const onSubmit = () => console.log('Submitted');
</script>

<template>
	<v-progress-circular indeterminate color="primary" size="75" />
	<p class="text-cyan-500">{{ loadingMessage }}</p>
</template>

<script setup lang="ts">
const messages = ref([
	'Procesando información...',
	'Generando formulario...',
	'Guardando en base de datos...',
	'Esperando respuesta del servidor...',
]);
const currentMessageIndex = ref(0);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

const loadingMessage = computed(() => {
	return messages.value[currentMessageIndex.value];
});

onMounted(() => {
	intervalId.value = setInterval(() => {
		currentMessageIndex.value = (currentMessageIndex.value + 1) % messages.value.length;
	}, 5000);
});

onUnmounted(() => {
	clearInterval(intervalId.value as ReturnType<typeof setInterval>);
});
</script>

<style scoped></style>

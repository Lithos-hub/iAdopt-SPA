<template>
	<div class="flex justify-between gap-5 items-center">
		<v-text-field
			v-if="isEditing"
			v-model="question"
			hide-details
			color="cyan"
			@blur="isEditing = !isEditing" />
		<div v-else>
			{{ question }}
		</div>
		<div class="flex gap-5">
			<v-btn icon variant="text" color="cyan" @click="toggleEditing">
				<v-icon icon="mdi-pencil" />
			</v-btn>
			<v-btn icon variant="text" color="red">
				<v-icon icon="mdi-delete" @click="$emit('delete')" />
			</v-btn>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	question: string;
}
const props = defineProps<Props>();
defineEmits(['delete']);

const question = ref('');
const isEditing = ref(false);
const toggleEditing = () => (isEditing.value = !isEditing.value);

onMounted(() => (question.value = props.question));
</script>

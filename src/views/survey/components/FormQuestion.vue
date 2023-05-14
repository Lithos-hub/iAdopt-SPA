<template>
	<div class="flex justify-between gap-5 items-center">
		<div class="flex w-full gap-5 items-center">
			<p class="text-primary">{{ index + 1 }}</p>
			<v-text-field
				v-if="isEditing"
				v-model="questionModel"
				hide-details
				color="cyan"
				@keyup.enter="onEdit" />
			<div v-else>
				{{ question }}
			</div>
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
	index: number;
}
const props = defineProps<Props>();
const emit = defineEmits(['delete', 'edit']);

const questionModel = ref('');
const isEditing = ref(false);
const toggleEditing = () => (isEditing.value = !isEditing.value);

const onEdit = () => {
	emit('edit', questionModel.value, props.index);
	toggleEditing();
};

onMounted(() => (questionModel.value = props.question));
</script>

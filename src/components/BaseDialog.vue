<template>
	<v-dialog v-model="dialog" width="800">
		<v-card>
			<v-card-title class="sticky top-0 bg-secondary-1 p-5">
				<span class="text-h5">{{ $t('EVALUATOR.RESULT') }}</span>
			</v-card-title>
			<v-card-text class="h-[500px] overflow-y-auto">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam, possimus harum ipsa
				repudiandae commodi ut est velit delectus voluptatibus rerum sed facere perspiciatis eveniet
				alias, consectetur at sint repellat inventore voluptatem. Dolore reiciendis, asperiores
				obcaecati officia reprehenderit fuga unde sequi ut quaerat et nobis aliquid ipsam dolor
				neque enim. <br /><br />
			</v-card-text>
			<v-card-actions class="sticky bottom-0 bg-secondary-2 w-full">
				<v-spacer></v-spacer>
				<v-btn color="red" variant="text" @click="$emit('close')"> {{ $t('COMMON.CLOSE') }} </v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
	open: boolean;
}>();
defineEmits(['close']);

const dialog = computed(() => props.open);
</script>

<template>
	<v-navigation-drawer permanent class="fixed">
		<div class="sticky top-0 z-20">
			<router-link to="/app/surveys/new">
				<v-btn block variant="tonal" color="primary" prepend-icon="mdi-plus" height="75">{{
					$t('COMMON.NEW_FORM')
				}}</v-btn>
			</router-link>
		</div>

		<v-list v-if="!isLoading" density="compact" nav>
			<div
				v-for="({ id, title, is_favourite }, i) of user.surveys"
				:key="i"
				class="flex justify-between items-center">
				<router-link :to="`/app/surveys/${id}`" class="w-full">
					<v-list-item prepend-icon="mdi-file" :title="title" :value="title"> </v-list-item>
				</router-link>

				<v-btn
					:color="is_favourite ? 'yellow' : 'white'"
					:icon="is_favourite ? 'mdi-star' : 'mdi-star-outline'"
					variant="text"
					@click="onToggleFavourite({ id, is_favourite: !is_favourite })" />
			</div>
		</v-list>
		<div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<v-progress-circular indeterminate size="60" width="2" color="primary" />
		</div>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { surveyHandler } from '@/services';
import { useUserStore } from '@/store/user';

// Store refs
const { isLoading, user } = storeToRefs(useUserStore());

const onToggleFavourite = async (data: { id: number; is_favourite: boolean }) =>
	await surveyHandler({
		data,
		url: `/surveys/${data.id}`,
		method: 'patch',
	});
</script>

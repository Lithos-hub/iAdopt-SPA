<template>
	<v-navigation-drawer permanent class="fixed">
		<div class="sticky top-0 z-20">
			<router-link to="/app/generator/new">
				<v-btn block variant="tonal" color="primary" prepend-icon="mdi-plus" height="75">{{
					$t('COMMON.NEW_FORM')
				}}</v-btn>
			</router-link>
		</div>

		<v-list v-if="!isLoading" density="compact" nav>
			<div
				v-for="({ id, link, title, is_favourite, questions }, i) of user.surveys"
				:key="i"
				class="flex justify-between items-center">
				<router-link :to="`/app/surveys/${id}`" class="w-full">
					<v-list-item
						:title="title"
						:value="title"
						active-color="primary"
						:active="$route.path.includes(String(id))" />
				</router-link>

				<v-btn
					:color="is_favourite ? 'yellow' : 'white'"
					:icon="is_favourite ? 'mdi-star' : 'mdi-star-outline'"
					variant="text"
					@click="onToggleFavourite({ id, link, title, questions, is_favourite: !is_favourite })" />
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
import { Survey } from '../models/survey';
import { useSnackbarStore } from '@/store/snackbar';
import { useI18n } from 'vue-i18n';

// Store refs
const { isLoading, user } = storeToRefs(useUserStore());

// Store methods
const { getUserData } = useUserStore();
const { showSnackbar } = useSnackbarStore();

const { t } = useI18n();

const onToggleFavourite = async (data: Survey) => {
	await surveyHandler({
		data,
		url: `/surveys/${data.id}`,
		method: 'patch',
	});
	await getUserData();
	showSnackbar(
		'success',
		data.is_favourite ? t('SUCCESS.SURVEY_FAVOURITED') : t('SUCCESS.SURVEY_UNFAVOURITED')
	);
};
</script>

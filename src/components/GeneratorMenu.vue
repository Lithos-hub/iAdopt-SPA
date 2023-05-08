<template>
	<v-navigation-drawer class="fixed">
		<div class="sticky top-0 z-20">
			<router-link to="/app/generator/new">
				<v-btn block variant="tonal" color="primary" prepend-icon="mdi-plus" height="75">{{
					$t('COMMON.NEW_FORM')
				}}</v-btn>
			</router-link>
		</div>

		<v-list density="compact" nav>
			<router-link
				v-for="({ title, _id }, i) of reportsItems"
				:key="i"
				:to="`/app/generator/${_id}`">
				<v-list-item prepend-icon="mdi-file-check" :title="title" :value="title" />
			</router-link>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { GeneratedReport } from '@/models';

const reportsItems: GeneratedReport[] = [
	{
		_id: '110',
		title: 'Título 1',
		isFavourite: false,
	},
	{
		_id: '111',
		title: 'Título 2',
		isFavourite: true,
	},
];
</script>

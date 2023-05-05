<template>
	<v-navigation-drawer color="black" class="fixed">
		<div class="sticky top-0 bg-secondary-2 z-20">
			<v-btn block variant="text" color="primary" prepend-icon="mdi-plus" height="75">{{
				$t('COMMON.NEW_FORM')
			}}</v-btn>
		</div>

		<v-list density="compact" nav>
			<v-list-item
				v-for="({ title }, i) of reportsItems"
				:key="i"
				prepend-icon="mdi-file-check"
				:title="title"
				:value="title" />
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
const reportsItems = [
	{
		id: 110,
		title: 'Mi cuenta',
	},
	{
		id: 111,
		title: 'Mi organización',
	},
];
</script>

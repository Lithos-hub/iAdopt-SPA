<template>
	<v-app-bar density="compact" color="primary" class="fixed text-white px-[2.5rem]">
		<nav class="flex justify-between w-full items-center">
			<router-link
				to="/"
				class="relative hover:scale-105 duration-200 flex gap-2.5 bg-secondary-1 p-1 rounded-full px-5 items-center text-primary-1 hover:text-white">
				<v-img src="/logo.png" height="22" width="22" cover aspect-ratio="1/1" />

				<h1 class="text-xl">iAdopt</h1>
			</router-link>

			<!-- <light-dark-selector /> -->
			<div class="flex gap-5">
				<router-link
					to="/app/generator/new"
					active-class="border-b-2 border-cyan-500"
					class="min-w-[120px]">
					<v-btn> {{ t('COMMON.GENERATOR') }} </v-btn>
				</router-link>
				<router-link
					to="/app/my-reports"
					active-class="border-b-2 border-cyan-500"
					class="min-w-[120px]">
					<v-btn> {{ t('COMMON.MY_REPORTS') }} </v-btn>
				</router-link>
				<language-selector />
				<v-btn color="red" variant="flat" @click="onLogout">
					{{ t('COMMON.LOGOUT') }}
				</v-btn>
			</div>
		</nav>
	</v-app-bar>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { logout } = useUserStore();
const router = useRouter();

const onLogout = () => {
	logout();
	router.push('/');
};
</script>

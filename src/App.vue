<template>
	<v-app>
		<v-main>
			<router-view />
			<base-snackbar />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import { authHanlder } from '@/services';
import { useUserStore } from '@/store/user';

const { getUserData } = useUserStore();

const router = useRouter();
onMounted(async () => {
	await authHanlder(undefined, '/auth/session', 'get').catch(() => router.push('/'));
	await getUserData();
});
</script>

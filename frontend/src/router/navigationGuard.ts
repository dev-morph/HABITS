import router from '.';
import { getUserDetail } from '@/api/userApi';

router.beforeEach(async (to, from, next) => {
	if (to.name === 'login' || to.name === 'signup') {
		console.log('nav');
		try {
			const { data } = await getUserDetail();
			console.log('data', data);
			if (data.email.length > 0) {
				next({ name: 'home' });
			} else {
				next();
			}
		} catch (error) {
			next();
		}
	} else next();
});

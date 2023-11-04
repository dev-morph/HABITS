import router from '.';
import { getUserDetail } from '@/api/userApi';

const whiteList = ['/', '/login'];
router.beforeEach(async (to, from, next) => {
	console.log('hmm');
	let loggedIn = false;
	try {
		await getUserDetail();
		loggedIn = true;
	} catch (error) {
		loggedIn = false;
	}
	if (loggedIn) {
		if (whiteList.includes(to.path)) {
			next({ name: 'home' });
		} else {
			next();
		}
	} else {
		if (whiteList.includes(to.path)) {
			next();
		} else {
			next({ name: 'login' });
		}
	}
});

import { StarGroup } from './StarGroup';

class ThemeManager {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private stageWidth = 0;
	private stageHeight = 0;
	private themeEffect;
	private theme: string;
	private raf: number;
	constructor(canvas: HTMLCanvasElement, theme: string) {
		this.canvas = canvas;
		this.theme = theme;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();
		if (this.theme === 'starryNight') {
			this.themeEffect = new StarGroup(this.stageWidth, this.stageHeight);
		}

		this.raf = requestAnimationFrame(this.animate.bind(this));
	}

	startAnimation() {
		this.resize();
		if (this.theme === 'starryNight') {
			this.themeEffect = new StarGroup(this.stageWidth, this.stageHeight);
			this.raf = requestAnimationFrame(this.animate.bind(this));
		}
	}

	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		this.canvas.width = this.stageWidth * 2;
		this.canvas.height = this.stageHeight * 2;
		this.ctx?.scale(2, 2);
		if (this.themeEffect) {
			this.themeEffect.resize(this.stageWidth, this.stageHeight);
		}
	}

	animate() {
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
		if (this.themeEffect) {
			this.ctx.globalCompositeOperation = 'lighter';
			this.themeEffect.draw(this.ctx);
			if (this.theme !== 'starryNight') {
				console.log('cancle not starryNight Theme');
				cancelAnimationFrame(this.raf);
				return;
			}
			requestAnimationFrame(this.animate.bind(this));
		}
	}

	stopAnimation() {
		console.log('theme changed!, try to stop animation');
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
		cancelAnimationFrame(this.raf);
	}

	setTheme(theme: string) {
		this.theme = theme;
		this.startAnimation();
	}
}

export default ThemeManager;

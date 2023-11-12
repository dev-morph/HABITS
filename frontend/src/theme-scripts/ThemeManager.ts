import { StarGroup } from './StarGroup';
import { Wave } from './wave';

class ThemeManager {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private stageWidth = 0;
	private stageHeight = 0;
	private wave;
	private starGroup;
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();

		this.wave = new Wave(this.stageWidth, this.stageHeight);
		this.starGroup = new StarGroup(this.stageWidth, this.stageHeight);

		requestAnimationFrame(this.animate.bind(this));
	}

	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		this.canvas.width = this.stageWidth * 2;
		this.canvas.height = this.stageHeight * 2;
		this.ctx?.scale(2, 2);
		if (this.starGroup) {
			console.log('here2', this.starGroup);
			this.starGroup.resize(this.stageWidth, this.stageHeight);
		}
	}

	animate(t: number) {
		this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);

		this.starGroup.draw(this.ctx);
		requestAnimationFrame(this.animate.bind(this));
	}
}

export default ThemeManager;

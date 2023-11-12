import { Star } from './Star';

export class StarGroup {
	private stageWidth = 0;
	private stageHeight = 0;
	private centerX = 0;
	private centerY = 0;
	private star: Star;
	private frequency = 100;

	constructor(stageWidth: number, stageHeight: number) {
		this.resize(stageWidth, stageHeight);
		this.star = new Star(this.centerX, this.centerY);
	}

	resize(stageWidth: number, stageHeight: number) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		this.centerX = stageWidth / 2;
		this.centerY = stageHeight / 2;
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.star.draw(ctx);
		// ctx.beginPath();
		// ctx.fillStyle = '#ff0000';

		// this.star.update();

		// //                x,           y, r , start, end
		// ctx.arc(this.star.x, this.star.y, 5, 0, 2 * Math.PI);
		// ctx.fill();
	}
}

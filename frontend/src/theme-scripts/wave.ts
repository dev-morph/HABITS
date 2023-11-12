import { Point } from './Point';

export class Wave {
	private stageWidth = 0;
	private stageHeight = 0;
	private centerX = 0;
	private centerY = 0;
	private point: Point;

	constructor(stageWidth: number, stageHeight: number) {
		this.resize(stageWidth, stageHeight);
		this.point = new Point(this.centerX, this.centerY);
	}

	resize(stageWidth: number, stageHeight: number) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		this.centerX = stageWidth / 2;
		this.centerY = stageHeight / 2;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.fillStyle = '#ff0000';

		this.point.update();

		ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
		ctx.fill();
	}
}

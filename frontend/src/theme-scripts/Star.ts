export class Star {
	public x;
	public y;
	public speed;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.speed = 0.1;
	}

	update() {
		this.x -= this.speed;
		this.y += this.speed;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.fillStyle = '#ff0000';

		this.update();

		//           x,      y, r , start, end
		ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		ctx.fill();
	}
}

export class Star {
	public x;
	public y;
	public lifetime;
	public speed;
	public tailSize;

	constructor(x: number, y: number, lifetime: number, tailSize: number) {
		this.x = x;
		this.y = y;
		this.lifetime = lifetime;
		this.speed = 20;
		this.tailSize = tailSize;
	}

	update() {
		this.x -= this.speed;
		this.y += this.speed;
		this.lifetime -= this.speed * 5;
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.update();
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate((135 * Math.PI) / 180); // 45 degrees in radians
		ctx.beginPath();
		ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
		ctx.shadowBlur = 8;
		ctx.shadowColor = 'black';
		ctx.rect(-25, -0.5, this.tailSize, 1); // Rect centered at (0, 0)
		ctx.fill();

		ctx.restore();
	}
}

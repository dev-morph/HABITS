import { Star } from './Star';
import { Stars } from './NewStars';

export class StarGroup {
	private stageWidth = 0;
	private stageHeight = 0;
	private startArea = { x: [0, 0], y: [0, 0] };
	private stars: Stars[] = [];
	private frequency = 5000;
	private numbersOfStar = 10;
	private lastCreatedTime;

	constructor(stageWidth: number, stageHeight: number) {
		this.resize(stageWidth, stageHeight);
		this.lastCreatedTime = 0;
		this.createStar();
	}

	resize(stageWidth: number, stageHeight: number) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;

		this.startArea.x = [this.stageWidth / 10, this.stageWidth];
		this.startArea.y = [0, this.stageHeight / 4];
	}

	getRandomNumberInRange(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	createStar() {
		const x = this.getRandomNumberInRange(this.startArea.x[0], this.startArea.x[1]);
		const y = this.getRandomNumberInRange(this.startArea.y[0], this.startArea.y[1]);
		const ttl = this.getRandomNumberInRange(100, 200);
		this.stars.push(new Stars(x, y, ttl, 5));
	}

	destroyStar(index: number) {
		this.stars.splice(index, 1);
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.lastCreatedTime++;
		if (this.lastCreatedTime <= this.frequency && this.stars.length < 2) {
			this.createStar();
			this.lastCreatedTime = 0;
		}

		for (let i = 0; i < this.stars.length; i++) {
			const star = this.stars[i];
			if (star.ttl <= star.lifetime) {
				this.destroyStar(i);
			} else {
				this.stars[i].draw(ctx);
			}
		}
	}
}

import { Star } from './Star';
import dayjs from 'dayjs';

export class StarGroup {
	private stageWidth = 0;
	private stageHeight = 0;
	private startArea = { x: [0, 0], y: [0, 0] };
	private stars: Star[] = [];
	private frequency = 1000;
	private numbersOfStar = 10;
	private lastCreatedTime;

	constructor(stageWidth: number, stageHeight: number) {
		this.resize(stageWidth, stageHeight);
		this.lastCreatedTime = dayjs();
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
		const lifetime = this.getRandomNumberInRange(1000, 2000);
		this.stars.push(new Star(x, y, lifetime, 75));
	}

	destroyStar(index: number) {
		this.stars.splice(index, 1);
	}

	draw(ctx: CanvasRenderingContext2D) {
		const cur = dayjs();
		const diff = cur.diff(this.lastCreatedTime);
		if (diff > this.frequency) {
			this.createStar();
			this.lastCreatedTime = cur;
		}

		for (let i = 0; i < this.stars.length; i++) {
			const star = this.stars[i];
			if (star.lifetime <= 0) {
				this.destroyStar(i);
			} else {
				this.stars[i].draw(ctx);
			}
		}
	}
}

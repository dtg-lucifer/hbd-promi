let highestZ = 1;

class Paper {

	holdingPaper = false;

	prevMouseX = 0;
	prevMouseY = 0;

	mouseX = 0;
	mouseY = 0;

	currentPaperX = 0;
	currentPaperY = 0;

	distanceX = 0;
	distanceY = 0;

	init(paper) {

		paper.style.filter = "blur(.3rem)"
		paper.style.opacity = "0"

		paper.addEventListener("mousedown", e => {
			this.holdingPaper = true
			paper.style.filter = "none"
			paper.style.zIndex = highestZ;
			highestZ++;

			if (e.button == 0) {
				this.prevMouseX = this.mouseX;
				this.prevMouseY = this.mouseY;
			}
		});

		paper.addEventListener("touchstart", () => {
			this.holdingPaper = true
			paper.style.filter = "none"
			paper.style.zIndex = highestZ;
			highestZ++;
		})

		document.addEventListener("mousemove", e => {
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;

			this.distanceX = this.mouseX - this.prevMouseX;
			this.distanceY = this.mouseY - this.prevMouseY;


			if (this.holdingPaper) {

				this.currentPaperX += this.distanceX;
				this.currentPaperY += this.distanceY;

				this.prevMouseX = this.mouseX;
				this.prevMouseY = this.mouseY;

				// paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
				paper.style.translate = `${this.currentPaperX}px ${this.currentPaperY}px`;
			}

		});

		document.addEventListener("touchmove", () => {
			this.mouseX = event.touches[0].clientX;
			this.mouseY = event.touches[0].clientY;

			this.distanceX = this.mouseX - this.prevMouseX;
			this.distanceY = this.mouseY - this.prevMouseY;

			if (this.holdingPaper) {

				this.currentPaperX += this.distanceX;
				this.currentPaperY += this.distanceY;

				this.prevMouseX = this.mouseX;
				this.prevMouseY = this.mouseY;

				paper.style.translate = `${this.currentPaperX}px ${this.currentPaperY}px`;
			}
		})

		window.addEventListener("mouseup", () => {
			this.holdingPaper = false;
		});

		window.addEventListener("touchend", () => {
			this.holdingPaper = false;
		})

	}
}

const papers = Array.from(document.querySelectorAll('.paper'));
const audio = new Audio("music/Shawn Mendes There's Nothing Holding Me Back (Lyrics).mp3")
const btn = document.querySelector("button")

papers.forEach(paper => {
	const p = new Paper();
	p.init(paper);
	paper.style.rotate = `${Math.random() * 15 - 5}deg`
})

window.onload = () => {
	audio.autoplay = true;
	audio.play().then().catch(() => {
		btn.addEventListener("click", () => {
			audio.play()
		})
	})
}
const audio = new Audio("music/INAAYAT Tanzeel Khan Ashi Khanna (Prod. By Nemo).mp3")
const btn = document.querySelector("button")

window.onload = () => {
	audio.currentTime = 16;
	audio.autoplay = true;
	audio.play().then().catch(() => {
		btn.addEventListener("click", () => {
			audio.play()
		})
	})
}
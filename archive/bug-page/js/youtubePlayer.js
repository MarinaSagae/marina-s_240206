export class YouTubePlayer {
  constructor(containerId, videoId) {
    this.containerId = containerId;
    this.videoId = videoId;
    this.player = null;
    this.currentPlayTime = 0;
    this.init();
  }
  init() {
    window.onYouTubeIframeAPIReady = () => this.createPlayer();
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  }
  createPlayer() {
    this.player = new YT.Player("youtube-video", {
      height: "100%",
      width: "100%",
      videoId: this.videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
        loop: 1,
        playlist: this.videoId,
      },
      events: {
        onReady: (event) => event.target.mute(),
      },
    });
  }
  openModal() {
    this.currentPlayTime = this.player.getCurrentTime();
    const youtubeContainer = document.querySelector(this.containerId);
    youtubeContainer.classList.add("open");
  }
  closeModal() {
    const youtubeContainer = document.querySelector(this.containerId);
    youtubeContainer.classList.remove("open");
  }
}

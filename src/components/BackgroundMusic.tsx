import { useRef, useState } from "react";

const BackgroundMusic = () => {
  const audio_ref = useRef<HTMLAudioElement | null>(null);
  const [is_playing, set_is_playing] = useState(false);


  const handle_toggle_play = () => {
    const audio = audio_ref.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      void audio.play().then(() => {
        set_is_playing(true);
      }).catch(() => {
        // Ignore rejected play attempts.
      });
      return;
    }

    audio.pause();
    set_is_playing(false);
  };

  return (
    <>
      <audio
        ref={audio_ref}
        src="/music/Happy-Sun-No-Copyright-Music.com-01-Happy-Sun.mp3"
        loop
        preload="auto"
      />
      <button
        type="button"
        onClick={handle_toggle_play}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-card/90 border border-border px-3 py-2 text-sm shadow-lg hover:bg-card"
        aria-label={is_playing ? "Pause background music" : "Play background music"}
      >
        {is_playing ? "⏸ Music" : "▶ Music"}
      </button>
    </>
  );
};

export default BackgroundMusic;

import React, { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.js'

const WaveFormPlayer = ({ url, idx, currentTime, onSeek, howl }) => {
  const waveformRef = useRef(null)
  const waveSurferRef = useRef(null)

  useEffect(() => {
    if (!waveformRef.current || waveSurferRef.current) return

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      backend: 'MediaElement',
      plugins: [
        Hover.create({
          lineColor: '#ff0000',
          lineWidth: 2,
          labelBackground: '#555',
          labelColor: '#fff',
          labelSize: '11px',
          labelPreferLeft: false,
        }),
      ],
    })

    waveSurferRef.current = ws

    const handleClick = (e) => {
      const rect = waveformRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const progress = x / width
      const duration = ws.getDuration()
      const time = progress * duration

      if (typeof onSeek === 'function') {
        onSeek(time)
      }
    }

    waveformRef.current.addEventListener('click', handleClick)

    const seekHandler = (progress) => {
      const duration = ws.getDuration()
      onSeek?.(progress * duration)
    }

    ws.on('seek', seekHandler)

    return () => {
      waveformRef.current?.removeEventListener('click', handleClick)
      ws.un('seek', seekHandler)
      ws.destroy()
      waveSurferRef.current = null
    }
  }, [])


  useEffect(() => {
    if (waveSurferRef.current && url) {
      waveSurferRef.current.load(url)
    }
  }, [url])

  useEffect(() => {
    const ws = waveSurferRef.current
    if (!ws || typeof currentTime !== 'number') return

    const setTime = () => {
      ws.setTime(currentTime)
    }

    if (ws.isReady) {
      setTime()
    } else {
      ws.once('ready', setTime)
    }

    return () => ws.un('ready', setTime)
  }, [currentTime])

  useEffect(() => {
    const ws = waveSurferRef.current;
    if (!howl || !ws) return;

    let frameId;

    const update = () => {
      const currentSeek = howl.seek();
      const duration = howl.duration();

      if (
        typeof currentSeek === 'number' &&
        typeof duration === 'number' &&
        duration > 0
      ) {
        const progress = currentSeek / duration;

        ws.seekTo(progress);
      }

      frameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(frameId);
  }, [howl, url]);


  return (
    <div>
      <div
        ref={waveformRef}
        id={`waveform-${idx}`}
        className="w-full h-32 bg-gray-800 rounded shadow cursor-pointer"
      ></div>
    </div>
  )
}

export default WaveFormPlayer

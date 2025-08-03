'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mic, Play, Pause, Volume2, Download, Music, Drum, Speaker, Piano, AudioLines, FileAudio } from 'lucide-react';
import { Howl, Howler } from 'howler';
import WaveFormPlayer from './WaveFormPlayer';


export default function StemsDisplay({ }) {
    const router = useRouter();
    const [stems, setStems] = useState([]);
    const [stemVolume, setStemVolume] = useState([]);
    const [seek, setSeek] = useState([]);
    const [duration, setDuration] = useState([]);
    const [isPlaying, setIsPlaying] = useState([]);
    const [volume, setVolume] = useState(1);
    const howlsRef = useRef([]);
    const intervalRef = useRef([]);
    const animationRefs = useRef([]); 

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        Howler.volume(newVolume);
    };

    const fetchzipfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:7000/DownloadUserFiles', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'stems.zip';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download Failed:', error);
        }
    };

    useEffect(() => {
        const fetchStems = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await fetch('https://localhost:7000/GetUserFiles', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();

                const stemObject = data[0];
                const urls = [
                    stemObject.stem1Url,
                    stemObject.stem2Url,
                    stemObject.stem3Url,
                    stemObject.stem4Url,
                    stemObject.stem5Url,
                ].filter(url => !!url);

                setStems(urls);
            } catch (error) {
                console.error('Failed to fetch stems:', error);
            }
        };

        fetchStems();
    }, []);

    useEffect(() => {
        if (!stems.length) return;

        howlsRef.current = stems.map((url, i) => {
            const howl = new Howl({
                src: [url],
                html5: true,
                volume: 1.0,
                onload: () => {
                    setDuration(durs => {
                        const updated = [...durs];
                        updated[i] = howl.duration();
                        return updated;
                    });
                }
            });
            return howl;
        });

        return () => {
            howlsRef.current.forEach((howl) => howl.unload());
        };
    }, [stems]);

    useEffect(() => {
        setStemVolume(stems.map(() => 1));
        setSeek(stems.map(() => 0));
        setDuration(stems.map(() => 0));
        setIsPlaying(stems.map(() => false));
        intervalRef.current = stems.map(() => null);
    }, [stems]);

    const updateSeek = (i) => {
        if (howlsRef.current[i]) {
            setSeek(seeks => {
                const updated = [...seeks];
                updated[i] = howlsRef.current[i].seek();
                return updated;
            });
            animationRefs.current[i] = requestAnimationFrame(() => updateSeek(i));
        }
    };

    const handleMasterToggle = () => {
        const isAnyPlaying = isPlaying.some(Boolean);
        if (!isAnyPlaying) {
            const currentSeek = seek[0] ?? 0;

            setIsPlaying(isPlaying => isPlaying.map(() => true));
            howlsRef.current.forEach((howl, i) => {
                if (howl) {
                    howl.seek(currentSeek);
                    howl.volume(stemVolume[i] ?? 1.0);
                    howl.play();
                    animationRefs.current[i] = requestAnimationFrame(() => updateSeek(i));
                }
            });
        } else {
            setIsPlaying(isPlaying => isPlaying.map(() => false));
            howlsRef.current.forEach((howl, i) => {
                if (howl) howl.pause();
                if (animationRefs.current[i]) {
                    cancelAnimationFrame(animationRefs.current[i]);
                    animationRefs.current[i] = null;
                }
            });
        }
    };


    const handleSeekChange = useCallback((index, value) => {
        setSeek(seeks => {
            const updated = [...seeks]
            updated[index] = value
            return updated
        })
        howlsRef.current[index]?.seek(value)
    }, [])

    const seekAllStems = useCallback((time) => {
        setSeek(() => stems.map(() => time))

        howlsRef.current.forEach((howl) => {
            if (howl) {
                howl.seek(time)
            }
        })
    }, [stems])



    
    useEffect(() => {
        return () => {
            animationRefs.current.forEach(id => id && cancelAnimationFrame(id));
        };
    }, []);

    const getStemNames = (count) => {
        if (count === 2) return ["Vocals", "Accompaniments"];
        if (count === 4) return ["Vocals", "Drums", "Bass", "Other"];
        if (count === 5) return ["Vocals", "Drums", "Bass", "Piano", "Other"];
        
        return Array(count).fill().map((_, i) => `Stem ${i + 1}`);
    };

    const stemIcons = {
        Vocals: Mic,
        Accompaniment: Music,
        Drums: Drum,
        Bass: Speaker,
        Piano: Piano,
        Other: AudioLines,
    };

    const Icon = ({ name }) => {
        const Component = stemIcons[name] || FileAudio;
        return <Component className='w-5 h-5 text-white' />;
    };
    const stemNames = getStemNames(stems.length);

    const isAnyPlaying = isPlaying.some(Boolean);

    return (
        <div className='mx-auto mt-10 w-[75%] h-auto shadow rounded bg-white'>
            <div className='w-[90%] mx-auto py-5'>
                <div className='flex items-center justify-between'>
                    <div className='text-xl font-semibold text-gray-800'>
                        Your Separated Stems
                        <div className='text-sm text-gray-500 font-normal'>
                            song_name
                            <span className='font-bold mx-1'>.</span>
                            file_size
                            <span className='font-bold mx-1'>.</span>
                            no_of_stems
                        </div>
                    </div>
                    <div className='flex space-x-3'>
                        <button
                            className='flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition'
                            onClick={() => router.push('/')}
                        >
                            <ArrowLeft className='w-4 h-4 mr-2' />
                            Back to Upload
                        </button>
                        <button
                            className='flex px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition'
                            onClick={fetchzipfile}>
                            Download
                        </button>
                    </div>
                </div>
                <br />
                <div id='Master_Controls'>
                    <div className='bg-gray-900 text-white p-4 rounded flex justify-between items-center'>
                        <div className='flex items-center text-xl'>
                            <button
                                onClick={handleMasterToggle}
                                className='mr-3 p-2 bg-white rounded-full hover:bg-gray-400 transition'
                            >
                                {isPlaying.some(Boolean) ? <Pause className='w-5 h-5 text-black fill-black' /> : <Play className='w-5 h-5 text-black fill-black' />}
                            </button>
                            <div>
                                Master Controls
                                <div className='text-sm text-gray-300 font-normal'>
                                    Play all stems synchronously
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center space-x-3 w-56'>
                            <Volume2 className='w-7 h-7 text-white mb-2' />
                            <div className='w-48 flex flex-col items-center justify-center w-full'>
                                <input
                                    type='range'
                                    min='0'
                                    max='1'
                                    step='0.01'
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className='w-full accent-white cursor-pointer'
                                />
                                <label className='text-xs text-white mt-1'>
                                    {Math.round(volume * 100)}%
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                {stems.map((url, idx) => (
                    <div key={idx} id={`Stem${idx + 1}`} className='mb-1 outline-gray rounded'>
                        <div className='bg-white p-4 rounded shadow-md'>
                            <div className='flex justify-between items-center'>
                                <div className='bg-black rounded-full p-2 flex items-center justify-center'>
                                    <Icon name={stemNames[idx]} />
                                </div>
                                <div className='ml-4 flex-1'>
                                    <div className='text-xl text-gray-800 font-semibold'>
                                        {stemNames[idx]}
                                    </div>
                                    <div className='text-sm text-gray-500 font-normal'>
                                        {url.split('/').pop()}
                                    </div>
                                </div>
                                <div className='flex items-center space-x-2 mr-3'>
                                    <Volume2 className='w-4 h-4 text-gray-600' />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={stemVolume[idx] ?? 1}
                                        onChange={e => {
                                            const newVolume = parseFloat(e.target.value);
                                            setStemVolume(vols => {
                                                const updated = [...vols];
                                                updated[idx] = newVolume;
                                                return updated;
                                            });
                                            
                                            howlsRef.current[idx]?.volume(newVolume);
                                        }}
                                        className="w-24 cursor-pointer accent-black"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = url.split('/').pop();
                                        link.click();
                                    }}
                                    className='p-2 rounded-sm hover:bg-gray-200 transition'
                                    title='Download Stem'
                                >
                                    <Download className='w-5 h-5 text-black' />
                                </button>
                                <button
                                    onClick={handleMasterToggle}
                                    className='ml-3 p-2 bg-black rounded-sm hover:bg-gray-700 transition shadow'
                                >
                                    {isAnyPlaying ? <Pause className='w-5 h-5 text-black fill-white' /> : <Play className='w-5 h-5 text-black fill-white' />}
                                </button>
                            </div>
                            <div className="mt-3 flex items-center space-x-3 bg-gray-200 p-3 rounded-sm">
                                <span className="text-sm text-gray-500 w-10 text-right">{formatTime(seek[idx] ?? 0)}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration[idx] ?? 0}
                                    step="0.1"
                                    value={seek[idx] ?? 0}
                                    onChange={e => {
                                        const value = parseFloat(e.target.value);
                                        setSeek(seeks => {
                                            const updated = [...seeks];
                                            updated[idx] = value;
                                            return updated;
                                        });
                                        howlsRef.current[idx]?.seek(value);
                                    }}
                                    className="flex-1 accent-black cursor-pointer"
                                />
                                <span className="text-sm text-gray-500 w-10">{formatTime(duration[idx] ?? 0)}</span>
                            </div>
                            <WaveFormPlayer
                                url={url}
                                idx={idx}
                                currentTime={seek[idx] ?? 0}
                                onSeek={seekAllStems}
                                howl={howlsRef.current[idx]}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
'use client';

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mic, Play, Pause, Volume2, Download, Music, Drum, Speaker, Piano, AudioLines, FileAudio } from 'lucide-react';
import { Howl, Howler } from 'howler';

export default function StemsDisplay({ setSelectedStem, selectedStem }) {
    const router = useRouter();
    const [stems, setStems] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const howlsRef = useRef([]);
    const [volume, setVolume] = useState(1.0);
    const [stemVolume, setStemVolume] = useState(1);
    const [seek, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);
    const intervalRef = useRef(null);

    const handlePlayStem = () => {
        const howl = howlsRef.current[0];
        if (!howl) return;

        if (!isPlaying) {
            howl.play();
            setDuration(howl.duration());
            intervalRef.current = setInterval(() => {
                setSeek(howl.seek());
            }, 500);
        } else {
            howl.pause();
            clearInterval(intervalRef.current);
        }

        setIsPlaying(!isPlaying);
    };

    const handleStemVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setStemVolume(newVolume);
        howlsRef.current[stemIndex]?.volume(newVolume);
    };

    const handleSeekChange = (e) => {
        const value = parseFloat(e.target.value);
        const howl = howlsRef.current[0];
        if (howl) {
            howl.seek(value);
            setSeek(value);
        }
    };

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

    const handleDownload = () => {
        const url = stemUrls[stemIndex];
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        link.click();
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

        howlsRef.current = stems.map((url) =>
            new Howl({
                src: [url],
                html5: true,
                volume: 1.0,
            })
        );

        return () => {
            howlsRef.current.forEach((howl) => howl.unload());
        };
    }, [stems]);

    const handleMasterToggle = () => {
        if (isPlaying) {
            howlsRef.current.forEach((howl) => howl.pause());
        } else {
            howlsRef.current.forEach((howl) => {
                if (!howl.playing()) {
                    howl.play();
                }
            });
        }
        setIsPlaying(!isPlaying);
    };

    const getStemNames = (count) => {
        if (count === 2) return ["Vocals", "Accompaniments"];
        if (count === 4) return ["Vocals", "Drums", "Bass", "Other"];
        if (count === 5) return ["Vocals", "Drums", "Bass", "Piano", "Other"];
        // fallback for other cases
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
                <div className='bg-black text-white p-10 rounded'>
                </div>
                <br />
                <div id='Master_Controls'>
                    <div className='bg-gray-900 text-white p-4 rounded flex justify-between items-center'>
                        <div className='flex items-center text-xl'>
                            <button
                                onClick={handleMasterToggle}
                                className='mr-3 p-2 bg-white rounded-full hover:bg-gray-400 transition'
                            >
                                {isPlaying ? <Pause className='w-5 h-5 text-black fill-black' /> : <Play className='w-5 h-5 text-black fill-black' />}
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
                    <div key={idx} id={`Stem${idx + 1}`} className='mb-5 outline-gray rounded'>
                        <div className='bg-white p-4 rounded shadow-md'>
                            <div className='flex justify-between items-center'>
                                <div className='bg-black rounded-full p-2 flex items-center justify-center'>
                                    <Icon name={stemNames[idx]} />
                                    {/* <Mic className='w-5 h-5 text-white' /> */}
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
                                        value={stemVolume}
                                        onChange={e => {
                                            const newVolume = parseFloat(e.target.value);
                                            setStemVolume(newVolume);
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
                                    onClick={() => {
                                        const howl = howlsRef.current[idx];
                                        if (!howl) return;
                                        if (!isPlaying) {
                                            howl.play();
                                            setDuration(howl.duration());
                                            intervalRef.current = setInterval(() => {
                                                setSeek(howl.seek());
                                            }, 500);
                                        } else {
                                            howl.pause();
                                            clearInterval(intervalRef.current);
                                        }
                                        setIsPlaying(!isPlaying);
                                    }}
                                    className='ml-3 p-2 bg-black rounded-sm hover:bg-gray-700 transition shadow'
                                >
                                    {isPlaying ? <Pause className='w-5 h-5 text-black fill-white' /> : <Play className='w-5 h-5 text-black fill-white' />}
                                </button>
                            </div>
                            <div className="mt-3 flex items-center space-x-3 bg-gray-200 p-3 rounded-sm">
                                <span className="text-sm text-gray-500 w-10 text-right">{formatTime(seek)}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration}
                                    step="0.1"
                                    value={seek}
                                    onChange={handleSeekChange}
                                    className="flex-1 accent-black cursor-pointer"
                                />
                                <span className="text-sm text-gray-500 w-10">{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
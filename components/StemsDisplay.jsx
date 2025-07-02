'use client';

import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Mic, Play, Pause, Volume2, Download } from 'lucide-react';
import { Howl, Howler } from 'howler';

export default function StemsDisplay({ setSelectedStem, selectedStem }) {
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

    useEffect(() => {
        const fetchStems = async () => {
            try {
                const res = await fetch('/api/stems');
                const data = await res.json();
                setStems(data);
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
                        <button className='flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition'>
                            <ArrowLeft className='w-4 h-4 mr-2' />
                            Back to Upload
                        </button>
                        <button className='flex px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition'>
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
                <div id='Stem1' className='mb-5 outline-gray rounded'>
                    <div className='bg-white p-4 rounded shadow-md'>
                        <div className='flex justify-between items-center'>
                            <div className='bg-black rounded-full p-2 flex items-center justify-center'>
                                <Mic className='w-5 h-5 text-white' />
                            </div>
                            <div className='ml-4 flex-1'>
                                <div className='text-xl text-gray-800 font-semibold'>Vocals</div>
                                <div className='text-sm text-gray-500 font-normal'>vocals_song_file_name.wav</div>
                            </div>

                            <div className='flex items-center space-x-2 mr-3'>
                                <Volume2 className='w-4 h-4 text-gray-600' />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={stemVolume}              
                                    onChange={handleStemVolume}  
                                    className="w-24 cursor-pointer accent-black"
                                />
                            </div>

                            <button
                                onClick={handleDownload}
                                className='p-2 rounded-sm hover:bg-gray-200 transition'
                                title='Download Stem'
                            >
                                <Download className='w-5 h-5 text-black' />
                            </button>

                            <button
                                onClick={handleMasterToggle}
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

                            {/* Total Time */}
                            <span className="text-sm text-gray-500 w-10">{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
                <div id='Stem2' className='mb-5 outline-gray rounded'>
                    <div className='bg-white p-4 rounded shadow-md'>
                        <div className='flex justify-between items-center'>
                            <div className='bg-black rounded-full p-2 flex items-center justify-center'>
                                <Mic className='w-5 h-5 text-white' />
                            </div>
                            <div className='ml-4 flex-1'>
                                <div className='text-xl text-gray-800 font-semibold'>Accompaniments</div>
                                <div className='text-sm text-gray-500 font-normal'>Accompaniments_song_file_name.wav</div>
                            </div>

                            <button
                                onClick={handleMasterToggle}
                                className='ml-3 p-2 bg-black rounded-sm hover:bg-gray-700 transition shadow'
                            >
                                {isPlaying ? <Pause className='w-5 h-5 text-black fill-white' /> : <Play className='w-5 h-5 text-black fill-white' />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
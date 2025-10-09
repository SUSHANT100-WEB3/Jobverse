import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-4'>
            <div className='flex flex-col gap-5 my-8 md:my-12'>
                <span className='mx-auto px-4 py-2 rounded-full border border-border/40 bg-background/40 backdrop-blur text-accent font-medium shadow-[0_0_24px_rgba(99,102,241,0.25)] text-sm md:text-base'>No. 1 Job Hunt Website</span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
                    <span className='bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent'>Search, Apply</span> & <br />
                    Get Your <span className='bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent'>Dream Jobs</span>
                </h1>
                <p className='text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2'>Discover curated roles tailored to you, with a modern experience and instant apply.</p>
                <div className='flex w-full max-w-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)] border border-border/50 pl-3 rounded-full items-center gap-4 mx-auto bg-background/60 backdrop-blur'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent placeholder:text-muted-foreground text-sm md:text-base'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full">
                        <Search className='h-4 w-4 md:h-5 md:w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
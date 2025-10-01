import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-xl bg-background/60 border border-border/60 backdrop-blur cursor-pointer transition-all hover:shadow-[0_0_0_1px_rgba(139,92,246,0.35),0_8px_40px_-8px_rgba(0,0,0,0.6)] hover:-translate-y-0.5'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-muted-foreground'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent'>{job?.title}</h1>
                <p className='text-sm text-muted-foreground'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'font-bold border-border/60 bg-background/40 backdrop-blur'} variant="outline">{job?.position} Positions</Badge>
                <Badge className={'font-bold border-border/60 bg-background/40 backdrop-blur'} variant="outline">{job?.jobType}</Badge>
                <Badge className={'font-bold border-border/60 bg-background/40 backdrop-blur'} variant="outline">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards
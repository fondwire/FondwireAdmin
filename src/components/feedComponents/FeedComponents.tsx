import React, {useEffect, useState} from 'react';
import { FeedWrapper, FeedComponentWrapper, ActionWrapper } from './Feed-style';

const FeedHeader = () => {
    return (
        <FeedWrapper>
            <div>TITLE</div>
            <div>DATE</div>
            <div>TYPE</div>
            <div>STATUS</div>
            <div>ACTIONS</div>
        </FeedWrapper>
    );
};

type FeedComponentProps = {
    title: string
    date: string
    type: string
    status: string
}
export const FeedComponent: React.FC<FeedComponentProps> = ({title,date,type,status}) => {
    const Status = status.toUpperCase()
    const [background, setBackground] = useState<string>('#a2a2a2')

    useEffect(()=> {
        switch (Status){
            case 'DRAFT':
                return setBackground('#a2a2a2')
            case 'ACTIVE':
                return setBackground('#51ef63')
            case 'PENDING':
                return setBackground('#ffe05d')
            case 'EXPIRED':
                return setBackground('#fd5d5d')
            default:
                setBackground('#a2a2a2')
        }
    }, [Status])
    return (
        <FeedComponentWrapper bg={background}>
            <div>{title}</div>
            <div>{date}</div>
            <div>{type}</div>
            <div className={'status'}><span>{Status}</span></div>
            <div><Action/></div>
        </FeedComponentWrapper>
    )
}

const Action = () => {
    return (
        <ActionWrapper>
            <span/>
            <span/>
            <span/>
        </ActionWrapper>
    )
}

export default FeedHeader;
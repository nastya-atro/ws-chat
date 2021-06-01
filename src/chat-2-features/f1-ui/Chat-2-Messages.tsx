import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from './../f2-bll/chat-selector';
import Message from './Chat-3-Message';


const Messages: React.FC = () => {
    const chatMessages = useSelector(messagesSelector)
    const messagesAncorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAncorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chatMessages])

    let messagesElement = chatMessages.map((m, index) => <Message
        key={index} userId={m.userId}
        message={m.message} photo={m.photo} userName={m.userName} />)

    return (
        <div style={{ height: '500px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messagesElement}
            <div ref={messagesAncorRef}></div>
        </div>
    )
}

export default Messages
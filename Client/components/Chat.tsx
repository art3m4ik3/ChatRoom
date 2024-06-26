import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import io from 'socket.io-client';
import styles from '../styles/Chat.module.css';
import * as dotenv from 'dotenv'; 

dotenv.config();
const backend = process.env.BACKEND || 'http://109.120.135.67:8316'; // yeah yeah, Versal doesn't load my env, attack if you want, xd

const socket = io(backend, { transports: ['websocket'] });

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [name, setName] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    interface IMessage {
        _id: string;
        content: string;
        author: string;
        timestamp: string;
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    useEffect(() => {
        socket.on('allMessages', (messages: IMessage[]) => {
            setMessages(messages);
            scrollToBottom();
        });

        socket.on('newMessage', (message: IMessage) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            scrollToBottom();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() === '' || name.trim() === '') return;
        socket.emit('sendMessage', { content: newMessage, author: name });
        setNewMessage('');
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.chat}>
            <h2 className={styles.title}>Chat Room</h2>
            <div className={styles.messages}>
                {messages.map((message) => (
                    <Message key={message._id} content={message.content} author={message.author} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Name"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Type a message..."
                    className={styles.input}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />

                <button className={[styles.input, styles.sendButton].join(' ')} onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;

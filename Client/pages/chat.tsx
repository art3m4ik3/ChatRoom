import React from 'react';
import Chat from '../components/Chat';
import styles from '../styles/ChatPage.module.css';

const ChatPage: React.FC = () => {
    return (
        <div className={styles.chatPage}>
            <Chat />
        </div>
    );
};

export default ChatPage;

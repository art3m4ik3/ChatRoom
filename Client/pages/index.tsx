import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to the Chat Room</h1>
            <Link href="/chat" className={styles.link}>
                Go to Chat
            </Link>
        </div>
    );
};

export default Home;

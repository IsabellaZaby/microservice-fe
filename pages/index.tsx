import type { NextPage } from 'next';
import React from 'react';
import Structure from "../components/Structure";
import styles from "../styles/Home.module.scss";


const Home: NextPage = () => {
    return (
        <Structure>
            <h1>Welcome</h1>
            <h3>Functionality provided on this site</h3>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <a href={'/input'} className={styles.card}>
                        <h3>Input</h3>
                        <div>Adding of new Sensors.</div>
                    </a>
                    <a href={'/charts'} className={styles.card}>
                        <h3>Charts</h3>
                        <div>Existing records as charts.</div>
                    </a>
                </div>
                <div className={styles.block}>
                    <a href={'/delete'} className={styles.card}>
                        <h3>Update</h3>
                        <div>Update of existing records.</div>
                    </a>
                    <a href={'/delete'} className={styles.card}>
                        <h3>Delete</h3>
                        <div>Deletion of existing records.</div>
                    </a>
                </div>
            </div>
        </Structure>
    );
}

export default Home;

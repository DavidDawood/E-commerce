import React from "react";
import Carousel from "nuka-carousel/lib/carousel";
import { GetItemDataFromSessionStorage } from "../../services/items";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
function Home() {
    const DisplayItems = (count) => {
        const navigate = useNavigate();
        const items = GetItemDataFromSessionStorage();
        if (!items || items.length === 0) return <></>;

        const itemsRandom = [];
        for (let index = 0; index < count; index++) {
            const randomIndex = Math.floor(Math.random() * items.length);
            const element = items[randomIndex];
            itemsRandom.push(element);
        }

        // have a random variant image from a randomly selected item display as a link img to that item on the carousel
        return (
            <div className={styles.Container}>
                <Carousel
                    adaptiveHeight={false}
                    slidesToShow={3}
                    cellAlign="center"
                    wrapAround={true}
                    className={styles.Container__Carosel}
                >
                    {itemsRandom.map((x) => {
                        return (
                            <button
                                className={styles.Container__Carosel_button}
                                onClick={() => navigate(`/Product/${x.id}`)}
                                key={x.id}
                            >
                                <img
                                    className={styles.Container__Carosel_image}
                                    src={
                                        x.variants[
                                            Math.floor(
                                                Math.random() *
                                                    x.variants.length,
                                            )
                                        ].img
                                    }
                                    alt=""
                                />
                            </button>
                        );
                    })}
                </Carousel>
            </div>
        );
    };
    return <div className={styles.Container}>{DisplayItems(3)}</div>;
}

export default Home;

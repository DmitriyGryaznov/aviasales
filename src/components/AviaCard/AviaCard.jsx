import React from "react";
import styles from "./AviaCard.module.css";

const logos = {
  S7: "https://pics.avs.io/99/36/S7.png",
  AK: "https://pics.avs.io/99/36/AK.png",
  BT: "https://pics.avs.io/99/36/BT.png",
  DP: "https://pics.avs.io/99/36/DP.png",
  FV: "https://pics.avs.io/99/36/FV.png",
  U6: "https://pics.avs.io/99/36/U6.png",
  UT: "https://pics.avs.io/99/36/UT.png",
  W6: "https://pics.avs.io/99/36/W6.png",
};

const AviaCard = ({ ticket }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <span className={styles.card__header__price}>
          {Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            maximumFractionDigits: 0,
          }).format(ticket.price)}
        </span>
        <img
          className={styles.card__header__logo}
          src={logos[ticket.carrier]}
          alt="logo"
        />
      </div>
      <div className={styles.card__body}>
        {ticket.segments.map(
          ({ origin, destination, date, duration, stops }) => {
            const originDate = new Date(date);
            const destinationDate = new Date(
              originDate.getTime() + duration * 60000
            );

            return (
              <div key={origin} className={styles.card__row}>
                <div className={styles.card__row__item}>
                  <span className={styles.card__row__item__title}>
                    {origin} - {destination}
                  </span>
                  <span className={styles.card__row__item__text}>
                    {originDate.toLocaleTimeString(["ru-RU"], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {destinationDate.toLocaleTimeString(["ru-RU"], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className={styles.card__row__item}>
                  <span className={styles.card__row__item__title}>В ПУТИ</span>
                  <span className={styles.card__row__item__text}>
                    {`${Math.floor(duration / 60)}ч ${duration % 60}м`}
                  </span>
                </div>
                <div className={styles.card__row__item}>
                  {stops.length > 0 && (
                    <>
                      <span className={styles.card__row__item__title}>
                        ПЕРЕСАДКИ {stops.length}
                      </span>
                      <span className={styles.card__row__item__text}>
                        {stops.join(", ")}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default AviaCard;

import React from "react";
import { Checkbox, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ticketSlice } from "../../store/reducers/ticketReducer";
import { stopsCountSelector } from "../../store/reducers/ticketReducer";

import styles from "./AviaFilter.module.css";

const stops = [0, 1, 2, 3];

const stopsLabels = {
  0: "Без пересадки",
  1: "1 пересадка",
  2: "2 пересадки",
  3: "3 пересадки",
};

// `const stopsCount = useSelector(stopsCountSelector);` - это хук,
// который используется для получения определенной части состояния из Redux store.
// В данном случае, мы используем селектор `stopsCountSelector`,
// чтобы получить значение `stopsCount` из состояния Redux.
const Filter = () => {
  const dispatch = useDispatch();

  const stopsCount = useSelector(stopsCountSelector);

  return (
    <ConfigProvider
      theme={{
        token: {
          // Alias Token
          colorPrimary: "white",
          colorWhite: "#2196F3",
          colorBorder: "#2196F3",
        },
      }}
    >
      <div className={styles.filters}>
        <span className={styles.filter__title}>Количество пересадок</span>
        <Checkbox
          className={styles.checkbox}
          checked={stopsCount.length === 0}
          onChange={() => {
            dispatch(ticketSlice.actions.resetStops());
          }}
        >
          Все
        </Checkbox>
        {stops.map((stop) => (
          <Checkbox
            key={stop}
            className={styles.checkbox}
            checked={stopsCount.length === 0 || stopsCount.includes(stop)}
            onChange={() => {
              dispatch(ticketSlice.actions.toggleStop(stop));
            }}
          >
            {stopsLabels[stop]}
          </Checkbox>
        ))}
      </div>
    </ConfigProvider>
  );
};

export default Filter;

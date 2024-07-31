import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ticketSlice,
  sortedByPriceSelector,
} from "../../store/reducers/ticketReducer";
import { Tabs, Flex, Radio } from "antd";

import styles from "./MyTabs.module.css";

const MyTabs = () => {
  const dispatch = useDispatch();

  const sortedByPrice = useSelector(sortedByPriceSelector);

  const onChange = (e) => {
    dispatch(ticketSlice.actions.toggleSortedByPrice(e.target.value));
  };

  return (
    <div className={styles.tabs}>
      <Radio.Group
        onChange={onChange}
        value={sortedByPrice}
        buttonStyle="solid"
        className={styles.tabs_group}
      >
        <Radio.Button className={styles.tab} value="a">
          Самый дешевый
        </Radio.Button>
        <Radio.Button className={styles.tab} value="b">
          Самый быстрый
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default MyTabs;

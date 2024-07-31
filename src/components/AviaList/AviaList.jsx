import React from "react";
import AviaCard from "../AviaCard/AviaCard";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ticketSlice,
  paginatedTicketsSelector,
  isLoadingSelector,
  paginationSelector,
  isLoadingMoreSelector,
} from "../../store/reducers/ticketReducer";
import styles from "./AviaList.module.css";

const AviaList = () => {
  // хуки `useSelector` для получения данных из хранилища Redux.
  // Переменные `tickets` и `isLoading` получаются из хранилища
  // с помощью селекторов.
  const dispatch = useDispatch();

  const tickets = useSelector(paginatedTicketsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const isLoadingMore = useSelector(isLoadingMoreSelector);

  const pagination = useSelector(paginationSelector);

  const handleClick = () => {
    dispatch(ticketSlice.actions.setNextPage());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.list}>
      {isLoadingMore && "Loading more..."}
      {/* Каждый билет передается в компонент `AviaCard` в качестве свойства `ticket`, 
            а ключ для каждого элемента уникален и создается на основе цены и перевозчика  */}
      {tickets.map((ticket) => (
        <AviaCard
          key={`${ticket.price}_${ticket.carrier}_${ticket.segments[0].date}`}
          ticket={ticket}
        ></AviaCard>
      ))}
      {pagination.page < pagination.totalPages && (
        <Button
          type="primary"
          block
          onClick={handleClick}
          className={styles.more_button}
        >
          Показать еще 5 билетов
        </Button>
      )}
    </div>
  );
};

export default AviaList;

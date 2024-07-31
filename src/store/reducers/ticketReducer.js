import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import { getTickets, getSearchId } from '../../services/services'

// Utils

export const getPagination = (list, limit) => {
    const totalCount = list.length
    const totalPages = Math.ceil(totalCount / limit)

    return {
        page: 1,
        limit,
        totalPages,
        totalCount,
    }
}

const initialPaginationState = getPagination([], 5)

//Этот код представляет начальное состояние (initial state)
//  для хранилища данных в Redux. В данном случае, 
//  определены ключи `tickets`, `isLoading`, `error` и `stopsCount`, 
//  которые будут использоваться для хранения информации о билетах, 
//  состоянии загрузки, ошибке и количестве остановок соответственно.
const initialState={
    tickets: [],
    isLoading: true,
    isLoadingMore: true,
    error: '',
    stopsCount: [],

    sortedByPrice: "a",

    pagination: initialPaginationState
}

// Slice в Redux Toolkit - это концепция, которая объединяет
//  в себе reducer, actions и action creators для управления 
//  частью состояния в Redux-приложении. 
// Когда Вы создаете слайс с помощью функции `createSlice`,
//  Вы указываете имя слайса в свойстве `name`. 
//  Это имя используется для генерации 
//  действий (actions) и редюсера (reducer), 
//  а также для организации структуры Вашего хранилища в Redux. 
export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
      // toggleStop и resetStops - это reducer-функции, 
      // которые принимают первым параметром state и
      //  вторым параметром action. В случае с toggleStop, 
      //  action используется для передачи значения, которое
      //   нужно изменить в state. В то время как resetStops
      //    не требует дополнительных данных из action, 
      //    поэтому она просто обнуляет значение в state.
        toggleStop: (state, action) => {
                // Этот код использует метод `filter` для создания нового массива `stopsCount`, 
                // в котором удаляются все элементы, равные `action.payload`. Таким образом, 
                // все элементы, равные `action.payload`, будут удалены из массива `stopsCount`
                // в объекте `state`.
            if (state.stopsCount.includes(action.payload)) {
                 // Когда вы вызываете `dispatch(addStopCount(someValue))`, `someValue` становится `payload` для этого action
                state.stopsCount = state.stopsCount.filter((stopCount) => stopCount !== action.payload)
            } else {
                state.stopsCount.push(action.payload);
            }
        },
        resetStops: (state) => {
            state.stopsCount = []
            state.pagination.page = 1
        }, 
        
        toggleSortedByPrice: (state, action) => {
            state.sortedByPrice = action.payload
            state.pagination.page = 1
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setNextPage: (state) => {
            state.pagination.page = state.pagination.page + 1
        },

        setTickets: (state, action) => {
            state.tickets = state.tickets.concat(action.payload)
            state.isLoading = false
        }
    },
    // Этот код является частью конфигурации Redux Toolkit и определяет, какой reducer должен быть вызван при 
    // срабатывании определенного action. В данном случае, при срабатывании action `getTicketsAction.pending`, 
    // устанавливается флаг `isLoading` в состоянии Redux в значение `true`
    extraReducers: ({ addCase }) => {
        addCase(getTicketsAction.pending, (state) => {
            state.isLoading = true
        })
        addCase(getTicketsAction.fulfilled, (state, action) => {
            let tickets = state.tickets.concat(action.payload)
            state.tickets = tickets
            state.isLoading = false
            state.isLoadingMore = false

            state.pagination = getPagination(tickets, 5)
        })
        addCase(getTicketsAction.rejected, (state, action) => {
            state.error = "Ошибка"
            state.isLoading = false
            state.isLoadingMore = false
        })
      
    }
})


// Actions
// Этот код создает асинхронное действие `getTicketsAction` с использованием `createAsyncThunk` 
// из Redux Toolkit. Внутри этого действия сначала получается `searchId` с помощью функции `getSearchId`,
//  затем получаются билеты с помощью функции `getTickets`, используя полученный `searchId`. 
//  Наконец, возвращается массив билетов из ответа.
// `createAsyncThunk` - это функция из Redux Toolkit, которая позволяет создать асинхронный thunk action. 
// Thunk - это функция, которая возвращает другую функцию, позволяя делать асинхронные операции в Redux.
//  В данном случае, `createAsyncThunk` создает thunk action с именем `ticket/getTicketsAction`, который 
//  выполняет асинхронную операцию
// export const getTicketsAction = createAsyncThunk(`ticket/getTicketsAction`, async () => {
//     const searchId = await getSearchId();
//     const interval = setInterval(async () => {
//     const ticketsResponse = await getTickets(searchId);
//         if (ticketsResponse!==null&&ticketsResponse.stop) {
//             clearInterval(interval);  
//       }
//       return ticketsResponse.tickets;

//     }, 200);

//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             clearInterval(interval);
//             reject(new Error('Timeout exceeded'));
//         }, 5000); // Установите таймаут, чтобы избежать бесконечного выполнения
//     });
// })

export const getTicketsAction = createAsyncThunk(`ticket/getTicketsAction`, (_, { dispatch }) => 
     new Promise(async (resolve, reject) => {
        const searchId = await getSearchId();

        const interval = setInterval(async () => {
            const ticketsResponse = await getTickets(searchId);

            if (ticketsResponse != null) {
                if (ticketsResponse.stop) {
                    clearInterval(interval);
        
                    resolve(ticketsResponse.tickets);
                } else {
                    dispatch(ticketSlice.actions.setTickets(ticketsResponse.tickets))
                }
            }
        }, 1000);
    })
);

// Selectors
// Эти две функции - `stopsCountSelector` и `ticketsSelector` - являются селекторами, 
// которые принимают текущее состояние Redux и возвращают соответствующие части данных из хранилища. 
// Например, `stopsCountSelector` возвращает значение `stopsCount` из состояния Redux,
//  а `ticketsSelector` возвращает значение `tickets`. Эти селекторы могут быть использованы 
//  в компонентах React для доступа к данным из хранилища Redux.
export const stopsCountSelector = (state) => state.tickets.stopsCount;
export const ticketsSelector = (state) => state.tickets.tickets;
export const sortedByPriceSelector = (state) => state.tickets.sortedByPrice;
export const isLoadingSelector = (state) => state.tickets.isLoading;
export const isLoadingMoreSelector = (state) => state.tickets.isLoadingMore;
export const paginationSelector = (state) => state.tickets.pagination;


// Этот код создает селектор `filteredTicketsSelector`, который принимает два аргумента: 
// `ticketsSelector` и `stopsCountSelector`. Он фильтрует билеты в зависимости от количества остановок. 
// Если `stopsCount` равен нулю, то возвращаются все билеты. В противном случае, происходит фильтрация 
// билетов по количеству остановок. Для каждого билета считается общее количество остановок с помощью 
// метода `reduce`, а затем проверяется, входит ли это количество остановок в массив `stopsCount`. 
// Результаты фильтрации выводятся в консоль с помощью `console.log`.
export const filteredTicketsSelector = createSelector(ticketsSelector, stopsCountSelector, (tickets, stopsCount) => {
    if (stopsCount.length === 0) {
        return tickets;
    }

    return tickets.filter((ticket) => {
        const ticketStopsCount = ticket.segments?.reduce((accumulate, segment) => {
            return accumulate + segment.stops.length;
        }, 0)

        return stopsCount.includes(ticketStopsCount);
    })
})

// 1. Сначала происходит отображение массива `filteredTickets`, чтобы создать новый 
// массив билетов с дополнительным свойством `segmentsDuration`. Это свойство рассчитывается
//  путем суммирования длительности каждого сегмента в билете.
export const sortedTicketsSelector = createSelector(filteredTicketsSelector, sortedByPriceSelector, (filteredTickets, sortedByPrice) => {
    const sortedTickets = filteredTickets.map((ticket) => ({ 
        ...ticket, 
        logo: '',
        segmentsDuration: ticket.segments?.reduce((accumulate, segment) => accumulate + segment.duration, 0) 
    }))
// 2. Затем проверяется значение `sortedByPrice`. Если оно равно "a", 
// массив `sortedTickets` сортируется в порядке возрастания на основе 
// цены билета с использованием метода `sort`.
    if (sortedByPrice === "a") {
        sortedTickets.sort((a, b) => a.price - b.price)
    } else {
// 3. Если `sortedByPrice` не равно "a", 
// массив `sortedTickets` сортируется на 
// основе общей длительности всех сегментов в каждом билете.
        sortedTickets.sort((a, b) =>  a.segmentsDuration - b.segmentsDuration)
    }

    return sortedTickets;
})

export const paginatedTicketsSelector = createSelector(sortedTicketsSelector, paginationSelector, (sortedTickets, { page, limit }) => {
    const paginatedTickets = sortedTickets.slice(0, page * limit);

    return paginatedTickets;
})
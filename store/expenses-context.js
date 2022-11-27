import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: {},
  addExpense: ({
    description,
    amount,
    effectiveDate,
    uuid,
    status,
    expenseType,
    unitPrice,
    total,
    fileUrl,
    fileMimeType,
  }) => {},
  setExpenses: (expenses, specialTypes) => {
    expenses, specialTypes;
  },
  deleteExpense: (uuid) => {},
  updateExpense: (
    uuid,
    {
      description,
      amount,
      effectiveDate,
      status,
      expenseType,
      unitPrice,
      total,
      fileUrl,
      fileMimeType,
    }
  ) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        specialTypes: [...state.specialTypes],
        expenses: [action.payload, ...state.expenses],
      };
    case "UPDATE":
      const expenseIdToUpdate = state.expenses.findIndex(
        (ex) => ex.uuid === action.payload.uuid
      );
      const newExpenses = [...state.expenses];
      newExpenses[expenseIdToUpdate] = {
        ...state.expenses[expenseIdToUpdate],
        ...action.payload.expenseData,
      };
      return {
        expenses: newExpenses,
        specialTypes: [...state.specialTypes],
      };
    case "SET":
      // action.payload.specialTypes.sort((a, b) => {
      //   console.log(a.name);
      //   return b.name.localeCompare(b.name, "en");
      // })[0];

      return {
        expenses: action.payload.expenses?.sort(
          (a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate)
        ),
        specialTypes: action.payload.specialTypes?.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      };

    case "DELETE":
      const newExpensesDelete = state.expenses.filter(
        (ex) => ex.uuid !== action.payload
      );
      return {
        expenses: newExpensesDelete,
        specialTypes: [...state.specialTypes],
      };
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: { ...expenseData, status: 1 } });
  }
  function deleteExpense(uuid) {
    dispatch({ type: "DELETE", payload: uuid });
  }
  function updateExpense(uuid, expenseData) {
    dispatch({ type: "UPDATE", payload: { uuid, expenseData } });
  }
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

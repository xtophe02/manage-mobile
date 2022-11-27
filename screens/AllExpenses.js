import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { AuthContext } from "../store/auth-context";
import { fetchExpenses, fetchSpecialTypes } from "../util/http";
import AddExpenseButton from "../components/UI/AddExpenseButton";
import { MONTHS } from "../constants/constants";
import WelcomeScreen from "./WelcomeScreen";

export default function AllExpenses() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ year: 2022, month: null });
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getExpenses() {
      setLoading(true);
      try {
        const expensesData = await fetchExpenses(
          token,
          filter.year,
          filter.month
        );
        const specialTypes = await fetchSpecialTypes(token);

        setExpenses({
          expenses: expensesData.items,
          specialTypes: specialTypes.items,
        });
      } catch (error) {
        setError("Could not fetch expenses!");
      } finally {
        setLoading(false);
      }

      // console.log(expensesData);
    }
    getExpenses();
    //NEED to UNMOUNT
  }, [filter, token]);

  async function filterHandler(name, value) {
    setFilter((prev) => ({ ...prev, [name]: value }));
  }

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  return (
    <>
      <ExpensesOutput
        expenses={expenses.expenses}
        fallBackText="No registered expenses found!"
        filter={filter}
        onFilter={filterHandler}
        loading={loading}
      />
      <AddExpenseButton />
      <WelcomeScreen />
    </>
  );
}

 const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`
 }

// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key)
}

export const waait = () => new Promise(res => setTimeout(res, Math.random() * 2000))

export const createBudget = ({ name, amount}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }
  const existingBudgets = fetchData("budgets") ?? []
  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}


export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

//Total spent
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check
    if (expense.budgetId !== budgetId) return acc

    // add the current amount to total
    return acc += expense.amount
  }, 0)
  return budgetSpent;
}


export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  })
}

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  })
}

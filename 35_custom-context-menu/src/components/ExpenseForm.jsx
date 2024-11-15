import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";

const ExpenseForm = ({ setExpenses }) => {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const [error, setError] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLenght: 5, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      { numberPattern: /^[0-9]/, message: "Please enter valid amount" },
    ],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLenght && value.length < 5) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.numberPattern && !rule.numberPattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setError(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
    setError({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={error.title}
      />
      <Select
        firstOption="Select Category"
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        error={error.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={error.amount}
      />
      <button className="add-btn">Add</button>
    </form>
  );
};

export default ExpenseForm;

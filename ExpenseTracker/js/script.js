// =====================================
// EXPENSE TRACKER
// =====================================


// =====================================
// ELEMENTS
// =====================================

const transactionForm =
    document.getElementById("transactionForm");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const typeInput =
    document.getElementById("type");

const categoryInput =
    document.getElementById("category");

const dateInput =
    document.getElementById("date");

const transactionList =
    document.getElementById("transactionList");

const balanceElement =
    document.getElementById("balance");

const incomeElement =
    document.getElementById("income");

const expensesElement =
    document.getElementById("expenses");

const transactionCountElement =
    document.getElementById("transactionCount");

const clearAllButton =
    document.getElementById("clearAll");

const searchInput =
    document.getElementById("searchInput");

const filterType =
    document.getElementById("filterType");

const progressBar =
    document.getElementById("progressBar");

const expensePercentage =
    document.getElementById("expensePercentage");

const overviewMessage =
    document.getElementById("overviewMessage");

const formTitle =
    document.getElementById("formTitle");

const submitButton =
    document.getElementById("submitButton");

const cancelEditButton =
    document.getElementById("cancelEdit");

const topAddButton =
    document.getElementById("topAddButton");


// =====================================
// APPLICATION STATE
// =====================================

let transactions =
    JSON.parse(
        localStorage.getItem("expenseTransactions")
    ) || [];


let editingTransactionId = null;


// =====================================
// SET TODAY'S DATE
// =====================================

function setTodayDate() {

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.value = today;

}

setTodayDate();


// =====================================
// SAVE DATA
// =====================================

function saveTransactions() {

    localStorage.setItem(
        "expenseTransactions",
        JSON.stringify(transactions)
    );

}


// =====================================
// FORMAT CURRENCY
// =====================================

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2
        }
    ).format(amount);

}


// =====================================
// ESCAPE HTML
// =====================================

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent = value;

    return element.innerHTML;

}


// =====================================
// FORM SUBMISSION
// =====================================

transactionForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const description =
            descriptionInput.value.trim();

        const amount =
            Number(amountInput.value);

        const type =
            typeInput.value;

        const category =
            categoryInput.value;

        const date =
            dateInput.value;


        if (!description) {

            alert("Please enter a description.");

            descriptionInput.focus();

            return;
        }


        if (!amount || amount <= 0) {

            alert(
                "Please enter a valid amount greater than zero."
            );

            amountInput.focus();

            return;
        }


        if (!date) {

            alert("Please select a date.");

            dateInput.focus();

            return;
        }


        // =================================
        // EDIT EXISTING TRANSACTION
        // =================================

        if (editingTransactionId !== null) {

            transactions =
                transactions.map(
                    function (transaction) {

                        if (
                            transaction.id ===
                            editingTransactionId
                        ) {

                            return {

                                ...transaction,

                                description,

                                amount,

                                type,

                                category,

                                date

                            };

                        }

                        return transaction;

                    }
                );


            editingTransactionId = null;

            formTitle.textContent =
                "Add Transaction";

            submitButton.textContent =
                "Add Transaction";

            cancelEditButton.classList.add(
                "hidden"
            );

        }

        // =================================
        // ADD NEW TRANSACTION
        // =================================

        else {

            const transaction = {

                id: Date.now(),

                description,

                amount,

                type,

                category,

                date

            };


            transactions.push(
                transaction
            );

        }


        saveTransactions();

        updateApplication();

        transactionForm.reset();

        setTodayDate();

    }
);


// =====================================
// DISPLAY TRANSACTIONS
// =====================================

function displayTransactions() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedFilter =
        filterType.value;


    let filteredTransactions =
        transactions.filter(
            function (transaction) {

                const matchesSearch =
                    transaction.description
                        .toLowerCase()
                        .includes(searchTerm)
                    ||
                    transaction.category
                        .toLowerCase()
                        .includes(searchTerm);


                const matchesFilter =
                    selectedFilter === "all"
                    ||
                    transaction.type ===
                        selectedFilter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    filteredTransactions.sort(
        function (a, b) {

            return b.id - a.id;

        }
    );


    transactionList.innerHTML = "";


    // =================================
    // EMPTY RESULT
    // =================================

    if (
        filteredTransactions.length === 0
    ) {

        transactionList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ₦
                </div>

                <h3>
                    ${
                        transactions.length === 0
                            ? "No transactions yet"
                            : "No matching transactions"
                    }
                </h3>

                <p>
                    ${
                        transactions.length === 0
                            ? "Add your first income or expense to start tracking your finances."
                            : "Try changing your search or filter."
                    }
                </p>

            </div>

        `;

        return;
    }


    // =================================
    // CREATE TRANSACTION ITEMS
    // =================================

    filteredTransactions.forEach(
        function (transaction) {

            const item =
                document.createElement("article");


            item.className =
                "transaction-item";


            const isIncome =
                transaction.type === "income";


            const sign =
                isIncome ? "+" : "-";


            const icon =
                isIncome ? "↑" : "↓";


            item.innerHTML = `

                <div class="transaction-main">

                    <div
                        class="transaction-icon ${
                            isIncome
                                ? "income"
                                : "expense"
                        }"
                    >
                        ${icon}
                    </div>


                    <div class="transaction-info">

                        <h4>
                            ${escapeHTML(
                                transaction.description
                            )}
                        </h4>

                        <p>
                            ${escapeHTML(
                                transaction.category
                            )}
                            •
                            ${formatDate(
                                transaction.date
                            )}
                        </p>

                    </div>

                </div>


                <div class="transaction-actions">

                    <span
                        class="transaction-amount ${
                            isIncome
                                ? "income"
                                : "expense"
                        }"
                    >
                        ${sign}${formatCurrency(
                            transaction.amount
                        )}
                    </span>


                    <button
                        class="action-btn edit"
                        type="button"
                        data-id="${transaction.id}"
                    >
                        Edit
                    </button>


                    <button
                        class="action-btn delete"
                        type="button"
                        data-id="${transaction.id}"
                    >
                        Delete
                    </button>

                </div>

            `;


            transactionList.appendChild(item);

        }
    );

}


// =====================================
// FORMAT DATE
// =====================================

function formatDate(date) {

    if (!date) {

        return "";

    }


    const dateObject =
        new Date(`${date}T00:00:00`);


    return dateObject.toLocaleDateString(
        "en-NG",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// =====================================
// TRANSACTION ACTIONS
// =====================================

transactionList.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button[data-id]"
            );


        if (!button) {

            return;

        }


        const id =
            Number(button.dataset.id);


        if (
            button.classList.contains("delete")
        ) {

            deleteTransaction(id);

        }


        if (
            button.classList.contains("edit")
        ) {

            editTransaction(id);

        }

    }
);


// =====================================
// EDIT TRANSACTION
// =====================================

function editTransaction(id) {

    const transaction =
        transactions.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!transaction) {

        return;

    }


    editingTransactionId = id;


    descriptionInput.value =
        transaction.description;

    amountInput.value =
        transaction.amount;

    typeInput.value =
        transaction.type;

    categoryInput.value =
        transaction.category;

    dateInput.value =
        transaction.date;


    formTitle.textContent =
        "Edit Transaction";

    submitButton.textContent =
        "Save Changes";

    cancelEditButton.classList.remove(
        "hidden"
    );


    document
        .getElementById("add-transaction")
        .scrollIntoView({
            behavior: "smooth"
        });


    descriptionInput.focus();

}


// =====================================
// CANCEL EDIT
// =====================================

cancelEditButton.addEventListener(
    "click",
    function () {

        cancelEdit();

    }
);


function cancelEdit() {

    editingTransactionId = null;


    transactionForm.reset();


    setTodayDate();


    formTitle.textContent =
        "Add Transaction";


    submitButton.textContent =
        "Add Transaction";


    cancelEditButton.classList.add(
        "hidden"
    );

}


// =====================================
// DELETE TRANSACTION
// =====================================

function deleteTransaction(id) {

    const transaction =
        transactions.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!transaction) {

        return;

    }


    const confirmed =
        confirm(
            `Delete "${transaction.description}"?`
        );


    if (!confirmed) {

        return;

    }


    transactions =
        transactions.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveTransactions();

    updateApplication();

}


// =====================================
// CLEAR ALL
// =====================================

clearAllButton.addEventListener(
    "click",
    function () {

        if (transactions.length === 0) {

            alert(
                "There are no transactions to clear."
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete all transactions?"
            );


        if (!confirmed) {

            return;

        }


        transactions = [];


        saveTransactions();

        cancelEdit();

        updateApplication();

    }
);


// =====================================
// SEARCH
// =====================================

searchInput.addEventListener(
    "input",
    function () {

        displayTransactions();

    }
);


// =====================================
// FILTER
// =====================================

filterType.addEventListener(
    "change",
    function () {

        displayTransactions();

    }
);


// =====================================
// TOP ADD BUTTON
// =====================================

topAddButton.addEventListener(
    "click",
    function () {

        document
            .getElementById("add-transaction")
            .scrollIntoView({
                behavior: "smooth"
            });


        descriptionInput.focus();

    }
);


// =====================================
// UPDATE SUMMARY
// =====================================

function updateSummary() {

    let totalIncome = 0;

    let totalExpenses = 0;


    transactions.forEach(
        function (transaction) {

            if (
                transaction.type === "income"
            ) {

                totalIncome +=
                    transaction.amount;

            } else {

                totalExpenses +=
                    transaction.amount;

            }

        }
    );


    const balance =
        totalIncome - totalExpenses;


    balanceElement.textContent =
        formatCurrency(balance);


    incomeElement.textContent =
        formatCurrency(totalIncome);


    expensesElement.textContent =
        formatCurrency(totalExpenses);


    transactionCountElement.textContent =
        transactions.length;


    updateProgress(
        totalIncome,
        totalExpenses
    );

}


// =====================================
// UPDATE PROGRESS
// =====================================

function updateProgress(
    income,
    expenses
) {

    if (income <= 0) {

        progressBar.style.width = "0%";

        expensePercentage.textContent =
            "0%";

        overviewMessage.textContent =
            "Start by adding an income transaction.";

        return;

    }


    const percentage =
        Math.min(
            (expenses / income) * 100,
            100
        );


    progressBar.style.width =
        `${percentage}%`;


    expensePercentage.textContent =
        `${Math.round(percentage)}%`;


    if (percentage < 50) {

        overviewMessage.textContent =
            "Your spending is currently below half of your income.";

    }

    else if (percentage < 80) {

        overviewMessage.textContent =
            "You have used a significant portion of your income.";

    }

    else if (percentage < 100) {

        overviewMessage.textContent =
            "Your expenses are getting close to your income.";

    }

    else {

        overviewMessage.textContent =
            "Your expenses have reached or exceeded your income.";

    }

}


// =====================================
// UPDATE APPLICATION
// =====================================

function updateApplication() {

    displayTransactions();

    updateSummary();

}


// =====================================
// INITIALIZE
// =====================================

updateApplication();
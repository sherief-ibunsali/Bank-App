// Data
const account1 = {
  owner: "Mohammed Sherief",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Miskath Begum",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Ibunsali Mohammed Jakriya",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Mohammed Arsarth",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements for manipulation html
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// To display all deposits and withdrawals
function allAmounts(movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort(a, (b) => a - b) : movements;
  movs.forEach(function (mov, i, ent) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}₹</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

// To calculate ammounts values
let balance;
function summary(mov) {
  balance = mov.reduce(function (acc, cur, i, ent) {
    return acc + cur;
  });
  labelBalance.textContent = `${balance}₹`;
}

// To get first letter of user

function userName(acc) {
  acc.forEach(function (ac) {
    ac.username = ac.owner
      .toLowerCase()
      .split(" ")
      .map(function (val) {
        return val[0];
      })
      .join("");
  });
}
userName(accounts);
console.log(accounts);
// To show total add values
function sumAdd(mov) {
  let add = 0;
  let sub = 0;
  for (let i = 0; i < mov.length; i++) {
    if (mov[i] > 0) {
      add = add + mov[i];
    } else {
      sub = sub + mov[i];
    }
  }
  // const intrest = mov
  //   .filter(function (val) {
  //     return val > 0;
  //   })
  //   .map(function (dep) {
  //     return (dep * 1.2) / 100;
  //   })
  //   .reduce(function (acc, cur) {
  //     return acc + cur;
  //   });
  const intrest = mov
    .map(function (dep) {
      return (dep * 1.2) / 100;
    })
    .filter(function (int, i, arr) {
      console.log(arr);
      return int >= 1;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
  console.log(add);
  console.log(sub);
  labelSumIn.textContent = `${add}₹`;
  labelSumOut.textContent = `${Math.abs(sub)}₹`;
  labelSumInterest.textContent = `${intrest}₹`;
}

// Another method from online

// function sumAdd(mov) {
//   const add = mov
//     .filter(function (mov) {
//       return mov > 0;
//     })
//     .reduce(function (acc, cur, i, ent) {
//       return acc + cur;
//     });
//   const sub = mov
//     .filter(function (val) {
//       return val < 0;
//     })
//     .reduce(function (acc, cur, i, ent) {
//       return acc + cur;
//     });
//   labelSumIn.textContent = `${add}₹`;
//   labelSumOut.textContent = `${Math.abs(sub)}₹`;
// }
// sumAdd(account1.movements);

// let she = accounts.map(function (ab) {
//   return ab.owner;
// });
// console.log(she);
// btnLogin.addEventListener("click", function (e) {
//   e.preventDefault();
//   const inputValue = inputLoginUsername.value;

//   if (she.includes(inputValue)) {
//     console.log("hii");
//   } else {
//     console.log("bye");
//   }
// });

// UI update
function updateUI(ui) {
  // To display the movements(deposit and widthdraw)
  allAmounts(ui.movements);

  // To calculate the ammounts (reduce)
  summary(ui.movements);

  // To show income and outcome values
  sumAdd(ui.movements);
}

// To login in the user accounts

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Hello shereif");
  currentAccount = accounts.find(function (val) {
    return val.username === inputLoginUsername.value;
  });
  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    console.log("sherief");
    labelWelcome.innerHTML = `Welcome ${currentAccount.owner}`;
    // To display the UI
    containerApp.style.opacity = "100";
    // UI update fun
    updateUI(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = "";
  } else {
    alert("You have given the wrong details");
    inputLoginUsername.value = inputLoginPin.value = "";
  }
});

// To transfer the money
let amtTransfer;
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  amtTransfer = accounts.find(function (val) {
    return val.username === inputTransferTo.value;
  });
  if (amount < 0) {
    alert("You have given a invalid number");
    inputTransferTo.value = inputTransferAmount.value = "";
  } else if (balance <= amount) {
    alert("You do not have sufficient balance to this transfer amount");
    inputTransferTo.value = inputTransferAmount.value = "";
  } else if (inputTransferTo.value !== amtTransfer?.username) {
    alert("You have given the wrong user name");
    inputTransferTo.value = inputTransferAmount.value = "";
  } else if (currentAccount.username === inputTransferTo.value) {
    alert("You cannot transfer money to yourself");
    inputTransferTo.value = inputTransferAmount.value = "";
  } else {
    currentAccount.movements.push(-amount);
    amtTransfer.movements.push(amount);
    // Update the UI fo function
    updateUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = "";
  }
});

// To close the user account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log("shereif");
    const index = accounts.findIndex(function (val) {
      return val.username === currentAccount.username;
    });
    // To remove the user
    accounts.splice(index, 1);
    // To remove UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = "";
    labelWelcome.innerHTML = `Log in to another account`;
  } else {
    alert("You have given the wrong details");
    inputCloseUsername.value = inputClosePin.value = "";
  }
});

// To request Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= loanAmount * 0.1;
    })
  ) {
    alert("Request successfull");
  } else {
    alert("You are not able to request this much of amount");
  }
  currentAccount.movements.push(loanAmount);
  updateUI(currentAccount);
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  allAmounts(currentAccount.movements, !sorted);
  sorted = !sorted;
});

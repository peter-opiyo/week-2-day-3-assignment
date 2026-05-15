const itemNameInput = document.querySelector("#itemName");
const quantityInput = document.querySelector("#quantity");
const addItemBtn = document.querySelector("#addItemBtn");
const shoppingList = document.querySelector("#shoppingList");
const errorMessage = document.querySelector("#errorMessage");
const remainingCount = document.querySelector("#remainingCount");

function updateRemainingCount() {
  const unboughtItems = shoppingList.querySelectorAll("li:not(.bought)");
  const count = unboughtItems.length;
  remainingCount.textContent = `${count} ${count === 1 ? "item" : "items"} remaining`;
}

function createShoppingItem(name, quantity) {
  const listItem = document.createElement("li");
  listItem.className = "shopping-item";

  const itemDetails = document.createElement("div");
  itemDetails.className = "item-details";

  const itemTitle = document.createElement("strong");
  itemTitle.textContent = name;

  const itemQuantity = document.createElement("span");
  itemQuantity.textContent = `Quantity: ${quantity}`;

  itemDetails.appendChild(itemTitle);
  itemDetails.appendChild(itemQuantity);

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "item-actions";

  const boughtButton = document.createElement("button");
  boughtButton.type = "button";
  boughtButton.textContent = "Bought";
  boughtButton.className = "bought-btn";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";

  boughtButton.addEventListener("click", function () {
    listItem.classList.toggle("bought");
    boughtButton.textContent = listItem.classList.contains("bought") ? "Undo" : "Bought";
    updateRemainingCount();
  });

  deleteButton.addEventListener("click", function () {
    listItem.remove();
    updateRemainingCount();
  });

  buttonGroup.appendChild(boughtButton);
  buttonGroup.appendChild(deleteButton);

  listItem.appendChild(itemDetails);
  listItem.appendChild(buttonGroup);

  return listItem;
}

function addItem() {
  const itemName = itemNameInput.value.trim();
  const quantity = Number(quantityInput.value) || 1;

  if (itemName === "") {
    errorMessage.textContent = "Please enter an item name.";
    return;
  }

  errorMessage.textContent = "";
  const newItem = createShoppingItem(itemName, quantity);
  shoppingList.appendChild(newItem);

  itemNameInput.value = "";
  quantityInput.value = "1";
  itemNameInput.focus();
  updateRemainingCount();
}

addItemBtn.addEventListener("click", addItem);

itemNameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});

updateRemainingCount();

// 1) Napište funkci, která otočí pořadí prvků ve vstupním poli. Nepoužívejte metodu reverse().


function reverse_(array) {
  const reversed = [];

  for (let i = array.length - 1; i >= 0; i -= 1) {
    reversed.push(array[i]);
  }

  return reversed;
}

console.log(reverse_([1, 2, 3]));



// 2) Napište funkci, která převede pole hodnot z mil na kilometry pomocí metody map(). Nakonec kilometry sečtěte.


function convertMilesToKilometers(arr) {
  return arr
    .map((mile) => mile * 1.609)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
}

console.log(convertMilesToKilometers([155, 124, 5]));



// 3) Napište funkci nazvanou "cleanNames", která přijímá pole řetězců obsahujících další mezery na začátku a konci. Funkce cleanNames() by měla použít metodu map() k vrácení nového pole s oříznutými názvy.

function cleanNames(arr) {
  return arr.map((name) => name.trim());
}

console.log(cleanNames([" ahoj   ", "   cau"]));

// 4) Napište funkci, který vybere z pole pouze sudá čísla pomocí metody filer() a poté je umocněte
function isEven(numbers) {
  return numbers
    .filter((number) => {return number % 2 === 0})
    .map((even) => even * even);
}

console.log(isEven([1, 2, 3, 4, 5]));

const orders = [
  {
    orderId: "123",
    customerId: "123",
    deliveryDate: "01-01-2020",
    delivered: true,
    items: [
      { productId: "123", price: 55 },
      { productId: "234", price: 30 },
    ],
  },
  {
    orderId: "234",
    customerId: "234",
    deliveryDate: "01-02-2020",
    delivered: false,
    items: [{ productId: "234", price: 30 }],
  },
  {
    orderId: "345",
    customerId: "234",
    deliveryDate: "05-01-2020",
    delivered: true,
    items: [
      { productId: "567", price: 30 },
      { productId: "678", price: 80 },
    ],
  },
  {
    orderId: "456",
    customerId: "345",
    deliveryDate: "12-01-2020",
    delivered: true,
    items: [
      { productId: "789", price: 12 },
      { productId: "890", price: 90 },
    ],
  },
  {
    orderId: "578",
    customerId: "456",
    deliveryDate: "12-01-2020",
    delivered: true,
    items: [
      { productId: "901", price: 43 },
      { productId: "123", price: 55 },
    ],
  },
];

// 5) Získejte list objednávek zákazníka 234, které nebyly doručené

console.log(
  orders.filter((order) => {
    return order.customerId == 234 && !order.delivered;
  })
); 

// 6) Pro každou objednávku vytvořte nový atribut 'total' s celkovou cenou za všechny objednané produkty
orders.forEach((order) => {
  order.total = 0;
  order.items.forEach((product) => {
    order.total = order.total + product.price;
  });
});
console.log(orders)

// 7) Na max 1 řádek: Byly všechny objednávky doručené?
console.log(orders.every((order) => order.delivered));

// 8) Na max 1 řádek: Objednal si něco zákazník s id 123?
console.log(orders.find((order) => order.customerId == 123));

// 9) Na max 1 řádek: Byl objednaný produkt s id 123?
console.log(orders.some((order) => order.items.find((item) => item.id == 123)));

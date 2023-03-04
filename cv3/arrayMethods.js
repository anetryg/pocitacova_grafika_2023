const orders = [
    { orderId: '123', customerId: '123', deliveryDate: '01-01-2020', delivered: true, items: [
        { productId: '123', price: 55 },
        { productId: '234', price: 30 },
    ]},
    { orderId: '234', customerId: '234', deliveryDate: '01-02-2020', delivered: false, items: [
        { productId: '234', price: 30 },
    ]},
    { orderId: '345', customerId: '234', deliveryDate: '05-01-2020', delivered: true, items: [
        { productId: '567', price: 30 },
        { productId: '678', price: 80 },
    ]},
    { orderId: '456', customerId: '345', deliveryDate: '12-01-2020', delivered: true, items: [
        { productId: '789', price: 12 },
        { productId: '890', price: 90 },
    ]},
        { orderId: '578', customerId: '456', deliveryDate: '12-01-2020', delivered: true, items: [
        { productId: '901', price: 43 },
        { productId: '123', price: 55 },
    ]},
];

// 1) Získejte list objednávek zákazníka 234, ktoré nebyly doručené


// 2) Pro každou objednávku vytvořte nový atribut 'total' s celkovou cenou za všechny objednané produkty


// 3) Na max 1 řádek: Bly všechny objednávky doručené?


// 4) Na max 1 řádek: Objednal si něco zákazník s id 123?


// 5) Na max 1 řádek:: Byl objednaný produkt s id 123?

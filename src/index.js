const itemsList = {
  ITEM000001: { name: '可口可乐', price: 3, unit: '瓶' },
  ITEM000002: { name: '羽毛球', price: 1, unit: '个' },
  ITEM000003: { name: '苹果', price: 5.5, unit: '斤' },
};

const itemDiscounts = {
  '3FOR2': ['ITEM000001', 'ITEM000003'],
  '5OFF': ['ITEM000002', 'ITEM000003'],
};

const cartItems = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000002-2',
  'ITEM000003',
  'ITEM000003',
  'ITEM000003',
];


/**
 * apply discounts to item
 * @param item {object} shopping cart item
 * @returns {object} shopping cart item with disccount type
 * - discountType {string}
 * - stackPrice {Number}
 * - saved {Number}
 */
export function applyDiscount(item) {
  const id = item.id;
  if (itemDiscounts['3FOR2'].indexOf(id) >= 0) {
    item.discountType = '3FOR2';
    item.stackPrice = item.count * item.price;
    item.count += parseInt(item.count / 2, 10);
    item.saved = (item.count * item.price) - item.stackPrice;
    return item;
  }

  if (itemDiscounts['5OFF'].indexOf(id) >= 0) {
    item.discountType = '5OFF';
    const totalPrice = item.count * item.price;
    item.stackPrice = totalPrice * 0.95;
    item.saved = totalPrice * 0.05;
    return item;
  }

  item.discountType = null;
  item.stackPrice = item.count * item.price;
  item.saved = 0;
  return item;
}

/**
 * parse shopping cart items
 * @param items {Array} shopping cart items
 * @returns {Array} parsed items
 */
export function parseItems(items) {
  const itemsMap = {};
  items.map(item => {
    let [id, count] = item.split('-'); // eslint-disable-line
    if (count === undefined) count = 1;

    if (itemsMap[id] === undefined) {
      itemsMap[id] = Object.assign({}, itemsList[id]);
      itemsMap[id].id = id;
      itemsMap[id].count = Number(count);
    } else {
      itemsMap[id].count += Number(count);
    }
    return item;
  });

  return Object.keys(itemsMap).map(id => applyDiscount(itemsMap[id]));
}

export function printTicket(items) {
  let total = 0;
  let saved = 0;

  const ticketItems = parseItems(items);
  console.log(ticketItems);
}


printTicket(cartItems);

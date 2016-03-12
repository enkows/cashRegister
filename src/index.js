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

  return itemsMap;
}

export function printTicket(items) {
  let total = 0;
  let saved = 0;

  const items = parseItems(cartItems);
}

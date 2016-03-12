import assert from 'assert';
import { itemsList, itemDiscounts } from '../src/db';
import { applyDiscount, parseItems } from '../src/index';


describe('cashRegister', () => {
  it('#applyDiscount', (done) => {
    Object.keys(itemsList).map(id => {
      const item = Object.assign({}, itemsList[id]);
      item.id = id;
      item.count = 2;
      const itemWithDiscount = applyDiscount(item);
      if (itemDiscounts['3FOR2'].indexOf(id) >= 0) {
        assert.equal(itemWithDiscount.count, 3);
        assert.equal(itemWithDiscount.stackPrice, 2 * item.price);
        assert.equal(itemWithDiscount.saved, item.price);
      } else if (itemDiscounts['5OFF'].indexOf(id) >= 0) {
        assert.equal(itemWithDiscount.count, 2);
        assert.equal(itemWithDiscount.stackPrice, 2 * item.price * 0.95);
        assert.equal(itemWithDiscount.saved, 2 * item.price * 0.05);
      }
      return id;
    });
    done();
  });

  it('#parseItems: ITEM000001, ITEM000001, ITEM000001', (done) => {
    const cartItems = ['ITEM000001', 'ITEM000001', 'ITEM000001'];
    const items = parseItems(cartItems);
    assert.equal(items[0].count, 4);
    done();
  });

  it('#parseItems: ITEM000001-2, ITEM000001', (done) => {
    const cartItems = ['ITEM000001-2', 'ITEM000001'];
    const items = parseItems(cartItems);
    assert.equal(items[0].count, 4);
    done();
  });

  it('#parseItems: ITEM000001', (done) => {
    const cartItems = ['ITEM000001'];
    const items = parseItems(cartItems);
    assert.equal(items[0].count, 1);
    done();
  });
});

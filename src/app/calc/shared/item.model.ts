interface ItemObject {
  id: string;
  name: string;
  iconUrl: string;
}

export interface QuantifiedItem extends ItemObject {
  amount: number;
}

export type Item = Readonly<ItemObject>;
export type SimpleItem = Pick<ItemObject, 'name' | 'iconUrl'>;
export type SimpleQuantifiedItem = Pick<QuantifiedItem, 'name' | 'amount'>;

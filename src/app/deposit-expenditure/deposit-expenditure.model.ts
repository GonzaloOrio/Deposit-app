export class DepositExpenditure {
  description: string;
  amount: number;
  type: string;
  uid?: string;

  constructor(obj: DepositObj) {
    this.description = (obj && obj.description) || null;
    this.amount = (obj && obj.amount) || null;
    this.type = (obj && obj.type) || null;
  }
}

interface DepositObj {
  description: string;
  amount: number;
  type: string;
}

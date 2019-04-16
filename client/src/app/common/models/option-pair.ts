export class OptionPair {
  _id: any;
  private readonly name: string;
  constructor(_id: string,
              name: string) {
    this._id = _id;
    this.name = name;
  }
}
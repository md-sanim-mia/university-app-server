import { FilterQuery, Query } from 'mongoose';

class queryBulders<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //-----------implement the search fields--------------------------------
  serarch(serarchblefields: string[]) {
    if (this?.query?.serarchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: serarchblefields.map(
          (filed) =>
            ({
              [filed]: { $regex: this.query.serarchTerm, options: 'i' },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  //-----------implement the  filtering option--------------------------------
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['serarchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  //-----------implement the sorging data for db--------------------------------

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || 'createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  //-----------implement the pagination data for db--------------------------------

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  //-----------implement the fields filtering  for db--------------------------------

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '_v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default queryBulders;

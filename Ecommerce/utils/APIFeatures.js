module.exports=class{
  constructor(query,queryStr){
    this.query=query
    this.queryStr={...queryStr}
  }
  filter(){
    this.queryStr = JSON.stringify(this.queryStr).replace(
      /\blt|lte|gte|gt\b/g,
      (ele) => `$${ele}`
    );
    this.queryStr = JSON.parse(this.queryStr);
    const { name, brand, price, category } = this.queryStr;
    const obj = { name, brand, price, category };
    Object.keys(obj).forEach((el) => {
      if (!obj[el]) {
        delete obj[el];
      }
    });
    this.query = this.query.find(obj);
    return this;
  }
  sort(){
    if(!this.queryStr.sort)
    return this
    this.queryStr.sort=this.queryStr.sort.split(",").join(' ')
    this.queryStr.sort=this.query.sort(this.queryStr.sort)
    return this
  }
  
  selectFields() {
    if (this.queryStr.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }
  paginate(){
    this.queryStr.page=this.queryStr.page*1||1;
    this.queryStr.limit=this.queryStr.limit*1||100;
    this.queryStr.skip=(this.queryStr.page-1)*this.queryStr.limit;
    this.quey=this.query.limit(this.queryStr.limit).skip(this.queryStr.skip)
    return this
  }
    }
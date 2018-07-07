class Resource {
  constructor(props) {
    this.id        = props.id;             // number id
    this.type      = props.type;           // string 'food', 'clothing', 'baby'
    this.donatedBy = props.donatedBy;      // userId
    this.image     = props.image;          // imageUrl
    this.quantity  = props.quantity;       // quantity 
    this.description = props.description;  // description of resource
    
    this.collected = null;
    this.status    = "PENDING";
    
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  // pickUp(user) {
  //   this.updatedAt = new Date().toISOString();
  //   this.status    = "COLLECTED";
  //   this.collected = user.id;
  // }
}


module.exports = Resource;
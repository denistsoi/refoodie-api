class Resource {
  constructor(props) {
    this.id   = props.id;
    this.type = props.type;
    this.donatedBy = props.user;
    
    this.collected = null;
    this.status    = "PENDING";
    
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  pickedUp(user) {
    this.updatedAt = new Date().toISOString();

    this.status    = "Collected";
    this.collected = user.id;
  }
}


module.exports = Resource;
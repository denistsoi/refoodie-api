class User {
  constructor(props) {
    this.id = props.id;
    this.name = props.name; // business name
    
    this.location  = props.location;
    this.contact   = props.contact;  // contact
    this.createdAt = new Date().toISOString();
  };
}

module.exports = User;
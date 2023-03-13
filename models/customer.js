/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, lastName, phone, notes, num_reservations }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.notes = notes;
    this.num_reservations = num_reservations;
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    return results.rows.map(c => new Customer(c));
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.firstName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, notes=$4
             WHERE id=$5`,
        [this.firstName, this.lastName, this.phone, this.notes, this.id]
      );
    }
  }
  static async search(term) {
    const results = await db.query(
      `SELECT id, 
      first_name AS "firstName",  
      last_name AS "lastName", 
      phone, 
      notes FROM customers
      WHERE LOWER(first_name) LIKE LOWER($1) OR LOWER(last_name) LIKE LOWER($1)
      ORDER BY last_name, first_name;`,
      [`%${term}%`]
    );
    if (results.rows[0]) {
      return results.rows;
    }
  }
  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  static async top10() {
    const results = await db.query(
      `SELECT customers.id,
      customers.first_name AS "firstName",
      customers.last_name AS "lastName",
      customers.phone AS phone,
      customers.notes As notes,
      COUNT(reservations.id) AS "num_reservations"
      FROM customers
      JOIN reservations ON customers.id = reservations.customer_id
      GROUP BY customers.id, customers.first_name, customers.last_name
      ORDER BY num_reservations DESC
      LIMIT 10;
      `
    )
    if (results.rows[0]) {
      return results.rows.map(c => new Customer(c));
    }
    return 'No Users Found'
  }
}

module.exports = Customer;

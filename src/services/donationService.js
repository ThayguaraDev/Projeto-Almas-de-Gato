const pool = require('../config/database');

async function createDonation(donation) {
  const [result] = await pool.execute(
    'INSERT INTO donations (donor_name, email, phone, donation_type, amount, description) VALUES (?, ?, ?, ?, ?, ?)',
    [
      donation.donorName,
      donation.email,
      donation.phone,
      donation.type,
      donation.amount,
      donation.description,
    ],
  );
  return {
    id: result.insertId,
    donor_name: donation.donorName,
    email: donation.email,
    phone: donation.phone,
    type: donation.type,
    amount: donation.amount,
    description: donation.description,
  };
}

module.exports = { createDonation };

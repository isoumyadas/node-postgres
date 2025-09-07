// Write a function to create a users table in your database

import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://postgres:postgres@localhost/postgres",
});

// async function createUsersTable() {
//   await client.connect();
//   const result = await client.query(
//     `
//         CREATE TABLE players (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `
//   );

//   console.log(result);
// }

// createUsersTable();

// ===============================================================================================

// async function insertData() {
//   try {
//     await client.connect();
//     const insertQuery = `INSERT INTO players
//     (username,email,password) VALUES ('sammy1', 'sammy1@gamil.com', 'say123')
//     `;
//     const insertedData = await client.query(insertQuery);
//     console.log("insertion success::", insertedData);
//   } catch (error) {
//     console.error("Error during the insertion:", error);
//   } finally {
//     await client.end(); //Close the client connection
//   }
// }

// insertData();

// async function insertData(username: string, email: string, password: string) {
//   try {
//     await client.connect();
//     const insertQuery =
//       "INSERT INTO players (username, email, password) VALUES ($1, $2, $3)";
//     const values = [username, email, password];
//     const res = await client.query(insertQuery, values);
//     console.log("insertion success::", res);
//   } catch (error) {
//     console.error("Error during the insertion:", error);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// insertData("username5", "user5@example.com", "user_password");

// ===============================================================================================

// Get user by email

// async function fetchUserByEmail(email: string) {
//   try {
//     await client.connect();
//     const selectQuery = "SELECT * FROM players WHERE email=$1";
//     const values = [email];
//     const res = await client.query(selectQuery, values);

//     if (res.rows.length > 0) {
//       console.log("User Found:: ", res.rows[0]);
//       return res.rows[0]; // Return the user data
//     } else {
//       console.log("No user found with the given email.");
//       return null; // Return null if no user was found
//     }
//   } catch (error) {
//     console.error("Error during fetching user:", error);
//     throw error;
//   } finally {
//     await client.end(); // Close the client connection
//   }
// }

// fetchUserByEmail("sammy1@gamil.com");

// ===========================================================================================================================================

// JOINS used here.

async function getUserDetailsWithAddress(userId: string) {
  try {
    await client.connect();
    const query = `SELECT players.id, players.username, players.email, addresses.city, addresses.country, addresses.street, addresses.pincode
        FROM players
        JOIN addresses ON players.id = addresses.player_id
        WHERE players.id=$1; 
        `;

    const values = [userId];
    const res = await client.query(query, values);

    if (res.rows.length > 0) {
      console.log("User and address found: ", res.rows[0]);
      return res.rows[0];
    } else {
      console.log("No user or address found with the given ID.");
      return null;
    }
  } catch (error) {
    console.error("Error during fetching user and address:", error);
    throw error;
  } finally {
    await client.end();
  }
}

getUserDetailsWithAddress("1");

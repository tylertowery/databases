/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect();

    const tablename = 'messages'; // TODO: DONE

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
  }, 5000);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from - DONE
         * your message table, since this is schema-dependent. */
        console.log('able to post');
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {

          if (err) {
            throw err;
          }
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test. - DONE
          expect(results[0].TEXT).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
    const username = 'tyler';
    const message = 'Hello there';
    const roomname = 'not the lobby';

    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        return axios.post(`${API_URL}/messages`, { username, message, roomname });

      })
      .then(() => {
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];
        /* TODO: The exact query string and query args to use here - DONE
        * depend on the schema you design, so I'll leave them up to you. */
        dbConnection.query(queryString, queryArgs, (err) => {
          if (err) {
            throw err;
          }
        });
      })
      .then(() => {
        // Now query the Node chat server and see if it returns the message we just inserted:
        axios.get(`${API_URL}/messages`)
          .then((response) => {
            const messageLog = response.data;
            console.log('line 94', messageLog);
            expect(messageLog[1].TEXT).toEqual(message);
            expect(messageLog[1].ROOM).toEqual(roomname);
            done();
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  });
});

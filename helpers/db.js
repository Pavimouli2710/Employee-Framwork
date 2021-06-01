import * as SQLite  from "expo-sqlite";
import { Alert } from "react-native";

const db = SQLite.openDatabase('employeedata.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((obj) => {
            obj.executeSql('CREATE TABLE IF NOT EXISTS empTable (id INTEGER PRIMARY KEY NOT NULL, Emp_Name TEXT NOT NULL, Salary REAL NOT NULL, D_o_Join TEXT NOT NULL, Gender TEXT NOT NULL);', 
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
            }
          );
        });
    });
    return promise;
};

export const insertEmployee = (Emp_Name, Salary, D_o_Join, Gender) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((obj) => {
            obj.executeSql(
                `INSERT INTO empTable(Emp_Name, Salary, D_o_Join, Gender) VALUES ( ?, ?, ?, ?);`, 
            [Emp_Name, Salary, D_o_Join, Gender],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
          );
        });
    });
    return promise;
};

export const searchEmployees = (Searching, pageCurrent) => {
    console.log(Searching);
    const promise = new Promise((resolve, reject) => {
    db.transaction((obj) => {
      obj.executeSql(
        `SELECT * FROM empTable WHERE Emp_Name like '${Searching}%' LIMIT 7 OFFSET ${pageCurrent}`,
        [],
        (_, results) => {
          var len = results.rows.length;
          console.log('len', len);
            if(len > 0){
            resolve(results);
            console.log(results);
            }
           else {
            alert('No Employee found');
          }
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
  };
  
export const editEmployee = (Emp_Name, Salary, D_o_Join, Gender, id) => {
    console.log(Emp_Name, Salary, D_o_Join, Gender, id)
    const promise = new Promise((resolve, reject) => {
        db.transaction((obj) => {
            obj.executeSql(
              `UPDATE empTable SET Emp_Name=?, Salary=? , D_o_Join=?, Gender=? WHERE id=?`,
              [Emp_Name, Salary, D_o_Join, Gender, id],
              (_, result) => {
                if (result.rowsAffected > 0) {
                   
                    resolve(result);
                  Alert.alert(
                    'Success',
                    'User updated successfully'
                  );
                } else alert('Updation Failed');
              },
              (_, err) => {
                reject(err);
                Alert.alert(err);
            }
            );
          });
    });
    return promise;
};

export const fetchEmployees = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((obj) => {
            obj.executeSql(
                'SELECT * FROM empTable', 
            [],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
          );
        });
    });
    return promise;
}



/********************* PLACE SCREEN **************************/ 

export const initial = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO places (title, imageUri) VALUES (?, ?);`,
            [title, imageUri],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM places',
            [],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};
// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT *
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 유저 삭제
async function deleteUser(connection, userIdx) {
  const deleteUserListQuery = `
                  DELETE
                  FROM User
                  WHERE userIdx = ?; 
                  `;
  const [userRows] = await connection.query(deleteUserListQuery, userIdx);
  return userRows
}

// 이메일로 회원 조회
async function selectUserEmail(connection, userEmail) {
  const selectUserEmailQuery = `
                SELECT userEmail, userName 
                FROM User
                WHERE userEmail = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, userEmail);
  return emailRows;
}

// userIdx 회원 조회
async function selectUserId(connection, userIdx) {
  const selectUserIdQuery = `
                 SELECT userIdx, userEmail, userName 
                 FROM User 
                 WHERE userIdx = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userIdx);
  return userRow;
}

// 유저 생성
async function insertUserInfo(connection, userEmail, userPassword, userName,userPhoneNumber) {
  const insertUserInfoQuery = `
        INSERT INTO User(userEmail, userPassword, userName,userPhoneNumber)
        VALUES (?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      userEmail,
      userPassword,
      userName,
      userPhoneNumber
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT userEmail, userPassword, userName
        FROM User 
        WHERE userEmail = ? AND userPassword = ?;
        `;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, id
        FROM UserInfo 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  deleteUser
};

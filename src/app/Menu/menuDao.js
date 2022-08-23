// 모든 menu 조회
async function selectMenu(connection) {
    const selectMenuListQuery = `
                SELECT *
                FROM Menu;
                `;
    const [menuRows] = await connection.query(selectMenuListQuery);
    return menuRows;
}

// menu 삭제
async function deleteMenu(connection, menuIdx) {
    const deleteMenuListQuery = `
                  DELETE
                  FROM Menu
                  WHERE menuIdx = ?; 
                  `;
    const [menuRows] = await connection.query(deleteMenuListQuery, menuIdx);
    return menuRows
}

// menu 생성
async function insertMenuInfo(connection, storeIdx, userIdx, menuName, menuCategory, menuURL, menuPrice, menuIntro) {
    const insertMenuInfoQuery = `
        INSERT INTO Menu(storeIdx, userIdx, menuName, menuCategory, menuURL, menuPrice, menuIntro)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const insertMenuInfoRow = await connection.query(
        insertMenuInfoQuery,
        storeIdx,
        userIdx,
        menuName,
        menuCategory,
        menuURL,
        menuPrice,
        menuIntro
    );

    return insertMenuInfoRow;
}

async function selectMenuIdx(connection, menuIdx) {
    const selectMenuIdxQuery = `
                 SELECT *
                 FROM Menu
                 WHERE menuIdx = ?;
                 `;
    const [MenuRow] = await connection.query(selectMenuIdxQuery, menuIdx);
    return MenuRow;
}


module.exports = {
    selectMenu,
    insertMenuInfo,
    selectMenuIdx,
    deleteMenu
};

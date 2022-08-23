// 모든 basket 조회
async function selectBasket(connection) {
    const selectBasketListQuery = `
                SELECT *
                FROM Basket;
                `;
    const [basketRows] = await connection.query(selectBasketListQuery);
    return basketRows;
}

// basket 삭제
async function deleteBasket(connection, basketIdx) {
    const deleteBasketListQuery = `
                  DELETE
                  FROM Basket
                  WHERE basketIdx = ?; 
                  `;
    const [basketRows] = await connection.query(deleteBasketListQuery, basketIdx);
    return basketRows
}

// basket 생성
async function insertBasketInfo(connection, userIdx, storeIdx, menuIdx, menuNum) {
    const insertBasketInfoQuery = `
        INSERT INTO Basket(userIdx, storeIdx, menuIdx, menuNum)
        VALUES (?, ?, ?, ?);
    `;
    const insertBasketInfoRow = await connection.query(
        insertBasketInfoQuery,
        userIdx,
        storeIdx,
        menuIdx,
        menuNum
    );

    return insertBasketInfoRow;
}

async function selectBasketIdx(connection, basketIdx) {
    const selectBasketIdxQuery = `
                 SELECT *
                 FROM Basket
                 WHERE basketIdx = ?;
                 `;
    const [BasketRow] = await connection.query(selectBasketIdxQuery, basketIdx);
    return BasketRow;
}


module.exports = {
    selectBasket,
    insertBasketInfo,
    selectBasketIdx
};

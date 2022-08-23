// 모든 store 조회
async function selectStore(connection) {
    const selectStoreListQuery = `
                SELECT *
                FROM Store;
                `;
    const [storeRows] = await connection.query(selectStoreListQuery);
    return storeRows;
}

// store 삭제
async function deleteStore(connection) {
    const deleteStoreListQuery = `
                DELETE
                FROM Store
                WHERE storeIdx = ?;
                `;
    const [storeRows] = await connection.query(deleteStoreListQuery);
    return storeRows;
}

// store 생성
async function insertStoreInfo(connection, userIdx, cateIdx, storeName, storePhoneNumber, storeLocation, managingHour) {
    const insertStoreInfoQuery = `
        INSERT INTO Store(userIdx, cateIdx, storeName, storePhoneNumber, storeLocation, managingHour)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const insertStoreInfoRow = await connection.query(
        insertStoreInfoQuery,
        userIdx,
        cateIdx,
        storeName,
        storePhoneNumber,
        storeLocation,
        managingHour
    );

    return insertStoreInfoRow;
}

async function selectStoreIdx(connection, storeIdx) {
    const selectStoreIdxQuery = `
                 SELECT *
                 FROM Store
                 WHERE storeIdx = ?;
                 `;
    const [StoreRow] = await connection.query(selectStoreIdxQuery, storeIdx);
    return StoreRow;
}


module.exports = {
    selectStore,
    insertStoreInfo,
    selectStoreIdx,
    deleteStore
};

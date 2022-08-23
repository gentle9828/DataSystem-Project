// 모든 카테고리 조회
async function selectCate(connection) {
    const selectCateListQuery = `
                SELECT *
                FROM Category;
                `;
    const [cateRows] = await connection.query(selectCateListQuery);
    return cateRows;
}

// 카테고리 삭제
async function deleteCate(connection, cateIdx) {
    const deleteCateListQuery = `
                  DELETE
                  FROM Category
                  WHERE cateIdx = ?; 
                  `;
    const [categoryRows] = await connection.query(deleteCateListQuery, cateIdx);
    return categoryRows
}

// 카테고리 생성
async function insertCateInfo(connection, cateName) {
    const insertCateInfoQuery = `
        INSERT INTO Category(cateName)
        VALUES (?);
    `;
    const insertCateInfoRow = await connection.query(
        insertCateInfoQuery,
        cateName
    );

    return insertCateInfoRow;

}


module.exports = {
    selectCate,
    insertCateInfo,
    deleteCate
};

// 모든 review 조회
async function selectReview(connection) {
    const selectReviewListQuery = `
                SELECT *
                FROM Review;
                `;
    const [reviewRows] = await connection.query(selectReviewListQuery);
    return reviewRows;
}

// review 생성
async function insertReviewInfo(connection, starGrade, reviewContents, reviewURL) {
    const insertReviewInfoQuery = `
        INSERT INTO Review(storeIdx, userIdx, starGrade, reviewContents, reviewURL)
        VALUES (?, ?, ?, ?, ?);
    `;
    const insertReviewInfoRow = await connection.query(
        insertReviewInfoQuery,
        starGrade,
        reviewContents,
        reviewURL
    );

    return insertReviewInfoRow;
}

// review 삭제
async function deleteReview(connection, reviewIdx) {
    const deleteReviewListQuery = `
                  DELETE
                  FROM Review
                  WHERE reviewIdx = ?; 
                  `;
    const [reviewRows] = await connection.query(deleteReviewListQuery, reviewIdx);
    return reviewRows
}

async function selectReviewIdx(connection, reviewIdx) {
    const selectReviewIdxQuery = `
                 SELECT *
                 FROM Review 
                 WHERE reviewIdx = ?;
                 `;
    const [ReviewRow] = await connection.query(selectReviewIdxQuery, reviewIdx);
    return ReviewRow;
}


module.exports = {
    selectReview,
    insertReviewInfo,
    selectReviewIdx,
    deleteReview
};

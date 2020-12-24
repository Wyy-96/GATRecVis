var sqlMap = {
  // 用户
  user: {
      findName: 'SELECT Name FROM users WHERE id = ?;',
      findNeighbors: 'SELECT neighbors FROM users WHERE id = ?;',
      findRecResult: 'SELECT recResult FROM users WHERE id = ?;',
      findPosition: 'SELECT position FROM users WHERE id = ?;',
      findMovieRecords: 'SELECT movieRecords FROM users WHERE id = ?;',

  },
  movie: {
      findName: 'SELECT Name FROM movies WHERE id = ?;',
      findNeighbors: 'SELECT neighbors FROM movies WHERE id = ?;',
      findPosition: 'SELECT position FROM movies WHERE id = ?;',
  },
  actor: {
      findName: 'SELECT Name FROM actors WHERE id = ?;',
      findNeighbors: 'SELECT neighbors FROM actors WHERE id = ?;'
  },
  director: {
      findName: 'SELECT Name FROM directors WHERE id = ?;',
      findNeighbors: 'SELECT neighbors FROM directors WHERE id = ?;'
  },
  genre: {
      findName: 'SELECT Name FROM genres WHERE id = ?;'
  }
}

module.exports = sqlMap;
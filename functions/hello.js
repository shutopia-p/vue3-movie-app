exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'shutopia',
      age:27,
      email: 'finoqkrtlgud@naver.com'
    })
  }
}
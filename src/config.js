export default {
  tessellateRoot: 'http://tessellate.elasticbeanstalk.com',
  firebaseRoot: process.env.NODE_ENV !== 'test' ? 'https://kyper-tech.firebaseio.com/tessellate' : 'https://devshare-test.firebaseio.com/tessellate'
}

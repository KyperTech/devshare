export default {
  paths: {
    files: 'files',
    users: 'users',
    uids: 'uids',
    projects: 'projects',
    projectNames: 'projectNames',
    usernames: 'usernames',
    requests: 'requests'
  },
  github: {
    apiUrl: 'https://api.github.com'
  },
  firebase: {
    prod: {
      apiKey: 'AIzaSyBQw-StxUsUhoQwZqaawegUFO7YOyG_HDA',
      authDomain: 'devshare-1.firebaseapp.com',
      databaseURL: 'https://devshare-1.firebaseio.com',
      storageBucket: 'devshare-1.appspot.com'
    },
    stg: {
      apiKey: 'AIzaSyBuwR21cO0lMzMr_T-Dl_jG1dsORXZ1fwY',
      authDomain: 'devshare-stg.firebaseapp.com',
      databaseURL: 'https://devshare-stg.firebaseio.com',
      storageBucket: 'devshare-stg.appspot.com'
    },
    int: {
      apiKey: 'AIzaSyDiVbMbj7nPXTBXxZlr_HiZ2AOY7yXWkYY',
      authDomain: 'devshare-int.firebaseapp.com',
      databaseURL: 'https://devshare-int.firebaseio.com',
      storageBucket: 'devshare-int.appspot.com'
    },
    dev: {
      apiKey: 'AIzaSyDiVbMbj7nPXTBXxZlr_HiZ2AOY7yXWkYY',
      authDomain: 'devshare-int.firebaseapp.com',
      databaseURL: 'https://devshare-int.firebaseio.com',
      storageBucket: 'devshare-int.appspot.com'
    }
  },
  highlightColors: [
    '#FF0000', '#FF00F1', '#F1C40F',
    '#D35400', '#FF08', '#2980B9',
    '#9B59B6'
  ],
  zipSuffix: '-devShare-export'
}

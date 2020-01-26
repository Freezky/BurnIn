import path from 'path'
import axios from 'axios'

import api from './src/api'

export default {
  getRoutes: () => {

    return [
      {
        path: '*',
        getData: async () => ({
          /*pictures: await api.getPictures(),*/
        }),
      },
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap')
  ],
}

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {userSchema} from './schemas/userSchema'
import {tweetSchema} from './schemas/tweetSchema'

export default defineConfig({
  name: 'default',
  title: 'twitter-clone',

  projectId: 'xck6fah0',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [userSchema, tweetSchema],
  },
})

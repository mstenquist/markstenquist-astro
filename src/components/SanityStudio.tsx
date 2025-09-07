import {Studio} from 'sanity'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '../../sanity/schemaTypes'

const config = defineConfig({
  name: 'default',
  title: 'Mark Stenquist Portfolio',
  projectId: 'yncpf922',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})

export default function SanityStudio() {
  return <Studio config={config} />
}
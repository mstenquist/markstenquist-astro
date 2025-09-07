import {PortableText as PortableTextReact} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {urlFor} from '../lib/sanity'

const components = {
  types: {
    image: ({value}: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          className="w-full rounded-lg my-8"
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(1200).quality(85).url()}
        />
      )
    },
  },
  block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({children}: any) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
    normal: ({children}: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({value, children}: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      )
    },
    code: ({children}: any) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{children}</code>
    ),
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({children}: any) => <li className="ml-4">{children}</li>,
    number: ({children}: any) => <li className="ml-4">{children}</li>,
  },
}

interface PortableTextProps {
  value: PortableTextBlock[]
}

export function PortableText({value}: PortableTextProps) {
  return <PortableTextReact value={value} components={components} />
}
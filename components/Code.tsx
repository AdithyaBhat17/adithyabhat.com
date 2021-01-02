import * as React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export default function Code({ value, language }) {
  return (
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {value}
    </SyntaxHighlighter>
  )
}

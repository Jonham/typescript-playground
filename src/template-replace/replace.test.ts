import { replaceTemplate } from './replace'

// test case 1
test('字符串替换-带有多余startWith', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx  '
  const varMap: Record<string, string> = {
    name: '张三',
    data: '数据',
  }
  const result = '{{    xxx  张三, 数据 xx  '

  expect(replaceTemplate(template, varMap)).toBe(result)
})

test('字符串替换-带有多余endWith', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx}}  '
  const varMap: Record<string, string> = {
    name: '张三',
    data: '数据',
  }
  const result = '{{    xxx  张三, 数据 xx}}  '

  expect(replaceTemplate(template, varMap)).toBe(result)
})

test('字符串替换-带有未定义变量名', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx}}  '
  const varMap: Record<string, string> = {
    data: '数据',
  }
  const result = '{{    xxx  , 数据 xx}}  '

  expect(replaceTemplate(template, varMap)).toBe(result)
})

test('字符串替换-带有空占位符', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx{{}}  '
  const varMap: Record<string, string> = {
    data: '数据',
  }
  const result = '{{    xxx  , 数据 xx  '

  expect(replaceTemplate(template, varMap)).toBe(result)
})

test('字符串替换-带有字符串', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx{{ "jonham" }}  '
  const varMap: Record<string, string> = {
    data: '数据',
  }
  const result = '{{    xxx  , 数据 xxjonham  '

  expect(replaceTemplate(template, varMap)).toBe(result)
})

test('字符串替换-带有空字符串', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx{{ "" }}  '
  const varMap: Record<string, string> = {
    data: '数据',
  }
  const result = '{{    xxx  , 数据 xx  '

  expect(replaceTemplate(template, varMap)).toBe(result)
})

test('字符串替换-自定义开始、结束字符', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx{{ "" }}  '
  const varMap: Record<string, string> = {
    data: '数据',
  }

  expect(replaceTemplate(template, varMap, ['{', '}'])).toBe('{{    xxx  {}, {数据} xx{}  ')
})

test('字符串替换-一个都没有匹配到', () => {
  const template = '{{    xxx  {{ name        }}, {{    data}} xx{{ "" }}  '
  const varMap: Record<string, string> = {
    data: '数据',
  }

  expect(replaceTemplate(template, varMap, ['xxx', 'xxx'])).toBe(template)
})

test('字符串替换-开始、结束字符相同,无变量', () => {
  const template = `// "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */`
  const varMap: Record<string, string> = {}

  expect(replaceTemplate(template, varMap, [`'`, `'`])).toBe(
    `// "jsx": "preserve",                     /* Specify JSX code generation: , , or . */`,
  )
  expect(replaceTemplate(template, varMap, [`"`, `"`])).toBe(
    `// : ,                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */`,
  )
})

test('字符串替换-开始、结束字符相同,带变量', () => {
  const template = `// "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */`
  const varMap: Record<string, string> = {
    react: 'vue',
    preserve: 'PRV',
    'react-native': 'RN',
    jsx: 'JavaScript with XML',
  }

  expect(replaceTemplate(template, varMap, [`'`, `'`])).toBe(
    `// "jsx": "preserve",                     /* Specify JSX code generation: PRV, RN, or vue. */`,
  )
  expect(replaceTemplate(template, varMap, [`"`, `"`])).toBe(
    `// JavaScript with XML: PRV,                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */`,
  )
})

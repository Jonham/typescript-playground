// 算法逻辑请看 README.md

import { ParseStringVar } from './util'

export type TemplateVarPosition = {
  /** 变量名 */
  name: string
  /** 变量原名 */
  rawString: string
  /** 范围的正则 */
  range: {
    start: number
    end: number
  }
}

export function replaceTemplate(
  template: string,
  varMap: Record<string, number | string | boolean>,
  border = ['{{', '}}'],
): string {
  const defaultValue = ''
  // 模板插入的文本 -> 求值
  const valEval = (varName: string) => {
    const name = ParseStringVar(varName)
    if (name !== false) return name

    return varMap[varName] || defaultValue
  }

  const varPositionList = parsePositionList(template, ...border)
  console.log(varPositionList)

  let temp = ''
  let lastIndex = 0
  varPositionList.forEach((pos) => {
    // 拼接上个变量与当前的衔接文本
    temp += template.substring(lastIndex, pos.range.start)
    // 拼接变量
    temp += valEval(pos.name)
    lastIndex = pos.range.end
  })
  if (lastIndex !== template.length) {
    temp += template.substring(lastIndex)
  }

  return temp
}

/** 从模板字符串，识别出变量占位符区间 */
export function parsePositionList(
  template: string,
  startWith = '{{',
  endWith = '}}',
): TemplateVarPosition[] {
  const result: TemplateVarPosition[] = []

  // RETURN 没有匹配到任何结束字符
  if (template.indexOf(endWith) === -1) return result
  // RETURN 没有匹配到任何开始字符
  let i = template.indexOf(startWith)
  if (i === -1) return result

  // 划出下一个匹配的开始 和 紧接的结束
  const sliceSubstr = (startIndex: number) => {
    if (startIndex === -1) return ''

    let temp = template.slice(startIndex)
    const endIndex = temp.indexOf(endWith, startWith.length)
    if (endIndex === -1) return ''

    return temp.slice(0, endIndex + endWith.length)
  }

  // 剪切var name
  const trimName = (rawString: string): string =>
    rawString.substring(startWith.length, rawString.length - endWith.length).trim()

  let substr = sliceSubstr(i)
  // 匹配的最近的开始index
  let absStartIndex
  for (; i < template.length; ) {
    // 最小匹配： {{aa {{bb }} -> 只匹配到 {{bb }}
    // 此处,startWith和endWith相同时,需要去掉
    const closedStartIndex = substr
      .substring(0, substr.length - endWith.length)
      .lastIndexOf(startWith)

    absStartIndex = closedStartIndex + i
    const absEndIndex = i + substr.length
    const rawVarName = substr.substring(closedStartIndex)
    result.push({
      rawString: rawVarName,
      name: trimName(rawVarName),
      range: {
        start: absStartIndex,
        end: absStartIndex + rawVarName.length,
      },
    })

    // next loop
    // RETURN 匹配不到下一个开始
    const nextStartIndex = template.indexOf(startWith, absEndIndex)
    if (nextStartIndex === -1) return result

    // RETURN 匹配不到下一个结束
    substr = sliceSubstr(nextStartIndex)
    if (substr === '') return result

    i = nextStartIndex
  }

  return result
}

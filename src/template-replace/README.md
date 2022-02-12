# 模板文本插值
日期： 2022-02-12  
By: Jonham  

## 处理逻辑
实例文本：
```typescript
const template = `{{    xxx  {{ name        }}, {{    data}} xx  `
const startWith = "{{"
const endWith = "}}"
```

0- 设定起点absStartIndex = 0  

> `{`{    xxx  {{ name        }}, {{    data}} xx  
> |-->


1- 找到第一个startWith  
> `{{`    xxx  {{ name        }}, {{    data}} xx  
> |-->
  
2- 找到第一个endWith  
> `{{`    xxx  {{ name        `}}`, {{    data}} xx  
> |--> . . . . . . . . <--|

3- 找到 1<-->2 之间，最后一个startWith  
> {{    xxx  `{{ name        }}`, {{    data}} xx  
> . . . . . |--> .  . . . <--|  

4- 记录范围
```typescript
const matches = [{
  rawString: '{{ name        }}',
  name: 'name',
  range: { start: 11, end: 28 }
}]
```

5- 修改absStartIndex为endWith的index + endWith.length  
重复1，2，3, 直到找不到下一个startWith或endWith   
> {{    xxx  {{ name        }}`,` {{    data}} xx  
> ________________|-->

6- 循环matches,替换变量  
  - 6.1 在range的start和end之间的，根据name获取变量的值，进行替换
  - 6.2 在range的start和end之外的文本，保留原文本